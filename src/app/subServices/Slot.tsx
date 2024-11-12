"use client"
import React, { useState } from 'react';

const Slot: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('mock');

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h2>Select Interview Type</h2>
      <div>
        <label>
          <input
            type="radio"
            value="mock"
            checked={selectedOption === 'mock'}
            onChange={handleOptionChange}
          />
          Mock Interview
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="job"
            checked={selectedOption === 'job'}
            onChange={handleOptionChange}
          />
          Job Interview
        </label>
      </div>

      <p>Selected option: {selectedOption === 'mock' ? 'Mock Interview' : 'Job Interview'}</p>
    </div>
  );
};

export default Slot;
