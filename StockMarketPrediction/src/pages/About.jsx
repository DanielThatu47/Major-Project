import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About StockPredict</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          StockPredict is your intelligent companion for stock market analysis and predictions. 
          We combine cutting-edge technology with financial expertise to help you make informed investment decisions.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p>
              To democratize stock market analysis and make professional-grade tools accessible to everyone.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
            <p>
              To become the most trusted platform for stock market predictions and analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;