import * as React from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import useAuth from "../hook/useAuth";
import Logo from "../component/Logo";

function MainHeader() {
    const {isAuthenticated, user} = useAuth();
    return (
        <Box>
            <AppBar position="static" style={{background: '#2E3B55'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Logo/>
                    </IconButton>
                    <Typography>
                        Ao Dai Thai Ha
                    </Typography>
                    {isAuthenticated ? (
                        <Typography>
                            {user?.username}
                        </Typography>
                    ) : (
                        <Link to="/login" component={RouterLink} sx={{color: "white"}}>
                            Login
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default MainHeader;