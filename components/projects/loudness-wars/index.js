import { useEffect, useRef } from 'react';

// see https://stackoverflow.com/questions/65974337/import-es-module-in-next-js-err-require-esm
// see https://github.com/d3/d3/issues/3469
let d3;

// TODO there has to be a better way to use a non-ESM module here
const ensureD3 = async () => {
  if (!d3) {
    d3 = await import('d3');
  }
};

const drawChart = async (svgRef) => {
  await ensureD3();
  const svg = d3.select(svgRef.current);

  // TODO redraw chart on window resize
  const h = window.innerHeight;
  const w = window.innerWidth;

  const data = await d3.csv('/loudness-wars.csv').then((tracks) => tracks.map((track) => ({
    id: track.track_id,
    name: track.track_name,
    artist: track.artist_name,
    album: track.album_name,
    releaseDate: (() => {
      switch (track.release_date_precision) {
        case 'day':
          return new Date(track.release_date);

        case 'month': {
          const [year, month] = track.release_date.split('-');
          const date = new Date();
          date.setFullYear(year);
          date.setMonth(month - 1, 1);

          return date;
        }

        case 'year': {
          const date = new Date();
          date.setFullYear(track.release_date);
          date.setMonth(0, 1);

          return date;
        }

        default:
          throw new Error(`Unknown release date precision: ${track.release_date_precision}`);
      }
    })(),
    releaseDatePrecision: track.release_date_precision,
    loudness: track.loudness
  })));

  let minLoudness = Infinity;
  let maxLoudness = -Infinity;

  data.forEach((d) => {
    minLoudness = Math.min(minLoudness, d.loudness);
    maxLoudness = Math.max(maxLoudness, d.loudness);
  });

  console.log('data', data);

  svg
    .attr('width', w)
    .attr('height', h)
    .style('margin-top', 50)
    .style('margin-left', 50);

  // x and y scales
  const startDate = new Date();
  startDate.setFullYear(1970);
  startDate.setMonth(0, 1);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date();
  endDate.setFullYear(2020);
  endDate.setMonth(0, 1);
  endDate.setHours(0, 0, 0, 0);

  const x = d3
    .scaleTime()
    .domain([startDate, endDate])
    .range([0, w]);

  const y = d3
    .scaleLog()
    .domain([minLoudness, maxLoudness])
    .range([h, 0]);

  // draw x and y axes
  svg.append('g')
    .attr('transform', `translate(0, ${h})`)
    .call(d3.axisBottom(x));

  svg.append('g')
    .call(d3.axisLeft(y));

  const transitionDuration = 200;
  const r = 5;

  // tooltip
  const tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('opacity', 0);

  // hover animations
  function onMouseIn(event, d) {
    d3.select(this)
      .transition()
      .duration(transitionDuration)
      .attr('r', 2 * r);

    tooltip
      .style('opacity', 0.8)
      .style('left', `${event.pageX + 15}px`)
      .style('top', `${event.pageY}px`);

    tooltip.html(`
      <p>${d.name} - ${d.artist} (${d.releaseDate.toLocaleDateString()})</p>
      <p>${d.loudness} dB</p>
    `);
  }

  function onMouseOut(event, d) {
    d3.select(this)
      .transition()
      .duration(transitionDuration)
      .attr('r', r);

    tooltip
      .transition()
      .duration(transitionDuration)
      .style('opacity', 0);
  }

  svg.append('g')
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
      .attr('cx', (d) => x(d.releaseDate))
      .attr('cy', (d) => y(d.loudness))
      .attr('r', r)
      .attr('fill', '#69b3a2')
      .attr('opacity', 0.4)
      .on('mouseover', onMouseIn)
      .on('mouseout', onMouseOut);
};

const Chart = () => {
  const svg = useRef(null);

  useEffect(() => {
    drawChart(svg);
  }, [svg]);

  return (
    <svg
      className="w-full h-full"
      ref={svg} />
  );
};

export default Chart;
