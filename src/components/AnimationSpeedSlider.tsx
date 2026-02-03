import React from "react";
import Slider from '@mui/material/Slider';
import './Slider.css';

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
    <div className="animation-speed-container">
      <label className="speed-slider-title">Animation Speed</label>
      <div className="slider-wrapper">
        <span className="speed-label slow">Fast</span>
        <div className="slider-track">
          <Slider
            value={value}
            onChange={handleChange}
            step={1}
            marks = {false}
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
        </div>
        <span className="speed-label fast">Slow</span>
      </div>
    </div>
  );
};

export default AnimationSpeedSlider;