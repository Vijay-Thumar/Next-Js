import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  const resp = await fetch('https://pokemon-data-set.vercel.app/index.json')
  return {
    props: {
      pokemon: await resp.json(),
    }
  }
}

export default function Home({ pokemon }: { pokemon: any }) {
  // const [pokemon, setPokemon] = useState([]);

  // useEffect(() => {
  //   async function getPokemon() {
  //     const resp = await fetch("https://pokemon-data-set.vercel.app/index.json")
  //     setPokemon(await resp.json());
  //   }
  //   getPokemon();
  // }, [])

  return (
    <>
      <Head>
        <title>Pokemon List</title>
      </Head>
      {/* <div>{JSON.stringify(pokemon)}</div> */}
      <div className={styles.grid}>
        {pokemon.map((item: { id: number; name: string; image: string; }) => (
          <div className={styles.card} key={item.id}>
            <Link href={`/pokemon/${item.id}`}>
              <img src={`https://pokemon-data-set.vercel.app/${item.image}`} alt={item.name} />
              <h3 className={styles.h3style}>{item.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
// Starting SSR