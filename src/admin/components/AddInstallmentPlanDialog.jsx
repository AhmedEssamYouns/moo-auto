import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const AddInstallmentPlanDialog = ({ open, onClose, onSubmit,installmentProviderId }) => {
  const [months, setMonths] = useState(0);
  const [interest, setInterest] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);

  const handleSubmit = () => {
    const plan = {
      months,
      interest,
      processingFee,
    };
    onSubmit(plan);
    setMonths(0);
    setInterest(0);
    setProcessingFee(0);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Installment Plan</DialogTitle>
      <DialogContent>
        <TextField
          label="Months"
          fullWidth
          type="number"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Interest"
          fullWidth
          type="number"
          value={interest}
          onChange={(e) => setInterest(Number(e.target.value))}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Processing Fee"
          fullWidth
          type="number"
          value={processingFee}
          onChange={(e) => setProcessingFee(Number(e.target.value))}
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInstallmentPlanDialog;
