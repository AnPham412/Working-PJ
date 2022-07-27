import * as React from 'react';
import {useState} from "react";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Modal, IconButton, InputAdornment, Stack, Link, Divider, Typography, Button} from "@mui/material";
import {VisibilityIcon, VisibilityOffIcon} from "@mui/material"
import useAuth from "../hook/useAuth";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {FormProvider, FTextField} from "../component/form";
import {Alert, LoadingButton} from "@mui/lab";
import {Icon} from "@iconify/react/dist/iconify";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 850,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
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

const RegisterModal = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });
    const {
        handleSubmit,
        reset,
        setError,
        formState: {errors, isSubmitting},
    } = methods;
    const onSubmit = async (data) => {
        let {name, email, password} = data;
        try {
            await auth.register({name, email, password}, () => navigate("/"));
        } catch (error) {
            reset();
            setError("responseError", error);
        }
    };

    return (
        <div>
            <Modal open onClose={navigate("/")}>
                <Box sx={style}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Stack direction="row" spacing={2}>
                            <Button fullWidth size="large" color="inherit" variant="outlined">
                                <Icon icon="eva:google-fill" color="#DF3E30" width={22} height={22}/>
                            </Button>

                            <Button fullWidth size="large" color="inherit" variant="outlined">
                                <Icon icon="eva:facebook-fill" color="#1877F2" width={22} height={22}/>
                            </Button>

                            <Button fullWidth size="large" color="inherit" variant="outlined">
                                <Icon icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22}/>
                            </Button>
                        </Stack>
                        <Divider sx={{my: 3}}>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                OR
                            </Typography>
                        </Divider>
                        <Stack spacing={3} sx={{marginBottom: 3}}>
                            {!!errors.responseError && (
                                <Alert severity="error">{errors.responseError.message}</Alert>
                            )}
                            <Alert severity="info">
                                Already have an account?{""}
                                <Link variant="subtitle" to="/login">
                                    Sign in
                                </Link>
                            </Alert>
                            <FTextField name="name" label="Name"/>
                            <FTextField name="email" label="Email address"/>
                            <FTextField name="password" label="Password" autoComplete="on"
                                        type={showPassword ? "string" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)}
                                                                edge="end">
                                                        {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}/>
                            <FTextField name="passwordConfirmation" label="Password Confirmation" autoComplete="off"
                                        type={showPassword ? "string" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                        edge="end">
                                                        {showPasswordConfirmation ? <VisibilityIcon/> :
                                                            <VisibilityOffIcon/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}/>
                        </Stack>
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            Register
                        </LoadingButton>
                    </FormProvider>
                </Box>
            </Modal>
        </div>
    );
}

export default RegisterModal;