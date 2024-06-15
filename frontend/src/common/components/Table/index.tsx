import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'; 

function createData(name: string, procedure: string | string[]) {
  return { name, procedure };
}

const headers1 = ["Název doktora", "Procedura"];
const headers2 = ["Název místnosti", "Procedura"];
const headers3 = ["Název procedury", "Dostupnost"];

const rows1 = [
  createData('Jan Strach', "Operace slepého střeva"),
  createData('Martin Partin', "Operace slepého střeva"),
  createData('Emil Omáčka', "Operace slepého střeva"),
];

const rows2 = [
  createData('Chirurgie', ["Operace koleního kloubu", "Test"]),
  createData('Kardiologie', ["Operace srdce"]),
  createData('Portologie', ["Operace mozku", "Test", "Test"]),
];

const rows3 = [
  createData('Operace mozku', "Dostupné"),
  createData('Operace nohy', "Dostupné"),
  createData('Operace srdce', "Nedostupné"),
];

function BasicTable({ rows, headers }: { rows: any[], headers: string[] }) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>{headers[0]}</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">{headers[1]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': {
                  backgroundColor: 'rgba(99, 84, 239, 0.9)',
                }
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right"> {Array.isArray(row.procedure) ?
                  row.procedure.map((proc: string, index: number) => (
                    <div key={index}>{proc}</div>
                  )) :
                  row.procedure
                }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function MultiTables() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <BasicTable rows={rows1} headers={headers1} />
      </Grid>
      <Grid item xs={4}>
        <BasicTable rows={rows2} headers={headers2} />
      </Grid>
      <Grid item xs={4}>
        <BasicTable rows={rows3} headers={headers3} />
      </Grid>
    </Grid>
  );
}
