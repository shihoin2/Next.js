import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { use } from 'react';


"use client"
import React, { useState, useEffect } from 'react';


const Page: React.FC = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api');
        const data = await res.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>お住まいの地域の天気</h1>
        {weatherData && (
          <>
            <p> {weatherData.data.weather[0].icon} </p>
            <p> {weatherData.data.weather[0].main} </p>
            <p>最高気温: {weatherData.data.main.temp_max} ℃</p>
          </>
        )}
      </div >
    </>
  );
};

export default Page;
