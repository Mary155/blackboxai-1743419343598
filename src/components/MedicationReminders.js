import React from 'react';
import { format } from 'date-fns';

const MedicationReminders = ({ medications, setMedications }) => {
  const handleTakeMedication = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? {...med, lastTaken: new Date().toISOString()} : med
    ));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Medication Reminders</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {medications.map(med => (
          <div key={med.id} className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{med.name}</h3>
              <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">
                {med.frequency}
              </span>
            </div>
            
            {med.lastTaken && (
              <div className="mb-3">
                <p className="text-sm text-gray-600">Last taken:</p>
                <p className="text-green-600 font-medium">
                  {format(new Date(med.lastTaken), 'MMM d, h:mm a')}
                </p>
              </div>
            )}
            
            <button
              onClick={() => handleTakeMedication(med.id)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Mark as Taken
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationReminders;