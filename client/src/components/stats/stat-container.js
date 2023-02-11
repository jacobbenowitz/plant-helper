import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2';
import SimpleStat from '../cards/simple-stat';

const StatContainer = () => (
  <Grid2 container spacing={4}>
    <Grid2 xs={4}>
      <SimpleStat />
    </Grid2>
    <Grid2 xs={4}>
      <SimpleStat />
    </Grid2>
    <Grid2 xs={4}>
      <SimpleStat />
    </Grid2>
  </Grid2>
)

export default StatContainer;