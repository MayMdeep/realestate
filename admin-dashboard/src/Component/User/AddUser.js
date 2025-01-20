import React, { useState, useEffect } from "react";
import { api_Routes } from "../../api_Route";
import { Helper } from "../../Tools/Helper";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
        status: ""
    });

    // Role and status options
    const roleOptions = [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" }
    ];

    const statusOptions = [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "banned", label: "Banned" }
    ];

    // Handle form field changes
    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        // Validate required fields
        if (!formData.email || !formData.password || !formData.role || !formData.status) {
            enqueueSnackbar("Please fill all required fields", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            return;
        }

        setIsLoading(true);

        try {
            const { response, message } = await Helper.Post({
                url: api_Routes.users.add,
                data: formData,
                hasToken: true
            });

            if (response) {
                enqueueSnackbar(message, {
                    variant: "success",
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
                navigate('/users'); // Redirect to users page after successful submission
            } else {
                let errorMessage = '';
                if (typeof message === "string") {
                    errorMessage = message;
                } else if (typeof message === "object") {
                    errorMessage = Object.values(message).flat().join(', ');
                }
                enqueueSnackbar(errorMessage, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }
        } catch (error) {
            enqueueSnackbar("An error occurred. Please try again.", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container sx={{ marginBottom: "20px" }}>
            <Grid container sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <Grid item>
                    <Typography sx={{ fontSize: "28px", fontWeight: "600", color: "#1e1b1b" }}>Add User</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        startIcon={isLoading ? <CircularProgress sx={{ color: "white" }} size={22} /> : <AddIcon />}
                        sx={{
                            backgroundColor: "#244770",
                            fontSize: "13px",
                            borderRadius: "7px",
                            height: "38px",
                            '&:hover': {
                                backgroundColor: "#244770"
                            }
                        }}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
            <Card>
                <CardContent>
                    <h3 style={{ fontWeight: 500, marginBottom: "30px" }}>Basic Information</h3>
                    <Box component="form" noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            {/* Email Field */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    required
                                />
                            </Grid>

                            {/* Password Field */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    required
                                />
                            </Grid>

                            {/* Role Dropdown */}
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        label="Role"
                                        value={formData.role}
                                        onChange={(e) => handleChange("role", e.target.value)}
                                        required
                                    >
                                        {roleOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Status Dropdown */}
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        label="Status"
                                        value={formData.status}
                                        onChange={(e) => handleChange("status", e.target.value)}
                                        required
                                    >
                                        {statusOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AddUser;