/**
 * Goloka Design Studio — Sample Data Seeder
 *
 * Run populateSampleData() once from the Apps Script editor after deploying
 * the web app and running setupSheets().  It is safe to re-run: existing rows
 * are cleared and replaced so you always get a clean, predictable dataset.
 *
 * Usage:
 *   1. Open the spreadsheet → Extensions → Apps Script
 *   2. Select populateSampleData from the function drop-down
 *   3. Click Run
 */

function populateSampleData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  _seedSettings(ss);
  _seedTestimonials(ss);
  _seedProjects(ss);
  _seedServices(ss);
  _seedFaqs(ss);

  SpreadsheetApp.getUi().alert("Sample data loaded successfully!");
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

function _seedSettings(ss) {
  var sheet = ss.getSheetByName("Settings");
  if (!sheet) throw new Error("Settings sheet missing — run setupSheets first.");

  // Clear data rows only (keep header)
  _clearDataRows(sheet);

  var rows = [
    ["company_name",    "Goloka Design Studio"],
    ["founder_name",    "Priya Sharma"],
    ["hero_headline",   "Transform Your Home Into a Dream Space"],
    ["hero_subtitle",   "Award-winning interior design for homes across India — crafted with soul, delivered with precision."],
    ["hero_image_url",  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"],
    ["contact_phone",   "+91 98765 43210"],
    ["contact_email",   "hello@golokadesign.in"],
    ["whatsapp_number", "919876543210"],
    ["instagram_url",   "https://www.instagram.com/golokadesign"],
    ["youtube_url",     "https://www.youtube.com/@golokadesign"],
    ["service_cities",  "Bengaluru, Hyderabad, Chennai, Pune, Mumbai"],
    ["footer_text",     "© 2025 Goloka Design Studio. Crafting beautiful spaces since 2018."],
    ["environment",     "dev"]
  ];

  sheet.getRange(2, 1, rows.length, 2).setValues(rows);
  Logger.log("Settings: seeded " + rows.length + " rows.");
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

function _seedTestimonials(ss) {
  var sheet = ss.getSheetByName("Testimonials");
  if (!sheet) throw new Error("Testimonials sheet missing — run setupSheets first.");

  _clearDataRows(sheet);

  // Columns: id, name, community, quote, rating, photo_url, approved, is_demo, sort_order
  var rows = [
    [
      "t001",
      "Anjali Mehta",
      "Whitefield, Bengaluru",
      "Goloka turned our 2BHK into a magazine-worthy home. Every detail was thought through — from the lighting to the last cushion. Highly recommend!",
      5,
      "https://randomuser.me/api/portraits/women/44.jpg",
      "TRUE", "TRUE", 1
    ],
    [
      "t002",
      "Rahul & Deepa Nair",
      "Banjara Hills, Hyderabad",
      "We trusted Priya with a full-home renovation and she delivered beyond expectations — on time and within budget. Our guests always ask who designed our home.",
      5,
      "https://randomuser.me/api/portraits/men/32.jpg",
      "TRUE", "TRUE", 2
    ],
    [
      "t003",
      "Sunita Joshi",
      "Koregaon Park, Pune",
      "The team understood our vision instantly. The modular kitchen and master bedroom are absolutely stunning. Worth every rupee.",
      5,
      "https://randomuser.me/api/portraits/women/68.jpg",
      "TRUE", "TRUE", 3
    ]
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  Logger.log("Testimonials: seeded " + rows.length + " rows.");
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

function _seedProjects(ss) {
  var sheet = ss.getSheetByName("Projects");
  if (!sheet) throw new Error("Projects sheet missing — run setupSheets first.");

  _clearDataRows(sheet);

  // Columns: id, title, community, category, description,
  //          cover_image_url, gallery_image_urls, image_kind, published, sort_order
  var rows = [
    [
      "p001",
      "Modern Zen — 3BHK Complete Renovation",
      "Whitefield, Bengaluru",
      "Full Home",
      "A complete 1,800 sq ft transformation blending Japanese minimalism with warm Indian textures. Engineered wood flooring, integrated storage, and custom joinery throughout.",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80,https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80",
      "interior",
      "TRUE",
      1
    ],
    [
      "p002",
      "Earthy Luxe — Villa Living Room",
      "Banjara Hills, Hyderabad",
      "Living Room",
      "An expansive villa living room anchored by a hand-crafted Rajasthani stone fireplace. Earthy terracotta palette, organic fabrics, and curated art pieces.",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80,https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "interior",
      "TRUE",
      2
    ]
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  Logger.log("Projects: seeded " + rows.length + " rows.");
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

function _seedServices(ss) {
  var sheet = ss.getSheetByName("Services");
  if (!sheet) throw new Error("Services sheet missing — run setupSheets first.");

  _clearDataRows(sheet);

  // Columns: id, title, description, image_url, published, sort_order
  var rows = [
    [
      "s001",
      "Full Home Design",
      "End-to-end interior design for your entire home — from concept and mood boards to execution and styling. We manage everything so you don't have to.",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "TRUE", 1
    ],
    [
      "s002",
      "Modular Kitchen",
      "Custom modular kitchens built for Indian cooking — robust shutters, smart storage, and finishes that last. Available in acrylic, membrane, and PU options.",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "TRUE", 2
    ],
    [
      "s003",
      "Master Bedroom Design",
      "Your bedroom, your sanctuary. We design bespoke wardrobe systems, headboards, and lighting that make every night feel like a hotel stay.",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
      "TRUE", 3
    ],
    [
      "s004",
      "Living & Dining Spaces",
      "Statement-making living and dining rooms that work for family evenings, festive gatherings, and everything in between. Furniture, lighting, and accessories curated together.",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "TRUE", 4
    ],
    [
      "s005",
      "False Ceiling & Lighting",
      "Transform the character of any room with architectural false ceilings and layered lighting design — from ambient to task to accent.",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
      "TRUE", 5
    ],
    [
      "s006",
      "Home Office Design",
      "Productive, ergonomic, and beautiful — work-from-home spaces designed for focus and creativity with smart cable management and bespoke storage.",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
      "TRUE", 6
    ],
    [
      "s007",
      "3D Visualisation & Consultation",
      "Not sure where to start? Our 90-minute design consultation with photorealistic 3D renders gives you a clear picture before you commit to anything.",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "TRUE", 7
    ]
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  Logger.log("Services: seeded " + rows.length + " rows.");
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

function _seedFaqs(ss) {
  var sheet = ss.getSheetByName("FAQs");
  if (!sheet) throw new Error("FAQs sheet missing — run setupSheets first.");

  _clearDataRows(sheet);

  // Columns: id, question, answer, published, sort_order
  var rows = [
    [
      "f001",
      "How long does a full-home interior project take?",
      "A typical 2–3 BHK project takes 45–75 days from design sign-off to handover, depending on the scope, materials lead time, and site conditions. We share a detailed milestone timeline at the start of every project.",
      "TRUE", 1
    ],
    [
      "f002",
      "What is your pricing model?",
      "We offer transparent package pricing based on carpet area, scope, and finish level. A rough starting point is ₹1,200–₹1,800 per sq ft for a standard full-home fit-out. You'll receive a detailed BOQ (Bill of Quantities) before any commitment.",
      "TRUE", 2
    ],
    [
      "f003",
      "Do you work in cities outside Bengaluru?",
      "Yes! We actively serve Hyderabad, Chennai, Pune, and Mumbai. For other cities, please get in touch — we evaluate projects on a case-by-case basis.",
      "TRUE", 3
    ],
    [
      "f004",
      "Can I see my design in 3D before work begins?",
      "Absolutely. Every project includes photorealistic 3D renders so you can visualise the final look — including colours, materials, and furniture placement — before a single nail is hammered.",
      "TRUE", 4
    ],
    [
      "f005",
      "Do you handle civil work and false ceilings too, or only furniture?",
      "We handle the full scope: civil work, false ceilings, electrical layout, plumbing co-ordination, furniture, soft furnishings, and final styling. You have one point of contact for the entire project.",
      "TRUE", 5
    ],
    [
      "f006",
      "What warranty do you offer?",
      "We provide a 1-year comprehensive warranty on all our work, covering manufacturing defects and workmanship issues. Hardware and appliances carry the respective manufacturer warranties.",
      "TRUE", 6
    ]
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  Logger.log("FAQs: seeded " + rows.length + " rows.");
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/**
 * Deletes all rows below the header row in a sheet.
 * Uses deleteRows for efficiency when there is existing data.
 */
function _clearDataRows(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    sheet.deleteRows(2, lastRow - 1);
  }
}
