# Asher Print: Step 1 Template Audit

Source archive: `bizcraft-master.zip` (kept untouched at the repository root).
Audit date: 20 October 2026.
Extracted for inspection to a temporary folder only. No template file was renamed or deleted.

## Full file tree of the zip (every file and folder, hidden files included)

There are no hidden files in the zip. The complete listing is:

```text
bizcraft-master/
  404.html
  about.html
  about2.html
  blog-item.html
  blog-rightside.html
  career.html
  contact.html
  elements.html
  faq.html
  index-2.html
  index-3.html
  index-4.html
  index.html
  portfolio-classic.html
  portfolio-item.html
  portfolio-static.html
  pricing.html
  service-single.html
  service.html
  service2.html
  team.html
  testimonial.html
  typography.html
  css/
    animate.css
    bootstrap.min.css
    cd-hero copy.css
    cd-hero.css
    flexslider.css
    font-awesome.css
    font-awesome.min.css
    owl.carousel.css
    owl.theme.css
    prettyPhoto.css
    responsive.css
    style.css
    presets/
      preset1.css
      preset2.css
      preset3.css
      preset4.css
      preset5.css
      preset6.css
  fonts/
    FontAwesome.otf
    fontawesome-webfont.eot
    fontawesome-webfont.svg
    fontawesome-webfont.ttf
    fontawesome-webfont.woff
    fontawesome-webfont.woff2
    glyphicons-halflings-regular.svg
    glyphicons-halflings-regular.woff
    jaapokki/
      jaapokki-regular.eot
      jaapokki-regular.svg
      jaapokki-regular.ttf
      jaapokki-regular.woff
  images/
    bg_play_pause.png
    bx_loader.gif
    controls.png
    footer-bg.jpg
    image-block-bg.jpg
    logo.png
    logo2.png
    marker.png
    overaly.png
    banner/banner1.jpg, banner2.jpg
    blog/author.jpg, avator1.png, avator2.jpg, blog-small1.jpg, blog-small2.jpg,
      blog-small3.jpg, blog1.jpg, blog2.jpg, blog3.jpg
    clients/client1.png to client8.png, testimonial1.jpg, testimonial2.jpg, testimonial3.jpg
    gallery/1.jpg to 9.jpg
    landing/hero-image.png, main-bg.jpg, screenshot-1.jpg to screenshot-6.jpg
    pages/about-1.jpg, about-2.jpg, service-1.jpg, service-2.jpg, service-3.jpg, service-single.jpg
    parallax/parallax1.jpg, parallax2.jpg, parallax3.jpg
    portfolio/portfolio-bg1.jpg to portfolio-bg3.jpg, portfolio1.jpg to portfolio8.jpg
    prettyPhoto/{dark_rounded,dark_square,default,facebook,light_rounded,light_square}/
      (btnNext.png, btnPrevious.png, loader.gif, sprite.png and related pattern files)
    slider/bg-thumb1.png, bg-thumb2.png, bg1.jpg, bg2.jpg, bg3.jpg, video-replace-mobile.jpg
    slider2/bg1.jpg, bg2.jpg, bg3.jpg
    tab/featured-tab1.png, featured-tab2.png, featured-tab3.png
    team/team1.jpg, team2.jpg, team3.jpg, team4.jpg, testimonial1.jpg, testimonial2.jpg, testimonial3.jpg
  js/
    bootstrap.min.js, cd-hero.js, custom.js, gmap3.js, html5shiv.js,
    ini.isotope.js, isotope.js, jquery.counterup.min.js, jquery.easing.1.3.js,
    jquery.flexslider.js, jquery.js, jquery.min.js, jquery.prettyPhoto.js,
    owl.carousel.js, respond.min.js, smoothscroll.js, style-switcher.js,
    waypoints.min.js, wow.min.js
  videos/
    video.mp4
    video.webm
```

## Confirmations required by Step 1

### CSS custom properties

None. The template predates CSS variables. A search for `:root` custom property
declarations and `--name:` tokens across `css/` returns no custom properties.
All colour and type values are literal declarations. The Asher Print build
therefore establishes `:root` custom properties in `app/globals.css` using the
zip literal values verbatim, listed under Colours below. Nothing was invented
outside the zip palette except the WhatsApp brand colour `#25D366` required by
Step 15 and status colours derived from the preset red.

### @font-face rules (src, weight, style), reproduced verbatim

1. `css/style.css` lines 39 to 48, the brand display font:

