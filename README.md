# Arrivage

Prototype app for a Quebec wine importer (private import) to manage suppliers, incoming shipments, client accounts (restaurants, grocers, wine shops, hotels) and orders. English and French.

## What it does

- **Dashboard:** sales this month, amounts to collect, cases to deliver, cases on the way. Also lists upcoming deliveries, supplier shipments, a six-month sales chart, and alerts for expiring permits, overdue invoices, quiet accounts and low stock.
- **Suppliers:** estates, terms, lead times, wines with margin, shipments.
- **Accounts:** permit number and expiry, payment terms, delivery notes, order history.
- **Orders:** draft → confirmed → delivered → paid, with GST 5% and QST 9.975%. Confirming an order deducts stock. A client with an expired permit can have a draft but not a confirmed order.

## Run it

It is a single static page with no build step.

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly from disk will not load the data, because browsers block `fetch` on `file://`. Use a local server, or enable GitHub Pages on this repo (Settings → Pages → deploy from `main`, root).

## Data

- `data/seed.json` holds fictional sample data (suppliers, wines, shipments, accounts, orders, monthly sales).
- Run standalone, the app loads this file and keeps changes **in memory only**. A reload resets them.
- In its claude.ai artifact version, the same code saves to the artifact's shared database instead.

## Next steps toward production

- Move storage to a hosted database with logins and roles (for example Supabase, Canada region).
- Do stock deduction in the database so concurrent confirmations can't oversell.
- PDF invoices with GST/QST numbers, CSV export for accounting, permit and overdue reminders.
- Check the permit and private-import rules with the importer (RACJ, SAQ) and review Law 25 privacy obligations.
