import React, { useState } from 'react';
import DashboardCard01 from '..//partials/dashboard/DashboardCard01';

function AnalyticsActions() {
  const [activeTab, setActiveTab] = useState('Model'); // Default to Model tab

  return (
    <div>
      <div className="flex justify-left mb-8 mt-4">
        <div className="relative flex bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-800">
        {/* Slider */}
        <div
            className={`absolute bg-yellow-500 rounded-full h-full w-1/3 transition-transform duration-300 ease-in-out`}
            style={{
            transform: `translateX(${['Model', 'Data', 'Images'].indexOf(activeTab) * 100}%)`,
            }}
        ></div>

        {/* Toggle Buttons */}
        {['Model', 'Data', 'Images'].map((tab) => (
            <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
            >
            {tab}
            </button>
        ))}
        </div>
    </div>

      {/* Content Sections */}
      {activeTab === 'Model' && (
        <div className="grid grid-cols-5 gap-6">
          {/* Left Section: 1/5 */}
          <div className="col-span-1 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Belt Metadata</span>
          </div>

          {/* Middle Section: 3/5 */}
          <div className="col-span-3">
            <div className="grid grid-cols-12 gap-6">
              <DashboardCard01 />
              {/* Add more cards as needed */}
              {/* <DashboardCard02 /> */}
              {/* <DashboardCard03 /> */}
            </div>
          </div>

          {/* Right Section: 1/5 */}
          <div className="col-span-1 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Right Section</span>
          </div>
        </div>
      )}

      {activeTab === 'Data' && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Data View</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This section represents data-related analytics or visualizations.
          </p>
        </div>
      )}

      {activeTab === 'Images' && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Images View</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This section represents image-related analytics or visualizations.
          </p>
        </div>
      )}
    </div>
  );
}

export default AnalyticsActions;
