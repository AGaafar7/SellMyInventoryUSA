# SellMyInventoryUSA — clean web version

This version intentionally uses **React + Next.js + standard HTML/CSS**, not React Native.

It is a marketing website for SellMyInventory / @SellMyInventory with:

- Responsive professional landing page
- SellMyInventory visual identity: black / off-white / lime
- Hero section
- Inventory buyer messaging
- Process section
- What-we-buy section
- Inventory inquiry form
- Next.js API route
- Resend email integration
- TikTok links to @SellMyInventory
- SEO metadata

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Email

Add:

```env
OWNER_EMAIL=owner@example.com
RESEND_API_KEY=re_xxxxxxxxx
EMAIL_FROM=SellMyInventoryUSA <your-verified-domain@example.com>
```

The form sends the seller's name, email, phone, and inventory description to `OWNER_EMAIL`.

The seller's email is also set as Reply-To.

## Production

Deploy to Vercel and add the same environment variables to the project settings.

Use a verified domain with Resend for the production sender address.
# SellMyInventoryUSA
# SellMyInventoryUSA
# SellMyInventoryUSA
