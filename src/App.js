import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// Mock data
const recoveryPlans = {
  LASIK: {
    1: "Day 1: Rest your eyes, use prescribed eye drops every 4 hours, wear protective glasses",
    2: "Day 2: Continue eye drops, avoid screens for more than 30 minutes at a time",
    3: "Day 3: You may resume light activities, continue eye drops",
    7: "Day 7: First follow-up appointment today",
    14: "Day 14: You may resume light exercise",
    30: "Day 30: Final check-up today"
  },
  Cataract: {
    1: "Day 1: Keep eye shield on, use antibiotic drops as prescribed",
    2: "Day 2: Remove shield during the day but wear at night",
    3: "Day 3: Begin using anti-inflammatory drops",
    7: "Day 7: First follow-up appointment today",
    14: "Day 14: You may resume most normal activities",
    30: "Day 30: Final check-up today"
  }
};

const medications = [
  { id: 1, name: "Antibiotic Drops", frequency: "Every 4 hours", lastTaken: null },
  { id: 2, name: "Anti-inflammatory Drops", frequency: "Twice daily", lastTaken: null },
  { id: 3, name: "Artificial Tears", frequency: "As needed", lastTaken: null }
];

const checklistItems = [
  { id: 1, text: "Wear sunglasses outdoors", isDone: false, isPositive: true },
  { id: 2, text: "Use eye drops as prescribed", isDone: false, isPositive: true },
  { id: 3, text: "Don't rub your eyes", isDone: false, isPositive: false },
  { id: 4, text: "Avoid swimming for 2 weeks", isDone: false, isPositive: false }
];

