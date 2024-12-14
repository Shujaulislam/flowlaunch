import React from 'react';

const StatusSelector = ({ status, onChange, className }) => {
  const statusOptions = ['To Do', 'In Progress', 'Done'];

  return (
    <select 
      value={status || ''} 
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-2 border rounded ${className}`}
    >
      <option value="">Select Status</option>
      {statusOptions.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default StatusSelector;