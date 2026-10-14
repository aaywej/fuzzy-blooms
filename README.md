# C & T Fuzzy Blooms website

A simple website for C & T Fuzzy Blooms: a shop, a custom bouquet price calculator, an order form that sends the order to Messenger, a gallery, and FAQs. It uses only HTML, CSS, and JavaScript, so it needs no server or database.

## Folder map

```
index.html      the page itself (sections and text)
css/style.css   colors, fonts, and layout
js/data.js      products, prices, availability, FAQs, contact details
js/app.js       the code that makes the page work
images/         all photos
```

## Where the photos are

Everything is in the `images` folder.

- `b-` photos are bouquets, for example `b-480.jpg` (the number is only a label, not the price)
- `k-` photos are keychains, for example `k-rose.jpg`
- `logo.jpg` is the logo, also used as the browser tab icon

Photos should be about 600 x 750 pixels (4:5, portrait) and under 150 KB so the site loads fast on mobile data.

## Making an item available or not available

This is done by hand in `js/data.js`.

1. Open `js/data.js`.
2. Find the item. Products are under `PRODUCTS`, custom bouquet flowers under `FLOWERS`, and leaves under `LEAVES`.
3. Change `available: true` to `available: false` (or the other way around).
4. Save, then publish the change (see below).

The site then greys the item out and shows "Not available" in place of the Add to order button.

## Changing a price

In `js/data.js`, change the number after `price:` for that item. Save and publish.

## Adding a new product

1. Put the photo in `images`.
2. In `js/data.js`, copy one line inside `PRODUCTS`, paste it below, and change the `id` (it must be unique), `name`, `price`, `img`, and `note`. Keep the comma at the end of the line, except on the last item in the list.

## Adding photos to the gallery

All shop photos already show in the gallery. To add more, put them in `images` and list them in `GALLERY_EXTRA` in `js/data.js`.

## Contact details still to fill in

In `js/data.js`: `messengerLink`, `gcashNumber`, `gcashName`, and `deliveryNote`.
In `index.html`: the Facebook link in the footer (search for `YOUR_PAGE`).

## Publishing changes

The site is hosted on GitHub Pages. Saving a file in VS Code only changes your own computer. To update the live site:

1. Open Source Control in VS Code (the branch icon on the left).
2. Type a short message, for example `Mark Big Lily available`.
3. Click Commit, then Sync Changes.
4. Wait 1 to 2 minutes, then refresh the live site (Ctrl+F5 if it looks the same).

## Privacy

The site does not store anything. When a customer submits the form, it builds an order summary on their own device and opens Messenger so they can send it.