const videos = [
  { id: 1, title: "How to apply eye drops", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, title: "Protecting your eyes after surgery", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
];

function VideoResources({ videos }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Video Resources</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map(video => (
          <div key={video.id} className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
            <iframe 
              width="100%" 
              height="200" 
              src={video.url} 
              title={video.title} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressTracker({ symptoms, setSymptoms }) {
  const [newSymptom, setNewSymptom] = useState({
    type: 'pain',
    severity: 3,
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSymptoms([...symptoms, {
      ...newSymptom,
      date: new Date().toISOString(),
      id: Date.now()
    }]);
    setNewSymptom({
      type: 'pain',
      severity: 3,
      notes: ''
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Progress Tracker</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-gray-700 mb-1">Symptom Type</label>
            <select
              className="w-full p-2 border rounded"
              value={newSymptom.type}
              onChange={(e) => setNewSymptom({...newSymptom, type: e.target.value})}
            >
              <option value="pain">Pain</option>
              <option value="dryness">Dryness</option>
              <option value="blurriness">Blurriness</option>
              <option value="redness">Redness</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Severity (1-5)</label>
            <input
              type="range"
              min="1"
              max="5"
              value={newSymptom.severity}
              onChange={(e) => setNewSymptom({...newSymptom, severity: parseInt(e.target.value)})}
              className="w-full"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Notes</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="2"
            value={newSymptom.notes}
            onChange={(e) => setNewSymptom({...newSymptom, notes: e.target.value})}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700 transition"
        >
          Add Symptom
        </button>
      </form>
      <h3 className="font-medium mb-2">Symptom History</h3>
      {symptoms.length === 0 ? (
        <p className="text-gray-500">No symptoms logged yet</p>
      ) : (
        <div className="space-y-3">
          {symptoms.map(symptom => (
            <div key={symptom.id} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium capitalize">{symptom.type}</span>
                <span className="text-sm text-gray-500">
                  {new Date(symptom.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center mb-1">
                <span className="text-sm mr-2">Severity:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full mx-px ${i < symptom.severity ? 'bg-red-500' : 'bg-gray-200'}`}
                    ></div>
                  ))}
                </div>
              </div>
              {symptom.notes && <p className="text-sm text-gray-700">{symptom.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AppointmentScheduler({ appointments, setAppointments }) {
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    purpose: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointments([...appointments, {
      ...newAppointment,
      id: Date.now()
    }]);
    setNewAppointment({
      date: '',
      time: '',
      purpose: ''
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointment Scheduler</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Time</label>
            <input
              type="time"
              className="w-full p-2 border rounded"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Purpose</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Follow-up, Emergency, etc."
            value={newAppointment.purpose}
            onChange={(e) => setNewAppointment({...newAppointment, purpose: e.target.value})}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700 transition"
        >
          Schedule Appointment
        </button>
      </form>
      <h3 className="font-medium mb-2">Upcoming Appointments</h3>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments scheduled</p>
      ) : (
        <div className="space-y-3">
          {appointments.map(appt => (
            <div key={appt.id} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{appt.purpose}</span>
                <span className="text-sm text-gray-500">
                  {new Date(`${appt.date}T${appt.time}`).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-end">
                <button className="text-red-500 text-sm hover:text-red-700">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DocumentStorage({ documents, setDocuments }) {
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocs = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }));
    setDocuments([...documents, ...newDocs]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Document Storage</h2>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-medium mb-2">Upload Documents</h3>
        <label className="block mb-2">
          <span className="sr-only">Choose files</span>
          <input
            type="file"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            multiple
            onChange={handleFileUpload}
          />
        </label>
        <p className="text-xs text-gray-500">Upload prescriptions, test results, or other documents</p>
      </div>
      <h3 className="font-medium mb-2">Your Documents</h3>
      {documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {documents.map(doc => (
            <div key={doc.id} className="bg-white p-3 rounded shadow">
              <div className="flex items-center mb-2">
                <i className="fas fa-file-medical text-blue-500 mr-2"></i>
                <span className="truncate">{doc.name}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{doc.type}</span>
                <span>{(doc.size / 1024).toFixed(1)} KB</span>
              </div>
              <div className="mt-2 flex justify-end">
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:text-blue-700"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [surgeryData, setSurgeryData] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [meds, setMeds] = useState(medications);
  const [checklist, setChecklist] = useState(checklistItems);
  const [symptoms, setSymptoms] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (surgeryData?.date) {
      const diffDays = Math.ceil((new Date() - new Date(surgeryData.date)) / (1000 * 60 * 60 * 24));
      setCurrentDay(diffDays);
    }
  }, [surgeryData]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header surgeryData={surgeryData} currentDay={currentDay} />
        <MainContent 
          surgeryData={surgeryData} 
          currentDay={currentDay}
          meds={meds}
          setMeds={setMeds}
          checklist={checklist}
          setChecklist={setChecklist}
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          appointments={appointments}
          setAppointments={setAppointments}
          documents={documents}
          setDocuments={setDocuments}
          recoveryPlans={recoveryPlans}
          videos={videos}
        />
        {surgeryData && <BottomNavigation />}
      </div>
    </BrowserRouter>
  );
}

// Header component
function Header({ surgeryData, currentDay }) {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <h1 className="text-2xl font-bold text-blue-800">EyeCare Guide</h1>
      {surgeryData && (
        <p className="text-gray-600">
          {surgeryData.type} Surgery - Day {currentDay}
        </p>
      )}
    </header>
  );
}

// MainContent component
function MainContent(props) {
  return (
    <main className="flex-1 p-6">
      <Routes>
        <Route path="/" element={
          <SurgeryForm 
            setSurgeryData={props.setSurgeryData} 
          />
        } />
        <Route path="/recovery-plan" element={
          <RecoveryPlan 
            surgeryData={props.surgeryData} 
            currentDay={props.currentDay} 
            recoveryPlans={props.recoveryPlans} 
          />
        } />
        <Route path="/reminders" element={
          <MedicationReminders 
            medications={props.meds} 
            setMedications={props.setMeds} 
          />
        } />
        <Route path="/checklist" element={
          <Checklist 
            items={props.checklist} 
            setItems={props.setChecklist} 
          />
        } />
        <Route path="/videos" element={<VideoResources videos={props.videos} />} />
        <Route path="/progress" element={
          <ProgressTracker 
            symptoms={props.symptoms} 
            setSymptoms={props.setSymptoms} 
          />
        } />
        <Route path="/appointments" element={
          <AppointmentScheduler 
            appointments={props.appointments} 
            setAppointments={props.setAppointments} 
          />
        } />
        <Route path="/documents" element={
          <DocumentStorage 
            documents={props.documents} 
            setDocuments={props.setDocuments} 
          />
        } />
      </Routes>
    </main>
  );
}

// BottomNavigation component
function BottomNavigation() {
  return (
    <nav className="bg-white border-t flex justify-around py-3">
      <NavLink to="/recovery-plan" icon="calendar" label="Plan" />
      <NavLink to="/reminders" icon="bell" label="Reminders" />
      <NavLink to="/checklist" icon="list-check" label="Checklist" />
      <NavLink to="/progress" icon="chart-line" label="Progress" />
    </nav>
  );
}

// NavLink component
function NavLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className="flex flex-col items-center">
      <i className={`fas fa-${icon} text-lg ${isActive ? 'text-blue-600' : 'text-gray-500'}`}></i>
      <span className={`text-xs mt-1 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
        {label}
      </span>
    </Link>
  );
}

// Render the app
if (typeof document !== 'undefined') {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;