# Tracy's Guest House

Website for Tracy's Guest House, a newly built 2-bedroom, 2-bath boutique guesthouse in Santa Ana, CA. It's near Little Saigon, Disneyland and the Orange County beaches.

Bookings are handled through the Airbnb listing:
https://www.airbnb.com/rooms/1606643047301289638

## Stack

A single static page with no build step.

- `index.html` contains all markup, CSS and JS
- Fonts: Google Fonts (Fraunces, Manrope)
- Icons: [Lucide](https://lucide.dev) via unpkg CDN
- `images/` is where self-hosted photos go

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel, choose **Add New → Project**, import the repo, set Framework Preset to **Other**, then deploy.
   No build command or output directory is needed.

## Photos

The gallery currently hotlinks the Airbnb listing photos and shows illustrated fallback tiles if they fail to load.
External image URLs can change. To self-host photos you own or have permission to use (recommended):

1. Put the photos in `images/` (for example `living-room.jpg`, `kitchen.jpg`, `bedroom-1.jpg` …). Keep each one around 1600px wide or less and under about 400 KB.
2. In `index.html`, find the `<figure class="ph …">` blocks and change each `<img src="…">` to `images/<file>.jpg`. Also update the first-look photo above the introduction.
3. Update each `<figcaption>` so it matches the room shown.
4. Update the `og:image` URL in the page head to an absolute, publicly accessible
   URL for an approved photo; social media platforms use it for link previews.

## Search visibility

- Once the final domain is selected, use a single preferred URL and configure redirects
  from any old domain. Add a matching absolute canonical URL in the page head.
- Verify the final site in [Google Search Console](https://search.google.com/search-console)
  and request indexing using URL Inspection. Indexing and search rankings are not guaranteed.
- Keep the page title, description, property details, photos and Airbnb listing accurate.
  Update the social preview image when an approved, self-hosted photo is available.
- For a single-page site, a sitemap is optional. If the site grows, create one with
  absolute URLs for the final domain and submit it in Search Console.
- Google's vacation rental rich results have additional eligibility and integration
  requirements; see its [vacation rental documentation](https://developers.google.com/search/docs/appearance/structured-data/vacation-rental)
  before adding that markup.

## Editing content

| What | Where in `index.html` |
|---|---|
| Name / logo | `<nav>` → `.logo` |
| Hero headline & intro | `<header class="hero">` |
| Drive times | `places` array in the `<script>` |
| Amenities | `amen` array in the `<script>` |
| Review scores & themes | `cats` and `themes` arrays in the `<script>` |
| Host blurb | `<section class="hosts">` |
| Check-in / rules | `<section class="stay">` |
| Common questions | `<section class="faq">` |

Review the listing regularly for changes to ratings, review counts, drive times, fees,
house rules, and availability. Confirm accessibility details with the host rather than
making assumptions. Keep the gallery captions aligned with the actual photos.
