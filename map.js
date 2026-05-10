// ====================================================
//  PEAK14 CONSULTING — Training Map
//  Add/remove locations, renders SVG pins on the map
// ====================================================

// --- DEFAULT TRAINING LOCATIONS (edit these anytime) ---
const DEFAULT_LOCATIONS = [
  { id: 1, city: "Houston",      state: "TX", country: "US", date: "January 2026",  type: "HeavyBid",             notes: "" },
  { id: 2, city: "Atlanta",      state: "GA", country: "US", date: "February 2026", type: "HeavyJob",             notes: "" },
  { id: 3, city: "Phoenix",      state: "AZ", country: "US", date: "February 2026", type: "HeavyBid + HeavyJob",  notes: "" },
  { id: 4, city: "Chicago",      state: "IL", country: "US", date: "March 2026",    type: "HeavyBid",             notes: "2-day workshop" },
  { id: 5, city: "Calgary",      state: "AB", country: "CA", date: "April 2026",    type: "HeavyJob",             notes: "" },
  { id: 6, city: "Charlotte",    state: "NC", country: "US", date: "May 2026",      type: "HeavyBid",             notes: "" },
  { id: 7, city: "Denver",       state: "CO", country: "US", date: "June 2026",     type: "HeavyBid + HeavyJob",  notes: "3-day intensive" },
  { id: 8, city: "Toronto",      state: "ON", country: "CA", date: "July 2026",     type: "HeavyJob",             notes: "" },
];

// --- GEO COORDINATES (approx, mapped to SVG viewBox 0 0 960 600) ---
// US bounding box: lat 24-50, lon -125 to -66
// Canada: lat 43-70, lon -141 to -52

function geoToSVG(lat, lon) {
  // Map lat/lon to the SVG viewBox that fits US + Canada
  const lonMin = -141, lonMax = -52;
  const latMin = 24,   latMax = 72;

  const x = ((lon - lonMin) / (lonMax - lonMin)) * 900 + 30;
  const y = ((latMax - lat) / (latMax - latMin)) * 540 + 30;
  return { x, y };
}

