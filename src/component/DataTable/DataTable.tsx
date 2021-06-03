import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@material-ui/data-grid';

type defaultProps = {
  row: GridRowsProp;
  columns: GridColDef[];
  options?: {
    disableFilter?: boolean;
    disablePagination?: boolean;
    customFilter?: boolean;
  };
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function DataTable(props: defaultProps): JSX.Element {
  return (
    <DataGrid
      autoHeight
      columns={props.columns.map((column) => {
        return { ...column, align: 'center', headerAlign: 'center' };
      })}
      rows={props.row}
      pageSize={10}
      hideFooterPagination={props.options?.disablePagination}
      disableColumnMenu={props.options?.disableFilter}
      components={{
        Toolbar: props.options?.customFilter ? CustomToolbar : undefined,
      }}
    />
  );
}
