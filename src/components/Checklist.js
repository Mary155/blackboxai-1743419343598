import React from 'react';

const Checklist = ({ items, setItems }) => {
  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? {...item, isDone: !item.isDone} : item
    ));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Do's and Don'ts</h2>
      <div className="space-y-3">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`bg-white p-3 rounded shadow flex items-center ${item.isDone ? 'opacity-70' : ''}`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${item.isPositive ? 'bg-green-100' : 'bg-red-100'}`}
            >
              {item.isDone && (
                <i className={`fas fa-check text-xs ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}></i>
              )}
            </button>
            <span className={item.isDone ? 'line-through' : ''}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;