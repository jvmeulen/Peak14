// ====================================================
//  PEAK14 CONSULTING — Training Map
//  Edit DEFAULT_LOCATIONS to add/remove pin drops
// ====================================================

// --- TRAINING LOCATIONS ---
// To add a pin: add an entry to DEFAULT_LOCATIONS below.
// Use the CITY_COORDS table for supported cities, or add new ones.
// If a city isn't in CITY_COORDS, the pin will appear at the center of the US.

const DEFAULT_LOCATIONS = [
  { id: 1, city: "Houston",        state: "TX", country: "US", date: "January 2026",   type: "HeavyBid",            notes: "" },
  { id: 2, city: "Atlanta",        state: "GA", country: "US", date: "February 2026",  type: "HeavyJob",            notes: "" },
  { id: 3, city: "Phoenix",        state: "AZ", country: "US", date: "February 2026",  type: "HeavyBid + HeavyJob", notes: "" },
  { id: 4, city: "Chicago",        state: "IL", country: "US", date: "March 2026",     type: "HeavyBid",            notes: "2-day workshop" },
  { id: 5, city: "Calgary",        state: "AB", country: "CA", date: "April 2026",     type: "HeavyJob",            notes: "" },
  { id: 6, city: "Charlotte",      state: "NC", country: "US", date: "May 2026",       type: "HeavyBid",            notes: "" },
  { id: 7, city: "Denver",         state: "CO", country: "US", date: "June 2026",      type: "HeavyBid + HeavyJob", notes: "3-day intensive" },
  { id: 8, city: "Toronto",        state: "ON", country: "CA", date: "July 2026",      type: "HeavyJob",            notes: "" },
];

// --- COORDINATE MAPPING ---
// SVG viewBox is 960 x 600. Covers continental US + southern Canada.
const LON_MIN = -130, LON_MAX = -60;
const LAT_MIN = 22,   LAT_MAX = 56;
const SVG_W = 960, SVG_H = 600;
const PAD = 30;

function geoToSVG(lat, lon) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (SVG_W - PAD * 2) + PAD;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (SVG_H - PAD * 2) + PAD;
  return { x, y };
}

