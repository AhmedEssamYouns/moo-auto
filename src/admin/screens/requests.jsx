import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useRequests } from "../hooks/useAdmin";

const RequestsScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, error } = useRequests(searchValue);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Car Requests ({data?.totalCount || 0})
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Requests"
        variant="outlined"
        fullWidth
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Loading State */}
      {isLoading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {/* {error && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography color="error">Failed to load data. Please try again.</Typography>
        </Box>
      )} */}

      {/* Requests Table */}
      {data?.items?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Model Year</TableCell>
                <TableCell>Transmission</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.phoneNumber}</TableCell>
                  <TableCell>{request.brand}</TableCell>
                  <TableCell>{request.model}</TableCell>
                  <TableCell>{request.modelYear}</TableCell>
                  <TableCell>{request.transmission === 1 ? "Manual" : "Automatic"}</TableCell>
                  <TableCell>${request.price.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        !isLoading && <Typography mt={2}>No requests found.</Typography>
      )}
    </Box>
  );
};

export default RequestsScreen;
