import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar'; // Adjust the path to your Sidebar component
import Header from '../partials/Header'; // Adjust the path to your Header component
import CalendarEventForm from '../partials/CalendarEventForm';

function Maintenance() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Manage sidebar open state
  const [currentDate, setCurrentDate] = useState(new Date()); // Manage current displayed month/year
  const [events, setEvents] = useState([
    { date: '2025-01-03', title: 'System Upgrade', description: 'Upgrading the system to version 2.0', location: 'Server Room A', time: '10:00 AM', organizer: 'John Doe', priority: 'High' },
    { date: '2025-01-10', title: 'Ironflow Conveyor Maintenance', description: 'Routine maintenance for the Ironflow conveyor', location: 'Factory Floor 1', time: '2:00 PM', organizer: 'Jane Smith', priority: 'Medium' },
    { date: '2025-01-15', title: 'Safety Inspection', description: 'Annual safety inspection by external auditors', location: 'Main Office', time: '9:00 AM', organizer: 'Audit Team', priority: 'High' },
    { date: '2025-01-20', title: 'Monthly Operations Meeting', description: 'Review monthly operations and KPIs', location: 'Conference Room B', time: '3:00 PM', organizer: 'Operations Team', priority: 'Medium' },
    { date: '2025-01-25', title: 'RedEarth Conveyor Calibration', description: 'Calibrating the RedEarth conveyor for precision', location: 'Factory Floor 2', time: '1:00 PM', organizer: 'Calibrate Inc.', priority: 'Low' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal open state
  const [eventModalOpen, setEventModalOpen] = useState(false); // Manage event details modal state

  // Extract current year and month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based index

  // Get number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // First day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Generate days for the current month
  const days = [...Array(daysInMonth).keys()].map((day) => {
    const date = new Date(year, month, day + 1);
    const dateString = date.toISOString().split('T')[0];
    const dayEvents = events.filter((event) => event.date === dateString);

    return {
      day: day + 1,
      dateString,
      events: dayEvents,
    };
  });

  // Handlers for navigation between months
  const handlePreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Add event to the events array
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Alert Cards */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Alerts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {events.map((event, index) => (
              <div
                key={index}
                className={`flex items-center p-2 rounded-[0.5vw] shadow-md text-center ${
                  event.priority === 'High'
                    ? 'bg-red-500'
                    : event.priority === 'Medium'
                    ? 'bg-orange-400'
                    : 'bg-green-400'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  {event.priority === 'High' && (
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5h2v6h-2zm0 8h2v2h-2z" />
                  )}
                  {event.priority === 'Medium' && (
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5h2v6h-2zm0 8h2v2h-2z" />
                  )}
                  {/* {event.priority === 'Low' && (
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h-2v2h2z" />
                  )} */}
                </svg>
                <h3 className="font-bold text-white text-sm">{event.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 flex flex-col grow">
          <h1 className="text-xl font-bold mb-6">Maintenance Calendar</h1>

          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePreviousMonth}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Previous
            </button>
            <h2 className="text-lg font-semibold">
              {currentDate.toLocaleString('default', { month: 'long' })} {year}
            </h2>
            <button
              onClick={handleNextMonth}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-[30px] text-slate-200 rounded mb-4 hover:bg-slate-600 w-[90px] h-[45px] self-end"
          >
            +
          </button>

          {/* Day Labels */}
          <div className="grid grid-cols-7 text-center font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="py-2">{day}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 flex-1">
            {/* Empty cells for days before the first day of the month */}
            {[...Array(firstDayOfMonth).keys()].map((_, index) => (
              <div key={index} className="border-b border-r border-gray-300 dark:border-gray-700 h-full"></div>
            ))}

            {/* Render days */}
            {days.map((day) => (
              <div
                key={day.day}
                className={`relative border-b border-r border-gray-300 dark:border-gray-700 flex flex-col justify-start items-start p-2 cursor-pointer ${
                  day.dateString === selectedDate?.dateString
                    ? 'bg-slate-400 dark:bg-slate'
                    : day.events.length > 0
                    ? 'bg-gray-200 dark:bg-gray-800'
                    : ''
                } hover:bg-gray-300 dark:hover:bg-gray-700`}
                onClick={() => {
                  setSelectedDate(day);
                  setEventModalOpen(true);
                }}
              >
                {/* Day Number */}
                <span className="absolute top-1 right-1 text-lg font-bold text-gray-800 dark:text-gray-200">
                  {day.day}
                </span>
                {/* Event Titles */}
                {day.events.map((event, index) => (
                  <span key={index} className="text-xs text-grey-500 dark:text-grey-400 mt-1">
                    {event.title}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Selected Date Details Modal */}
          {eventModalOpen && selectedDate && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-1/3">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Details for {selectedDate.dateString}</h2>
                  <button
                    onClick={() => setEventModalOpen(false)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {selectedDate.events.length > 0 ? (
                  <ul>
                    {selectedDate.events.map((event, index) => (
                      <li key={index} className="mb-4">
                        <h3 className="text-sm font-bold">{event.title}</h3>
                        <p className="text-sm"><strong>Description:</strong> {event.description}</p>
                        <p className="text-sm"><strong>Location:</strong> {event.location}</p>
                        <p className="text-sm"><strong>Time:</strong> {event.time}</p>
                        <p className="text-sm"><strong>Organizer:</strong> {event.organizer}</p>
                        <p className="text-sm"><strong>Priority:</strong> {event.priority}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No events scheduled for this day.</p>
                )}

              </div>
            </div>
          )}

          {/* Calendar Event Form Modal */}
          <CalendarEventForm
            isOpen={isModalOpen}
            toggleModal={setIsModalOpen}
            selectedDate={selectedDate?.dateString || ''}
            addEvent={addEvent}
          />
        </main>
      </div>
    </div>
  );
}

export default Maintenance;
