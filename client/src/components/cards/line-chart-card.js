import LineChart from '../charts/line-chart';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import SingleLineChart from '../charts/single-line-chart';

const LineChartCard = ({
  title,
  chipLabel,
  data,
  height,
  color,
}) => {

  return (
    <Stack direction='row' spacing={2} sx={{
      margin: '4rem',
    }}>
      <Paper elevation={4} sx={{
        height: height,
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
              {title}
            </Typography>
            <Chip label={chipLabel} size="small" />
          </Stack>
          <div style={{
            width: '100%',
            height: height - 50,
          }}>
            <SingleLineChart
              data={data}
              color={color}
            />
          </div>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default LineChartCard;