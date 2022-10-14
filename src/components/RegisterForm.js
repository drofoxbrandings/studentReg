import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { getAllNationality } from "../features/nationality/natinalitySlice";
import { listNationality } from "../features/nationality/nationalityApis";
import DeleteIcon from '@mui/icons-material/Delete';

const RegisterForm = (props) => {
  const dispatch = useDispatch();
  const nationalities = useSelector(getAllNationality);
  const nationalityStatus = useSelector((state) => state.nationality.status);
  const [familyMembersForm, setFamilyMembersForm] = useState([
    {
      firstName: "",
      lastName: "",
      relationship: "",
      nationality: {
        ID: "",
        Title: "",
      },
    }
  ])
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: {
      ID: "",
      Title: "",
    },
    familyMembers: [
      {
        firstName: "",
        lastName: "",
        relationship: "",
        nationality: {
          ID: "",
          Title: "",
        },
      },
    ],
  });

  useEffect(() => {
    if (nationalityStatus === "idle") {
      dispatch(listNationality()).unwrap();
    }
  }, [nationalityStatus, dispatch]);

  useEffect(() => {
    console.log(nationalities);
  }, [nationalityStatus]);

  const handleSelectChange = (e, setFieldValue) => {
    setFieldValue(e.target.name, e.target.value);
    console.log(e.target.value)
  }

  const handleAddFamilyMember = () => {
    setFamilyMembersForm([...familyMembersForm, {
      firstName: "",
      lastName: "",
      relationship: "",
      nationality: {
        ID: "",
        Title: "",
      },
    }])
    console.log(JSON.stringify(studentData))
  }

  const deleteFamilyMember = (idx) => {
    let newForm = [...familyMembersForm]
    if (idx !== 0) {
      newForm.splice(idx, 1)
    }
    setFamilyMembersForm(newForm)
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: studentData.lastName ? studentData.lastName : "",
          dateOfBirth: studentData.dateOfBirth ? studentData.dateOfBirth : "",
          nationality: {
            Title: studentData.nationality.ID
              ? studentData.nationality.Title
              : "",
          },
          familyMembers: [
            {
              famfirstname: studentData.familyMembers.firstName
                ? studentData.familyMembers.firstName
                : "",
              famlastName: studentData.familyMembers.lastName
                ? studentData.familyMembers.lastName
                : "",
              relationship: studentData.familyMembers.relationship
                ? studentData.familyMembers.relationship
                : "",
              famNationality: {
                ID: studentData.nationality.ID
                  ? studentData.nationality.Title
                  : "",
              },
            },
          ],
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last Name is required"),
          dateOfBirth: Yup.string().required("Date of birth is required"),
          nationality: Yup.object().nullable().shape({
            Title: Yup.string().required("Date of birth is required"),
          }),
          familyMembers: Yup.array().of(
            Yup.object().shape({
              famfirstname: Yup.string().required("First name is required"),
              famlastName: Yup.string().required("Last Name is required"),
              relationship: Yup.string().required("Relationship is required"),
              famNationality: Yup.object().nullable().shape({
                Title: Yup.string().required("Date of birth is required"),
              }),
            })
          ),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          alert(JSON.stringify(values));
        }}
      >
        {(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            <Typography variant="body1">Basic information</Typography>
            <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
              <Field
                disabled={props.isDisabled}
                as={TextField}
                size="small"
                name="firstName"
                value={formikProps.values.firstName}
                label="First Name"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              />
              <ErrorMessage component="span" name="firstName" />
            </FormControl>
            <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
              <Field
                disabled={props.isDisabled}
                as={TextField}
                size="small"
                name="lastName"
                value={formikProps.values.lastName}
                label="Last Name"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              />
              <ErrorMessage component="span" name="lastName" />
            </FormControl>
            <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
              <Field
                disabled={props.isDisabled}
                as={TextField}
                size="small"
                name="dateOfBirth"
                value={formikProps.values.dateOfBirth}
                label="Date of birth"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              />
              <ErrorMessage component="span" name="dateOfBirth" />
            </FormControl>
            <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
              <InputLabel id="basicNationality">Nationality</InputLabel>
              <Field
                disabled={props.isDisabled}
                labelId="basicNationality"
                as={Select}
                size="small"
                name="nationality"
                // value={formikProps.values.nationality.ID}
                label="Nationality"
                onChange={(e) => handleSelectChange(e, formikProps.setFieldValue)}
                onBlur={formikProps.handleBlur}
              >
                {nationalities &&
                  nationalities.map((nt) => (
                    <MenuItem value={nt.ID} key={nt.ID}>
                      {nt.Title}
                    </MenuItem>
                  ))}
              </Field>
              <ErrorMessage component="span" name="nationality" />
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
              <Typography variant="body1" gutterBottom>Family Members</Typography>
              <Button variant="contained" size="small" onClick={handleAddFamilyMember}>Add Family member</Button>
            </Box>
            {
              familyMembersForm.map((members, index) => (
                <Paper elevation={1} sx={{ padding: '1rem', marginBottom: '.5rem' }}>
                  {index > 0 &&
                    < Grid container>
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton sx={{ color: "#FF0000" }} onClick={(e) => deleteFamilyMember(index, e)}><DeleteIcon /></IconButton>
                      </Grid>
                    </Grid>
                  }

                  <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
                    <Field
                      disabled={props.isDisabled}
                      as={TextField}
                      size="small"
                      name="famfirstname"
                      label="First Name"
                      value={formikProps.values.familyMembers.famfirstname}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                    <ErrorMessage component="span" name="famfirstname" />
                  </FormControl>
                  <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
                    <Field
                      disabled={props.isDisabled}
                      as={TextField}
                      size="small"
                      name="famLastname"
                      label="Last Name"
                      value={formikProps.values.familyMembers.famLastname}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                    <ErrorMessage component="span" name="famLastname" />
                  </FormControl>
                  <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
                    <InputLabel id="relation">Relationship</InputLabel>
                    <Field
                      disabled={props.isDisabled}
                      labelId="relation"
                      as={Select}
                      size="small"
                      name="relationship"
                      value={formikProps.values.familyMembers.relationship}
                      label="Relationship"
                      onChange={(e) => handleSelectChange(e, formikProps.setFieldValue)}
                      onBlur={formikProps.handleBlur}
                    >
                      <MenuItem value="parent">
                        Parent
                      </MenuItem>
                      <MenuItem value="sibling">
                        Sibling
                      </MenuItem>
                      <MenuItem value="spouce">
                        Spouce
                      </MenuItem>
                    </Field>
                    <ErrorMessage component="span" name="relationship" />
                  </FormControl>
                  <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
                    <InputLabel id="famNationality">Nationality</InputLabel>
                    <Field
                      disabled={props.isDisabled}
                      labelId="famNationality"
                      as={Select}
                      size="small"
                      name="famNationality"
                      value={formikProps.values.familyMembers.famNationality}
                      label="Nationality"
                      onChange={(e) => handleSelectChange(e, formikProps.setFieldValue)}
                      onBlur={formikProps.handleBlur}
                    >
                      {nationalities &&
                        nationalities.map((nt) => (
                          <MenuItem value={nt.ID} key={nt.ID}>
                            {nt.Title}
                          </MenuItem>
                        ))}
                    </Field>
                    <ErrorMessage component="span" name="famNationality" />
                  </FormControl>
                </Paper>
              ))
            }
            <Grid container sx={{ margin: '1rem 0' }}>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="outlined" onClick={props.handleFormClose}>
                  Cancel
                </Button></Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth type="submit" variant="contained">Submit</Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
