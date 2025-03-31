import React from 'react';
import { Link } from 'react-router-dom';

const RecoveryPlan = ({ surgeryData, currentDay, recoveryPlans }) => {
  if (!surgeryData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Please enter your surgery details first.</p>
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Enter Details
        </Link>
      </div>
    );
  }

  const plan = recoveryPlans[surgeryData.type] || {};
  const todayPlan = plan[currentDay] || `Day ${currentDay}: Continue following your recovery plan`;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Recovery Plan</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-blue-600 font-bold text-xl">{currentDay}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Today's Instructions</h3>
        </div>
        <p className="text-gray-700 pl-16">{todayPlan}</p>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Milestones</h3>
      <div className="space-y-4">
        {Object.entries(plan)
          .filter(([day]) => parseInt(day) > currentDay)
          .map(([day, instruction]) => (
            <div key={day} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-medium">{day}</span>
                </div>
                <p className="text-gray-700">{instruction}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecoveryPlan;