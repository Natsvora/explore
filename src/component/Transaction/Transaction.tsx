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
import TimeAgo from 'react-timeago';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { COLUMN_TYPE, TRANSACTION_FIELD } from '../../common/constant';
import { CustomGridColDef } from '../DataTable/dataTable.type';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    card: {
      height: '70vh',
      width: '95%',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down(780)]: {
        height: '90vh',
        width: '90%',
      },
    },
    breadCrumbs: {
      margin: theme.spacing(4, 4, 4, 4),
      width: '95%',
      [theme.breakpoints.down(780)]: {
        margin: theme.spacing(1, 2, 2, 2),
        width: '90%',
      },
    },
  })
);

const columns: CustomGridColDef[] = [
  {
    field: TRANSACTION_FIELD.HASH.FIELD_NAME,
    headerName: TRANSACTION_FIELD.HASH.DISPLAY_NAME,
    type: COLUMN_TYPE.STRING,
    copyToClipBoard: true,
    width: 400,
  },
  {
    field: TRANSACTION_FIELD.TIMESTAMP.FIELD_NAME,
    headerName: TRANSACTION_FIELD.TIMESTAMP.DISPLAY_NAME,
    renderCell: function getAge(data) {
      return <TimeAgo date={`${new Date((data.value as number) * 1000)}`} />;
    },
    width: 150,
    filterable: false,
  },
  {
    field: TRANSACTION_FIELD.FROM.FIELD_NAME,
    headerName: TRANSACTION_FIELD.FROM.DISPLAY_NAME,
    copyToClipBoard: true,
    flex: 0.1,
  },
  {
    field: TRANSACTION_FIELD.TO.FIELD_NAME,
    headerName: TRANSACTION_FIELD.TO.DISPLAY_NAME,
    copyToClipBoard: true,
    flex: 0.1,
  },
  {
    field: TRANSACTION_FIELD.VALUE.FIELD_NAME,
    headerName: TRANSACTION_FIELD.VALUE.DISPLAY_NAME,
    type: COLUMN_TYPE.NUMBER,
    copyToClipBoard: true,
    valueGetter: (data) => {
      return parseInt(data.value as string, 16) / 1000000000000000000;
    },
    width: 200,
  },
  {
    field: TRANSACTION_FIELD.CONFIRMED.FIELD_NAME,
    headerName: TRANSACTION_FIELD.CONFIRMED.DISPLAY_NAME,
    type: COLUMN_TYPE.NUMBER,
    width: 200,
  },
];

function Transaction(): JSX.Element {
  const [loading, setLoading] = useState(true);

  const data = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    //loading transactions for given block
    dispatch(fetchTransactionAsync(Number(data.id)));
    // after 1 sec setting loader off
    setTimeout(() => setLoading(false), 1000);
    return () => {
      // on clean up deleting all transactions
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
        <Link color='inherit'>Transactions</Link>
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
              note={`Note: Double click on ${columns
                .map((column) => {
                  if (column.copyToClipBoard) return column.headerName;
                })
                .filter((e) => {
                  return e != null;
                })
                .join(',')} will copy content to clipboard`}
            />
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default Transaction;
