import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { Paper } from '@mui/material';

const columns = [
  {
    field: 'timestamp',
    headerName: 'Time',
    flex: 1,
    valueFormatter: (params) => moment(params.value).fromNow()
  },
  { field: 'EnvironmentTemperature', headerName: 'Temperature (°F)', flex: 1 },
  { field: 'EnvironmentHumidity', headerName: 'Humidity (%)', flex: 1 },
  { field: 'EnvironmentFootcandles', headerName: 'Footcandles (fc)', flex: 1 },
  { field: 'EnvironmentLux', headerName: 'Lux (lx)', flex: 1 },
];

const DataTable = ({ rows }) => {
  return (
    <Paper sx={{ width: '100%', height: '579px' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            // pageSize={15}
            // rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}
            autoPageSize
            initialState={{
              sorting: {
                sortModel: [{ field: 'timestamp', sort: 'desc' }],
              },
            }}
          />
        </div>
      </div>
    </Paper>
  );
}

export default DataTable;