# Black Friday 2026 — Stripe deployment checklist (NOT LIVE)

## Business configuration
- Bon cadeau massage 90 minutes, 90.00 CHF one-time; NOT a cash-value card.
- Purchases 25–30 Nov 2026 inclusive; each issued service voucher valid 6 months from issuance.
- One numbered Serenity & Relax voucher per purchased unit; no invented volume discounts.
- Gift for self, Christmas, birthday or thank-you. Optional occasion and dedication submitted after payment.

## Stripe Dashboard tasks (João)
1. Complete identity, payout bank, activation and security.
2. Create product Bon cadeau massage 90 min — Black Friday 2026; 90 CHF once.
3. Create Payment Link with adjustable quantity (test 1,2,3,5) and customer e-mail; optional phone collection.
4. Enable receipts for successful payments. Enable TWINT in Stripe if available and tested, otherwise keep external TWINT by telephone.
5. After-payment message: payment recorded; personalized voucher issued separately after verification; contact WhatsApp/email to choose dedication or occasion. No instant voucher promise.
6. Share only the public https://buy.stripe.com/... payment URL. Do not share secret keys, login, bank information or webhook signing secrets.
7. Check payment quantity/reference and amount before issuing in Gestion: 1x90, 2x180, 3x270, 5x450; block duplicate issuance. Test with test-mode payments first.
8. Handle payment refunds/chargebacks by revoking/flagging affected voucher in Gestion.
9. Keep external Réserver links pointing to homepage; promo homepage leads to offer detail.
10. Test on mobile/desktop and languages. Merge only with João's authorization.

## Current technical status
- Draft branch draft/black-friday-stripe-2026 derived from separate SumUp draft.
- Stripe CTA disabled until actual public live payment link is supplied and tested.
- No Stripe backend/webhooks; voucher issuing remains manually verified and in Gestion.
- Direct TWINT telephone remains a separate choice.
- No secrets or production publication.