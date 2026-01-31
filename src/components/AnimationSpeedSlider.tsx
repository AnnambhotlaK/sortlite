import React from "react";
import Slider from '@mui/material/Slider';

interface AnimationSpeedSliderProps {
  value: number;
  onChange: (newValue: number) => void;
}

const AnimationSpeedSlider: React.FC<AnimationSpeedSliderProps> = ({ value, onChange }) => {
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
        step={1} // The granularity for the steps
        marks // Generates a mark for each step
        min={1}
        max={10}
        valueLabelDisplay="auto" // Shows the value label on drag or focus
      />
    </div>
  );
};

export default AnimationSpeedSlider;