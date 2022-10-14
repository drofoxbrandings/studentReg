import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllStudents } from "./studentSlice";
import { listStudents } from "./studentApi";
import { DataGrid } from "@mui/x-data-grid";
import RegisterForm from "../../components/RegisterForm";

const Students = (props) => {
  const dispatch = useDispatch();
  const students = useSelector(getAllStudents);
  const studentStatus = useSelector((state) => state.student.status);
  const [dataLoading, setDataLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (studentStatus === "idle") {
      dispatch(listStudents()).unwrap();
    }
    if (studentStatus === "pending") {
      setDataLoading(true);
    }
    if (studentStatus === "rejected") {
      setIsError(true);
      setErrorMessage("Something went wrong!!");
      setDataLoading(false);
    }
    if (studentStatus === "fullfilled") {
      setIsError(false);
      setErrorMessage("");
      setDataLoading(false);
    }
  }, [studentStatus, dispatch]);

  useEffect(() => {
    console.log(students);
  }, [students]);

  const tableColumns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      headerClassName: "customColor",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      headerClassName: "customColor",
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      flex: 1,
      headerClassName: "customColor",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: "customColor",
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={(e) => handleEdit(props.role)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (role) => {
    setIsDisabled(role === "admin" ? true : false)
    handleFormOpen('edit')
  }

  const handleClose = () => {
    setIsError(false);
  };
  const handleFormOpen = (value) => {
    if (value === "add") {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
    setOpenForm(true);
  };
  const handleFormClose = () => {
    setOpenForm(false);
  };
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={(e) => handleFormOpen("add")}
          >
            Add new
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", marginTop: "2rem" }}>
            {isError && (
              <Snackbar
                open={isError}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            )}
            <DataGrid
              autoHeight
              rows={students ? students : []}
              columns={tableColumns}
              getRowId={(row) => row.ID}
              disableSelectionOnClick
              loading={dataLoading}
              components={{
                LoadingOverlay: LinearProgress,
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Dialog open={openForm} onClose={handleFormClose}>
        <DialogTitle>
          <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
            {isRegister ? "Add new student" : "Edit Student"}{" "}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <RegisterForm handleFormClose={handleFormClose} isDisabled={isDisabled}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Students;
