import React, { useState } from "react";
import useStore from "../store";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";

const ScenarioControls = () => {
  const {
    scenarios,
    activeScenario,
    saveScenario,
    loadScenario,
    deleteScenario,
  } = useStore();
  const [scenarioName, setScenarioName] = useState("");

  const handleSave = () => {
    if (scenarioName) {
      saveScenario(scenarioName);
      setScenarioName("");
    } else {
      alert("Please enter a name for the scenario.");
    }
  };

  const handleDelete = () => {
    if (
      activeScenario &&
      window.confirm(`Are you sure you want to delete "${activeScenario}"?`)
    ) {
      deleteScenario(activeScenario);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
        mt: 2,
        mb: 1,
      }}
    >
      <TextField
        label="New Scenario Name"
        value={scenarioName}
        onChange={(e) => setScenarioName(e.target.value)}
        variant="outlined"
        size="small"
      />
      <Button variant="contained" onClick={handleSave}>
        Save As...
      </Button>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Load Scenario</InputLabel>
        <Select
          value={activeScenario || ""}
          label="Load Scenario"
          onChange={(e) => loadScenario(e.target.value)}
        >
          <MenuItem value="" disabled>
            <em>Select a scenario</em>
          </MenuItem>
          {Object.keys(scenarios).map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        color="error"
        onClick={handleDelete}
        disabled={!activeScenario}
      >
        Delete
      </Button>
      {activeScenario && (
        <Typography variant="caption">Current: {activeScenario}</Typography>
      )}
    </Box>
  );
};

export default ScenarioControls;
