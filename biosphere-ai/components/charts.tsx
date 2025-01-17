"use client"

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ChartsProps {
  type: string;
  data: Array<{
    time: string;
    heartRate: number;
    bloodPressure: number;
    oxygenLevel: number;
  }>;
}

export default function Charts({ type, data }: ChartsProps) {
  if (type === 'vitals') {
    return (
      <div className="w-full h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="heartRate" 
              stroke="#ef4444" 
              name="Heart Rate" 
            />
            <Line 
              type="monotone" 
              dataKey="bloodPressure" 
              stroke="#3b82f6" 
              name="Blood Pressure" 
            />
            <Line 
              type="monotone" 
              dataKey="oxygenLevel" 
              stroke="#22c55e" 
              name="Oxygen Level" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
}