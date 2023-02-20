import './App.css';
import SimpleStat from './components/cards/simple-stat';
import StatContainer from './components/stats/stat-container';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DataTable from './components/table/data-table';
import {
  useState,
  useEffect,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPico2Readings } from './actions/pico-2-actions';
import { selectAllPico2Readings } from './selectors/pico2-selectors';
import LineChart from './components/charts/line-chart';
import { debounce } from 'lodash';
import LineChartCard from './components/cards/line-chart-card';
import LineChart2 from './components/charts/line-chart-2';

function App() {
  const dispatch = useDispatch();
  const pico2Readings = useSelector(state => selectAllPico2Readings(state));
  const humidityChartRef = useRef(null);

  const [dataTableRows, setDataTableRows] = useState([]);
  const [humidityChartData, setHumidityChartData] = useState([]);
  const [temperatureChartData, setTemperatureChartData] = useState([]);
  const [footcandlesChartData, setFootcandlesChartData] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [humidityWidth, setHumidityWidth] = useState(0);
  const [humidityHeight, setHumidityHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      const width = humidityChartRef.current.clientWidth;
      const height = humidityChartRef.current.clientHeight;
      setHumidityWidth(width);
      setHumidityHeight(height);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    // cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [humidityChartRef]);

  const buildRows = (readings) => (
    readings.map(reading => ({
      id: reading._id,
      timestamp: reading.createdAt,
      EnvironmentTemperature: reading.EnvironmentTemperature,
      EnvironmentHumidity: reading.EnvironmentHumidity,
      EnvironmentFootcandles: reading.EnvironmentFootcandles,
      EnvironmentLux: reading.EnvironmentLux,
    }))
  );

  const buildHumidityData = (readings) => (
    readings.map(reading => reading.EnvironmentHumidity)
  );
  const buildTemperatureData = (readings) => (
    readings.map(reading => reading.EnvironmentTemperature)
  );
  const buildFootcandlesData = (readings) => (
    readings.map(reading => reading.EnvironmentFootcandles)
  );

  // build table data with readings
  useEffect(() => {
    if (pico2Readings && pico2Readings.length) {
      const rowData = buildRows(pico2Readings);
      const humidityData = buildHumidityData(pico2Readings);
      const temperatureData = buildTemperatureData(pico2Readings);
      const footcandlesData = buildFootcandlesData(pico2Readings);
      setDataTableRows(rowData);
      setHumidityChartData(humidityData);
      setTemperatureChartData(temperatureData);
      setFootcandlesChartData(footcandlesData);
    }
  }, [pico2Readings]);

  // fetch data on mount
  useEffect(() => {
    dispatch(fetchPico2Readings());
  }, []);

  console.log('dataTableRows', dataTableRows)

  return (
    <Box sx={{
      backgroundColor: 'background.default',
      width: '100vw',
      height: '100vh',
      overflowY: 'scroll',
    }}>
      <Paper elevation={4} sx={{
        margin: '4rem',
        padding: '2rem',
      }}>
        <StatContainer
          name='pico-2'
        />
      </Paper>

      <Stack direction='row' spacing={2} sx={{
        margin: '4rem',
      }}>
        <Paper elevation={4} sx={{
          // flex: 1,
          height: '300px',
          width: '100%',
          borderRadius: '4px',
          overflow: 'visable',
        }}>
          <Stack>
            <Stack
              direction='row'
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ height: 50, padding: '0 2rem' }}
            >
              <Typography variant='subtitle' sx={{
                color: 'text.secondary',
              }}>
                Humidity
              </Typography>
              <Chip label='pico-2' />
            </Stack>
            <div ref={humidityChartRef} style={{
              width: '100%',
              height: '250px',
            }}>
              <LineChart
                data={humidityChartData}
                width={humidityWidth}
                height={humidityHeight}
              />
            </div>
          </Stack>
        </Paper>
      </Stack>

      <Stack direction='row' spacing={2} sx={{
        margin: '4rem',
      }}>
        <Paper elevation={4} sx={{
          // flex: 1,
          height: '300px',
          width: '100%',
          borderRadius: '4px',
          overflow: 'visable',
        }}>
          <Stack>
            <Stack
              direction='row'
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ height: 50, padding: '0 2rem' }}
            >
              <Typography variant='subtitle' sx={{
                color: 'text.secondary',
              }}>
                Temperature
              </Typography>
              <Chip label='pico-2' />
            </Stack>
            <div style={{
              width: '100%',
              height: '250px',
            }}>
              <LineChart
                data={temperatureChartData}
                width={humidityWidth}
                height={humidityHeight}
              />
            </div>
          </Stack>
        </Paper>
      </Stack>

      <Stack direction='row' spacing={2} sx={{
        margin: '4rem',
      }}>
        <Paper elevation={4} sx={{
          // flex: 1,
          height: '300px',
          width: '100%',
          borderRadius: '4px',
          overflow: 'visable',
        }}>
          <Stack>
            <Stack
              direction='row'
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ height: 50, padding: '0 2rem' }}
            >
              <Typography variant='subtitle' sx={{
                color: 'text.secondary',
              }}>
                Footcandles
              </Typography>
              <Chip label='pico-2' />
            </Stack>
            <div style={{
              width: '100%',
              height: '250px',
            }}>
              <LineChart
                data={footcandlesChartData}
                width={humidityWidth}
                height={humidityHeight}
              />
            </div>
          </Stack>
        </Paper>
      </Stack>

      <Paper elevation={4} sx={{
        margin: '4rem',
        padding: '2rem 2.5rem 2rem 1rem',
      }}>
        <LineChart2 />
      </Paper>

      {/* TODO: Create card component for easy reuse */}
      {/* <LineChartCard
        title='Humidity'
        chipLabel='pico-2'
        data={humidityChartData}
        ref={humidityChartRef}
        width={humidityWidth}
        height={humidityHeight}
      /> */}
      <Paper elevation={4} sx={{
        margin: '4rem',
        padding: '2rem',
      }}>
        <DataTable rows={dataTableRows} />
        {/* <SimpleTable /> */}
      </Paper>
    </Box>
  );
}

export default App;
