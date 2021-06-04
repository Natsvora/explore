import React from 'react';
import {
  GridOverlay,
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridCellParams,
  GridPagination,
} from '@material-ui/data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { isWidthUp, Tooltip, withWidth } from '@material-ui/core';
import { COLUMN_TYPE } from '../../common/constant';
import { defaultProps } from './dataTable.type';
import Grid from '@material-ui/core/Grid';

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

function CustomFooter(data: string, withPagination = false) {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <h3>{data}</h3>
        </Grid>
        <Grid item xs={12} sm={6}>
          {withPagination && <GridPagination />}
        </Grid>
      </Grid>
    </>
  );
}

/**
 * Add custom tooltip for all cells
 * @param data GridCellParams
 * @returns JSX element
 */
function addToolTip(data: GridCellParams) {
  return (
    <Tooltip title={data.value as string} placement='top'>
      <div className='MuiDataGrid-cell'>{data.value}</div>
    </Tooltip>
  );
}

function DataTable(props: defaultProps): JSX.Element {
  return (
    <DataGrid
      columns={props.columns.map((column) => {
        return {
          ...column,
          align: 'center',
          headerAlign: 'center',
          renderCell:
            column.type !== COLUMN_TYPE.NUMBER
              ? column.renderCell
                ? column.renderCell
                : addToolTip
              : undefined,
          flex: isWidthUp('sm', props.width) ? 0.1 : undefined,
        };
      })}
      rows={props.row}
      pageSize={
        props.options.noOfRecordsPerPage ? props.options.noOfRecordsPerPage : 10
      }
      loading={props.options?.loading}
      hideFooterPagination={props.options?.disablePagination}
      disableColumnMenu={props.options?.disableFilter}
      components={{
        Toolbar: props.options?.customFilter ? CustomToolbar : undefined,
        LoadingOverlay: CustomLoadingOverlay,
        Footer: props.note
          ? () =>
              CustomFooter(
                props.note as string,
                !props.options?.disablePagination
              )
          : undefined,
      }}
      onCellDoubleClick={(a) =>
        a.colDef.copyToClipBoard
          ? navigator.clipboard.writeText(a.value as string)
          : undefined
      }
    />
  );
}

export default withWidth()(DataTable);
