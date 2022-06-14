import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#007AFF',
    color: theme.palette.common.white,
    fontSize: 16
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function MarksTable( {marksList} ) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Module</StyledTableCell>
            <StyledTableCell align="right">Note Emd 01</StyledTableCell>
            <StyledTableCell align="right">Note Emd 02</StyledTableCell>
            <StyledTableCell align="right">Control countinue</StyledTableCell>
            <StyledTableCell align="right">Moyenne</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {marksList?marksList.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.module.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.emd1}</StyledTableCell>
              <StyledTableCell align="right">{row.emd2}</StyledTableCell>
              <StyledTableCell align="right">{row.cc}</StyledTableCell>
              <StyledTableCell align="right">{row.avg}</StyledTableCell>
            </StyledTableRow>
          )):''}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
