import React, { useEffect } from 'react';
import DataTable from '../DataTable/DataTable';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import {
  useAppDispatch,
  useAppSelector,
} from '../../common/hooks/useAppDispatch';
import { useParams } from 'react-router-dom';
import { deleteTransactions, fetchTransactionAsync } from './transactionSlice';
import { GridColDef } from '@material-ui/data-grid';
import TimeAgo from 'react-timeago';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
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
    },
  })
);

const columns: GridColDef[] = [
  {
    field: 'hash',
    headerName: 'Txn Hash',
    type: 'string',
    width: 400,
  },
  {
    field: 'timestamp',
    headerName: 'Age',
    renderCell: function getAge(data) {
      return <TimeAgo date={`${new Date((data.value as number) * 1000)}`} />;
    },
    width: 150,
    filterable: false,
  },
  {
    field: 'from',
    headerName: 'From',
    headerAlign: 'center',
    flex: 0.1,
  },
  {
    field: 'to',
    headerName: 'To',
    flex: 0.1,
  },
  {
    field: 'value',
    headerName: 'Amount(In Ether)',
    type: 'number',
    valueGetter: (data) => {
      return parseInt(data.value as string, 16) / 1000000000000000000;
    },
    width: 200,
  },
  {
    field: 'confirmations',
    headerName: 'Blocks Confirmations',
    type: 'number',
    width: 200,
  },
];

function Transaction(): JSX.Element {
  const data = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactionAsync(Number(data.id)));
    return () => {
      dispatch(deleteTransactions());
    };
  }, [data.id]);

  const classes = useStyles();

  const transactions = useAppSelector(
    (state) => state.transaction.transactions
  );

  return (
    <Grid className={classes.root} alignItems='center' justify='center'>
      <Card className={classes.card}>
        <div style={{ height: '100%', width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <DataTable
              row={transactions}
              columns={columns}
              options={{
                disableFilter: true,
                customFilter: true,
              }}
            />
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default Transaction;
