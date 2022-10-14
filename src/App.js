import React, { useState } from 'react';
import { Container, Grid, Typography, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import Students from './features/students/Students';

function App() {
  const [userRole, setUserRole] = useState('admin')
  const handleRoleChange = (e) => {
    setUserRole(e.target.value)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12} sm={12} md={10}>
              <Typography>
                Student Registration
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <FormControl fullWidth>
                <InputLabel id="selectRole">Select Role</InputLabel>
                <Select
                  variant='outlined'
                  size="small"
                  labelId='selectRole'
                  value={userRole}
                  onChange={handleRoleChange}
                  label="Role"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="registrar">Registrar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {/* {
            userRole && userRole === "admin" && */}
          <Grid container>
            <Grid item xs={12}>
              <Students role={userRole} />
            </Grid>
          </Grid>
          {/* } */}
        </Container>
      </header>
    </div>
  );
}

export default App;
