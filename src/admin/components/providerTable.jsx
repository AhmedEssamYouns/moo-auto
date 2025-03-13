import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

const ProviderTable = ({ providers, onRowClick, onDeleteProvider }) => {
  const handleDelete = (providerId) => {
    if (onDeleteProvider) {
      onDeleteProvider(providerId); // Trigger the delete action from the parent component
    }
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user?.roles.includes("Owner");

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Provider Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id} onClick={() => onRowClick(provider)}>
              <TableCell>{provider.name}</TableCell>
              <TableCell>
                <img
                  src={provider.imageUrl}
                  alt={provider.name}
                  style={{ height: 50, objectFit: "contain" }}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => onRowClick(provider)}>
                  View Installment Plans
                </Button>
                {isOwner &&
                <Button
                  variant="contained"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click from being triggered when delete is clicked
                    handleDelete(provider.id);
                  }}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </Button>
}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProviderTable;
