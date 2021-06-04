import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { GridColDef } from '@material-ui/data-grid';

type defaultProps = {
  row: GridRowsProp;
  columns: GridColDef[];
  options: {
    disableFilter?: boolean;
    disablePagination?: boolean;
    customFilter?: boolean;
    loading: boolean;
    noOfRecordsPerPage?: number;
  };
  width: Breakpoint;
  note?: string;
};

export interface CustomGridColDef extends GridColDef {
  copyToClipBoard?: boolean | false;
}