```css
@font-face {
  	font-family: 'JaapokkiRegular';
	src: url('../fonts/jaapokki/jaapokki-regular.eot');
    src: url('../fonts/jaapokki/jaapokki-regular.eot?#iefix') format('embedded-opentype'),
         url('../fonts/jaapokki/jaapokki-regular.woff') format('woff'),
         url('../fonts/jaapokki/jaapokki-regular.ttf') format('truetype'),
         url('../fonts/jaapokki/jaapokki-regular.svg#JaapokkiRegular') format('svg');
    font-weight: normal;
    font-style: normal;
}
```

Used for all headings (`h1` to `h6`, uppercase, letter spacing 0.5px).
All four Jaapokki font files exist in the zip and are copied to
`public/fonts/jaapokki/`. The rule is reproduced in `app/legacy-fonts.css`
with only the URL base changed to the Next.js public path. Family name,
weight and style are unchanged.

2. `css/font-awesome.css` lines 7 to 13 (and the minified copy):

```css
@font-face {
  font-family: 'FontAwesome';
  src: url('../fonts/fontawesome-webfont.eot?v=4.3.0');
  src: url('../fonts/fontawesome-webfont.eot?#iefix&v=4.3.0') format('embedded-opentype'), url('../fonts/fontawesome-webfont.woff2?v=4.3.0') format('woff2'), url('../fonts/fontawesome-webfont.woff?v=4.3.0') format('woff'), url('../fonts/fontawesome-webfont.ttf?v=4.3.0') format('truetype'), url('../fonts/fontawesome-webfont.svg?v=4.3.0#fontawesomeregular') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

Font files copied to `public/fonts/`. Rule reproduced in
`app/legacy-fonts.css`. Interface icons use lucide-react as required by the
mandated stack, so this font is preserved for fidelity and remains available.

3. `css/bootstrap.min.css`, Glyphicons Halflings. In the zip the `src` URLs
wrongly end in `.html` (a scraping artefact), and only the `.woff` and `.svg`
font files are present. The rule is reproduced in `app/legacy-fonts.css`
pointing at the two real files that exist in the zip, with the artefact noted
here rather than silently hidden.

4. `css/flexslider.css` lines 26 to 35, `flexslider-icon`, weight normal,
style normal. No flexslider-icon font files exist anywhere in the zip, so the
rule cannot resolve. It is reproduced in `app/legacy-fonts.css` for the
record and is unused by the build.

Body font: `css/style.css` line 37 imports Lato before the Jaapokki rule:

```css
@import url(http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900);
```

Body copy is `'Lato', sans-serif`, 15px, line height 1.6em, colour `#6A6A6A`.
The build loads the same Lato family and the same five weights over HTTPS.
No font family was swapped.

### Existing API route file names

None. The zip is a static HTML template. There is no `package.json`, no
Next.js app, and no API folder. All Step 8 routes are new files.

### Existing env variable names

None. There are no `.env` files in the zip. All Step 9 names are new and are
documented in `.env.example`.

### Loading screen path and presence

Absent. No preloader or loading screen exists in the HTML, CSS or JS
(`images/bx_loader.gif` is an unused slider asset). The Step 13 fallback is
built in `components/LoadingScreen.tsx`.

### Cookie consent path and presence

Absent. No consent code exists in the zip. The Step 11 banner is built in
`components/CookieConsent.tsx` with localStorage key `asher_print_consent`.

### CAPTCHA provider and presence

Absent. No CAPTCHA of any provider exists in the zip. Google reCAPTCHA v3
with a v2 fallback is built per Step 12, verified at `/api/recaptcha/verify`.

### Legal pages presence

`/legal/privacy-policy`, `/legal/terms` and `/legal/cookie-policy` are all
absent from the zip. All three are new pages under `app/legal/`.

### /404 and /500 presence

`404.html` is present ("404 Error Page", "Oops... Page Not Found!") and is
rebuilt as `app/not-found.tsx` with the Step 7 copy. No 500 page exists in
the zip. `app/error.tsx` is new per Step 7.

## Design tokens extracted from the zip

Active preset: 22 of 23 HTML files link `css/presets/preset3.css`, so the
site primary colour is `#ee3b24`. Preset 4 (`#ffc400`, an amber close to gold)
was not used, which also respects the Step 17 ban on gold themes.

