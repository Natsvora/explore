import React from 'react';
import DataTable from '../DataTable/DataTable';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useAppSelector } from '../../common/hooks/useAppDispatch';
import useLoadBlocks from '../../common/hooks/useLoadBlocks';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import { GridColDef } from '@material-ui/data-grid';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // background: 'linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)',
      minWidth: '100%',
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
    },
    card: {
      width: '95%',
      height: '80vh',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
    },
    link: {
      textDecoration: 'none',
    },
  })
);

const columns: GridColDef[] = [
  {
    field: 'number',
    headerName: 'Block',
    headerAlign: 'center',
    flex: 0.1,
  },
  {
    field: 'timestamp',
    headerName: 'Age',
    headerAlign: 'center',
    renderCell: function getAge(data) {
      return <TimeAgo date={`${new Date((data.value as number) * 1000)}`} />;
    },
    width: 150,
  },
  {
    field: 'noOfTransactions',
    headerName: 'Number Of Txn',
    headerAlign: 'center',
    type: 'link',
    renderCell: function getAge(data) {
      return <Link to={`/txn/${data.row.id}`}>{data.value}</Link>;
    },
    width: 200,
  },
  {
    field: 'miner',
    headerName: 'Miner',
    headerAlign: 'center',
    width: 500,
  },
  {
    field: 'gasUsed',
    headerName: 'Gas Used',
    headerAlign: 'center',
    type: 'number',
    width: 200,
  },
  {
    field: 'gasLimit',
    headerName: 'Gas Limit',
    headerAlign: 'center',
    type: 'number',
    width: 200,
  },
];

export default function Block(): JSX.Element {
  useLoadBlocks();
  const classes = useStyles();
  let blocks = useAppSelector((state) => state.block.blocks);
  blocks = blocks?.slice(0, 10);

  return (
    <Grid
      container
      className={classes.root}
      alignItems='center'
      justify='center'
    >
      <Card className={classes.card}>
        <div style={{ height: '100%', width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <DataTable
              row={blocks}
              columns={columns}
              options={{
                disableFilter: true,
                disablePagination: true,
              }}
            />
          </div>
        </div>
      </Card>
    </Grid>
  );
}
