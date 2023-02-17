import {
  useRef,
  useEffect,
  useState,
} from 'react';
import * as d3 from 'd3';
import { useTheme } from '@mui/material/styles';
import { CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LineChart = ({ data = [], width, height }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (data?.length) {
      setReady(true);
    }
  }, [data])

  return (
    <div style={{ width: "100%", height: '100%' }}>
      <ChartInner width={width} height={height} data={data} ready={ready} />
    </div>
  )
}

const ChartInner = ({ data, width, height, ready }) => {
  const theme = useTheme();
  const svgRef = useRef();

  const margin = { top: 25, right: 0, bottom: 25, left: 5 }

  // const svg = d3.select(svgRef.current)

  const xScale = d3.scaleLinear()
    .domain([-7, data.length - 1])               // min, max of INPUT values
    .range([margin.left, width - margin.right]) // min, max of OUTPUT values

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data))
    .range([height - margin.bottom, margin.top])

  const line = d3.line()
    .x((d, index) => xScale(index))
    .y((d) => yScale(d))
    .curve(d3.curveCardinal)

  const dVal = line(data)

  // setup axes
  // const xAxis = d3.axisBottom(xScale)
  //   .ticks(data.length)
  //   .tickFormat(index => index + 1)
  // const yAxis = d3.axisLeft(yScale)
  //   .ticks(5)

  // svg.append('g')
  //   .call(xAxis)
  //   .attr('transform', `translate(0, ${height})`)
  // svg.append('g')
  //   .call(yAxis)

  return ready ? (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} overflow="visable">
      {
        yScale.ticks(5).map(tick => (
          <g key={tick} transform={`translate(10, ${yScale(tick)})`}>
            <line x1={margin.left + 20} x2={width - margin.right} stroke={theme.palette.grey[800]} />
            <text
              x={margin.left - 5} y={5}
              fill={theme.palette.grey[700]}
              style={{ fontSize: 12 }}
            >
              {tick}
            </text>
          </g>
        ))
      }
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, type: 'spring' }}
        d={dVal}
        fill="none"
        stroke={theme.palette.primary.main}
      />
    </svg>
  ) : (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </div>
  )
};

export default LineChart;