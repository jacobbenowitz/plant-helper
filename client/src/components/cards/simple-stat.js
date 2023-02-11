import * as React from "react";
import { Card, CardContent, Typography } from "@mui/material"

const SimpleStat = () => {

  return (
    <Card elevation={16}>
      <CardContent sx={{minWidth: 275}}>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          Metric Name
        </Typography>
        <Typography variant="h5">
          100
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SimpleStat;