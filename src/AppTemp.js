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

// Main App component
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
        <Route path="/" element={<SurgeryForm setSurgeryData={props.setSurgeryData} />} />
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

// SurgeryForm component
function SurgeryForm({ setSurgeryData }) {
  const [formData, setFormData] = useState({
    type: 'LASIK',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSurgeryData({
