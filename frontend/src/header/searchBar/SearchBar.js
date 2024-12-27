import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import top100Restaurants from "./demodata";

export default function ComboBox() {
  return (
    <Box>
      <Autocomplete
        disablePortal
        options={top100Restaurants}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="things to do, nail salon, plumbers" />
        )}
      />
      <Button>Search</Button>
    </Box>
  );
}
