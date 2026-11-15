# Goloka Design Studio — Asset Inventory

This file lists every third-party asset used in the site, its license, and where it appears.

---

## Images Used

All images are from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license).
Attribution is recommended but not required by the license.

### Hero Section

| URL | Used in |
|-----|---------|
| `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0` | Hero section — full-bleed background |
| `https://images.unsplash.com/photo-1600585154340-be6161a56a0c` | Hero section — Google Sheets `hero_image_url` setting (sample data fallback) |

### Services Section

| URL | Description | Used in |
|-----|-------------|---------|
| `https://images.unsplash.com/photo-1555041469-a586c61ea9bc` | Complete Home Interiors | Services card |
| `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136` | Modular Kitchens | Services card |
| `https://images.unsplash.com/photo-1540518614846-7eded433c457` | Bedrooms & Wardrobes | Services card |
| `https://images.unsplash.com/photo-1565182999561-18d7dc61c393` | Living & Dining Spaces | Services card |
| `https://images.unsplash.com/photo-1593079831268-3381b0db4a77` | TV Units & Storage | Services card |
| `https://images.unsplash.com/photo-1585821569331-6a7a0c72e1f8` | Pooja Units | Services card |
| `https://images.unsplash.com/photo-1565538810643-b5bdb714032a` | Lighting & False Ceilings | Services card |

### Projects Section (fallback / sample data)

| URL | Description | Used in |
|-----|-------------|---------|
| `https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea` | Living Room project cover | Projects grid |
| `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136` | Kitchen project cover | Projects grid |
| `https://images.unsplash.com/photo-1560448204-603b3fc33ddc` | Master Bedroom project cover | Projects grid |
| `https://images.unsplash.com/photo-1586023492125-27b2c045efd7` | Living Space project cover | Projects grid |
| `https://images.unsplash.com/photo-1617806118233-18e1de247200` | Dining Area project cover | Projects grid |
| `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af` | Bedroom project cover | Projects grid |
| `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6` | Sample project — cover (large) | Projects lightbox |
| `https://images.unsplash.com/photo-1616594039964-ae9021a400a0` | Sample project — gallery image | Projects lightbox |
| `https://images.unsplash.com/photo-1615873968403-89e068629265` | Sample project — gallery image | Projects lightbox |
| `https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e` | Sample project — gallery image | Projects lightbox |
| `https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89` | Sample project — gallery image | Projects lightbox |
| `https://images.unsplash.com/photo-1558618666-fcd25c85cd64` | Sample project — gallery image | Projects lightbox |

### Design Inspiration Section

| URL | Style Name | Used in |
|-----|------------|---------|
| `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6` | Warm Contemporary | Inspiration card |
| `https://images.unsplash.com/photo-1620332372374-f108c53d2e03` | Modern Indian | Inspiration card |
| `https://images.unsplash.com/photo-1600585154526-990dced4db0d` | Minimal Luxury | Inspiration card |
| `https://images.unsplash.com/photo-1596436889106-be35e843f974` | Earthy & Natural | Inspiration card |

### Materials Section

| URL | Material Name | Used in |
|-----|---------------|---------|
| `https://images.unsplash.com/photo-1558618666-fcd25c85cd64` | Solid Wood | Materials carousel |
| `https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261` | Natural Stone | Materials carousel |
| `https://images.unsplash.com/photo-1587467512961-120760940315` | Solid Brass | Materials carousel |
| `https://images.unsplash.com/photo-1558769132-cb1aea458c5e` | Performance Fabric | Materials carousel |

### Social Section (YouTube thumbnails, sample data)

| URL | Used in |
|-----|---------|
| `https://images.unsplash.com/photo-1555041469-a586c67fb0` | YouTube video thumbnail placeholders (3 cards) |

---

## Fonts

Both fonts are served by [Google Fonts](https://fonts.google.com) under the [SIL Open Font License (OFL)](https://scripts.sil.org/OFL).

| Font | Weight(s) Used | Role |
|------|----------------|------|
| Cormorant Garamond | 300, 400, 500, 600, 700 | Display headings, decorative text |
| Inter | 300, 400, 500, 600, 700 | Body copy, UI labels, navigation |

---

## Icons

| Library | License | Used for |
|---------|---------|---------|
| [Lucide React](https://lucide.dev) | [MIT](https://github.com/lucide-icons/lucide/blob/main/LICENSE) | All UI icons (arrows, social icons, form icons, etc.) |

---

## Replacing Images

To swap any placeholder image with real project photography:

1. Upload your image to a hosting service. Good options:
   - [Cloudflare Images](https://www.cloudflare.com/developer-platform/cloudflare-images/) (paid, purpose-built CDN)
   - [Imgix](https://imgix.com) (paid, with image transforms)
   - Any public CDN or cloud storage bucket (AWS S3, Google Cloud Storage, etc.)
2. Copy the public URL of the uploaded image.
3. Open your Google Spreadsheet and go to the relevant tab:
   - Project photos: **Projects** tab, `cover_image_url` and `gallery_image_urls` columns
   - Service images: **Services** tab, `image_url` column (if you have overridden defaults via the sheet)
   - Hero background: **Settings** tab, `hero_image_url` row
4. Paste the new URL into the cell.
5. The website picks up the change within 5 minutes (content cache TTL).

> Images hardcoded in the React components (Services, Materials, Design Inspiration) must be updated in the source code directly — edit the `image_url` / `src` values in the relevant component file under `src/components/`.
