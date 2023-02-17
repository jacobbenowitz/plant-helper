import LineChart from '../charts/line-chart';
import { Chip, Paper, Stack, Typography } from '@mui/material';

const LineChartCard = ({
  title,
  chipLabel,
  data,
  ref,
  width,
  height,
}) => {

  return (
    <Stack direction='row' spacing={2} sx={{
      margin: '4rem',
    }}>
      <Paper elevation={4} sx={{
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
              {title}
            </Typography>
            <Chip label={chipLabel} />
          </Stack>
          <div ref={ref} style={{
            width: '100%',
            height: '250px',
          }}>
            <LineChart
              data={data}
              width={width}
              height={height}
            />
          </div>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default LineChartCard;