import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useUsers } from "../hooks/useAdmin";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import EditUserDialog from "../components/edituser";
import { addUser, deleteUser } from "../services/adminServices";

const ModifyUserScreen = () => {
  const { data: users, isLoading, error, refetch } = useUsers();
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("admin", user);

  // Check if the logged-in user is an owner and prevent self-edit/delete
  const isOwner = user?.roles.includes("Owner");

  if(!isOwner){
    return (
      <Container maxWidth="lg">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Users
        </Typography>
        <Typography color="error">You are not authorized to access this page.</Typography>
      </Container>
    );
  }

  const handleDeleteUser = async (id) => {
    if (user.id === id) {
      alert("You cannot delete your own account.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      refetch();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await addUser(formData);
      setOpen(false);
      refetch();
    } catch (err) {
      alert(err.response?.data?.detail);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSuccess = () => {
    setEditUser(null);
    refetch();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Users
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Add User
      </Button>

      {isLoading ? (
        <CircularProgress />
      ) : error || !users || users.length === 0 ? (
        <Typography color="error">No users found</Typography>
      ) : (
        <UserList
          users={users}
          onDelete={handleDeleteUser}
          onEdit={setEditUser}
          isOwner={isOwner}
        />
      )}

      {/* Add User Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <UserForm onSubmit={handleSubmit} loading={loading} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            disabled={loading}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      {editUser && (
        <EditUserDialog
          isOwner={isOwner ? user.id : false}
          open={!!editUser}
          onClose={() => setEditUser(null)}
          user={editUser}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </Container>
  );
};

export default ModifyUserScreen;
