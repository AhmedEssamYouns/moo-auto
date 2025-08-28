import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, MenuItem, Select, InputLabel,
  FormControl, Box, Typography, InputAdornment
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

const roleIcons = {
  Admin: <SecurityIcon color="primary" />,
  Editor: <SupervisorAccountIcon color="secondary" />,
  Owner: <PersonIcon color="success" />,
};

const UserList = ({ users, onEdit, onDelete, isOwner }) => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const currentUserId = (() => {
    try { return JSON.parse(localStorage.getItem("user"))?.id; }
    catch { return undefined; }
  })();

  const filteredUsers = users.filter((user) =>
    (user.displayName.toLowerCase().includes(search.toLowerCase()) ||
     user.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter ? user.roles.includes(roleFilter) : true)
  );

  return (
    <Box sx={{ p: 2 }}>
      {/* Search & Filter Controls */}
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter by Role</InputLabel>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            label="Filter by Role"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Owner">Owner</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.roles.map((role) => (
                      <Box key={role} display="flex" alignItems="center" gap={1}>
                        {roleIcons[role] || <PersonIcon />} {role}
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => onEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => onDelete(user.id)}
                      disabled={isOwner && user.id === currentUserId}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="textSecondary">No users found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
