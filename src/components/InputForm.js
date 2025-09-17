import React from "react";
import useStore from "../store";
import {
  TextField,
  Grid,
  Typography,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const InputField = ({ path, label, tooltip }) => {
  const { inputs, setInputs } = useStore();

  const value = path.split(".").reduce((o, i) => o[i], inputs);

  const handleChange = (e) => {
    const newInputs = JSON.parse(JSON.stringify(inputs));
    let current = newInputs;
    const parts = path.split(".");
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = Number(e.target.value) || 0;
    setInputs(newInputs);
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={11}>
        <TextField
          label={label}
          type="number"
          value={value}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={1}>
        <Tooltip title={tooltip}>
          <IconButton size="small">
            <InfoOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const InputForm = () => {
  return (
    <Grid container spacing={2}>
      {/* People Section */}
      <Grid item xs={12}>
        <Typography variant="subtitle1">People</Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person1.currentAge"
          label="P1 Age"
          tooltip="Current age of Person 1."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person2.currentAge"
          label="P2 Age"
          tooltip="Current age of Person 2."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person1.retirementAge"
          label="P1 Retirement Age"
          tooltip="Age at which Person 1 plans to retire."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person2.retirementAge"
          label="P2 Retirement Age"
          tooltip="Age at which Person 2 plans to retire."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person1.lifeExpectancy"
          label="P1 Life Expectancy"
          tooltip="Expected lifespan for Person 1."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person2.lifeExpectancy"
          label="P2 Life Expectancy"
          tooltip="Expected lifespan for Person 2."
        />
      </Grid>

      {/* Income Section */}
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Annual Income</Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person1.income"
          label="P1 Annual Income ($)"
          tooltip="Gross annual pre-tax income for Person 1."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person2.income"
          label="P2 Annual Income ($)"
          tooltip="Gross annual pre-tax income for Person 2."
        />
      </Grid>

      {/* Social Security Section */}
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Social Security (Monthly)</Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person1.ssStartAge"
          label="P1 SS Start Age"
          tooltip="Age Person 1 will begin Social Security benefits."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person2.ssStartAge"
          label="P2 SS Start Age"
          tooltip="Age Person 2 will begin Social Security benefits."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person1.ssBenefit"
          label="P1 SS Benefit ($)"
          tooltip="Monthly Social Security benefit in today's dollars."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="person2.ssBenefit"
          label="P2 SS Benefit ($)"
          tooltip="Monthly Social Security benefit in today's dollars."
        />
      </Grid>

      {/* Assets Section */}
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Assets</Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="assets.liquidAssets"
          label="Liquid Assets ($)"
          tooltip="Total value of cash, savings, and brokerage accounts."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="assets.ira"
          label="IRA / 401k ($)"
          tooltip="Total value of all tax-deferred retirement accounts."
        />
      </Grid>

      {/* Assumptions Section */}
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Assumptions</Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="assumptions.inflation"
          label="Inflation (%)"
          tooltip="The long-term expected annual inflation rate."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="assumptions.investmentGrowth"
          label="Growth (%)"
          tooltip="The expected annual growth rate of your investments."
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          path="assumptions.taxRate"
          label="Tax Rate (%)"
          tooltip="An estimated average tax rate for all income sources."
        />
      </Grid>

      {/* Expenses Section */}
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Expenses</Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <InputField
          path="expenses.monthly"
          label="Monthly Expenses ($)"
          tooltip="Your estimated monthly expenses in today's dollars."
        />
      </Grid>
    </Grid>
  );
};

export default InputForm;
