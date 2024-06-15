/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

import { IDoctor } from "@/common/utils/models/doctor";
import { IOperationRoom } from "@/common/utils/models/operationRoom";
import { IProcedure } from "@/common/utils/models/procedure";

type BasicTableProps = {
  rows: any[];
  headers: string[];
};

const BasicTable: React.FC<BasicTableProps> = ({ rows, headers }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>{headers[0]}</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              {headers[1]}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  backgroundColor: "rgba(99, 84, 239, 0.9)",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {Array.isArray(row.procedures)
                  ? row.procedures.map((proc: IProcedure) => (
                      <div key={proc.name}>{proc.name}</div>
                    ))
                  : row.procedures}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

type MultiTablesProps = {
  doctors: IDoctor[];
  operationRooms: IOperationRoom[];
  procedures: string[];
};

const MultiTables: React.FC<MultiTablesProps> = ({
  doctors,
  operationRooms,
  procedures,
}) => {
  const headers1 = ["Název doktora", "Procedura"];
  const headers2 = ["Název místnosti", "Procedura"];
  const headers3 = ["Název procedury", "Dostupnost"];

  const rows1 = doctors?.map((doctor) => ({
    name: `${doctor.firstName} ${doctor.lastName}`,
    procedures: doctor.procedures.map((procedure) => procedure.name).join(", "),
  }));

  const rows2 = operationRooms?.map((room) => ({
    name: room.name,
    procedures: room.procedures.map((procedure) => procedure.name),
  }));

  const rows3 = procedures?.map((procedure) => ({
    name: procedure,
    availability: "Dostupné", // Assuming all procedures are available for now
  }));

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
};

export default MultiTables;
