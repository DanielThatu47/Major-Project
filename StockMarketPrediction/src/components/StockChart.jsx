import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  ReferenceLine,
} from 'recharts';
import { format, parseISO } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = format(parseISO(label), 'PPP');
    return (
      <div className="bg-white border border-gray-300 p-4 rounded shadow">
        <p className="font-semibold">{date}</p>
        {payload.map((entry, index) => (
          <p 
            key={`item-${index}`} 
            style={{ color: entry.color }}
            className="flex justify-between space-x-4"
          >
            <span>{entry.name}:</span>
            <span className="font-semibold">
              ${parseFloat(entry.value).toFixed(2)}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StockChart = ({ data, timeframe }) => {
  if (!data || data.length === 0) return null;

  // Calculate min and max values for better Y-axis scaling
  const minValue = Math.min(...data.map(item => item.low));
  const maxValue = Math.max(...data.map(item => item.high));
  const yAxisDomain = [
    minValue - (maxValue - minValue) * 0.1, // Add 10% padding
    maxValue + (maxValue - minValue) * 0.1
  ];

  // Get the last closing price
  const lastClose = data[data.length - 1]?.close;

  return (
    <div className="w-full h-[500px]"> {/* Increased height for better visibility */}
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => format(parseISO(tick), 'MMM dd')}
            minTickGap={50}
          />
          <YAxis 
            domain={yAxisDomain}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {lastClose && (
            <ReferenceLine
              y={lastClose}
              stroke="#666"
              strokeDasharray="3 3"
              label={{ 
                value: `Last Close: $${lastClose.toFixed(2)}`,
                position: 'right'
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
            name="Close Price"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="high"
            stroke="#82ca9d"
            name="High"
            dot={false}
            strokeWidth={1}
            opacity={0.7}
          />
          <Line
            type="monotone"
            dataKey="low"
            stroke="#ff7300"
            name="Low"
            dot={false}
            strokeWidth={1}
            opacity={0.7}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Showing data for the last {timeframe}
      </p>
    </div>
  );
};

export default StockChart;
