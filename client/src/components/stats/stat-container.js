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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import SimpleStatBasic from '../cards/simple-stat-basic';

const initStatItems = [
  { id: 'humidity-stat', name: 'Humidity', value: 0, suffix: '%' },
  { id: 'temp-stat', name: 'Temperature', value: 0, suffix: '°F' },
  { id: 'footcandles-stat', name: 'Footcandles', value: 0, suffix: 'fc' },
]

const StatContainer = ({ name }) => {
  const dispatch = useDispatch();

  const [currentPico2Readings, setCurrentPico2Readings] = useState({});
  const [lastRefresh, setLastRefresh] = useState('');
  const [activeItem, setActiveItem] = useState(null);

  const pico2Current = useSelector(state => selectPico2Current(state));
  const pico2Status = useSelector(state => selectPico2Status(state));

  const [statItems, setStatItems] = useState(initStatItems);

  useEffect(() => {
    if (currentPico2Readings) {
      const newReadings = statItems.map(item => {
        if (item.id === 'humidity-stat') {
          return {
            ...item,
            value: currentPico2Readings?.EnvironmentHumidity,
          }
        } else if (item.id === 'temp-stat') {
          return {
            ...item,
            value: currentPico2Readings?.EnvironmentTemperature,
          }
        } else if (item.id === 'footcandles-stat') {
          return {
            ...item,
            value: currentPico2Readings?.EnvironmentFootcandles,
          }
        }
      })
      setStatItems(newReadings)
    }
  }, [currentPico2Readings]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setStatItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveItem(null);
  }

  const handleDragStart = (event) => {
    const { active } = event;
    const item = statItems.find(item => item.id === active.id);
    setActiveItem(item);
  }


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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext
          items={statItems}
          strategy={rectSortingStrategy}
        >
          {statItems.map((item, index) => (
            <Grid2 xs={4} id={item.id} key={item.id}
              sx={activeItem?.id === item.id ? {
                opacity: 0.5
              } : {
                opacity: 1
              }}
            >
              <SimpleStat
                name={item.name}
                value={item.value}
                suffix={item.suffix}
                id={item.id}
              />
            </Grid2>
          ))}
        </SortableContext>
        <DragOverlay>
          {activeItem ? (
            <SimpleStatBasic
              id={activeItem.id}
              name={activeItem.name}
              value={activeItem.value}
              suffix={activeItem.suffix}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Grid2 >
  )
}

export default StatContainer;