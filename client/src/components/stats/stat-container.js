import {
  useState,
  useEffect
} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2';
import SimpleStat from '../cards/simple-stat';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPico2Current, fetchPico2Readings } from '../../actions/pico-2-actions';
import {
  selectAllPico2Readings,
  selectPico2Status,
  selectPico2Current,
} from '../../selectors/pico2-selectors';
import { Stack } from '@mui/system';
import moment from 'moment';
import RefreshIcon from '@mui/icons-material/Refresh';

const StatContainer = ({ name }) => {
  const dispatch = useDispatch();

  const [currentPico2Readings, setCurrentPico2Readings] = useState({});
  const [lastRefresh, setLastRefresh] = useState('');

  const pico2Current = useSelector(state => selectPico2Current(state));
  const pico2Status = useSelector(state => selectPico2Status(state));

  // fetch data on mount
  useEffect(() => {
    dispatch(fetchPico2Current());
    setLastRefresh(new Date());
  }, []);

  // update state when data received
  useEffect(() => {
    if (pico2Current) {
      setCurrentPico2Readings(pico2Current);
    }
  }, [pico2Current]);

  return (
    <Grid2 container spacing={4}>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Stack direction={'row'} spacing={2}>
            <Typography variant="h5" sx={{
              textAlign: 'left',
              color: 'text.secondary',
              paddingLeft: '1rem'
            }}>
              {name}
            </Typography>
            <Button startIcon={<RefreshIcon />}>
              Refresh
            </Button>
          </Stack>
          <Stack direction='row' spacing={2} sx={{ alignItems: 'baseline' }}>
            <Typography sx={{
              color: 'text.secondary',
              fontSize: '10px'
            }}>
              {pico2Status}
            </Typography>
            <Typography variant='subtitle2' sx={{
              color: 'text.secondary',
            }}>
              {moment(lastRefresh).fromNow()}
            </Typography>
          </Stack>
        </Stack>
      </Grid2>
      <Grid2 xs={4}>
        <SimpleStat
          name='Humidity'
          value={currentPico2Readings?.EnvironmentHumidity}
          suffix='%'
        />
      </Grid2>
      <Grid2 xs={4}>
        <SimpleStat
          name='Temperature'
          value={currentPico2Readings?.EnvironmentTemperature}
          suffix='°F'
        />
      </Grid2>
      <Grid2 xs={4}>
        <SimpleStat
          name='Footcanles'
          value={currentPico2Readings?.EnvironmentFootcandles}
          suffix='fc'
        />
      </Grid2>
    </Grid2>
  )
}

export default StatContainer;