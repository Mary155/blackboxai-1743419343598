import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SurgeryForm = ({ setSurgeryData }) => {
  const [formData, setFormData] = useState({
    type: 'LASIK',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSurgeryData({
      ...formData,
      id: Date.now()
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter Your Surgery Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Surgery Type</label>
          <select
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="LASIK">LASIK</option>
            <option value="Cataract">Cataract</option>
            <option value="PRK">PRK</option>
            <option value="ICL">ICL</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Surgery Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Start Recovery Plan
        </button>
      </form>
    </div>
  );
};

export default SurgeryForm;