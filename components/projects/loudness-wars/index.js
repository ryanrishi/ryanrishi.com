import { useEffect, useRef } from 'react';

// see https://stackoverflow.com/questions/65974337/import-es-module-in-next-js-err-require-esm
// see https://github.com/d3/d3/issues/3469
const d3 = import('d3').default;

const drawChart = (svgRef) => {
  debugger
  console.log('d3', d3);
  const svg = d3.select(svgRef.current);

  svg.append('g');
};

const Chart = () => {
  const svg = useRef(null);

  useEffect(() => {
    drawChart(svg);
  }, [svg]);

  return (
    <svg ref={svg} />
  );
};

export default Chart;
