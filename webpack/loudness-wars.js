import * as d3 from 'd3';

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 25
};

const $chart = document.querySelector('#chart');

const x = d3.scaleTime();
const y = d3.scaleLinear();

const xAxis = d3.axisBottom().scale(x).ticks(d3.timeYear.every(5));
const yAxis = d3.axisLeft().scale(y);

let svg;

const draw = (data) => {
  console.log('draw');
  const width = $chart.offsetWidth - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  const chart = d3.select('#chart');

  svg = svg ? svg : chart.append('svg');
  svg.selectAll('*').remove();  // ehhhhhh, it'd be better to update in place
  svg
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const years = data.map(r => r.year);
  x.domain(d3.extent([new Date(Math.min(...years), 0, 1), new Date(Math.max(...years), 0, 1)]))
   .range([0, width])
   .nice();

  y.domain([0, -30])
   .range([0, height])
   .nice();

  // x axis
  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
  .append('text')
    .attr('fill', '#000')
    .attr('x', width - margin.left)
    .attr('y', -2)
    .text('Year');

  // y axis
  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
  .append('text')
    .attr('stroke', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 10)
    .style('text-anchor', 'end')
    .text('Loudness (dB)');

  // tooltip
  const tooltip = chart.append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  const onMouseover = (d) => {
    console.log('mouseover', d);
    let html = `
      <span class="song-title"> ${d.song} (${d.year})</span>
      <br>
      <span class="artist-name"> ${d.artist} </span>
      <br>
      <span class="rank">
        <b>Rank:</b> ${d.rank}
      </span>
      <br>
      <span class="loudness">
        <b>Loudness:</b> ${d.loudness}
      </span>
    `;

    tooltip.html(html)
      .style('left', `${d3.event.layerX + 15}px`)
      .style('top', `${d3.event.layerY - 30}px`)
    .transition()
      .duration(200)
      .style('opacity', 0.9);
  };

  const onMouseout = () => {
    tooltip.transition()
      .duration(300)
      .style('opacity', 0);
  };

  svg.selectAll('.song')
    .data(data)
    .enter()
      .append('circle')
      .attr('class', 'song')
      .attr('r', 2)
      .attr('cx', d => x(d.releaseDate))
      .attr('cy', d => y(d.loudness))
      .on('mouseover', onMouseover)
      .on('mouseout', onMouseout);

  // trendline
  const loudnessByYear = {};
  for (let song of data) {
    if (!loudnessByYear[song.year]) {
      loudnessByYear[song.year] = [];
    }

    loudnessByYear[song.year].push(song);
  }

  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.loudness));

  const meanLoudnessByYear = [];
  for (let year in loudnessByYear) {
    meanLoudnessByYear.push({
      year: new Date(year, 0, 1),
      loudness: d3.mean(loudnessByYear[year].map(x => x.loudness))
    });
  }

  svg.append('path')
    .datum(meanLoudnessByYear)
    .attr('class', 'line')
    .attr('d', line);
};

d3.csv('/files/loudness-wars.csv', function(row) {
  return {
    artist: row.Artist,
    song: row['Song Title'],
    rank: +row.Position,
    loudness: +row.Loudness,
    year: +row.Year,
    releaseDate: new Date(+row.Year, 0, 1) // not the actual release date, just a Date with the year
  };
}).then(function(data) {
  // get rid of 0s / undefined
  data = data.filter(song => song.loudness);

   draw(data);

   window.addEventListener('resize', () => {
     draw(data);
   });
});
