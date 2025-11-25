import { TextField } from "@mui/material";
import type { SpectroscopyFormData } from "./SpectroscopyForm";

type NumberTextFieldProps = {
  formData: SpectroscopyFormData;
  setFormData: (f: SpectroscopyFormData) => void;
  field: keyof SpectroscopyFormData;
  step: number;
  label: string;
};

const NumberTextField = ({
  formData,
  setFormData,
  field,
  step = 1,
  label = field,
}: NumberTextFieldProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const parsedValue =
      value === ""
        ? 0
        : Number.isInteger(step) // parse to Int or Float depending on step
          ? parseInt(value, 10)
          : parseFloat(value);

    setFormData({
      ...formData,
      [field]: parsedValue,
    });
  };

  return (
    <TextField
      fullWidth
      label={label}
      type="number"
      value={formData[field]}
      onChange={handleChange}
      slotProps={{ htmlInput: { step: step } }}
    />
  );
};

export default NumberTextField;
