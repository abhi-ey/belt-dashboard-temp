import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CalendarEventForm({ isOpen, toggleModal, selectedDate, addEvent }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || description.trim() === '') {
      alert('Please fill out all fields.');
      return;
    }

    // Create new event object
    const newEvent = {
      title,
      description,
      date: selectedDate,
    };

    // Add event to the data structure
    addEvent(newEvent);

    // Reset form fields
    setTitle('');
    setDescription('');

    // Close modal
    toggleModal(false);
  };

  const handleCancel = () => {
    // Reset form fields
    setTitle('');
    setDescription('');

    // Close modal
    toggleModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date
            </label>
            <input
              type="text"
              id="date"
              value={selectedDate}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CalendarEventForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  addEvent: PropTypes.func.isRequired,
};

export default CalendarEventForm;
