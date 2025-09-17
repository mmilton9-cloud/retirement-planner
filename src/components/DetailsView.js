import React from "react";
import { Modal, Box, Typography, Button, Grid, Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const formatCurrency = (value) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const DetailRow = ({ label, value, bold = false }) => (
  <>
    <Grid item xs={8}>
      <Typography variant="body1" fontWeight={bold ? "bold" : "normal"}>
        {label}
      </Typography>
    </Grid>
    <Grid item xs={4} sx={{ textAlign: "right" }}>
      <Typography variant="body1" fontWeight={bold ? "bold" : "normal"}>
        {formatCurrency(value)}
      </Typography>
    </Grid>
  </>
);

const DetailsView = ({ yearData, onClose }) => {
  if (!yearData) return null;

  const netCashFlow = yearData.grossIncome - yearData.taxes - yearData.expenses;

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" gutterBottom>
          Details for Year {yearData.year} (Ages: {yearData.ages})
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Financial Summary
            </Typography>
            <Grid container spacing={1}>
              <DetailRow label="Gross Income" value={yearData.grossIncome} />
              <DetailRow label="(-) Taxes" value={-yearData.taxes} />
              <DetailRow
                label="(-) Annual Expenses"
                value={-yearData.expenses}
              />
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <DetailRow
                label="Net Cash Flow"
                value={netCashFlow}
                bold={true}
              />
            </Grid>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Net Worth Reconciliation
            </Typography>
            <Grid container spacing={1}>
              <DetailRow
                label="Start of Year Net Worth"
                value={yearData.startOfYearNetWorth}
              />
              <DetailRow
                label="(+) Investment Growth"
                value={yearData.investmentGrowth}
              />
              <DetailRow label="(+) Net Cash Flow" value={netCashFlow} />
              <DetailRow
                label="(+/-) One-Time Events"
                value={yearData.events}
              />
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <DetailRow
                label="End of Year Net Worth"
                value={yearData.netWorth}
                bold={true}
              />
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailsView;
