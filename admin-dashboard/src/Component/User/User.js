import React, { useState, useEffect, Fragment } from "react";
import { api_Routes } from "../../api_Route";
import { Helper } from "../../Tools/Helper";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const User = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0); // Page starts from 0 for TablePagination
  const [values, setValues] = useState({});
  const [values_Filter, setFilter_Values] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [user, setUser] = useState([]);

  const BaseApi = api_Routes.users.all;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getuser(signal);

    return () => {
      controller.abort();
    };
  }, [values_Filter, page, perPage]);

  const getuser = async (signal) => {
    let url = BaseApi + '?1=1';

    // Add filters to the URL
    if (values_Filter.email) {
      url += `&filters[email]=${values_Filter.email}`;
    }
    if (values_Filter.role) {
      url += `&filters[role]=${values_Filter.role}`;
    }
    if (values_Filter.status) {
      url += `&filters[status]=${values_Filter.status}`;
    }

    // Add pagination parameters
    url += `&page=${page + 1}&perPage=${perPage}`; // page + 1 because backend starts from 1

    setIsLoading(true);

    const { response, message } = await Helper.Get({
      url: url,
      hasToken: true,
      signal: signal,
    });

    if (response) {
      // console.log(response);
      setUser(response.data); // Set the user state to response.data
      setTotalItems(response.pagination.total); // Set the total items to response.pagination.total
      setIsLoading(false);
    } else {
      // console.log(message);
      setIsLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update the page state
  };
  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10)); // Update rows per page
    setPage(0); // Reset to the first page
  };

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilter = () => {
    setFilter_Values(values);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to approve a user
  const approveUser = async (userId) => {
    const { response, message } = await Helper.Patch({
      url: api_Routes.users.approve(userId),
      hasToken: true,
    });

    if (response) {
      enqueueSnackbar('User approved successfully', {
        variant: "success",
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      getuser(); // Refresh the user list
    } else {
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  // Function to ban a user
  const banUser = async (userId) => {
    const { response, message } = await Helper.Patch({
      url: api_Routes.users.ban(userId),
      hasToken: true,
    });

    if (response) {
      enqueueSnackbar('User banned successfully', {
        variant: "success",
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      getuser(); // Refresh the user list
    } else {
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  return (
    <>
      <Container sx={{ marginBottom: "20px" }}>
        <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Grid item>
            <Typography sx={{ fontSize: "28px", fontWeight: "600", color: "#1e1b1b" }}>Users</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#244770",
                fontSize: "13px",
                borderRadius: "7px",
                height: "38px",
                '&:hover': { backgroundColor: "#244770" },
              }}
              onClick={() => { navigate('/AddUser') }}
            >
              Add User
            </Button>
          </Grid>
        </Grid>
        <Card sx={{ marginTop: "20px" }}>
          <CardContent>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="filled-basic"
                    label="Search By Email"
                    variant="standard"
                    name="email"
                    color="primary"
                    size="small"
                    onChange={(e) => { handleChange("email", e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="filled-basic"
                    label="Search By Role"
                    variant="standard"
                    name="role"
                    color="primary"
                    size="small"
                    onChange={(e) => { handleChange("role", e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="filled-basic"
                    label="Search By Status"
                    variant="standard"
                    name="status"
                    color="primary"
                    size="small"
                    onChange={(e) => { handleChange("status", e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={{ marginTop: "5px" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#244770",
                      textAlign: "right",
                      fontSize: "13px",
                      borderRadius: "7px",
                      height: "38px",
                      '&:hover': { backgroundColor: "#244770" },
                    }}
                    onClick={() => { handleFilter() }}
                  >
                    <ManageSearchIcon />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {isLoading ? (
        <LinearProgress sx={{ marginTop: "30px", color: "#244770" }} />
      ) : (
        <Container fluid="true">
          <Grid container>
            <Grid item lg={12}>
              <Card>
                <CardContent>
                  <Fragment>
                    <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
                      <Table>
                        <TableHead sx={{ backgroundColor: "#244770 !important", textColor: "red" }}>
                          <TableRow>
                            <TableCell sx={{ color: "white" }}>Id</TableCell>
                            <TableCell sx={{ color: "white" }}>Email</TableCell>
                            <TableCell sx={{ color: "white" }}>Role</TableCell>
                            <TableCell sx={{ color: "white" }}>Status</TableCell>
                            <TableCell sx={{ color: "white" }}>Created At</TableCell>
                            <TableCell sx={{ color: "white" }}>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {user.map((user) => (
                            <TableRow key={user._id}>
                              <TableCell>{user._id}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.role}</TableCell>
                              <TableCell>{user.status}</TableCell>
                              <TableCell>
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                              </TableCell>
                              <TableCell>
                                {user.status === 'pending' || user.status === 'banned' ? (
                                  <Button
                                    onClick={() => approveUser(user._id)}
                                    color="success"
                                  >
                                    Approve
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => banUser(user._id)}
                                    color="error"
                                  >
                                    Ban
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {/* TablePagination */}
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={totalItems} // Total number of items
                        rowsPerPage={perPage} // Rows per page
                        page={page} // Current page (starts from 0)
                        onPageChange={handleChangePage} // Handle page change
                        onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
                      />
                    </TableContainer>
                  </Fragment>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default User;