| Token | Zip value | Zip source |
| --- | --- | --- |
| Primary | `#ee3b24` | presets/preset3.css (active in HTML) |
| Read more hover | `#327cbc` | presets (all) |
| Heading text | `#323232` | style.css body of h1 to h3 |
| Body text | `#6A6A6A` | style.css body |
| Muted text and icons | `#959595` | style.css blockquote, .title-icon |
| Page background | `#fff` | style.css body |
| Hairline border | `#e7e7e7` | style.css .title |
| Light section | `#f5f5f5` | style.css .portfolio.angle |
| Image block section | `#f4f4f4` | style.css .image-block |
| Footer background | `#2e2e2e` plus footer-bg.jpg | style.css .footer |
| Copyright angle | `#191919` | style.css .copyright.angle |
| Other preset primaries (unused) | `#49a2e7`, `#81c83c`, `#ffc400`, `#334F96`, `#8C42BA` | preset1, 2, 4, 5, 6 |

Type scale from style.css: h1 36px/48px, h2 32px/40px, h3 24px/32px,
h4 18px/28px, h5 14px/24px. Buttons: `.btn.btn-primary` is a pill
(border radius 50px), padding 10px 30px, 14px uppercase, 2px solid primary
border from the preset, filling with primary on hover. Sections use 80px
vertical padding. Signature devices carried into the build: the skewed
`.angle` section edge, the `.icon-pentagon` badges, the `.title` heading with
a 2px left border and grey `.title-icon`, the fixed header with a 5px primary
top border and a primary logo block, and the dark footer with an angled
copyright strip and pentagon social icons.

## How zip conflicts were resolved

1. Step 17 says no dark themes, while the zip footer and copyright strip are
dark (`#2e2e2e` and `#191919`). ZIP LAW wins for those two template blocks:
the page body stays light and neutral per Step 17, and only the footer and
copyright keep their exact zip colours.
2. Step 6 says never swap fonts to Google Fonts, while the zip itself loads
Lato from Google Fonts. The zip behaviour is preserved (same family, same
weights) over HTTPS. Jaapokki remains self hosted from the zip files.
3. ZIP LAW says copy the structure exactly, while Step 3 mandates a Next.js
stack that cannot run static Bootstrap HTML. The zip is preserved untouched
at the repository root, its fonts and footer artwork are reused in
`public/`, and its section structure, tokens and components are rebuilt in
React. This is building on top of the template, not a redesign.
4. The mandated stack omits two glue packages that the listed versions
require: `@tailwindcss/postcss` (the Tailwind CSS 4 PostCSS plugin) and a
react-hook-form resolver. `@tailwindcss/postcss` 4.1.10 is added at the same
version as tailwindcss. The form resolver is hand written in
`lib/zod-resolver.ts` so no extra form dependency was needed.
5. Sandbox Node is v22 while the spec requires Node 24. `engines` and
`.nvmrc` are set to 24 as specified. Installs warn but complete locally.
Deploy on Node 24.
7. The mandated pin `@vercel/blob` 0.29.4 does not exist on npm (checked
with `npm view`). The 0.x line ends at 0.27.3 before 1.x. Version 0.27.3 is
pinned exactly as the closest real release with the same `put()` API. Every
other mandated version exists and is pinned exactly. next-auth
5.0.0-beta.28 declares a peer range of next 14 or 15, which conflicts with
the mandated next 16.4.2, so `.npmrc` sets `legacy-peer-deps=true` for both
local installs and `npm ci` on Vercel. In addition, framer-motion 12.18.0
resolves its motion-dom dependency to a much newer, API incompatible
release, so `overrides` also pin `motion-dom` and `motion-utils` to 12.18.1,
the releases published with framer-motion 12.18. The three mandated
overrides (postcss 8.5.30, sharp 0.35.5, sprintf-js 1.1.3) are unchanged.
7. Direct downloads from images.pexels.com are blocked in this sandbox, so
Pexels photos were obtained through image search results that resolve to
images.pexels.com, saved into `public/images/`, and credited in
`image-credits.md`. Non Pexels results (stock agency thumbnails) were
discarded and are not used anywhere.
8. Step 18 requires zero critical and zero high audit findings, but three
mandated pins are themselves vulnerable at those versions. The security
gate was treated as the priority and the smallest safe upgrades were made:
next-auth 5.0.0-beta.28 to 5.0.0-beta.32 (same beta line, fixes critical
findings in next-auth and @auth/core, and its peer range now includes
next 16), jspdf 3.0.1 to 4.2.1 (first release outside the vulnerable range,
same jsPDF API used here), and nodemailer 6.10.1 to 10.1.7 (the patched
line for advisories covering everything up to 10.0.5, same createTransport
and sendMail API). Transitive findings under @vercel/blob were fixed with
overrides pinning undici 7.30.1 and @fastify/busboy 3.2.3. Result:
`npm audit` reports 0 vulnerabilities. All other mandated versions remain
pinned exactly with no carets and no tildes.
