import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Plus, Bell, TrendingUp, TrendingDown } from 'lucide-react';

const data = [
  { name: 'AAPL', value: 400 },
  { name: 'GOOGL', value: 300 },
  { name: 'MSFT', value: 200 },
  { name: 'AMZN', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Portfolio = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Portfolio Composition</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span>{item.name}: {((item.value / data.reduce((acc, cur) => acc + cur.value, 0)) * 100).toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
              <Plus className="w-5 h-5 mr-2" />
              Add New Stock
            </button>
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-green-600 transition-colors">
              <Bell className="w-5 h-5 mr-2" />
              Set Alert
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Value:</span>
            <span className="text-2xl font-bold">$10,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Today's Change:</span>
            <span className="text-green-500 flex items-center">
              <TrendingUp className="w-5 h-5 mr-1" />
              +$150 (1.5%)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Return:</span>
            <span className="text-red-500 flex items-center">
              <TrendingDown className="w-5 h-5 mr-1" />
              -$500 (-4.76%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;