// Approximate city centroids
const CITY_COORDS = {
  // US Cities
  "Houston,TX":      { lat: 29.76, lon: -95.37 },
  "Atlanta,GA":      { lat: 33.75, lon: -84.39 },
  "Phoenix,AZ":      { lat: 33.45, lon: -112.07 },
  "Chicago,IL":      { lat: 41.88, lon: -87.63 },
  "Charlotte,NC":    { lat: 35.23, lon: -80.84 },
  "Denver,CO":       { lat: 39.74, lon: -104.98 },
  "Dallas,TX":       { lat: 32.78, lon: -96.80 },
  "Nashville,TN":    { lat: 36.17, lon: -86.78 },
  "Las Vegas,NV":    { lat: 36.17, lon: -115.14 },
  "Portland,OR":     { lat: 45.52, lon: -122.68 },
  "Seattle,WA":      { lat: 47.61, lon: -122.33 },
  "Los Angeles,CA":  { lat: 34.05, lon: -118.24 },
  "San Francisco,CA":{ lat: 37.77, lon: -122.42 },
  "Minneapolis,MN":  { lat: 44.98, lon: -93.27 },
  "Kansas City,MO":  { lat: 39.10, lon: -94.58 },
  "Columbus,OH":     { lat: 39.96, lon: -82.99 },
  "Indianapolis,IN": { lat: 39.77, lon: -86.16 },
  "Memphis,TN":      { lat: 35.15, lon: -90.05 },
  "Louisville,KY":   { lat: 38.25, lon: -85.76 },
  "New Orleans,LA":  { lat: 29.95, lon: -90.07 },
  "Tampa,FL":        { lat: 27.95, lon: -82.46 },
  "Orlando,FL":      { lat: 28.54, lon: -81.38 },
  "Miami,FL":        { lat: 25.77, lon: -80.19 },
  "New York,NY":     { lat: 40.71, lon: -74.01 },
  "Boston,MA":       { lat: 42.36, lon: -71.06 },
  "Philadelphia,PA": { lat: 39.95, lon: -75.17 },
  "Pittsburgh,PA":   { lat: 40.44, lon: -79.99 },
  "Detroit,MI":      { lat: 42.33, lon: -83.05 },
  "Milwaukee,WI":    { lat: 43.04, lon: -87.91 },
  "St. Louis,MO":    { lat: 38.63, lon: -90.20 },
  "Salt Lake City,UT":{ lat: 40.76, lon: -111.89 },
  "Albuquerque,NM":  { lat: 35.08, lon: -106.65 },
  "Raleigh,NC":      { lat: 35.77, lon: -78.64 },
  "Richmond,VA":     { lat: 37.54, lon: -77.43 },
  "Baltimore,MD":    { lat: 39.30, lon: -76.61 },
  "Washington,DC":   { lat: 38.91, lon: -77.04 },
  "Jacksonville,FL": { lat: 30.33, lon: -81.66 },
  "San Antonio,TX":  { lat: 29.42, lon: -98.49 },
  "Austin,TX":       { lat: 30.27, lon: -97.74 },
  "El Paso,TX":      { lat: 31.76, lon: -106.49 },
  "Tucson,AZ":       { lat: 32.22, lon: -110.93 },
  "Omaha,NE":        { lat: 41.26, lon: -95.94 },
  "Wichita,KS":      { lat: 37.69, lon: -97.34 },
  "Tulsa,OK":        { lat: 36.15, lon: -95.99 },
  "Oklahoma City,OK":{ lat: 35.47, lon: -97.51 },
  "Little Rock,AR":  { lat: 34.75, lon: -92.29 },
  "Jackson,MS":      { lat: 32.30, lon: -90.18 },
  "Birmingham,AL":   { lat: 33.52, lon: -86.81 },
  "Anchorage,AK":    { lat: 61.22, lon: -149.90 },
  "Honolulu,HI":     { lat: 21.31, lon: -157.86 },
  "Spokane,WA":      { lat: 47.66, lon: -117.43 },
  "Boise,ID":        { lat: 43.62, lon: -116.20 },
  "Billings,MT":     { lat: 45.78, lon: -108.50 },
  "Fargo,ND":        { lat: 46.88, lon: -96.79 },
  "Sioux Falls,SD":  { lat: 43.55, lon: -96.73 },
  "Des Moines,IA":   { lat: 41.59, lon: -93.62 },
  "Madison,WI":      { lat: 43.07, lon: -89.40 },
  "Grand Rapids,MI": { lat: 42.96, lon: -85.66 },
  "Cleveland,OH":    { lat: 41.50, lon: -81.69 },
  "Cincinnati,OH":   { lat: 39.10, lon: -84.51 },
  "Lexington,KY":    { lat: 38.04, lon: -84.50 },
  "Knoxville,TN":    { lat: 35.96, lon: -83.92 },
  "Greensboro,NC":   { lat: 36.07, lon: -79.79 },
  "Virginia Beach,VA":{ lat: 36.85, lon: -75.98 },
  "Hartford,CT":     { lat: 41.76, lon: -72.68 },
  "Providence,RI":   { lat: 41.82, lon: -71.42 },
  "Portland,ME":     { lat: 43.66, lon: -70.26 },
  "Burlington,VT":   { lat: 44.48, lon: -73.21 },
  "Manchester,NH":   { lat: 42.99, lon: -71.46 },
  "Columbia,SC":     { lat: 34.00, lon: -81.03 },
  "Savannah,GA":     { lat: 32.08, lon: -81.10 },
  "Tallahassee,FL":  { lat: 30.44, lon: -84.28 },
  "Pensacola,FL":    { lat: 30.42, lon: -87.22 },
  "Mobile,AL":       { lat: 30.69, lon: -88.04 },
  "Baton Rouge,LA":  { lat: 30.45, lon: -91.19 },
  "Shreveport,LA":   { lat: 32.53, lon: -93.75 },
  "Corpus Christi,TX":{ lat: 27.80, lon: -97.40 },
  "Lubbock,TX":      { lat: 33.58, lon: -101.86 },
  "Amarillo,TX":     { lat: 35.22, lon: -101.83 },
  "Fort Worth,TX":   { lat: 32.75, lon: -97.33 },
  "Colorado Springs,CO":{ lat: 38.83, lon: -104.82 },
  "Pueblo,CO":       { lat: 38.25, lon: -104.61 },
  "Reno,NV":         { lat: 39.53, lon: -119.81 },
  "Sacramento,CA":   { lat: 38.58, lon: -121.49 },
  "San Diego,CA":    { lat: 32.72, lon: -117.16 },
  "Fresno,CA":       { lat: 36.74, lon: -119.77 },
  "Bakersfield,CA":  { lat: 35.37, lon: -119.02 },
  "Oakland,CA":      { lat: 37.80, lon: -122.27 },
  "Riverside,CA":    { lat: 33.98, lon: -117.37 },
  // Canada Cities
  "Calgary,AB":      { lat: 51.05, lon: -114.07 },
  "Toronto,ON":      { lat: 43.65, lon: -79.38 },
  "Vancouver,BC":    { lat: 49.25, lon: -123.12 },
  "Edmonton,AB":     { lat: 53.55, lon: -113.49 },
  "Ottawa,ON":       { lat: 45.42, lon: -75.70 },
  "Montreal,QC":     { lat: 45.50, lon: -73.57 },
  "Winnipeg,MB":     { lat: 49.90, lon: -97.14 },
  "Saskatoon,SK":    { lat: 52.13, lon: -106.67 },
  "Regina,SK":       { lat: 50.45, lon: -104.62 },
  "Halifax,NS":      { lat: 44.65, lon: -63.60 },
  "Victoria,BC":     { lat: 48.43, lon: -123.37 },
  "Kelowna,BC":      { lat: 49.89, lon: -119.50 },
  "Lethbridge,AB":   { lat: 49.70, lon: -112.84 },
  "Red Deer,AB":     { lat: 52.27, lon: -113.81 },
  "Kamloops,BC":     { lat: 50.67, lon: -120.33 },
  "Thunder Bay,ON":  { lat: 48.38, lon: -89.25 },
  "Sudbury,ON":      { lat: 46.49, lon: -80.99 },
  "London,ON":       { lat: 42.98, lon: -81.25 },
  "Hamilton,ON":     { lat: 43.25, lon: -79.87 },
  "Quebec City,QC":  { lat: 46.81, lon: -71.21 },
  "Fredericton,NB":  { lat: 45.96, lon: -66.64 },
  "Moncton,NB":      { lat: 46.09, lon: -64.78 },
};

