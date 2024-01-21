"use client"
import React, { useState, useEffect } from 'react';
import { NextRequest, NextResponse } from "next/server";


// export default function Home() {
//   const [weather, setWeather] = useState('');
//   const [city, setCity] = useState('');


//   const fetchWeather = async () => {
//     // const res = await fetch('/api?city=${city}');
//     const res = await fetch('/api');
//     const data = await res.json();
//     setWeather(data);
//   };

//   useEffect(() => {
//     fetchWeather();
//   }, [city]);

//   return (
//     <div>
//       <h1>お住まいの地域の天気</h1>
//       <form>
//       <input
//         type="text"
//         placeholder="都市名を入力"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />
//       <button onClick={fetchWeather}>天気情報を取得する</button>
//       </form>
//       {weather && (
//         <>
//           <p>{weather.data.weather[0]}</p>
//           <p>最高気温：{weather.data.main.temp_max}</p>
//         </>)}
//     </div>
//   );
// }



export default function Home() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeather = async () => {
    try {
      // const res = await fetch(`/api?city=${encodeURIComponent(city)}`);
      // const res = await fetch(`/api?${city}`);
      // const res = await fetch(`/api/${encodeURIComponent(city)}`);
      const encodedCity = encodeURIComponent(city as string);
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=d068bb96a1d7ba8987f892ea7c2d81ab`);
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error('Error:', error);
      setWeather(null);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) {
      console.error('都市名を入力');
      return
    }
    await fetchWeather();
  };

  return (
    <div>
      <h1>お住まいの地域の天気</h1>
      {/* <form onSubmit={handleSubmit} action="/api" method='get'> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='city'
          placeholder="都市名を入力"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">
          天気情報を取得する
        </button>
      </form>
      {/* {weather && weather.data ? ( */}
      {weather &&  weather.cod === 200? (
        <>
          <p>{weather.weather[0].main}</p>
          <p>最高気温：{weather.main.temp_max}</p>
        </>
      ) : (
        <p>天気情報がありません</p>
      )}
    </div>
  );
}
