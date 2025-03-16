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
  IconButton,
  Collapse,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useRequests } from "../hooks/useAdmin";

const RequestsScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useRequests(searchValue);
  const [openRows, setOpenRows] = useState({});

  const handleToggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Car Requests ({data?.totalCount || 0})
      </Typography>

      <TextField
        label="Search Requests"
        variant="outlined"
        fullWidth
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ mb: 2 }}
      />

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {data?.items?.length > 0 ? (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Transmission</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((request) => (
                <React.Fragment key={request.id}>
                  <TableRow hover>
                    <TableCell>
                      <IconButton onClick={() => handleToggleRow(request.id)}>
                        {openRows[request.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
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
                  <TableRow>
                    <TableCell colSpan={10} sx={{ p: 0 }}>
                      <Collapse in={openRows[request.id]} timeout="auto" unmountOnExit>
                        <Box sx={{ m: 2, p: 2, backgroundColor: "#fafafa", borderRadius: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Additional Info:
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {request.additionalInfo || "No additional information provided."}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
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
