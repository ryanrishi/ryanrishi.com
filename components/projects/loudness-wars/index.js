/* eslint indent: ["warn", 2] */
import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import * as d3 from 'd3';
import { event } from '../../../lib/ga';

const margin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60
};

const trackFillColor = '#69b3a2';
export const selectedTrackFillColor = '#f38f9f';

const drawChart = async (svgRef, setSelectedTrack) => {
  let $selectedTrack;

  const data = await d3.csv('/loudness-wars.csv').then(tracks => tracks.map(track => ({
    id: track.track_id,
    name: track.track_name,
    artist: track.artist_name,
    album: track.album_name,
    releaseDateForDisplay: track.release_date,
    releaseDate: (() => {
      switch (track.release_date_precision) {
        case 'day':
          return new Date(track.release_date);

        case 'month': {
          const [year, month] = track.release_date.split('-');
          const date = new Date(year, month - 1, 1);

          return date;
        }

        case 'year':
          return new Date(track.release_date, 0, 1);

        default:
          throw new Error(`Unknown release date precision: ${track.release_date_precision}`);
      }
    })(),
    releaseDatePrecision: track.release_date_precision,
    loudness: track.loudness
  })).sort((a, b) => a.releaseDate - b.releaseDate));

  const minDate = data[0].releaseDate;
  const maxDate = data[data.length - 1].releaseDate;

  let minLoudness = Infinity;
  let maxLoudness = -Infinity;

  data.forEach((d) => {
    minLoudness = Math.min(minLoudness, d.loudness);
    maxLoudness = Math.max(maxLoudness, d.loudness);
  });

  const { width, height } = svgRef.current.viewBox.baseVal;
  const h = height - margin.top - margin.bottom;
  const w = width - margin.left - margin.right;

  const svg = d3.select(svgRef.current);
  svg.selectAll('*').remove();
  const g = svg.append('g');

  g.attr('transform', `translate(${margin.left}, ${margin.top})`);

  // x and y scales
  const startDate = new Date(minDate.getUTCFullYear(), 0, 1);
  const endDate = new Date(maxDate.getUTCFullYear(), 0, 1);

  const x = d3
    .scaleTime()
    .domain([startDate, endDate])
    .range([0, w]);

  const y = d3
    .scaleLog()
    .domain([minLoudness, minLoudness]) // set [y1, y2] the same in order to animate later
    .range([h - margin.top - margin.bottom, h - margin.top - margin.bottom]);

  // draw x and y axes
  g.append('g')
    .attr('transform', `translate(0, ${h - margin.top - margin.bottom})`)
    .call(d3.axisBottom(x))
    .append('text')
      .attr('fill', 'black')
      .attr('x', w)
      .attr('y', -2)
      .attr('text-anchor', 'end')
      .text('Year');

  const yAxis = g.append('g')
    .call(d3.axisLeft(y));

  yAxis.append('text')
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('y', 10)
    .style('text-anchor', 'end')
    .text('Loudness (dB)');

  const transitionDuration = 200;
  const r = 5;

  // tooltip
  const tooltip = d3.select('body')
    .append('div')
    .attr('data-test-tooltip', true)
    .style('position', 'absolute')
    .style('background-color', 'white')
    .style('opacity', 0);

  // hover animations
  function onMouseIn(e, d) {
    d3.select(this)
      .transition()
      .duration(transitionDuration)
      .attr('r', 2 * r);

    tooltip
      .interrupt()
      .style('display', 'block')
      .style('opacity', 0.8)
      .style('left', `${e.pageX + 15}px`)
      .style('top', `${e.pageY}px`);

    tooltip.html(`
      <p>${d.name} (${d.releaseDateForDisplay})</p>
      <p>${d.artist} - ${d.album}</p>
      <p>${d.loudness} dB</p>
    `);
  }

  function onMouseOut() {
    d3.select(this)
      .transition()
      .duration(transitionDuration)
      .attr('r', r);

    tooltip
      .transition()
      .duration(transitionDuration)
      .style('opacity', 0)
      .on('end', () => {
        tooltip.style('display', 'none');
      });
  }

  function onMouseMove(e) {
    tooltip
      .style('left', `${e.pageX + 15}px`)
      .style('top', `${e.pageY}px`);
  }

  function onClick(e, d) {
    setSelectedTrack(d);

    if ($selectedTrack) {
      // reset previously selected track
      d3.select($selectedTrack).attr('fill', trackFillColor);
    }

    d3.select(this)
      .attr('fill', selectedTrackFillColor);
    $selectedTrack = e.target;
  }

  g.append('g')
    .selectAll('dot')
    .data(data, d => d.id)
    .enter()
    .append('circle')
      .attr('cx', d => x(d.releaseDate))
      .attr('cy', d => y(d.loudness))
      .attr('r', r)
      .attr('fill', trackFillColor)
      .attr('opacity', 0.4)
      .on('mouseover', onMouseIn)
      .on('mousemove', onMouseMove)
      .on('mouseout', onMouseOut)
      .on('click', onClick);

  // trendline
  const loudnessByYear = {};
  data.forEach((track) => {
    const year = track.releaseDate.getUTCFullYear();
    loudnessByYear[year] = loudnessByYear[year] || [];
    loudnessByYear[year].push(track.loudness);
  });

  const meanLoudnessByYear = Object.keys(loudnessByYear)
    .sort()
    .map(year => ({
      year: +year,
      loudness: d3.mean(loudnessByYear[year])
    }));

  const drawTrendline = () => {
    const trendline = d3.line()
      .x(d => x(new Date(d.year, 0, 1)))
      .y(d => y(d.loudness))
      .curve(d3.curveNatural);

    g.append('path')
      .attr('data-test-trendline', true)
      .datum(meanLoudnessByYear)
      .attr('d', trendline)
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('stroke', '#ffab00');
  };

  y.domain([minLoudness, maxLoudness]);
  y.range([h - margin.top - margin.bottom, 0]);
  yAxis
    .transition()
    .duration(1000)
    .attr('opacity', 1)
    .call(d3.axisLeft(y).tickValues([-24, -18, -12, -9, -6, -3, -1.5]).tickFormat(d => d));

  let numTransitions = 0;
  svg.selectAll('circle')
    .transition()
    .delay((d, i) => i / 3)
    .duration(1000)
    .attr('cx', d => x(d.releaseDate))
    .attr('cy', d => y(d.loudness))
    .on('start', () => ++numTransitions)
    .on('end', () => {
      if (--numTransitions === 0) {
        drawTrendline();
      }
    });
};

const Chart = () => {
  const svg = useRef(null);

  const [dimensions, setDimensions] = useState({
    // can't use winsow since it's undefined with Next.js SSR
    height: 0,
    width: 0
  });

  const [selectedTrack, _setSelectedTrack] = useState(null);

  const setSelectedTrack = (track) => {
    event({
      action: 'loudness wars | select track',
      params: track
    });

    _setSelectedTrack(track);
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });

      drawChart(svg, setSelectedTrack);
    }, 250);

    // trigger a resize once component is mounted since window is undefined with Next.js SSR
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [svg]);

  return (
    <div className="w-full h-full">
      <p>
        {selectedTrack
          ? (
            <iframe
              className="mx-auto"
              src={`https://open.spotify.com/embed/track/${selectedTrack.id}`}
              title={`${selectedTrack.name} - ${selectedTrack.artist}`}
            />
          )
          : 'Click on a circle below to listen'}
      </p>
      <svg
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
        ref={svg}
      />
    </div>
  );
};

export default Chart;