// --- CITY COORDINATES ---
const CITY_COORDS = {
  // US Cities
  "Houston,TX":         { lat: 29.76,  lon: -95.37 },
  "Atlanta,GA":         { lat: 33.75,  lon: -84.39 },
  "Phoenix,AZ":         { lat: 33.45,  lon: -112.07 },
  "Chicago,IL":         { lat: 41.88,  lon: -87.63 },
  "Charlotte,NC":       { lat: 35.23,  lon: -80.84 },
  "Denver,CO":          { lat: 39.74,  lon: -104.98 },
  "Dallas,TX":          { lat: 32.78,  lon: -96.80 },
  "Nashville,TN":       { lat: 36.17,  lon: -86.78 },
  "Las Vegas,NV":       { lat: 36.17,  lon: -115.14 },
  "Portland,OR":        { lat: 45.52,  lon: -122.68 },
  "Seattle,WA":         { lat: 47.61,  lon: -122.33 },
  "Los Angeles,CA":     { lat: 34.05,  lon: -118.24 },
  "San Francisco,CA":   { lat: 37.77,  lon: -122.42 },
  "Minneapolis,MN":     { lat: 44.98,  lon: -93.27 },
  "Kansas City,MO":     { lat: 39.10,  lon: -94.58 },
  "Columbus,OH":        { lat: 39.96,  lon: -82.99 },
  "Indianapolis,IN":    { lat: 39.77,  lon: -86.16 },
  "Memphis,TN":         { lat: 35.15,  lon: -90.05 },
  "Louisville,KY":      { lat: 38.25,  lon: -85.76 },
  "New Orleans,LA":     { lat: 29.95,  lon: -90.07 },
  "Tampa,FL":           { lat: 27.95,  lon: -82.46 },
  "Orlando,FL":         { lat: 28.54,  lon: -81.38 },
  "Miami,FL":           { lat: 25.77,  lon: -80.19 },
  "New York,NY":        { lat: 40.71,  lon: -74.01 },
  "Boston,MA":          { lat: 42.36,  lon: -71.06 },
  "Philadelphia,PA":    { lat: 39.95,  lon: -75.17 },
  "Pittsburgh,PA":      { lat: 40.44,  lon: -79.99 },
  "Detroit,MI":         { lat: 42.33,  lon: -83.05 },
  "Milwaukee,WI":       { lat: 43.04,  lon: -87.91 },
  "St. Louis,MO":       { lat: 38.63,  lon: -90.20 },
  "Salt Lake City,UT":  { lat: 40.76,  lon: -111.89 },
  "Albuquerque,NM":     { lat: 35.08,  lon: -106.65 },
  "Raleigh,NC":         { lat: 35.77,  lon: -78.64 },
  "Richmond,VA":        { lat: 37.54,  lon: -77.43 },
  "Baltimore,MD":       { lat: 39.30,  lon: -76.61 },
  "Washington,DC":      { lat: 38.91,  lon: -77.04 },
  "Jacksonville,FL":    { lat: 30.33,  lon: -81.66 },
  "San Antonio,TX":     { lat: 29.42,  lon: -98.49 },
  "Austin,TX":          { lat: 30.27,  lon: -97.74 },
  "El Paso,TX":         { lat: 31.76,  lon: -106.49 },
  "Tucson,AZ":          { lat: 32.22,  lon: -110.93 },
  "Omaha,NE":           { lat: 41.26,  lon: -95.94 },
  "Wichita,KS":         { lat: 37.69,  lon: -97.34 },
  "Tulsa,OK":           { lat: 36.15,  lon: -95.99 },
  "Oklahoma City,OK":   { lat: 35.47,  lon: -97.51 },
  "Little Rock,AR":     { lat: 34.75,  lon: -92.29 },
  "Jackson,MS":         { lat: 32.30,  lon: -90.18 },
  "Birmingham,AL":      { lat: 33.52,  lon: -86.81 },
  "Spokane,WA":         { lat: 47.66,  lon: -117.43 },
  "Boise,ID":           { lat: 43.62,  lon: -116.20 },
  "Billings,MT":        { lat: 45.78,  lon: -108.50 },
  "Fargo,ND":           { lat: 46.88,  lon: -96.79 },
  "Sioux Falls,SD":     { lat: 43.55,  lon: -96.73 },
  "Des Moines,IA":      { lat: 41.59,  lon: -93.62 },
  "Madison,WI":         { lat: 43.07,  lon: -89.40 },
  "Grand Rapids,MI":    { lat: 42.96,  lon: -85.66 },
  "Cleveland,OH":       { lat: 41.50,  lon: -81.69 },
  "Cincinnati,OH":      { lat: 39.10,  lon: -84.51 },
  "Lexington,KY":       { lat: 38.04,  lon: -84.50 },
  "Knoxville,TN":       { lat: 35.96,  lon: -83.92 },
  "Greensboro,NC":      { lat: 36.07,  lon: -79.79 },
  "Virginia Beach,VA":  { lat: 36.85,  lon: -75.98 },
  "Hartford,CT":        { lat: 41.76,  lon: -72.68 },
  "Providence,RI":      { lat: 41.82,  lon: -71.42 },
  "Portland,ME":        { lat: 43.66,  lon: -70.26 },
  "Burlington,VT":      { lat: 44.48,  lon: -73.21 },
  "Manchester,NH":      { lat: 42.99,  lon: -71.46 },
  "Columbia,SC":        { lat: 34.00,  lon: -81.03 },
  "Savannah,GA":        { lat: 32.08,  lon: -81.10 },
  "Tallahassee,FL":     { lat: 30.44,  lon: -84.28 },
  "Pensacola,FL":       { lat: 30.42,  lon: -87.22 },
  "Mobile,AL":          { lat: 30.69,  lon: -88.04 },
  "Baton Rouge,LA":     { lat: 30.45,  lon: -91.19 },
  "Shreveport,LA":      { lat: 32.53,  lon: -93.75 },
  "Corpus Christi,TX":  { lat: 27.80,  lon: -97.40 },
  "Lubbock,TX":         { lat: 33.58,  lon: -101.86 },
  "Amarillo,TX":        { lat: 35.22,  lon: -101.83 },
  "Fort Worth,TX":      { lat: 32.75,  lon: -97.33 },
  "Colorado Springs,CO":{ lat: 38.83,  lon: -104.82 },
  "Reno,NV":            { lat: 39.53,  lon: -119.81 },
  "Sacramento,CA":      { lat: 38.58,  lon: -121.49 },
  "San Diego,CA":       { lat: 32.72,  lon: -117.16 },
  "Fresno,CA":          { lat: 36.74,  lon: -119.77 },
  "Oakland,CA":         { lat: 37.80,  lon: -122.27 },
  // Canada Cities
  "Calgary,AB":         { lat: 51.05,  lon: -114.07 },
  "Toronto,ON":         { lat: 43.65,  lon: -79.38 },
  "Vancouver,BC":       { lat: 49.25,  lon: -123.12 },
  "Edmonton,AB":        { lat: 53.55,  lon: -113.49 },
  "Ottawa,ON":          { lat: 45.42,  lon: -75.70 },
  "Montreal,QC":        { lat: 45.50,  lon: -73.57 },
  "Winnipeg,MB":        { lat: 49.90,  lon: -97.14 },
  "Saskatoon,SK":       { lat: 52.13,  lon: -106.67 },
  "Regina,SK":          { lat: 50.45,  lon: -104.62 },
  "Halifax,NS":         { lat: 44.65,  lon: -63.60 },
  "London,ON":          { lat: 42.98,  lon: -81.25 },
  "Hamilton,ON":        { lat: 43.25,  lon: -79.87 },
  "Quebec City,QC":     { lat: 46.81,  lon: -71.21 },
};

