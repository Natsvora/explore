import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable/DataTable';
import { makeStyles, createStyles } from '@material-ui/core/styles';
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
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>
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
    breadCrumbs: {
      margin: theme.spacing(1, 2, 2, 2),
      width: '95vw',
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
    headerName: 'Blocks Confirmed',
    type: 'number',
    width: 200,
  },
];

function Transaction(): JSX.Element {
  const [loading, setLoading] = useState(true);

  const data = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactionAsync(Number(data.id)));
    setTimeout(() => setLoading(false), 1000);
    return () => {
      dispatch(deleteTransactions());
    };
  }, [data.id]);

  const classes = useStyles();

  const transactions = useAppSelector(
    (state) => state.transaction.transactions
  );

  return (
    <Grid
      container
      className={classes.root}
      alignItems='center'
      justify='center'
    >
      <Breadcrumbs aria-label='breadcrumb' className={classes.breadCrumbs}>
        <Link color='inherit' href='/txn'>
          Transactions
        </Link>
        <Typography color='textPrimary'>
          Block : {data.id ? data.id : transactions[0]?.blockNumber}
        </Typography>
      </Breadcrumbs>

      <Card className={classes.card}>
        <div style={{ height: '100%', width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <DataTable
              row={transactions}
              columns={columns}
              options={{
                disableFilter: true,
                customFilter: true,
                loading: loading,
              }}
            />
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default Transaction;
