import { Box, TextField, Typography } from "@mui/material";
import { sxTextInput } from "./styles";

type TextInputProps = {
    value: string | number | undefined;
    title: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    fullWidth?: boolean;
}

export const TextInput = ({ value, title, onChange, ...props }: TextInputProps) => {
    return (
        <Box position="relative">
            <Typography sx={sxTextInput.title} position="absolute" variant="body2">{title}</Typography>
            <TextField value={value} onChange={(e) => onChange(e.target.value)} {...props} />
        </Box>
    )
}