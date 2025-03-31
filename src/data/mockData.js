export const recoveryPlans = {
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

export const medications = [
  { id: 1, name: "Antibiotic Drops", frequency: "Every 4 hours", lastTaken: null },
  { id: 2, name: "Anti-inflammatory Drops", frequency: "Twice daily", lastTaken: null },
  { id: 3, name: "Artificial Tears", frequency: "As needed", lastTaken: null }
];

export const checklistItems = [
  { id: 1, text: "Wear sunglasses outdoors", isDone: false, isPositive: true },
  { id: 2, text: "Use eye drops as prescribed", isDone: false, isPositive: true },
  { id: 3, text: "Don't rub your eyes", isDone: false, isPositive: false },
  { id: 4, text: "Avoid swimming for 2 weeks", isDone: false, isPositive: false }
];

export const videos = [
  { id: 1, title: "How to apply eye drops", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, title: "Protecting your eyes after surgery", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
];