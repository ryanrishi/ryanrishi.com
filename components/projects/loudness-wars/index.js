import { useEffect, useRef } from 'react';

// see https://stackoverflow.com/questions/65974337/import-es-module-in-next-js-err-require-esm
// see https://github.com/d3/d3/issues/3469
let d3;

// there has to be a better way to use a non-ESM module here
const ensureD3 = async () => {
  if (!d3) {
    d3 = await import('d3');
  }
};

const drawChart = async (svgRef) => {
  await ensureD3();
  const svg = d3.select(svgRef.current);

  const data = [12, 5, 6, 6, 9, 10];
  const h = 120;
  const w = 250;

  svg
    .attr("width", w)
    .attr("height", h)
    .style("margin-top", 50)
    .style("margin-left", 50);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 40)
    .attr("y", (d, i) => h - 10 * d)
    .attr("width", 20)
    .attr("height", (d, i) => d * 10)
    .attr("fill", "steelblue");
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
