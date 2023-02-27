import {
  useState
} from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SimpleStat = ({ name = 'Metric Name', value = 0, suffix = '', id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <Card
      elevation={16}
      id={id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardContent sx={{ minWidth: 275 }}>
        <Stack spacing={2}>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {name}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="baseline">
            <Typography variant="h5">
              {value}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {suffix}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SimpleStat;