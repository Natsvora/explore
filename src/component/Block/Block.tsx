import React from 'react';
import DataTable from '../DataTable/DataTable';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import useLoadBlocks from '../../common/hooks/useLoadBlocks';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import { GridColDef } from '@material-ui/data-grid';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import BreadcrumbLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useAppSelector } from '../../common/hooks/useAppDispatch';

const useStyles = makeStyles((theme: Theme) =>
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
      textAlign: 'center',
    },
    link: {
      textDecoration: 'none',
    },
    breadCrumbs: {
      margin: theme.spacing(1, 2, 2, 2),
      width: '95vw',
    },
  })
);

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      background: theme.palette.secondary.main,
      border: `2px solid ${theme.palette.secondary.main}`,
      padding: '15px 20px',
    },
  })
)(Badge);

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
      return (
        <Link to={`/txn/${data.row.id}`}>
          <IconButton aria-label='cart'>
            <StyledBadge
              badgeContent={data.value ? data.value : '0'}
              color='secondary'
              max={99999}
            ></StyledBadge>
          </IconButton>
        </Link>
      );
    },
    width: 200,
  },
  {
    field: 'miner',
    headerName: 'Miner',
    headerAlign: 'center',
    width: 500,
    sortable: false,
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
      <Breadcrumbs aria-label='breadcrumb' className={classes.breadCrumbs}>
        <BreadcrumbLink color='inherit' href='/block'>
          Transactions
        </BreadcrumbLink>
        <Typography color='textPrimary'>Block : {blocks[0]?.id}</Typography>
      </Breadcrumbs>

      <Card className={classes.card}>
        <div style={{ height: '100%', width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <DataTable
              row={blocks}
              columns={columns}
              options={{
                disableFilter: true,
                disablePagination: true,
                loading: blocks.length < 9,
              }}
            />
          </div>
        </div>
      </Card>
    </Grid>
  );
}
