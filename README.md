# Arrivage

App for a Quebec wine importer (private import) to manage suppliers, incoming shipments, client accounts (restaurants, grocers, wine shops, hotels) and orders. English and French.

## What it does

- **Dashboard:** sales this month, amounts to collect, cases to deliver, cases on the way. Also lists upcoming deliveries, supplier shipments, a six-month sales chart, and alerts for expiring permits, overdue invoices, quiet accounts and low stock.
- **Suppliers:** estates, terms, lead times, wines with margin, shipments.
- **Accounts:** permit number and expiry, payment terms, delivery notes, order history.
- **Orders:** draft → confirmed → delivered → paid, with GST 5% and QST 9.975%. Confirming an order deducts stock in the database. A client with an expired permit can have a draft but not a confirmed order.

## Editing and deleting

Every record type (accounts, suppliers, wines, shipments, orders) can be created, edited and deleted. Open a record and use **Edit** or **Delete**. Wines and shipments are edited from their supplier's panel; click a row to edit it.

Deleting is refused when it would leave broken references:

- A supplier with wines or shipments can't be deleted until those are removed or moved.
- A wine that appears in any order can't be deleted. Set its stock to 0 instead.
- An account with orders can't be deleted until its orders are removed.
- Deleting a confirmed order puts its cases back into stock (`delete_order` in the database). Deleting a delivered or paid order leaves stock as is.

Once an order is confirmed, only its delivery date can be edited, because its stock has already been deducted.

## Files

| File | Purpose |
|---|---|
| `index.html`, `styles.css`, `app.js` | The app. Static files, no build step. |
| `config.js` | Your Supabase URL and anon key. Empty = demo mode. |
| `supabase/schema.sql` | Tables, security rules, the `confirm_order` function, live updates. |
| `supabase/seed.sql` | Optional fictional sample data. |
| `data/seed.json` | The same sample data, used in demo mode. |

## Deploy on Vercel

Live at **https://wineapp-nu.vercel.app** (Vercel project `wineapp`, production branch `main`). Every push to `main` redeploys automatically.

The app is static, so Vercel needs no build settings. To set it up again from scratch:

1. In Vercel, choose *Add New → Project*, import `george664/wineapp`, keep the framework preset at **Other**, and deploy.
2. Copy the deployment address (for example `https://wineapp.vercel.app`) into Supabase under *Authentication → URL Configuration → Site URL*.
3. Every push to `main` redeploys automatically.

## Supabase

This repo is already connected to the Supabase project **wineapp** (Canada Central): see `config.js`. The schema and the sample data are loaded. To set up a fresh project instead:

1. **Create a project** at [supabase.com](https://supabase.com). Pick the Canada (Central) region to keep client data in Canada.
2. **Create the database.** In the dashboard, open *SQL Editor → New query*, paste `supabase/schema.sql`, and run it. Run it once only.
3. **Add sample data (optional).** Run `supabase/seed.sql` the same way. Skip this when you load the importer's real data.
4. **Lock down sign-ups.** In *Authentication → Sign In / Providers*, turn off "Allow new users to sign up". Then add each staff member under *Authentication → Users → Add user*, with an email and password.
5. **Connect the app.** In *Project Settings → API*, copy the Project URL and the `anon` `public` key into `config.js`:
   ```js
   window.ARRIVAGE_CONFIG = {
     supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
     supabaseAnonKey: 'eyJ...'
   };
   ```
   The anon key is safe to publish. The security rules only let signed-in users read or write.
6. **Allow your site's address.** In *Authentication → URL Configuration*, set the Site URL to where you host the app (for example your GitHub Pages address).

With `config.js` filled in, the app shows a sign-in screen. After signing in, every change is saved, and other signed-in users see it live.

Never put the `service_role` key in this app. It bypasses all security rules.

## Run it

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` straight from disk won't work, because browsers block loading files that way. Use a local server, or GitHub Pages (*Settings → Pages → deploy from `main`, root*).

## Demo mode

Leave `config.js` empty to run without a database. The app loads `data/seed.json` and keeps changes in memory only. A reload resets them.

## Next steps

- Separate roles (owner, sales rep, warehouse) with narrower security rules.
- PDF invoices with GST/QST registration numbers, CSV export for accounting.
- Email reminders for expiring permits and overdue invoices (Supabase scheduled functions).
- Check the permit and private-import rules with the importer (RACJ, SAQ) and review Law 25 privacy obligations.
