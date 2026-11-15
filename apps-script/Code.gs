/**
 * Goloka Design Studio — Google Apps Script Backend
 *
 * Deployed as a Web App (Execute as: Me, Who has access: Anyone).
 * All mutations are authenticated via SHARED_SECRET in Script Properties.
 *
 * Script Properties required:
 *   SHARED_SECRET  — shared with the Next.js front-end via env var
 */

// ---------------------------------------------------------------------------
// Sheet names and their ordered header columns
// ---------------------------------------------------------------------------

var SHEETS = {
  Settings: ["key", "value"],
  Leads: [
    "lead_id", "created_at", "name", "phone", "city",
    "consent", "source", "utm_source", "utm_medium", "utm_campaign", "status"
  ],
  Testimonials: [
    "id", "name", "community", "quote", "rating",
    "photo_url", "approved", "is_demo", "sort_order"
  ],
  Projects: [
    "id", "title", "community", "category", "description",
    "cover_image_url", "gallery_image_urls", "image_kind",
    "published", "sort_order"
  ],
  Services: [
    "id", "title", "description", "image_url", "published", "sort_order"
  ],
  FAQs: [
    "id", "question", "answer", "published", "sort_order"
  ]
};

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * Handles all POST requests to the web app URL.
 * Expected body (JSON):
 *   { secret: "...", action: "...", payload: {...} }
 */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    // --- Auth ---
    var secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (!secret || body.secret !== secret) {
      return jsonResponse({ ok: false, error: "Unauthorized" }, 401);
    }

    var action  = body.action;
    var payload = body.payload || {};

    // --- Route ---
    switch (action) {
      case "setupSheets":    return jsonResponse(setupSheets());
      case "getSettings":    return jsonResponse(getSettings());
      case "getTestimonials":return jsonResponse(getTestimonials());
      case "getProjects":    return jsonResponse(getProjects());
      case "getServices":    return jsonResponse(getServices());
      case "getFaqs":        return jsonResponse(getFaqs());
      case "saveLead":       return jsonResponse(saveLead(payload));
      default:
        return jsonResponse({ ok: false, error: "Unknown action: " + action }, 400);
    }
  } catch (err) {
    Logger.log("doPost error: " + err.message + "\n" + err.stack);
    return jsonResponse({ ok: false, error: "Internal server error: " + err.message }, 500);
  }
}

// ---------------------------------------------------------------------------
// Action: setupSheets
// ---------------------------------------------------------------------------

/**
 * Idempotent sheet initialiser.
 * Creates any missing sheet tabs and writes headers on row 1.
 * Never touches or erases existing data rows.
 */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var created = [];
  var existing = [];

  for (var sheetName in SHEETS) {
    var headers = SHEETS[sheetName];
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
           .setFontWeight("bold")
           .setBackground("#4a4a4a")
           .setFontColor("#ffffff");
      sheet.setFrozenRows(1);
      created.push(sheetName);
    } else {
      // Sheet already exists — only write headers if row 1 col 1 is blank
      var firstCell = sheet.getRange(1, 1).getValue();
      if (!firstCell) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length)
             .setFontWeight("bold")
             .setBackground("#4a4a4a")
             .setFontColor("#ffffff");
        sheet.setFrozenRows(1);
        created.push(sheetName + " (headers added)");
      } else {
        existing.push(sheetName);
      }
    }
  }

  return { ok: true, created: created, existing: existing };
}

// ---------------------------------------------------------------------------
// Action: getSettings
// ---------------------------------------------------------------------------

/**
 * Returns the Settings sheet as a plain key→value object.
 * Rows with an empty key are skipped.
 */
function getSettings() {
  var sheet = getSheet("Settings");
  var rows  = getDataRows(sheet);  // array of objects keyed by header
  var result = {};

  rows.forEach(function(row) {
    var k = String(row["key"] || "").trim();
    if (k) result[k] = row["value"];
  });

  return { ok: true, data: result };
}

// ---------------------------------------------------------------------------
// Action: getTestimonials
// ---------------------------------------------------------------------------

/**
 * Returns approved testimonials for the public site.
 *
 * In "dev" mode (settings key environment === "dev"), demo testimonials
 * are included; otherwise only non-demo rows are returned.
 *
 * Sorted ascending by sort_order.
 * Only safe public fields are exposed.
 */
function getTestimonials() {
  var settings = getSettings().data;
  var isDev    = (String(settings["environment"] || "")).toLowerCase() === "dev";

  var sheet = getSheet("Testimonials");
  var rows  = getDataRows(sheet);

  var allowed = ["id", "name", "community", "quote", "rating", "photo_url", "sort_order"];

  var filtered = rows.filter(function(r) {
    var approved = parseBool(r["approved"]);
    var isDemo   = parseBool(r["is_demo"]);
    if (!approved) return false;
    if (isDemo && !isDev) return false;
    return true;
  });

  filtered.sort(function(a, b) {
    return Number(a["sort_order"] || 0) - Number(b["sort_order"] || 0);
  });

  var data = filtered.map(function(r) { return pickFields(r, allowed); });
  return { ok: true, data: data };
}

// ---------------------------------------------------------------------------
// Action: getProjects
// ---------------------------------------------------------------------------

/**
 * Returns published projects sorted by sort_order.
 * Only public fields are exposed (no internal flags).
 */
