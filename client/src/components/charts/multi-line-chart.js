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
} from 'd3';
import { useTheme } from '@mui/material/styles';
import { CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import useResizeObserver from '../../hooks/use_resize_observer';

const MultiLineChart = ({
  multiChartData,
}) => {
  console.log('multiChartData', multiChartData)
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [chartMin, setChartMin] = useState(0);
  const [chartMax, setChartMax] = useState(0);
  const [chartMaxDate, setChartMaxDate] = useState(0);
  const [chartMinDate, setChartMinDate] = useState(0);
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
  ]

  useEffect(() => {
    if (multiChartData) {
      let minVal, maxVal, minDate, maxDate;

      multiChartData.forEach((data) => {
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
      setChartData(multiChartData);
    }
  }, [multiChartData]);


  useEffect(() => {

    console.table(chartData)
    if (!dimensions || !chartData?.length) return;

    const svg = select(svgRef.current);
    const groups = group(chartData, d => d.name);
    // need to get max values
    // how to get max values for each group? use seperate axis??
    console.log('groups', groups)

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
    // .tickFormat(index => index + 1);
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
      .curve(curveCardinal);


    // render line
    svg
      .selectAll('.line')
      .data(groups)
      .join('path')
      .attr('d', function (d) {
        return chartLine(d[1])
      })
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', (d, idx) => {
        return colors[idx]
      })
    // svg.selectAll('.line')
    //   .data([chartData])
    //   .join('path')
    //   .attr('class', 'line')
    //   .attr('d', chartLine)
    //   .attr('fill', 'none')
    //   .attr('stroke', theme.palette.primary.main)
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

export default MultiLineChart;


// const MultiLineChart = ({ data = [], width, height }) => {
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     if (data && data?.length) {
//       setReady(true);
//     }
//   }, [data])

//   return (
//     <div style={{ width: "100%", height: '100%' }}>
//       <ChartInner width={width} height={height} data={data} ready={ready} />
//     </div>
//   )
// }

// const ChartInner = ({ data, width, height, ready }) => {
//   const theme = useTheme();
//   const svgRef = useRef();

//   const margin = { top: 25, right: 0, bottom: 25, left: 25 }

//   // const svg = d3.select(svgRef.current)

//   const xScale = d3.scaleLinear()
//     .domain([-15, data.length - 1])               // min, max of INPUT values
//     .range([margin.left, width - margin.right]) // min, max of OUTPUT values

//   const yScale = d3.scaleLinear()
//     .domain(d3.extent(data))
//     .range([height - margin.bottom, margin.top])

//   const line = d3.line()
//     .x((d, index) => xScale(index))
//     .y((d) => yScale(d))
//     .curve(d3.curveCardinal)

//   const dVal = line(data)

//   return ready ? (
//     <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} overflow="visable">
//       {
//         yScale.ticks(5).map(tick => (
//           <g key={tick} transform={`translate(10, ${yScale(tick)})`}>
//             <line x1={margin.left + 2} x2={width - margin.right} stroke={theme.palette.grey[800]} />
//             <text
//               x={margin.left - 20} y={5}
//               fill={theme.palette.grey[700]}
//               style={{ fontSize: 12 }}
//             >
//               {tick}
//             </text>
//           </g>
//         ))
//       }
//       <motion.path
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: 1 }}
//         transition={{ duration: 1.5, type: 'spring' }}
//         d={dVal}
//         fill="none"
//         stroke={theme.palette.primary.main}
//       />
//     </svg>
//   ) : (
//     <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <CircularProgress />
//     </div>
//   )
// };

// export default MultiLineChart;