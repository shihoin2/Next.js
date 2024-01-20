"use client"
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'


const searchDog = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const res = await response.json();
  return res;
}

export default function Home({ initialCatImageUrl }) {
  const [catImage, setCatImage] = useState(initialCatImageUrl);

  const handleClick = async () => {
    const res = await searchDog();
    setCatImage(res.message);
  }

  return (
    <div className={styles.container}>
      <main>
        <h1>犬の画像</h1>
      </main>
      <div style={{ position: 'relative', width: 400, height:400 }}>
        <Image src={catImage} layout="fill" objectFit="contain" alt='犬' />
      </div>
      <button onClick={handleClick}>画像を検索</button>
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await searchDog();
  console.log(res);
  return {
    props: {
      initialCatImageUrl: res.message
    }
  };
};
