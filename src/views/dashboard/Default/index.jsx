import React from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import { gridSpacing } from "../../../redux/slices/CustomizationSLice";
import MainCard from "../../../ui-component/cards/MainCard";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="Sample Card">
          <h1>Welcome to the vite Berry template</h1>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
