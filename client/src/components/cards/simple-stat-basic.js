import * as React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system";

const SimpleStatBasic = ({
  name = 'Metric Name',
  value = 0,
  suffix = '',
  id
}) => {
  return (
    <Card
      elevation={16}
      id={id}
      sx={{ cursor: 'grabbing' }}
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

export default SimpleStatBasic;