function getCoords(city, state, country) {
  const key = `${city},${state}`;
  if (CITY_COORDS[key]) return geoToSVG(CITY_COORDS[key].lat, CITY_COORDS[key].lon);
  if (country === 'CA') return geoToSVG(50, -96);
  return geoToSVG(38, -96);
}

// --- STATE ---
let locations = JSON.parse(localStorage.getItem('peak14_locations') || 'null') || DEFAULT_LOCATIONS;
let nextId = Math.max(...locations.map(l => l.id), 0) + 1;

function save() {
  localStorage.setItem('peak14_locations', JSON.stringify(locations));
}

// --- DRAW MAP BACKGROUND WITH STATE BORDERS ---
function drawMapBackground() {
  const svg = document.getElementById('training-map');
  if (!svg) return;

  // Background
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('x', '0'); bg.setAttribute('y', '0');
  bg.setAttribute('width', SVG_W); bg.setAttribute('height', SVG_H);
  bg.setAttribute('fill', '#07111E');
  svg.appendChild(bg);

  // Ocean/water tint
  const ocean = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  ocean.setAttribute('x', '0'); ocean.setAttribute('y', '0');
  ocean.setAttribute('width', SVG_W); ocean.setAttribute('height', SVG_H);
  ocean.setAttribute('fill', 'rgba(10,30,60,0.4)');
  svg.appendChild(ocean);

  // Helper to draw a filled polygon from lat/lon points
  function addPoly(points, fill, stroke, sw) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const pts = points.map(([lat, lon]) => {
      const {x, y} = geoToSVG(lat, lon);
      return `${x},${y}`;
    }).join(' ');
    el.setAttribute('points', pts);
    el.setAttribute('fill', fill);
    el.setAttribute('stroke', stroke);
    el.setAttribute('stroke-width', sw || '0.8');
    svg.appendChild(el);
    return el;
  }

  // Helper to draw a polyline from lat/lon points
  function addLine(points, stroke, sw) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    const pts = points.map(([lat, lon]) => {
      const {x, y} = geoToSVG(lat, lon);
      return `${x},${y}`;
    }).join(' ');
    el.setAttribute('points', pts);
    el.setAttribute('fill', 'none');
    el.setAttribute('stroke', stroke);
    el.setAttribute('stroke-width', sw || '0.8');
    svg.appendChild(el);
  }

  const LAND = 'rgba(18,36,68,0.95)';
  const BORDER = 'rgba(255,103,0,0.45)';
  const STATE_BORDER = 'rgba(255,103,0,0.22)';
  const CANADA_LAND = 'rgba(12,26,52,0.85)';

  // --- CONTINENTAL US STATES (simplified polygons) ---
  // Each state is a polygon of approximate lat/lon vertices

  // WA
  addPoly([[49,−124],[49,−117],[46,−117],[46,−124],[46.3,−124.5],[47.5,−124.7],[48.4,−124.7]],LAND,BORDER,0.8);
  // OR
  addPoly([[46,−124],[46,−117],[42,−117],[42,−124.5]],LAND,BORDER,0.8);
  // CA
  addPoly([[42,−124.5],[42,−120],[39,−120],[38.1,−122.5],[37.8,−122.6],[36.8,−122],[35.7,−121.3],[34.4,−120.5],[34.0,−120.6],[33.0,−117.3],[32.5,−117.1],[32.5,−114.7],[34.9,−114.6],[37.5,−114.6],[38.7,−119.9],[39.3,−120],[42,−120]],LAND,BORDER,0.8);
  // NV
  addPoly([[42,−120],[42,−114],[37,−114],[36,−114.7],[35,−114.6],[35.2,−117],[36.5,−117.8],[37.8,−118.3],[39,−120]],LAND,BORDER,0.8);
  // ID
  addPoly([[49,−117],[49,−111],[44.5,−111],[42,−111],[42,−117],[46,−117]],LAND,BORDER,0.8);
  // MT
  addPoly([[49,−116],[49,−104],[45,−104],[44.5,−111],[45,−111],[45.9,−113.8],[45.5,−114.3],[46,−114.1],[47,−116.1],[49,−116]],LAND,BORDER,0.8);
  // WY
  addPoly([[45,−111],[45,−104],[41,−104],[41,−111]],LAND,BORDER,0.8);
  // CO
  addPoly([[41,−109],[41,−102],[37,−102],[37,−109]],LAND,BORDER,0.8);
  // UT
  addPoly([[42,−114],[42,−111],[37,−111],[37,−114]],LAND,BORDER,0.8);
  // AZ
  addPoly([[37,−114],[37,−109],[31.3,−109],[31.3,−111],[31.3,−114.8],[32.7,−114.7],[34.9,−114.6],[36,−114.7],[37,−114]],LAND,BORDER,0.8);
  // NM
  addPoly([[37,−109],[37,−103],[32,−103],[31.3,−106.5],[31.3,−109]],LAND,BORDER,0.8);
  // TX
  addPoly([[36.5,−103],[36.5,−100],[34.7,−100],[34,−99.2],[33.8,−99.2],[33.4,−99.4],[33.4,−98.1],[33.9,−98],[34.1,−97],[33.6,−96.7],[33.3,−96.4],[33.0,−96.3],[32.9,−94.0],[29.9,−94.0],[29.5,−94.7],[29.7,−95.1],[29.4,−95.5],[28.2,−97.1],[27.8,−97.4],[26.0,−97.2],[25.8,−97.5],[26.0,−99.0],[27.7,−99.5],[28.7,−100.2],[29.8,−101.3],[29.4,−103.2],[29.8,−104.6],[31.0,−106.2],[31.8,−106.5],[32,−103],[36.5,−103]],LAND,BORDER,0.8);
  // ND
  addPoly([[49,−104],[49,−97],[46,−97],[46,−104]],LAND,BORDER,0.8);
  // SD
  addPoly([[46,−104],[46,−97],[43,−97],[43,−104]],LAND,BORDER,0.8);
  // NE
  addPoly([[43,−104],[43,−97],[40,−97],[40,−95.3],[40.4,−95.3],[40.6,−95.9],[41,−95.9],[41,−102],[41,−104]],LAND,BORDER,0.8);
  // KS
  addPoly([[40,−102],[40,−95.3],[37,−95.3],[37,−102]],LAND,BORDER,0.8);
  // OK
  addPoly([[37,−103],[37,−94.6],[33.6,−94.6],[33.6,−94.9],[33.9,−97],[33.6,−98.1],[33.4,−99.4],[34.5,−100],[36.5,−100],[36.5,−103]],LAND,BORDER,0.8);
  // MN
  addPoly([[49,−97],[49,−95],[47.5,−91],[46.7,−92.1],[46.6,−90.5],[44.5,−92.3],[43.5,−91.3],[43.5,−96.5],[46,−97]],LAND,BORDER,0.8);
  // IA
  addPoly([[43.5,−96.5],[43.5,−91.3],[40.6,−91.5],[40.4,−95.3],[43,−97],[43.5,−96.5]],LAND,BORDER,0.8);
  // MO
  addPoly([[40.6,−95.9],[40.6,−91.5],[36.5,−89.5],[36.5,−94.6],[37,−94.6],[37,−95.3],[40,−95.3],[40.4,−95.3]],LAND,BORDER,0.8);
  // AR
  addPoly([[36.5,−94.6],[36.5,−89.5],[35,−89.7],[33.0,−91.0],[33.0,−94.0],[33.6,−94.6]],LAND,BORDER,0.8);
  // LA
  addPoly([[33.0,−94.0],[33.0,−91.0],[29.9,−89.6],[29.0,−90.5],[29.2,−92.0],[29.7,−93.8],[29.9,−94.0]],LAND,BORDER,0.8);
  // WI
  addPoly([[46.6,−90.5],[46.7,−92.1],[46.0,−92.5],[44.5,−92.3],[43.5,−87.8],[42.5,−87.8],[42.5,−90.7],[43.5,−91.3],[44.5,−92.3],[46.6,−90.5]],LAND,BORDER,0.8);
  // IL
  addPoly([[42.5,−90.7],[42.5,−87.5],[37.0,−87.5],[36.5,−89.5],[40.6,−91.5],[40.6,−90.7]],LAND,BORDER,0.8);
  // MS
  addPoly([[35.0,−89.7],[35.0,−88.2],[30.2,−88.5],[29.9,−89.6],[33.0,−91.0]],LAND,BORDER,0.8);
  // AL
  addPoly([[35.0,−88.2],[35.0,−85.6],[32.0,−85.0],[30.2,−87.7],[30.2,−88.5]],LAND,BORDER,0.8);
  // TN
  addPoly([[36.5,−89.5],[36.5,−81.7],[35.0,−81.7],[35.0,−88.2],[36.5,−88.2],[36.5,−89.5]],LAND,BORDER,0.8);
  // KY
  addPoly([[39.0,−84.5],[39.0,−81.8],[37.5,−82.5],[37.0,−84.9],[36.5,−88.2],[35.0,−88.2],[35.0,−89.5],[36.5,−89.5],[36.5,−87.5],[37.0,−87.5],[37.0,−84.5]],LAND,BORDER,0.8);
  // IN
  addPoly([[41.8,−87.5],[41.8,−84.8],[38.0,−84.8],[37.0,−84.5],[37.0,−87.5],[41.8,−87.5]],LAND,BORDER,0.8);
  // OH
  addPoly([[41.8,−84.8],[42.3,−80.5],[40.6,−80.5],[39.5,−81.8],[38.4,−82.7],[38.0,−84.8],[41.8,−84.8]],LAND,BORDER,0.8);
  // MI (lower peninsula)
  addPoly([[42.0,−86.5],[42.0,−82.5],[43.5,−82.5],[44.0,−83.5],[45.8,−84.8],[46.6,−85.0],[44.2,−86.4],[42.0,−86.5]],LAND,BORDER,0.8);
  // GA
  addPoly([[35.0,−85.6],[35.0,−81.7],[32.0,−81.0],[30.4,−81.4],[30.4,−84.0],[32.0,−85.0]],LAND,BORDER,0.8);
  // SC
  addPoly([[35.0,−81.7],[34.0,−79.0],[32.1,−80.7],[32.0,−81.0],[35.0,−81.7]],LAND,BORDER,0.8);
  // NC
  addPoly([[36.5,−81.7],[36.5,−75.5],[35.2,−75.5],[34.0,−79.0],[35.0,−81.7],[36.5,−81.7]],LAND,BORDER,0.8);
  // VA
  addPoly([[39.5,−77.5],[37.9,−75.3],[36.5,−75.9],[36.5,−81.7],[37.5,−82.5],[39.5,−77.5]],LAND,BORDER,0.8);
  // WV
  addPoly([[40.6,−80.5],[39.5,−77.5],[37.5,−82.5],[39.0,−81.8],[40.6,−80.5]],LAND,BORDER,0.8);
  // PA
  addPoly([[42.3,−80.5],[42.0,−74.7],[39.7,−74.7],[39.7,−75.2],[40.0,−75.2],[39.5,−77.5],[40.6,−80.5],[42.3,−80.5]],LAND,BORDER,0.8);
  // NY
  addPoly([[45.0,−74.0],[45.0,−71.5],[42.7,−70.7],[41.2,−71.9],[41.0,−73.9],[42.0,−74.7],[45.0,−74.0]],LAND,BORDER,0.8);
  // VT
  addPoly([[45.0,−73.4],[45.0,−71.5],[43.0,−71.5],[43.0,−73.4]],LAND,BORDER,0.8);
  // NH
  addPoly([[45.3,−71.5],[43.0,−71.0],[42.7,−70.7],[45.3,−70.7]],LAND,BORDER,0.8);
  // ME
  addPoly([[47.3,−70.0],[47.0,−67.0],[44.5,−67.0],[43.0,−70.7],[45.3,−70.7]],LAND,BORDER,0.8);
  // MA
  addPoly([[42.9,−73.4],[42.9,−70.0],[41.2,−70.0],[41.0,−73.9],[42.9,−73.4]],LAND,BORDER,0.8);
  // CT
  addPoly([[42.0,−73.5],[42.0,−72.0],[41.0,−72.0],[41.0,−73.7],[42.0,−73.5]],LAND,BORDER,0.8);
  // RI
  addPoly([[42.0,−71.8],[41.5,−71.1],[41.2,−71.9],[42.0,−71.8]],LAND,BORDER,0.8);
  // NJ
  addPoly([[41.4,−74.7],[41.4,−73.9],[40.5,−74.0],[38.9,−75.2],[39.7,−75.2],[39.7,−74.7],[41.4,−74.7]],LAND,BORDER,0.8);
  // DE
  addPoly([[39.7,−75.8],[39.7,−74.9],[38.4,−75.2],[39.7,−75.8]],LAND,BORDER,0.8);
  // MD
  addPoly([[39.7,−77.5],[39.7,−75.2],[38.4,−75.2],[37.9,−76.5],[38.3,−77.3],[39.7,−77.5]],LAND,BORDER,0.8);
  // FL
  addPoly([[30.7,−87.6],[30.7,−81.4],[25.1,−80.2],[24.5,−81.8],[25.7,−82.0],[27.1,−82.9],[28.5,−82.7],[29.5,−83.3],[29.9,−85.4],[30.0,−87.6]],LAND,BORDER,0.8);

  // --- CANADA (simplified) ---
  addPoly([
    [55,−130],[55,−95],[53,−90],[50,−90],[49.5,−88],[49,−88],
    [49,−97],[49,−104],[49,−116],[49,−124],[50,−127],[52,−128],[54,−130]
  ], CANADA_LAND, 'rgba(255,103,0,0.3)', 0.8);

  // Alberta (for Calgary pin area)
  addPoly([[60,−120],[60,−110],[49,−110],[49,−120],[60,−120]], CANADA_LAND, 'rgba(255,103,0,0.2)', 0.5);
  // Ontario (for Toronto/Ottawa)
  addPoly([[56,−95],[56,−79],[44,−77],[43.5,−79.5],[42.5,−82.5],[43.5,−84],[46.5,−84],[47,−88],[49,−90],[52,−90],[56,−95]], CANADA_LAND, 'rgba(255,103,0,0.2)', 0.5);
  // Quebec
  addPoly([[55,−79],[55,−65],[45,−63],[44.5,−64],[45,−71],[45,−74],[47,−77],[56,−79]], CANADA_LAND, 'rgba(255,103,0,0.2)', 0.5);

  // --- COUNTRY LABELS ---
  function addLabel(lat, lon, text, size, opacity) {
    const {x, y} = geoToSVG(lat, lon);
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    el.setAttribute('x', x); el.setAttribute('y', y);
    el.setAttribute('text-anchor', 'middle');
    el.setAttribute('fill', `rgba(255,255,255,${opacity})`);
    el.setAttribute('font-family', 'Barlow Condensed, sans-serif');
    el.setAttribute('font-size', size);
    el.setAttribute('font-weight', '700');
    el.setAttribute('letter-spacing', '4');
    el.setAttribute('pointer-events', 'none');
    el.textContent = text;
    svg.appendChild(el);
  }

  addLabel(38, −98, 'UNITED STATES', 18, 0.1);
  addLabel(52, −110, 'CANADA', 15, 0.1);
}

