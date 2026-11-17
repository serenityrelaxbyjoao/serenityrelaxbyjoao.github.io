const {test}=require('node:test'); const assert=require('node:assert/strict'); const vm=require('node:vm'); const fs=require('node:fs');
const source=fs.readFileSync('offer-share.js','utf8');
class Element {
 constructor(tag){this.tag=tag;this.children=[];this.events={};this.attrs={};this.hidden=false;}
 appendChild(x){this.children.push(x);return x;} setAttribute(k,v){this.attrs[k]=v;} removeAttribute(k){delete this[k];}
 addEventListener(k,v){this.events[k]=v;} focus(){this.focused=true;} select(){this.selected=true;} contains(x){return x===this||this.children.some(c=>c.contains(x));}
}
function setup(nav={},lang='fr',date='2026-11-17T12:00:00Z'){
 const host=new Element('div'),booking=new Element('a'),expired=new Element('p'); expired.hidden=true;
 const document={documentElement:{lang},querySelectorAll:()=>[host],createElement:t=>new Element(t),addEventListener(){},querySelector:()=>booking,getElementById:()=>expired};
 const RealDate=Date; class FakeDate extends RealDate{constructor(...args){super(...(args.length?args:[date]));}}
 vm.runInNewContext(source,{document,navigator:nav,Date:FakeDate});
 const panel=host.children[1];return {host,panel,booking,expired,find:label=>panel.children.find(x=>x.textContent===label)};
}
test('no automatic transmissions; social URLs share the dedicated offer, not the home page',()=>{
 let calls=0;const x=setup({share(){calls++;},clipboard:{writeText(){calls++;}}});assert.equal(calls,0);
 const w=new URL(x.find('WhatsApp').href),f=new URL(x.find('Facebook').href);
 assert.match(w.searchParams.get('text'),/offres\/novembre-bleu-2026.html/);assert.equal(f.searchParams.get('u'),'https://serenityrelaxbyjoao.ch/offres/novembre-bleu-2026.html');
});
test('successful copy confirms only after writing the correct link',async()=>{
 let copied;const x=setup({clipboard:{writeText:async s=>{copied=s;}}});await x.find('Copier le lien').events.click();assert.match(copied,/offres\/novembre-bleu-2026.html$/);assert.equal(x.panel.children.find(c=>c.attrs.role==='status').textContent,'Lien copié');
});
test('clipboard denial leaves a selectable link without a false success',async()=>{
 const x=setup({clipboard:{writeText:async()=>{throw Error('Denied');}}});await x.find('Copier le lien').events.click();const field=x.panel.children.find(c=>c.tag==='input');assert.equal(field.hidden,false);assert.equal(field.selected,true);assert.notEqual(x.panel.children.find(c=>c.attrs.role==='status').textContent,'Lien copié');
});
test('native cancellation does not claim success or reveal an error fallback',async()=>{
 const x=setup({share:async()=>{throw Object.assign(Error(),{name:'AbortError'});}});await x.find('Partager avec une application').events.click();assert.equal(x.panel.children.find(c=>c.tag==='input').hidden,true);
});
test('offer expires at midnight in Zurich, including UTC boundary',()=>{
 assert.equal(setup({},'fr','2026-11-30T22:59:59Z').booking.hidden,false);const x=setup({},'fr','2026-11-30T23:00:00Z');assert.equal(x.booking.hidden,true);assert.equal(x.expired.hidden,false);
});
test('all six home pages load sharing beside the poster and inside the dialog',()=>{
 for(const file of ['index.html','pt.html','en.html','de.html','es.html','it.html']){const html=fs.readFileSync(file,'utf8');assert.equal((html.match(/data-offer-share/g)||[]).length,2);assert.match(html,/offer-share.js/);assert.match(html,/offer-share.css/);}
 for(const lang of ['fr','pt','en','de','es','it']) assert.ok(setup({},lang).host.children[0].textContent.length>5);
});
test('social preview is static HTML and its image exists as JPEG',()=>{
 const html=fs.readFileSync('offres/novembre-bleu-2026.html','utf8');assert.match(html,/property="og:title" content="Novembre Bleu/);assert.match(html,/property="og:image" content="https:\/\/serenityrelaxbyjoao.ch\/images\/novembre-bleu-2026.jpg"/);assert.ok(fs.existsSync('images/novembre-bleu-2026.jpg'));assert.match(html,/reservation\/\?lang=fr&amp;service=offre-du-mois/);
});
