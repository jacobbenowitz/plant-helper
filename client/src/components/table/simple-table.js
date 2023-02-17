import {
  useState,
  useEffect,
} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchPico2Readings } from '../../actions/pico-2-actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPico2Readings } from '../../selectors/pico2-selectors';
import moment from 'moment';

function createData(timeStr, timestamp, temperature, humidity, footcandles, lux) {
  return { timeStr, timestamp, temperature, humidity, footcandles, lux };
}

const SimpleTable = () => {
  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);

  const pico2Readings = useSelector(state => selectAllPico2Readings(state));

  // fetch data on mount
  useEffect(() => {
    dispatch(fetchPico2Readings());
  }, []);

  // build table data with readings
  useEffect(() => {
    if (pico2Readings && pico2Readings.length) {
      const rowData = pico2Readings.map(reading => {
        return createData(
          reading.createdAt,
          moment(reading.createdAt).fromNow(),
          reading.EnvironmentTemperature,
          reading.EnvironmentHumidity,
          reading.EnvironmentFootcandles,
          reading.EnvironmentLux,
        );
      });
      setRows(rowData);
    }
  }, [pico2Readings]);



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell align="left">Temperature&nbsp;°F</TableCell>
            <TableCell align="left">Humidity&nbsp;(%)</TableCell>
            <TableCell align="left">Footcandles&nbsp;(fc)</TableCell>
            <TableCell align="left">Lux&nbsp;(lux)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.timestamp}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.timeStr}
              </TableCell>
              <TableCell align="left">{row.temperature}</TableCell>
              <TableCell align="left">{row.humidity}</TableCell>
              <TableCell align="left">{row.footcandles}</TableCell>
              <TableCell align="left">{row.lux}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SimpleTable;
