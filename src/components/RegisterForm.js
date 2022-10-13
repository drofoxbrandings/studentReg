import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { getAllNationality } from "../features/nationality/natinalitySlice";
import { listNationality } from "../features/nationality/nationalityApis";

const RegisterForm = (props) => {
  const dispatch = useDispatch();
  const nationalities = useSelector(getAllNationality);
  const nationalityStatus = useSelector((state) => state.nationality.status);
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
              firstName: studentData.familyMembers.firstName
                ? studentData.familyMembers.firstName
                : "",
              lastName: studentData.familyMembers.lastName
                ? studentData.familyMembers.lastName
                : "",
              relationship: studentData.familyMembers.relationship
                ? studentData.familyMembers.relationship
                : "",
              nationality: {
                Title: studentData.nationality.ID
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
          nationality: Yup.object().shape({
            Title: Yup.string().required("Date of birth is required"),
          }),
          familyMembers: Yup.array().of(
            Yup.object().shape({
              firstName: Yup.string().required("First name is required"),
              lastName: Yup.string().required("Last Name is required"),
              relationship: Yup.string().required("Relationship is required"),
              nationality: Yup.object().shape({
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
            <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
              <Field
                as={TextField}
                size="small"
                name="firstName"
                value={formikProps.values.firstName}
                label="First Name"
              />
              <ErrorMessage component="span" name="firstName" />
            </FormControl>
            <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
              <Field
                as={TextField}
                size="small"
                name="lastName"
                value={formikProps.values.lastName}
                label="First Name"
              />
              <ErrorMessage component="span" name="lastName" />
            </FormControl>
            <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
              <Field
                as={TextField}
                size="small"
                name="dateOfBirth"
                value={formikProps.values.dateOfBirth}
                label="First Name"
              />
              <ErrorMessage component="span" name="dateOfBirth" />
            </FormControl>
            <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
              <InputLabel id="basicNationality">Nationality</InputLabel>
              <Field
                labelId="basicNationality"
                as={Select}
                size="small"
                name="nationality"
                value={formikProps.values.nationality}
                label="Nationality"
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
