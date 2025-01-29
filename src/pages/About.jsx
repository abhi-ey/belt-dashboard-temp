import React, { useState } from 'react';
import Sidebar from "../partials/Sidebar";
import backdrop from "../images/minesite.avif";
 
function About() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
 
    return (
        <div className="flex h-screen overflow-hidden w-full">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
 
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
 
                <main className="grow relative">
                    {/* Outer Div for Background Image */}
                    <div className="relative h-[50vh] w-full">
                        {/* Background Image with Gradient Mask */}
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${backdrop})`,
                                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
                                maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
                            }}
                        />
                        {/* "About" Header Positioned Over Image */}
                        <div className="absolute bottom-8 w-full flex justify-center">
                        <h1 className="text-5xl md:text-9xl font-bold font-[Oswald] text-white drop-shadow-lg" style={{ letterSpacing: '0.03em' }}>
                            Efficiency Unveiled
                        </h1>
                        </div>
                    </div>
 
                    {/* Content Section */}
                    <div className="relative px-4 sm:px-6 lg:px-8 py-8">
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            The Rio Tinto Pilbara minesite dashboard is designed to revolutionize the monitoring and maintenance of conveyor belt systems across the site. Developed with advanced technologies, this solution provides a comprehensive overview of conveyor belt performance and addresses critical issues like carryback, which can lead to machinery damage and revenue loss.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            This dashboard features:
                        </p>
                        <ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-300">
                            <li><strong>Overview Metrics:</strong> Summarized information on the entire conveyor belt network for efficient monitoring.</li>
                            <li><strong>Analytics:</strong> AI-powered predictive analysis for each belt and section, enabling accurate forecasts of deterioration timelines.</li>
                            <li><strong>Maintenance Calendar:</strong> A centralized calendar to schedule and track maintenance events.</li>
                            <li><strong>Reports:</strong> An intuitive interface for submitting and managing maintenance requests.</li>
                            <li><strong>Interactive Map:</strong> Satellite imagery of the minesite, with real-time locations of conveyor belts and their statuses.</li>
                        </ul>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            By integrating cutting-edge AI vision models and predictive analytics, the dashboard ensures improved operational efficiency, reduced costs, and a safer working environment. This tool aims to streamline maintenance processes while minimizing downtime, empowering efficient decision-making for Rio Tinto operations.
                        </p>
                    </div>
 
                </main>
            </div>
        </div>
    );
}
 
export default About;