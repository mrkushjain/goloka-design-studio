# Goloka Design Studio — Setup & Deployment Guide

This guide walks you through setting up the site from scratch. No prior coding experience is needed for most steps.

---

## 1. Google Sheets Setup

Your content (testimonials, projects, FAQs, settings) lives in a Google Spreadsheet. The website fetches data from it in real time.

**Steps:**

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Give it a name you'll remember, e.g. "Goloka Design Studio Content".
3. Open **Extensions > Apps Script** in the spreadsheet menu.
4. Paste the contents of `apps-script/Code.gs` into the editor (replace the default `function myFunction()` stub).
5. Add a second script file: click the **+** next to "Files", name it `sample-data`, and paste the contents of `apps-script/sample-data.gs`.
6. Save both files (Ctrl+S / Cmd+S).
7. In the editor, select `setupSheets` from the function dropdown at the top and click **Run**. This creates all the required tabs (Settings, Testimonials, Projects, Services, FAQs).
8. Then select `populateSampleData` and click **Run**. This fills the tabs with realistic sample content so you can see the site working immediately.
9. Grant the requested permissions when prompted (the script needs access only to this spreadsheet).
10. Keep the spreadsheet **private** — do not publish it or share it publicly. Access is controlled via the shared secret you set in the next step.

---

## 2. Google Apps Script Deployment

The Apps Script acts as a secure API between the spreadsheet and your website.

**Steps:**

1. Still in the Apps Script editor, click **Project Settings** (the gear icon in the left sidebar).
2. Scroll down to **Script Properties** and click **Add script property**.
3. Add the following property:
   - Property name: `SHARED_SECRET`
   - Value: a long random string you make up (e.g. `goloka-s3cr3t-2024-xyz`). **Copy this value — you will need it for your `.env.local` file.**
4. Click **Save script properties**.
5. Back in the editor, click **Deploy > New deployment**.
6. Click the gear icon next to "Select type" and choose **Web app**.
7. Set the following:
   - Description: `Goloka Content API v1` (or any label)
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy** and copy the **Web app URL** that appears. It looks like:
   `https://script.google.com/macros/s/AKfyc.../exec`
9. This URL is your `APPS_SCRIPT_URL`. Paste it into `.env.local` (see step 4 below). The URL itself acts as a secret — do not post it publicly.

> **Note:** Every time you edit `Code.gs`, you must create a **new deployment** (not edit the existing one) for changes to take effect on the live site.

---

## 3. Cloudflare Turnstile Setup

Turnstile protects the enquiry form from spam bots without annoying your visitors with CAPTCHAs.

**Steps:**

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in (create a free account if you don't have one).
2. In the left sidebar, navigate to **Turnstile**.
3. Click **Add site**.
4. Fill in:
   - Site name: `Goloka Design Studio` (any label)
   - Domain: your production domain, e.g. `goloka.in` — add `localhost` as well for local testing
   - Widget type: **Managed** (recommended) or **Invisible**
5. Click **Create**.
6. Copy the **Site Key** — this goes into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `.env.local`.
7. Copy the **Secret Key** — this goes into `TURNSTILE_SECRET_KEY` in `.env.local`.

---

## 4. Environment Variables

The site uses a `.env.local` file for secrets. This file is never committed to git.

**Steps:**

1. In the project root, copy the example file:
   ```
   cp .env.example .env.local
   ```
2. Open `.env.local` in a text editor and fill in all values:

   ```
   # Apps Script
   APPS_SCRIPT_URL=<paste your Web App URL from step 2>
   APPS_SCRIPT_SECRET=<paste your SHARED_SECRET from step 2>

   # Cloudflare Turnstile
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=<paste Site Key from step 3>
   TURNSTILE_SECRET_KEY=<paste Secret Key from step 3>
   ```

3. Save the file. Never share it or commit it to a public repository.

---

## 5. Local Development

**Prerequisites:** Node.js 18 or later installed on your computer.

```bash
# Install dependencies (only needed once, or after pulling changes)
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The site reloads automatically when you save files.

---

## 6. Production Deployment (Vercel recommended)

Vercel is the easiest way to deploy a Next.js site and has a free tier.

**Steps:**

1. Push your code to a GitHub repository (keep `.env.local` out of it — it's in `.gitignore`).
2. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
3. Click **Add New > Project** and import your repository.
4. Before clicking Deploy, expand **Environment Variables** and add all four variables from your `.env.local`:
   - `APPS_SCRIPT_URL`
   - `APPS_SCRIPT_SECRET`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`
5. Click **Deploy**. Vercel builds and publishes the site in a few minutes.
6. Add your custom domain in the Vercel project settings under **Domains**.
7. Go back to Cloudflare Turnstile and add your production domain to the site's allowed domains list (if you only added `localhost` earlier).

---

## 7. Content Management (via Google Sheets)

All content is managed directly in your Google Spreadsheet. Changes appear on the site within a few minutes (content is cached for 5 minutes).

### Adding or editing testimonials
- Open the **Testimonials** tab.
- Each row is one testimonial.
- Set `approved` to `TRUE` to show it on the site, `FALSE` to hide it.
- Set `is_demo` to `FALSE` for real client testimonials. Demo rows are shown with a "SAMPLE" label in preview; they are hidden in production.

### Adding or editing projects
- Open the **Projects** tab.
- Each row is one project.
- `cover_image_url` is the main thumbnail. `gallery_image_urls` is a comma-separated list of additional images for the lightbox.
- Set `is_featured` to `TRUE` to highlight a project.

### Changing social links
- Open the **Settings** tab.
- Find the rows with keys `instagram_url` and `youtube_url` and update the values.

### Updating contact information
- Open the **Settings** tab.
- Update the values for `contact_phone`, `contact_email`, and `studio_address`.

### Adding or editing FAQs
- Open the **FAQs** tab.
- Each row is one question. The `sort_order` column controls the display order (lower numbers appear first).

---

## 8. Launch Checklist

Before going live, work through this list:

- [ ] Real contact phone and email entered in the **Settings** sheet
- [ ] Real Instagram and YouTube URLs entered in the **Settings** sheet
- [ ] Demo/sample testimonials hidden: set `is_demo = FALSE` and `approved = FALSE` on any rows you don't want visible, or delete them
- [ ] Real project photos added: upload images to a CDN and update `cover_image_url` and `gallery_image_urls` in the **Projects** tab
- [ ] Cloudflare Turnstile configured for the production domain
- [ ] Enquiry form tested end-to-end: submit a test enquiry and verify delivery
- [ ] Site checked on a mobile device
- [ ] Privacy page "Last updated" date updated to match your actual launch date

---

## Preview vs Production Behaviour

| Feature | Preview (local / staging) | Production |
|---------|--------------------------|------------|
| Sample testimonials | Shown with a "SAMPLE" label | Hidden (only `approved = TRUE`, `is_demo = FALSE` rows show) |
| Stock photos | Shown with an "ILLUSTRATIVE" label | Controlled by the `image_kind` field — set to `real` to remove the label |
| Content cache | 5 minutes | 5 minutes |
