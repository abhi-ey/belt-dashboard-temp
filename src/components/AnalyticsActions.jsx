import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import BeltMetadataSection from './BeltMetadataSection';
import LRGraph from './LRGraph';
import PredictiveAnalysis from './PredictiveAnalysis';

function AnalyticsActions() {
  const [activeTab, setActiveTab] = useState('Model'); // Default to Model tab
  const [selectedBelt, setSelectedBelt] = useState('Ironflow 01'); // Default belt
  const [csvData, setCsvData] = useState([]); // State to store parsed CSV data
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Current image index

  // Fetch and parse the CSV file when the Data tab is active
  useEffect(() => {
    if (activeTab === 'Data') {
      fetch('/backend/predictions_output.csv') // Adjust the path if needed
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.text();
        })
        .then((csvText) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              setCsvData(results.data);
            },
          });
        })
        .catch((error) => {
          console.error('Error fetching or parsing CSV:', error);
        });
    }
  }, [activeTab]);

  // List of images from the public folder
  const imageList = [
    'Section1_0.jpg',
    ...Array.from({ length: 50 }, (_, index) => `Section1_${index + 1}.png`)
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length);
  };

  return (
    <div>
      {/* Toggle Section */}
      <div className="flex justify-left mb-8 mt-4">
        <div className="relative flex bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-800">
          {/* Slider */}
          <div
            className={`absolute bg-slate-500 rounded-full h-full w-1/3 transition-transform duration-300 ease-in-out`}
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
          <div className="col-span-1 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Predictive Analysis</span>
            <PredictiveAnalysis />
          </div>

          {/* Middle Section: 3/5 */}
          <div className="col-span-3">
            <div className="grid grid-cols-12 gap-6 w-[10600px]">
              <LRGraph />
            </div>
          </div>

          <div className="col-span-1">
            <BeltMetadataSection selectedBelt={selectedBelt} />
          </div>
        </div>
      )}

      {activeTab === 'Data' && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Data View</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Displaying predictions from <strong>predictions_output.csv</strong>.
          </p>

          {/* Display CSV Data in a Scrollable Div */}
          {csvData.length > 0 ? (
            <div className="overflow-x-auto max-h-[400px] border border-gray-200 dark:border-gray-700 rounded-md">
              <table className="min-w-full mt-4 border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    {Object.keys(csvData[0]).map((header) => (
                      <th
                        key={header}
                        className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-gray-200"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((row, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                      {Object.values(row).map((value, idx) => (
                        <td
                          key={idx}
                          className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">No data available or file not loaded.</p>
          )}
        </div>
      )}

      {activeTab === 'Images' && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Section Images</h2>
          <div className="flex items-center justify-center">
            <button
              onClick={handlePreviousImage}
              className="p-2 text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
            >
              &lt;
            </button>
            <div className="mx-4 bg-gray-100 dark:bg-gray-700 rounded shadow overflow-hidden w-full max-w-2xl">
              <img
                src={`/CarrybackImages/Section1/${imageList[currentImageIndex]}`}
                alt={`Carryback ${currentImageIndex + 1}`}
                className="w-full h-auto object-contain"
              />
            </div>
            <button
              onClick={handleNextImage}
              className="p-2 text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsActions;
