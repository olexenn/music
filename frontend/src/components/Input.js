import React from "react";
import { TextField } from "@mui/material";

export default function Input(props) {
    return (
        <TextField
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            label={props.label}
            variant={props.variant}
            onChange={props.onChange}
            name={props.name}
            error={props.error || false}
            helperText={props.helperText || null}
            type={props.type}
        />
    );
}
