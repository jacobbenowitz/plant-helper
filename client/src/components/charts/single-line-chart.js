import {
  useRef,
  useEffect,
  useState,
} from 'react';
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
  max,
  group,
  scaleUtc,
  scaleTime,
  curveBundle,
  curveCatmullRom,
} from 'd3';
import { useTheme } from '@mui/material/styles';
import { CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import useResizeObserver from '../../hooks/use_resize_observer';

const SingleLineChart = ({
  data,
  color,
}) => {
  const [chartData, setChartData] = useState([]);
  const [chartMin, setChartMin] = useState(0);
  const [chartMax, setChartMax] = useState(0);
  const [chartMaxDate, setChartMaxDate] = useState(0);
  const [chartMinDate, setChartMinDate] = useState(0);
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (data) {
      let minVal, maxVal, minDate, maxDate;

      data.forEach((data) => {
        if (!maxVal || data.value > maxVal) {
          maxVal = data.value;
        }
        if (!minVal || data.value < minVal) {
          minVal = data.value;
        }
        if (!minDate || data.timestamp < minDate) {
          minDate = data.timestamp;
        }
        if (!maxDate || data.timestamp > maxDate) {
          maxDate = data.timestamp;
        }
      });

      setChartMin(minVal);
      setChartMax(maxVal);
      setChartMaxDate(maxDate);
      setChartMinDate(minDate);
      setChartData(data);
    }
  }, [data]);


  useEffect(() => {
    // console.table(chartData)
    if (!dimensions || !chartData?.length) return;

    const svg = select(svgRef.current);

    // scales
    const xScale = scaleTime()
      .domain([chartMinDate, chartMaxDate])
      .range([0, dimensions.width])
    // .nice();
    const yScale = scaleLinear()
      .domain([chartMin, chartMax])
      .range([dimensions.height, 0]);

    // axes
    const xAxis = axisBottom(xScale)
      .ticks(chartData.length)
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
      .x(d => xScale(d.timestamp))
      .y(d => yScale(d.value))
      .curve(curveCatmullRom);

    svg
      .selectAll('.dot')
      .data(chartData)
      .join('circle')
      .attr('class', 'dot')
      .attr('fill', color)
      .attr('cx', (value) => xScale(value.timestamp))
      .attr('cy', (value) => yScale(value.value))
      .attr('r', 3)


    // render line
    svg
      .selectAll('.line')
      .data([chartData])
      .join('path')
      .attr('d', chartLine)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', color)
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
  }, [chartData, dimensions, chartMax, chartMin, chartMaxDate, chartMinDate]);

  return (
    <div ref={wrapperRef} style={{
      width: '100%',
      height: '100%',
      padding: '2rem 2.5rem 2rem 1rem',
    }}>
      {
        chartData?.length ? (
          <svg ref={svgRef} style={{ overflow: 'visible', width: '100%' }}>
            <g className="x-axis" />
            <g className="y-axis" />
          </svg>
        ) : (
          <div style={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <CircularProgress />
          </div>
        )
      }
    </div>
  )
}

export default SingleLineChart;