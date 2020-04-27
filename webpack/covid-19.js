import mapboxgl from 'mapbox-gl';
import { csvParse } from 'd3';

mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbnJpc2hpIiwiYSI6ImNqZjl6dnJmZTB6OHk0YXFoZ2x0dzZ2NnIifQ.KecZYjIjOM_00fCY2ZcZ1Q';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  bounds: [[-179.1,-14.6],[179.8,71.4]],
  // center: [ -98.5795, 39.8283],
  zoom: 2
});

let usCountyData;
const fetchUsCountyData = () => {
  if (usCountyData) {
    return Promise.resolve(usCountyData);
  }

  return fetch('/files/covid-19/us-counties.csv').then((response) => {
    console.log('response', response);
    return response.text();
  }).then((data) => {
    return csvParse(data, (row) => ({
      ...row,
      fips: +row.cases,
      cases: +row.cases,
      deaths: + row.deaths
    }));
  }).then((data) => {
    usCountyData = data;
    console.log('usCountyData', usCountyData);

    // console.log('rows without fips', usCountyData.filter(r => !r.fips));
  });
};

window.onload = fetchUsCountyData;

map.on('load', () => {
  // Add source for admin-1 Boundaries
  map.addSource('us-counties-2018', {
    type: 'vector',
    url: 'mapbox://ryanrishi.8bhyk94z'
  });

  // Add a layer with boundary polygons
  map.addLayer({
    id: 'us-counties-2018-fill',
    type: 'fill',
    source: 'us-counties-2018',
    'source-layer': 'cb_2018_us_county_5m-cfqzyk',
    paint: {
      'fill-color': '#ccc'
    }
  });
});

// https://docs.mapbox.com/mapbox-gl-js/example/timeline-animation/
// https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/

console.log('covid-19');
