import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { map, keys } from 'lodash';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function ListingTable(props) {
  const { classes, data, header } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {
                map(header, val => {
                    return <TableCell>{val}</TableCell>
                })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell>{ (n.gender === 'male') ? 'M' : 'F' }</TableCell>
                <TableCell>{n.birthday}</TableCell>
                <TableCell>{n.phone}</TableCell>
                <TableCell>{n.email}</TableCell>
                <TableCell>{n.shirt_size}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

ListingTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListingTable);