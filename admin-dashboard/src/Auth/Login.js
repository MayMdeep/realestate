import React, { useState } from "react";
import { Helper } from "../Tools/Helper";
import { api_Routes } from "../api_Route";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Route/AuthContext";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import photo from "../assets/Logo.png";
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isloading, setisloading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { login } = useAuth();

    const loginAuth = async (e) => {
        e.preventDefault();
        console.log("Login button clicked"); // Debug log
        setisloading(true);
        const { response, message } = await Helper.Post({
            url: api_Routes.auth.login,
            data: {
                email: email,
                password: password
            }
        });
        if (response) {
            console.log("Login successful", response); // Debug log
            setisloading(false);
            localStorage.setItem("user", JSON.stringify({
                token: response.data?.token,
            }));
            login(response.data.token);

            enqueueSnackbar(message, {
                variant: "success",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
           return navigate('/metrics');
        } else {
            console.log("Login failed", message); // Debug log
            setisloading(false);
            enqueueSnackbar(message, {
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: '20px', width: '100%', maxWidth: '800px', borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Box
                        component="img"
                        src={photo}
                        sx={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '16px' }}
                    />
                    <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                        Real-Estate Admin Dashboard                    </Typography>
                </Box>
                <Stack spacing={4} sx={{ marginTop: '20px' }}>
                    <Typography variant="h5" textAlign="center" color="textSecondary">
                        Please sign in:
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        required
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ marginBottom: '16px' }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        required
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ marginBottom: '16px' }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" />}
                        label="Remember me"
                        sx={{ marginBottom: '16px' }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={loginAuth} // Pass the function reference directly
                        disabled={isloading}
                        sx={{
                            backgroundColor: 'primary',
                            color: 'white',
                            padding: '12px',
                            fontSize: '16px',
                        }}
                    >
                        {isloading ? <CircularProgress size={24}/> : "Login"}
                    </Button>
                </Stack>
                
            </Paper>
        </Container>
    );
}