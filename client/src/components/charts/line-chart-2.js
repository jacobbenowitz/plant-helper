import { useRef, useState, useEffect } from "react";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
  max,
} from "d3";
import { useTheme } from '@mui/material/styles';
import useResizeObserver from "../../hooks/use_resize_observer";

const LineChart2 = (
  title,
  chipLabel,
  data,
  ref,
  width,
  height,
) => {

  const theme = useTheme();
  const [chartData, setChartData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {

    if (!dimensions) return;

    const svg = select(svgRef.current);

    // scales
    const xScale = scaleLinear()
      .domain([0, chartData.length - 1])
      .range([0, dimensions.width]);
    const yScale = scaleLinear()
      .domain([0, 150])
      .range([dimensions.height, 0]);

    // axes
    const xAxis = axisBottom(xScale)
      .ticks(chartData.length)
      .tickFormat(index => index + 1);
    svg.select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .style('opacity', 0.5)
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select('.y-axis')
      .style('transform', `translateX(${dimensions.width}px)`)
      .style('opacity', 0.5)
      .call(yAxis);

    // generate line
    const chartLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    // add circles
    svg
      .selectAll('.dot')
      .data(chartData)
      .join('circle')
      .attr('class', 'dot')
      .attr('fill', theme.palette.primary.main)
      .attr('cx', (value, index) => xScale(index))
      .attr('cy', yScale)
      .attr('r', 2.5)

    // render line
    svg.selectAll('.line')
      .data([chartData])
      .join('path')
      .attr('class', 'line')
      .attr('d', chartLine)
      .attr('fill', 'none')
      .attr('stroke', theme.palette.primary.main)
    // .on('mouseenter', (e, value) => {
    //   console.log('e', e)
    //   console.log('value', value)
    //   svg
    //     .selectAll('.tooltip')
    //     .data([value])
    //     .join(enter => enter.append('text').attr('y', yScale(value) - 4))
    //     .attr('class', 'tooltip')
    //     .text(value)
    //     .attr('x', e.offsetX)
    //     .attr('text-anchor', 'middle')
    //     .transition()
    //     .attr('y', yScale(e.offsetY))
    //     .attr('opacity', 1);
    // })
  }, [chartData, dimensions]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} style={{ overflow: 'visible', width: '100%' }}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  )
}

export default LineChart2;