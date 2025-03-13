import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  TextField,
} from "@mui/material";

const ProviderDetailsDialog = ({
  open,
  provider,
  onClose,
  onDeletePlan,
  onAddPlan,
}) => {
  const [newPlan, setNewPlan] = useState({
    months: "",
    interest: "",
    processingFee: "",
  });

  const [formError, setFormError] = useState(false); // Track form errors

  const monthsRef = useRef(null);
  const interestRef = useRef(null);
  const processingFeeRef = useRef(null);

  if (!provider) return null;

  const handleDeletePlan = (planId) => {
    if (onDeletePlan) {
      onDeletePlan(planId); // Trigger the delete action in the parent component
    }
  };

  const handleAddPlan = () => {
    // Check if any of the fields are empty
    if (!newPlan.months || !newPlan.interest || !newPlan.processingFee) {
      setFormError(true); // Set formError to true to trigger error handling
      return;
    }

    if (onAddPlan) {
      const plan = {
        ...newPlan,
        installmentProviderId: provider.id,
      };
      onAddPlan(plan); // Add new plan via the parent callback
      setNewPlan({ months: "", interest: "", processingFee: "" }); // Reset the form after adding
      setFormError(false); // Reset error state after successful submission
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter" && nextRef.current) {
      nextRef.current.focus(); // Focus on the next input when Enter is pressed
    }
  };

  const hasPlans =
    provider.installmentPlans && provider.installmentPlans.length > 0;
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user?.roles.includes("Owner");
  const isEditor = user?.roles.includes("Editor");
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <img
              src={provider.imageUrl}
              alt={provider.name}
              style={{ width: 50, height: 50, objectFit: "contain" }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">{provider.name}</Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {/* Display message if no plans are available */}
        {!hasPlans && (
          <Typography variant="body1" color="textSecondary">
            No installment plans available.
          </Typography>
        )}

        {/* Show the table only if there are plans */}
        {hasPlans && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Months</TableCell>
                  <TableCell>Interest Rate</TableCell>
                  <TableCell>Processing Fee</TableCell>
                  {isOwner && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {provider.installmentPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>{plan.months}</TableCell>
                    <TableCell>{plan.interest}%</TableCell>
                    <TableCell>{plan.processingFee}%</TableCell>
                    {isOwner && (
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeletePlan(plan.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
{(isOwner || isEditor) && (
    <>
    
        <Typography variant="h6" gutterBottom mt={2}>
          Add New Installment Plan
        </Typography>
        {formError && (
          <Typography color="error" variant="body2" gutterBottom>
            All fields are required!
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Months"
              variant="outlined"
              fullWidth
              name="months"
              value={newPlan.months}
              onChange={handleChange}
              required
              error={formError && !newPlan.months} // Show error if field is empty
              onKeyDown={(e) => handleKeyDown(e, interestRef)} // Move to next input on Enter
              inputRef={monthsRef} // Assign ref to the input
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Interest Rate (%)"
              variant="outlined"
              fullWidth
              name="interest"
              value={newPlan.interest}
              onChange={handleChange}
              required
              error={formError && !newPlan.interest} // Show error if field is empty
              onKeyDown={(e) => handleKeyDown(e, processingFeeRef)} // Move to next input on Enter
              inputRef={interestRef} // Assign ref to the input
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Processing Fee (%)"
              variant="outlined"
              fullWidth
              name="processingFee"
              value={newPlan.processingFee}
              onChange={handleChange}
              required
              error={formError && !newPlan.processingFee} // Show error if field is empty
              onKeyDown={(e) => e.key === "Enter" && handleAddPlan()} // Submit on Enter
              inputRef={processingFeeRef} // Assign ref to the input
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPlan}
          style={{ marginTop: 20 }}
        >
          Add Plan
        </Button>
        </>
    )
}
      </DialogContent>
  
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProviderDetailsDialog;
