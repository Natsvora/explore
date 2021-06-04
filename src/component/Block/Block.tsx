import React from 'react';
import DataTable from '../DataTable/DataTable';
import {
  makeStyles,
  createStyles,
  Theme,
  fade,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import useLoadBlocks from '../../common/hooks/useLoadBlocks';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import BreadcrumbLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useAppSelector } from '../../common/hooks/useAppDispatch';
import LinearProgress from '@material-ui/core/LinearProgress';
import { BLOCK_FIELD, COLUMN_TYPE } from '../../common/constant';
import { CustomGridColDef } from '../DataTable/dataTable.type';

const useStyles = makeStyles((theme: Theme) =>
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
    link: {
      textDecoration: 'none',
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

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 5,
      display: 'block',
      width: '100%',
      borderRadius: 5,
      marginTop: -12,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: fade(theme.palette.primary.main, 0.85),
    },
  })
)(LinearProgress);

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      background: fade(theme.palette.primary.main, 0.85),
      border: `2px solid ${fade(theme.palette.primary.main, 0.8)}`,
      padding: '15px 20px',
    },
  })
)(Badge);

const columns: CustomGridColDef[] = [
  {
    field: BLOCK_FIELD.NUMBER.FIELD_NAME,
    headerName: BLOCK_FIELD.NUMBER.DISPLAY_NAME,
    copyToClipBoard: true,
    width: 200,
  },
  {
    field: BLOCK_FIELD.TIMESTAMP.FIELD_NAME,
    headerName: BLOCK_FIELD.TIMESTAMP.DISPLAY_NAME,
    renderCell: function getAge(data) {
      return <TimeAgo date={`${new Date((data.value as number) * 1000)}`} />;
    },
    width: 150,
  },
  {
    field: BLOCK_FIELD.NO_OF_TRANSACTION.FIELD_NAME,
    headerName: BLOCK_FIELD.NO_OF_TRANSACTION.DISPLAY_NAME,
    type: COLUMN_TYPE.LINK,
    description: 'Click Me! To view transaction detail',
    renderCell: function getAge(data) {
      return (
        <Link to={`/txn/${data.row.id}`}>
          <IconButton aria-label='cart'>
            <StyledBadge
              badgeContent={data.value ? data.value : '0'}
              color={'primary'}
              max={99999}
            ></StyledBadge>
          </IconButton>
        </Link>
      );
    },
    width: 200,
  },
  {
    field: BLOCK_FIELD.MINER.FIELD_NAME,
    headerName: BLOCK_FIELD.MINER.DISPLAY_NAME,
    sortable: false,
    copyToClipBoard: true,
    flex: 0.1,
  },
  {
    field: BLOCK_FIELD.GAS_USED.FIELD_NAME,
    renderCell: function loadProgress(data) {
      const progress = (
        ((data.value as number) /
          (data.getValue(data.id, 'gasLimit') as number)) *
        100
      )?.toFixed(2);
      return (
        <span>
          <span>{`${
            Number(data.value)
              .toFixed(1)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')
              .split('.')[0]
          } (${progress}%)`}</span>
          <BorderLinearProgress variant='determinate' value={Number(progress)}>
            {data.value}
          </BorderLinearProgress>
        </span>
      );
    },
    headerName: BLOCK_FIELD.GAS_USED.DISPLAY_NAME,
    type: COLUMN_TYPE.STRING,
    width: 200,
  },
  {
    field: BLOCK_FIELD.GAS_LIMIT.FIELD_NAME,
    headerName: BLOCK_FIELD.GAS_LIMIT.DISPLAY_NAME,
    type: COLUMN_TYPE.NUMBER,
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
        <BreadcrumbLink color='inherit'>Blocks</BreadcrumbLink>
        <Typography color='textPrimary'>
          Current Block : {blocks[0]?.id}
        </Typography>
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
