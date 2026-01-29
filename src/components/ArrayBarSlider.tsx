import React from "react";
import Slider from '@mui/material/Slider';

interface ArrayBarSliderProps {
  value: number;
  onChange: (newValue: number) => void;
}

const ArrayBarSlider: React.FC<ArrayBarSliderProps> = ({ value, onChange }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      onChange(newValue);
    }
  };

  return (
    <div style={{ width: 300, margin: 'auto' }}>
      <Slider
        value={value}
        onChange={handleChange}
        step={20} // The granularity for the steps
        marks // Generates a mark for each step
        min={20}
        max={300}
        valueLabelDisplay="auto" // Shows the value label on drag or focus
      />
    </div>
  );
};

export default ArrayBarSlider;