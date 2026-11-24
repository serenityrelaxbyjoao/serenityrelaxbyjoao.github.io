(function () {
  var header = document.querySelector('header.site-subnav');
  if (!header) return;
  var inner = header.querySelector('.site-subnav-inner');
  var nav = inner && inner.querySelector('nav');
  if (!nav) return;
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'site-menu-toggle';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  inner.insertBefore(btn, nav);
  btn.addEventListener('click', function () {
    var open = header.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();
