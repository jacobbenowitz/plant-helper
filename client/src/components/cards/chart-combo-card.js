import {
  useState,
  useEffect,
  useRef,
} from 'react';
import { Chip, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import LineChart from '../charts/line-chart';
import MultiLineChart from '../charts/multi-line-chart';

const ChartComboCard = ({
  multiChartData,
}) => {
  const [chartType, setChartType] = useState(['humidity']);
  const handleChartTypeChange = (event, newChartType) => {
    setChartType(newChartType);
  };

  return (
    <Paper elevation={4} sx={{
      height: '650px',
      width: '100%',
      borderRadius: '4px',
      overflow: 'visable',

    }}>
      <Stack>
        <Stack
          direction='row'
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ height: 100, padding: '0 2rem' }}
        >
          <Chip label='pico-2' />
          <ToggleButtonGroup
            // exclusive
            value={chartType}
            onChange={handleChartTypeChange}
            aria-label="chart type"
            size='small'
          >
            <ToggleButton value="humidity" aria-label="humidity">
              Humidity
            </ToggleButton>
            <ToggleButton value="temperature" aria-label="temperature">
              Temperature
            </ToggleButton>
            <ToggleButton value="footcandles" aria-label="footcandles">
              Footcandles
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <div style={{
          width: '100%',
          height: '550px',
        }}>
          <MultiLineChart
            multiChartData={multiChartData}
          />
        </div>
      </Stack>
    </Paper>
  )
}

export default ChartComboCard;