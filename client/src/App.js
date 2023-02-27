import StatContainer from './components/stats/stat-container';
import { Paper, Stack } from '@mui/material';
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
import LineChartCard from './components/cards/line-chart-card';
import ChartComboCard from './components/cards/chart-combo-card';
import { useTheme } from '@mui/material/styles';

function App() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const pico2Readings = useSelector(state => selectAllPico2Readings(state));

  const [dataTableRows, setDataTableRows] = useState([]);
  const [humidityChartData, setHumidityChartData] = useState([]);
  const [temperatureChartData, setTemperatureChartData] = useState([]);
  const [footcandlesChartData, setFootcandlesChartData] = useState([]);
  const [multiChartData, setMultiChartData] = useState([]);

  const buildRows = (readings) => (
    readings.map(reading => ({
      id: reading._id,
      timestamp: new Date(reading.createdAt),
      EnvironmentTemperature: reading.EnvironmentTemperature,
      EnvironmentHumidity: reading.EnvironmentHumidity,
      EnvironmentFootcandles: reading.EnvironmentFootcandles,
      EnvironmentLux: reading.EnvironmentLux,
    }))
  );

  const sortByDate = (data, numValues) => {
    let sortedData;

    if (numValues) {
      sortedData = data.slice(0, numValues);
    } else {
      sortedData = data;
    }
    return sortedData.sort(((a, b) => {
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      return 0;
    }))
  }

  const buildHumidityData = (readings, numValues = 10) => {
    const data = readings.map(reading => ({
      name: 'humidity',
      timestamp: new Date(reading.createdAt),
      value: reading.EnvironmentHumidity
    }))
    return sortByDate(data, numValues);
  };
  const buildTemperatureData = (readings, numValues = 10) => {
    const data = readings.map(reading => ({
      name: 'temperature',
      timestamp: new Date(reading.createdAt),
      value: reading.EnvironmentTemperature
    }))
    return sortByDate(data, numValues);
  };
  const buildFootcandlesData = (readings, numValues = 10) => {
    const data = readings.map(reading => ({
      name: 'footcandles',
      timestamp: new Date(reading.createdAt),
      value: reading.EnvironmentFootcandles
    }))
    return sortByDate(data, numValues);
  };

  // build table data with readings
  useEffect(() => {
    if (pico2Readings && pico2Readings.length) {
      const rowData = buildRows(pico2Readings);
      const humidityData = buildHumidityData(pico2Readings);
      const temperatureData = buildTemperatureData(pico2Readings);
      const footcandlesData = buildFootcandlesData(pico2Readings);
      const multiData = [
        ...humidityData,
        ...temperatureData,
        ...footcandlesData,
      ];
      setDataTableRows(rowData);
      setHumidityChartData(humidityData);
      setTemperatureChartData(temperatureData);
      setFootcandlesChartData(footcandlesData);
      setMultiChartData(multiData);
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

      <LineChartCard
        title='Humidity'
        chipLabel='pico-2'
        data={humidityChartData}
        height={400}
        color={theme.palette.primary.main}
      />
      <LineChartCard
        title='Temperature'
        chipLabel='pico-2'
        data={temperatureChartData}
        height={400}
        color={theme.palette.secondary.main}
      />
      <LineChartCard
        title='Footcandles'
        chipLabel='pico-2'
        data={footcandlesChartData}
        height={400}
        color={theme.palette.error.main}
      />

      <Stack direction='row' spacing={2} sx={{
        margin: '4rem',
      }}>
        <ChartComboCard
          multiChartData={multiChartData}
        />
      </Stack>

      {/* <Stack direction='row' spacing={2} sx={{
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
      </Stack> */}

      {/* <Stack direction='row' spacing={2} sx={{
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
      </Stack> */}
      <Paper elevation={4} sx={{
        margin: '4rem',
        padding: '2rem',
      }}>
        <DataTable rows={dataTableRows} />
      </Paper>
    </Box>
  );
}

export default App;
