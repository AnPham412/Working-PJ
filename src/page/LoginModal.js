import * as React from 'react';
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Modal, IconButton, InputAdornment, Stack, Alert, Link, Box} from "@mui/material";
import {VisibilityIcon} from "@mui/material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {LoadingButton} from "@mui/lab";
import useAuth from "../hook/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {FCheckbox, FormProvider, FTextField} from "../component/form";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 700,
    height: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const defaultValues = {
    username: "",
    password: "",
    remember: true,
};

const LoginModal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const auth = useAuth();
    const methods = useForm({resolver: yupResolver(LoginSchema), defaultValues});

    const {
        handleSubmit, reset, setError, formState: {errors, isSubmitting}
    } = methods;

    const onSubmit = async (data) => {
        const from = location.state?.from?.pathname || "/";
        let {email, password} = data;
        try {
            await auth.login({email, password}, () =>
                navigate(from, {replace: true})
            );
        } catch (error) {
            reset();
            setError("responseError", error);
        }
    };
    return (
        <div>
            <Modal open
                   onClose={navigate("/")}>
                <Box sx={style}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={3}>
                            {!!errors.responseError && (
                                <Alert severity="error">{errors.responseError.message}</Alert>
                            )}
                            <Alert severity="info">
                                Don’t have an account?{" "}
                                <Link variant="subtitle" to="/register">
                                    Get started
                                </Link>
                            </Alert>
                            <FTextField name="user" label="Username"/>
                            <FTextField name="password" label="Password" autoComplete="off"
                                        type={showPassword ? "string" : "password"}
                                        inputProp{{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}/>
                        </Stack>
                        <Stack sx={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <FCheckbox name="remember" label="Remember me"/>
                            <Link variant="subtitle" to="/">
                                Forgot password?
                            </Link>
                        </Stack>
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            Login
                        </LoadingButton>
                    </FormProvider>
                </Box>
            </Modal>
        </div>

    );
}
export default LoginModal;
