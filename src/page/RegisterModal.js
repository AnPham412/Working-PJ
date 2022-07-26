import * as React from 'react';
import {useState} from "react";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, Typography, Modal, IconButton, InputAdornment} from "@mui/material";
import {VisibilityIcon, VisibilityOffIcon} from "@mui/material"
import useAuth from "../hook/useAuth";

//check
const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
        .required("please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
    email: "",
    password: "",
    name: "",
    passwordConfirmation: "",
};

export default function RegisterModal() {
    return (
        <div></div>
    );
}

