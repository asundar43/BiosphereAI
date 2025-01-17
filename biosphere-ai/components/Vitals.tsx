"use client"

import React, { useState, useEffect } from 'react';
import Charts from './charts';
import { Heart } from 'lucide-react';

export default function Vitals() {
  const [vitalsData, setVitalsData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate real-time vitals updates
    const interval = setInterval(() => {
      setVitalsData(prev => {
        const newData = [...prev.slice(-11), {
          time: new Date().toLocaleTimeString(),
          heartRate: 70 + Math.random() * 10,
          bloodPressure: 120 + Math.random() * 5,
          oxygenLevel: 97 + Math.random() * 2
        }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center mb-4">
        <Heart className="h-6 w-6 text-red-500 mr-2" />
        <h2 className="text-2xl font-bold text-black">Real-time Vitals</h2>
      </div>
      <Charts type="vitals" data={vitalsData} />
    </div>
  );
}