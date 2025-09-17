import React, { useState } from "react";
import useStore from "../store";
import DetailsView from "./DetailsView";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
} from "@mui/material";

const Report = () => {
  const projection = useStore((state) => state.projection);
  const [selectedYear, setSelectedYear] = useState(null);

  const formatCurrency = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  if (!projection || projection.length === 0)
    return <p>Loading projection...</p>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ages</TableCell>
              <TableCell align="right">Net Worth</TableCell>
              <TableCell align="right">Net Worth (Today's $)</TableCell>
              <TableCell align="right">Discretionary</TableCell>
              <TableCell align="right">Discretionary (Today's $)</TableCell>
              <TableCell align="right">Events</TableCell>
              <TableCell align="right">Total IRA</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projection.map((yearData) => (
              <TableRow key={yearData.year} hover>
                <TableCell>{yearData.ages}</TableCell>
                <TableCell align="right">
                  {formatCurrency(yearData.netWorth)}
                </TableCell>
                <TableCell align="right" sx={{ color: "text.secondary" }}>
                  {formatCurrency(yearData.netWorthTodays)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: yearData.discretionary < 0 ? "red" : "green" }}
                >
                  {formatCurrency(yearData.discretionary)}
                </TableCell>
                <TableCell align="right" sx={{ color: "text.secondary" }}>
                  {formatCurrency(yearData.discretionaryTodays)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(yearData.events)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(yearData.totalIRA)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setSelectedYear(yearData)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedYear && (
        <DetailsView
          yearData={selectedYear}
          onClose={() => setSelectedYear(null)}
        />
      )}
    </>
  );
};

export default Report;
