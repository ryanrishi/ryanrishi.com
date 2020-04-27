import mapboxgl from 'mapbox-gl';
import { csvParse } from 'd3';

mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbnJpc2hpIiwiYSI6ImNqZjl6dnJmZTB6OHk0YXFoZ2x0dzZ2NnIifQ.KecZYjIjOM_00fCY2ZcZ1Q';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [ -98.5795, 39.8283],
  zoom: 4
});


map.fitBounds([[-171.791110603, 18.91619], [-66.96466, 71.3577635769]]);

let usCountyData;
let maxCases = 0;
let maxDeaths = 0;
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
      cases: +row.cases,
      deaths: + row.deaths
    }));
  }).then((data) => {
    data = data.filter(d => d.fips != 0); // filter out unknown
    data = data.filter(d => d.date === '2020-04-24'); // just for tests

    usCountyData = data;
    console.log('usCountyData', usCountyData);
    // console.log('rows without fips', usCountyData.filter(r => !r.fips));

    data.forEach(({ cases, deaths }) => {
      maxCases = Math.max(maxCases, cases);
      maxDeaths = Math.max(maxDeaths, deaths);
    });

    console.log('maxCases', maxCases);
    console.log('maxDeaths', maxDeaths);

    return data;
  });
};

window.onload = fetchUsCountyData;

map.on('load', () => {
  // Add source for admin-1 Boundaries
  map.addSource('us-counties-2018', {
    type: 'vector',
    url: 'mapbox://ryanrishi.8bhyk94z'
  });

  fetchUsCountyData().then((data) => {
    // https://docs.mapbox.com/mapbox-gl-js/example/data-join/
    let expression = ['match', ['get', 'GEOID']];

    data.forEach((row) => {
      const red = (row.deaths / maxDeaths) * 255;
      const color = `rgba(${red}, 0, 0, 0.4)`;
      expression.push(row.fips, color);
    });

    // Last value is the default, used where there is no data
    expression.push('rgba(0, 0, 0, 0.2)');

    console.log('expression', expression);

    map.addLayer({
      id: 'us-counties-2018-join',
      type: 'fill',
      source: 'us-counties-2018',
      'source-layer': 'cb_2018_us_county_5m-cfqzyk',
      paint: {
        'fill-color': expression
      }
    });
  });
});

// https://docs.mapbox.com/mapbox-gl-js/example/timeline-animation/
// https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/

console.log('covid-19');
