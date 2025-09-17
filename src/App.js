import React from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";
import InputForm from "./components/InputForm";
import Report from "./components/Report";
import ScenarioControls from "./components/ScenarioControls";
import PrivacyInfo from "./components/PrivacyInfo";

function App() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Retirement "What-If" Scenario Planner
          <PrivacyInfo />
        </Typography>
        <ScenarioControls />
      </Paper>

      <Grid container spacing={3}>
        {/* Changed layout to be vertical */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Inputs & Assumptions
            </Typography>
            <InputForm />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Year-by-Year Projection
            </Typography>
            <Report />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
