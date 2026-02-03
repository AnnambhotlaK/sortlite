import React from "react";
import Slider from '@mui/material/Slider';
import './Slider.css';

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
    <div className="animation-speed-container">
      <label className="speed-slider-title">Array Size</label>
      <div className="slider-wrapper">
        <span className="speed-label slow">Small</span>
        <div className="slider-track">
          <Slider
            value={value}
            onChange={handleChange}
            step={20}
            marks = {false}
            min={20}
            max={300}
            valueLabelDisplay="auto"
          />
        </div>
        <span className="speed-label fast">Large</span>
      </div>
    </div>
  );

};

export default ArrayBarSlider;