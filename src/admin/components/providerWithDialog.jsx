import React, { useState, useEffect, useRef } from "react";
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

  const [plans, setPlans] = useState([]); // Local state for installment plans
  const [formError, setFormError] = useState(false);

  const monthsRef = useRef(null);
  const interestRef = useRef(null);
  const processingFeeRef = useRef(null);

  useEffect(() => {
    if (provider) {
      setPlans(provider.installmentPlans || []);
    }
  }, [provider]);

  if (!provider) return null;

  const handleDeletePlan = (planId) => {
    setPlans(plans.filter(plan => plan.id !== planId)); // Remove plan locally
    if (onDeletePlan) {
      onDeletePlan(planId); // Call parent function
    }
  };

  const handleAddPlan = () => {
    if (!newPlan.months || !newPlan.interest || !newPlan.processingFee) {
      setFormError(true);
      return;
    }

    const plan = {
      id: Date.now(), // Temporary ID for local UI update
      ...newPlan,
      installmentProviderId: provider.id,
    };

    setPlans([...plans, plan]); // Update UI instantly
    if (onAddPlan) {
      onAddPlan(plan); // Call parent function
    }

    setNewPlan({ months: "", interest: "", processingFee: "" });
    setFormError(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter" && nextRef.current) {
      nextRef.current.focus();
    }
  };

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
        {plans.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No installment plans available.
          </Typography>
        ) : (
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
                {plans.map((plan) => (
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
                  error={formError && !newPlan.months}
                  onKeyDown={(e) => handleKeyDown(e, interestRef)}
                  inputRef={monthsRef}
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
                  error={formError && !newPlan.interest}
                  onKeyDown={(e) => handleKeyDown(e, processingFeeRef)}
                  inputRef={interestRef}
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
                  error={formError && !newPlan.processingFee}
                  onKeyDown={(e) => e.key === "Enter" && handleAddPlan()}
                  inputRef={processingFeeRef}
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
        )}
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
