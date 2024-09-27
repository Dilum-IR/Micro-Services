import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';

const initialRows = [
  {
    id: 1,
    Notification: 'lorum ipsum lorum ipsum lorum ipsum ',
  },
  {
    id: 2,
    Notification: 'notification 2',
  },
  {
    id: 3,
    Notification: 'notification 3',
  },
];

export default function StaffNotification() {
  const [rows, setRows] = React.useState(initialRows);

  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );

  const columns = React.useMemo(
    () => [
      { field: 'Notification', type: 'string', flex: 3 }, // 75% width
      {
        field: 'actions',
        type: 'actions',
        flex: 1, // 25% width
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
        ],
      },
    ],
    [deleteUser],
  );

  return (
    <div style={{ width: '95%', padding: '16px' }}>
      <h1>Notifications</h1>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </div>
  );
}
