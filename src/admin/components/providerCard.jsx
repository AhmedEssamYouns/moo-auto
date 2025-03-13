import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ProviderCard = ({ provider, onAddInstallmentPlan }) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardMedia
        component="img"
        image={provider.imageUrl}
        alt={provider.name}
        sx={{ height: 180, objectFit: "contain" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {provider.name}
        </Typography>

        {/* Installment Plans Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Months</TableCell>
                <TableCell>Interest</TableCell>
                <TableCell>Processing Fee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {provider.installmentPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.months}</TableCell>
                  <TableCell>{plan.interest}%</TableCell>
                  <TableCell>{plan.processingFee}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          color="secondary"
          onClick={onAddInstallmentPlan}
          sx={{ marginTop: 2 }}
        >
          Add Installment Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;
