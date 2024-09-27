import React , { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import {Axios_notifications } from "../../api/Axios";
import * as API_ENDPOINTS from "../../api/ApiEndpoints";
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
  const [rows, setRows] = useState(initialRows);

  async function getPackageDetails() {
    const res = await Axios_notifications.get(API_ENDPOINTS.GET_NOTIFICATION);
    console.log(res.data);
    const rows = [];
    
  for (const item of res.data) {
    rows.push({
      id: item.id,
      Notification: `${item.type} | ${item.Notification} | Date : ${item.issued_date}`,
    });
  }
    setRows(rows);
  }
  useEffect(() => {
    getPackageDetails();
  }, []);


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
      { field: 'Notification', type: 'string', flex: 3 },
      {
        field: 'actions',
        type: 'actions',
        flex: 1, // 25% width
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EyeIcon />}
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