// --- RENDER PINS ---
function renderMap() {
  const svg = document.getElementById('training-map');
  if (!svg) return;

  svg.querySelectorAll('.training-pin').forEach(el => el.remove());

  const tooltip = document.getElementById('map-tooltip');

  locations.forEach(loc => {
    const { x, y } = getCoords(loc.city, loc.state, loc.country);
    if (x < 0 || x > SVG_W || y < 0 || y > SVG_H) return;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.classList.add('training-pin');
    g.style.cursor = 'pointer';

    // Outer glow ring
    const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    glow.setAttribute('cx', x); glow.setAttribute('cy', y);
    glow.setAttribute('r', 14);
    glow.setAttribute('fill', 'rgba(255,103,0,0.08)');
    glow.setAttribute('stroke', 'rgba(255,103,0,0.2)');
    glow.setAttribute('stroke-width', '1');
    g.appendChild(glow);

    // Pin body (teardrop-style via path)
    const pin = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const px = x, py = y;
    pin.setAttribute('d', `M${px},${py-14} a7,7 0 0,1 0,14 a7,7 0 0,1 0,-14 L${px},${py+4}`);
    pin.setAttribute('fill', '#FF6700');
    pin.setAttribute('stroke', '#fff');
    pin.setAttribute('stroke-width', '1.5');
    g.appendChild(pin);

    // Inner dot
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x); dot.setAttribute('cy', y - 7);
    dot.setAttribute('r', 3);
    dot.setAttribute('fill', '#fff');
    g.appendChild(dot);

    g.addEventListener('mouseenter', () => {
      tooltip.classList.remove('hidden');
      tooltip.innerHTML = `<strong>${loc.city}, ${loc.state}</strong>
        <span>${loc.date}</span>
        <span style="color:#FF6700;font-weight:600">${loc.type}</span>
        ${loc.notes ? `<span style="margin-top:4px;font-style:italic">${loc.notes}</span>` : ''}`;
    });
    g.addEventListener('mousemove', (e) => {
      const rect = document.getElementById('map-container').getBoundingClientRect();
      let lx = e.clientX - rect.left + 14;
      let ly = e.clientY - rect.top + 14;
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
    const city    = document.getElementById('form-city').value.trim();
    const state   = document.getElementById('form-state').value.trim().toUpperCase();
    const country = document.getElementById('form-country').value;
    const date    = document.getElementById('form-date').value.trim();
    const type    = document.getElementById('form-type').value;
    const notes   = document.getElementById('form-notes').value.trim();

    if (!city || !state) { alert('Please enter at least a city and state/province.'); return; }

    const loc = { id: nextId++, city, state, country, date: date || '2026', type, notes };
    locations.push(loc);
    save();
    renderMap();
    renderCards();
    form.classList.add('hidden');
    clearForm();
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

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  drawMapBackground();
  renderMap();
  renderCards();
  initAddForm();
});