function getProjects() {
  var sheet = getSheet("Projects");
  var rows  = getDataRows(sheet);

  var allowed = [
    "id", "title", "community", "category", "description",
    "cover_image_url", "gallery_image_urls", "image_kind", "sort_order"
  ];

  var published = rows.filter(function(r) { return parseBool(r["published"]); });

  published.sort(function(a, b) {
    return Number(a["sort_order"] || 0) - Number(b["sort_order"] || 0);
  });

  var data = published.map(function(r) { return pickFields(r, allowed); });
  return { ok: true, data: data };
}

// ---------------------------------------------------------------------------
// Action: getServices
// ---------------------------------------------------------------------------

/**
 * Returns published services sorted by sort_order.
 */
function getServices() {
  var sheet = getSheet("Services");
  var rows  = getDataRows(sheet);

  var allowed = ["id", "title", "description", "image_url", "sort_order"];

  var published = rows.filter(function(r) { return parseBool(r["published"]); });

  published.sort(function(a, b) {
    return Number(a["sort_order"] || 0) - Number(b["sort_order"] || 0);
  });

  var data = published.map(function(r) { return pickFields(r, allowed); });
  return { ok: true, data: data };
}

// ---------------------------------------------------------------------------
// Action: getFaqs
// ---------------------------------------------------------------------------

/**
 * Returns published FAQs sorted by sort_order.
 */
function getFaqs() {
  var sheet = getSheet("FAQs");
  var rows  = getDataRows(sheet);

  var allowed = ["id", "question", "answer", "sort_order"];

  var published = rows.filter(function(r) { return parseBool(r["published"]); });

  published.sort(function(a, b) {
    return Number(a["sort_order"] || 0) - Number(b["sort_order"] || 0);
  });

  var data = published.map(function(r) { return pickFields(r, allowed); });
  return { ok: true, data: data };
}

// ---------------------------------------------------------------------------
// Action: saveLead
// ---------------------------------------------------------------------------

/**
 * Saves a new lead row with:
 *   - LockService to serialise concurrent requests
 *   - Duplicate check on lead_id (skips insert if already present)
 *   - Field sanitisation to strip formula-injection characters
 *
 * Expected payload fields:
 *   lead_id, name, phone, city, consent, source,
 *   utm_source, utm_medium, utm_campaign
 *
 * Returns { ok: true, inserted: true|false }
 */
function saveLead(lead) {
  if (!lead || !lead.lead_id) {
    return { ok: false, error: "lead_id is required" };
  }

  var lock = LockService.getScriptLock();
  try {
    // Wait up to 10 seconds for the lock
    lock.waitLock(10000);
  } catch (e) {
    return { ok: false, error: "Could not acquire lock — try again" };
  }

  try {
    var sheet   = getSheet("Leads");
    var headers = SHEETS["Leads"];
    var rows    = getDataRows(sheet);

    // Duplicate check
    var alreadyExists = rows.some(function(r) {
      return String(r["lead_id"]) === String(lead.lead_id);
    });

    if (alreadyExists) {
      return { ok: true, inserted: false, reason: "duplicate" };
    }

    // Build the row in header order, sanitising every string field
    var now    = new Date().toISOString();
    var newRow = headers.map(function(col) {
      switch (col) {
        case "lead_id":    return sanitize(lead.lead_id);
        case "created_at": return now;
        case "name":       return sanitize(lead.name       || "");
        case "phone":      return sanitize(lead.phone      || "");
        case "city":       return sanitize(lead.city       || "");
        case "consent":    return lead.consent ? "TRUE" : "FALSE";
        case "source":     return sanitize(lead.source     || "");
        case "utm_source": return sanitize(lead.utm_source || "");
        case "utm_medium": return sanitize(lead.utm_medium || "");
        case "utm_campaign": return sanitize(lead.utm_campaign || "");
        case "status":     return "new";
        default:           return "";
      }
    });

    sheet.appendRow(newRow);
    return { ok: true, inserted: true };

  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns a sheet by name; throws a descriptive error if missing.
 */
function getSheet(name) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    throw new Error("Sheet '" + name + "' not found. Run setupSheets first.");
  }
  return sheet;
}

/**
 * Reads all data rows (skipping header row 1) from a sheet.
 * Returns an array of plain objects keyed by the header values in row 1.
 */
function getDataRows(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];  // only header or empty

  var lastCol  = sheet.getLastColumn();
  var headers  = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
  var values   = dataRange.getValues();

  return values.map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) {
      obj[String(h).trim()] = row[i];
    });
    return obj;
  });
}

/**
 * Builds a ContentService JSON response.
 * @param {Object} data     — the payload to serialise
 * @param {number} [status] — unused at runtime (Apps Script only supports 200),
 *                            kept for documentation purposes
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Returns only the keys in `fields` from object `obj`.
 */
function pickFields(obj, fields) {
  var result = {};
  fields.forEach(function(f) {
    if (obj.hasOwnProperty(f)) result[f] = obj[f];
  });
  return result;
}

/**
 * Coerces a cell value to a boolean.
 * Handles: true, "TRUE", "true", "1", 1 → true; everything else → false.
 */
function parseBool(val) {
  if (typeof val === "boolean") return val;
  if (typeof val === "number")  return val === 1;
  return String(val).toUpperCase() === "TRUE" || val === "1";
}

/**
 * Strips formula-injection prefixes (=, +, -, @, |) from a string value.
 * Returns the sanitised string, or the original value if it is not a string.
 */
function sanitize(val) {
  if (typeof val !== "string") return val;
  // Remove dangerous leading characters used in spreadsheet formula injection
  return val.replace(/^[=+\-@|]+/, "").trim();
}
