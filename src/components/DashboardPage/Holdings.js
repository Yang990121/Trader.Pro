import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Template/Title';
import Typography from '@mui/material/Typography';

// Generate Order Data
function createData(id, ticker, name, quantity, pricePurchase, totalPurchase, priceCurrent, priceTotal, difference) {
  return { id, ticker, name, quantity, pricePurchase, totalPurchase, priceCurrent, priceTotal, difference };
}

const rows = [
  createData(
    0,
    'ticker 1',
    'company name 1',
    0 + ' quantity',
    0 + ' pricePurchase',
    0 + ' totalPurchase',
    0 + ' priceCurrent',
    0 + ' priceTotal',
    0 + ' difference'
  ),
  createData(
    0,
    'ticker 2',
    'company name 2',
    0 + ' quantity',
    0 + ' pricePurchase',
    0 + ' totalPurchase',
    0 + ' priceCurrent',
    0 + ' priceTotal',
    0 + ' difference'
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Holdings() {
  return (
    <React.Fragment>
      <Title>Stocks in your Portfolio</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Company Ticker</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price of Purchase</TableCell>
            <TableCell>Purchase Total</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Current Total</TableCell>
            <TableCell align="right">Difference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.ticker}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{`$${row.pricePurchase}`}</TableCell>
              <TableCell>{`$${row.totalPurchase}`}</TableCell>
              <TableCell align="right">{`$${row.priceCurrent}`}</TableCell>
              <TableCell align="right">{`$${row.priceTotal}`}</TableCell>
              <TableCell align="right">{row.difference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <Typography color="textSecondary" align="center">
        {new Date().toDateString()}
      </Typography>
    </React.Fragment>
  );
}