function getCoords(city, state, country) {
  const key = `${city},${state}`;
  if (CITY_COORDS[key]) return geoToSVG(CITY_COORDS[key].lat, CITY_COORDS[key].lon);
  // fallback: center of US or Canada
  if (country === 'CA') return geoToSVG(55, -100);
  return geoToSVG(38, -96);
}

// --- STATE ---
let locations = JSON.parse(localStorage.getItem('peak14_locations') || 'null') || DEFAULT_LOCATIONS;
let nextId = Math.max(...locations.map(l => l.id), 0) + 1;

function save() {
  localStorage.setItem('peak14_locations', JSON.stringify(locations));
}

// --- RENDER MAP ---
function renderMap() {
  const svg = document.getElementById('training-map');
  if (!svg) return;

  // Remove old pins
  svg.querySelectorAll('.training-pin').forEach(el => el.remove());

  const tooltip = document.getElementById('map-tooltip');

  locations.forEach(loc => {
    const { x, y } = getCoords(loc.city, loc.state, loc.country);
    if (x < 0 || x > 960 || y < 0 || y > 600) return;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.classList.add('training-pin');
    g.style.cursor = 'pointer';

    // Pulse ring
    const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulse.setAttribute('cx', x);
    pulse.setAttribute('cy', y);
    pulse.setAttribute('r', 12);
    pulse.setAttribute('fill', 'rgba(255,103,0,0.15)');
    pulse.setAttribute('stroke', 'rgba(255,103,0,0.4)');
    pulse.setAttribute('stroke-width', '1');
    g.appendChild(pulse);

    // Main dot
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', 6);
    dot.setAttribute('fill', '#FF6700');
    dot.setAttribute('stroke', '#fff');
    dot.setAttribute('stroke-width', '1.5');
    g.appendChild(dot);

    // Tooltip on hover
    g.addEventListener('mouseenter', (e) => {
      tooltip.classList.remove('hidden');
      tooltip.innerHTML = `<strong>${loc.city}, ${loc.state}</strong>
        <span>${loc.date}</span>
        <span style="color:#FF6700;font-weight:600">${loc.type}</span>
        ${loc.notes ? `<span style="margin-top:4px;font-style:italic">${loc.notes}</span>` : ''}`;
    });
    g.addEventListener('mousemove', (e) => {
      const rect = document.getElementById('map-container').getBoundingClientRect();
      let lx = e.clientX - rect.left + 12;
      let ly = e.clientY - rect.top + 12;
      if (lx + 200 > rect.width) lx = lx - 220;
      tooltip.style.left = lx + 'px';
      tooltip.style.top = ly + 'px';
    });
    g.addEventListener('mouseleave', () => {
      tooltip.classList.add('hidden');
    });

    svg.appendChild(g);
  });

  const countEl = document.getElementById('location-count');
  if (countEl) countEl.textContent = locations.length;
}

// --- RENDER CARDS ---
function renderCards() {
  const container = document.getElementById('training-cards');
  if (!container) return;

  if (locations.length === 0) {
    container.innerHTML = '<p style="color:rgba(255,255,255,0.4);font-style:italic">No training locations added yet.</p>';
    return;
  }

  container.innerHTML = locations.map(loc => `
    <div class="training-card">
      <button class="training-card-delete" data-id="${loc.id}" title="Remove">✕</button>
      <div class="training-card-city">${loc.city}, ${loc.state}</div>
      <div class="training-card-meta">${loc.country === 'CA' ? '🇨🇦 Canada' : '🇺🇸 United States'} &bull; ${loc.date}</div>
      <div class="training-card-type">${loc.type}</div>
      ${loc.notes ? `<div style="margin-top:8px;font-size:0.8rem;color:rgba(255,255,255,0.4)">${loc.notes}</div>` : ''}
    </div>
  `).join('');

  container.querySelectorAll('.training-card-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      locations = locations.filter(l => l.id !== id);
      save();
      renderMap();
      renderCards();
    });
  });
}

// --- ADD FORM ---
function initAddForm() {
  const addBtn = document.getElementById('add-location-btn');
  const form = document.getElementById('add-form');
  const cancelBtn = document.getElementById('cancel-add-btn');
  const saveBtn = document.getElementById('save-location-btn');

  if (!addBtn) return;

  addBtn.addEventListener('click', () => {
    form.classList.toggle('hidden');
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  cancelBtn.addEventListener('click', () => {
    form.classList.add('hidden');
    clearForm();
  });

  saveBtn.addEventListener('click', () => {
    const city = document.getElementById('form-city').value.trim();
    const state = document.getElementById('form-state').value.trim().toUpperCase();
    const country = document.getElementById('form-country').value;
    const date = document.getElementById('form-date').value.trim();
    const type = document.getElementById('form-type').value;
    const notes = document.getElementById('form-notes').value.trim();

    if (!city || !state) {
      alert('Please enter at least a city and state/province.');
      return;
    }

    const loc = { id: nextId++, city, state, country, date: date || '2026', type, notes };
    locations.push(loc);
    save();
    renderMap();
    renderCards();
    form.classList.add('hidden');
    clearForm();

    // Scroll to map
    document.getElementById('map-container').scrollIntoView({ behavior: 'smooth' });
  });
}

function clearForm() {
  ['form-city', 'form-state', 'form-date', 'form-notes'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const country = document.getElementById('form-country');
  if (country) country.value = 'US';
  const type = document.getElementById('form-type');
  if (type) type.value = 'HeavyBid';
}

// --- DRAW MAP BACKGROUND ---
function drawMapBackground() {
  const svg = document.getElementById('training-map');
  if (!svg) return;

  // Simple US outline as a path (very simplified)
  // We use a background image approach via a rect + clipPath for appearance,
  // or just a clean styled background rectangle with state grid lines.

  // Draw a clean geographic-style background
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('x', '0'); bg.setAttribute('y', '0');
  bg.setAttribute('width', '960'); bg.setAttribute('height', '600');
  bg.setAttribute('fill', '#0A1628');
  svg.appendChild(bg);

  // Grid lines for atmosphere
  for (let lon = -135; lon <= -60; lon += 10) {
    const x1 = geoToSVG(24, lon).x;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', 30);
    line.setAttribute('x2', x1); line.setAttribute('y2', 570);
    line.setAttribute('stroke', 'rgba(255,103,0,0.06)');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  }
  for (let lat = 25; lat <= 70; lat += 10) {
    const y1 = geoToSVG(lat, -141).y;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 30); line.setAttribute('y1', y1);
    line.setAttribute('x2', 930); line.setAttribute('y2', y1);
    line.setAttribute('stroke', 'rgba(255,103,0,0.06)');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  }

  // USA outline (simplified polygon)
  const usaPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  const usaPoints = [
    // rough continental US bounding shape
    [49.0, -125], [49.0, -95], [49.0, -88], [47.5, -88],
    [46.5, -84], [43.0, -79], [44.0, -76], [45.0, -74],
    [47.5, -70], [45.0, -67], [44.5, -67], [44.0, -70],
    [42.5, -70], [41.5, -71], [40.6, -74], [38.9, -75],
    [38.4, -75], [37.0, -76], [35.0, -76], [34.0, -77],
    [32.5, -79], [30.5, -81], [29.9, -81], [25.7, -80],
    [24.8, -81], [25.8, -82], [27.5, -82], [28.5, -83],
    [30.0, -84], [29.5, -85], [30.2, -88], [28.9, -89],
    [29.3, -90], [29.2, -91], [29.7, -92], [29.9, -94],
    [29.3, -95], [26.5, -97], [25.9, -97], [25.9, -97],
    [26.5, -99], [28.0, -100], [29.8, -104], [31.8, -106],
    [32.0, -106], [32.5, -117], [32.5, -117], [34.0, -120],
    [37.0, -122], [38.5, -123], [40.5, -124], [42.0, -124],
    [46.5, -124], [48.5, -124], [49.0, -125],
  ].map(([lat, lon]) => {
    const {x, y} = geoToSVG(lat, lon);
    return `${x},${y}`;
  }).join(' ');

  usaPath.setAttribute('points', usaPoints);
  usaPath.setAttribute('fill', 'rgba(18,32,64,0.9)');
  usaPath.setAttribute('stroke', 'rgba(255,103,0,0.35)');
  usaPath.setAttribute('stroke-width', '1.5');
  svg.appendChild(usaPath);

  // Canada outline (simplified)
  const canadaPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  const canadaPoints = [
    [60.0, -141], [60.0, -130], [60.0, -125], [55.0, -130],
    [55.0, -125], [50.0, -127], [49.0, -125], [49.0, -95],
    [49.0, -88], [47.5, -88], [46.5, -84], [43.0, -79],
    [44.0, -76], [45.0, -74], [47.0, -71], [47.5, -70],
    [47.0, -66], [47.5, -53], [52.0, -55], [56.0, -61],
    [60.0, -64], [64.0, -66], [68.0, -70], [70.0, -75],
    [72.0, -80], [74.0, -90], [73.0, -95], [71.0, -97],
    [72.0, -110], [70.0, -120], [70.0, -130], [68.0, -135],
    [64.0, -141], [60.0, -141],
  ].map(([lat, lon]) => {
    const {x, y} = geoToSVG(lat, lon);
    return `${x},${y}`;
  }).join(' ');

  canadaPath.setAttribute('points', canadaPoints);
  canadaPath.setAttribute('fill', 'rgba(14,26,52,0.9)');
  canadaPath.setAttribute('stroke', 'rgba(255,103,0,0.25)');
  canadaPath.setAttribute('stroke-width', '1.5');
  svg.appendChild(canadaPath);

  // Country labels
  const usLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  const usPos = geoToSVG(38, -100);
  usLabel.setAttribute('x', usPos.x);
  usLabel.setAttribute('y', usPos.y);
  usLabel.setAttribute('text-anchor', 'middle');
  usLabel.setAttribute('fill', 'rgba(255,255,255,0.12)');
  usLabel.setAttribute('font-family', 'Barlow Condensed, sans-serif');
  usLabel.setAttribute('font-size', '22');
  usLabel.setAttribute('font-weight', '700');
  usLabel.setAttribute('letter-spacing', '6');
  usLabel.textContent = 'UNITED STATES';
  svg.appendChild(usLabel);

  const caLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  const caPos = geoToSVG(57, -100);
  caLabel.setAttribute('x', caPos.x);
  caLabel.setAttribute('y', caPos.y);
  caLabel.setAttribute('text-anchor', 'middle');
  caLabel.setAttribute('fill', 'rgba(255,255,255,0.12)');
  caLabel.setAttribute('font-family', 'Barlow Condensed, sans-serif');
  caLabel.setAttribute('font-size', '22');
  caLabel.setAttribute('font-weight', '700');
  caLabel.setAttribute('letter-spacing', '6');
  caLabel.textContent = 'CANADA';
  svg.appendChild(caLabel);
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  drawMapBackground();
  renderMap();
  renderCards();
  initAddForm();
});
