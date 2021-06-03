import React from 'react';
import {
  GridOverlay,
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@material-ui/data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';

/**
 * Creating custom toolbar
 * @returns Toolbar
 */
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

/**
 * Custom Loading bar
 * @returns Loading Overlay
 */
function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
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
      loading={props.options?.loading}
      hideFooterPagination={props.options?.disablePagination}
      disableColumnMenu={props.options?.disableFilter}
      components={{
        Toolbar: props.options?.customFilter ? CustomToolbar : undefined,
        LoadingOverlay: CustomLoadingOverlay,
      }}
    />
  );
}
