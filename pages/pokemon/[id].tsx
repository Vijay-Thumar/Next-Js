/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../../styles/Details.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"
import { json } from 'stream/consumers'

export interface SpecificPokemon {
    name: string,
    type: string[],
    image: string,
    stats: { name: string, value: number }[]
}

export async function getStaticPaths() {
    const resp = await fetch('https://pokemon-data-set.vercel.app/index.json')
    const pokemon = await resp.json()

    return {
        paths: pokemon.map((pokemon: {id: number}) => ({
            params: { id: pokemon.id.toString() }
        })),
        fallback: false,
    }
}

export async function getStaticProps({ params }: { params: { id: string | number } }) {
    const resp = await fetch(`https://pokemon-data-set.vercel.app/pokemon/${params.id}.json`)

    return {
        props: {
            pokemon: await resp.json(),
        }
    }
}

export default function Details({ pokemon }: { pokemon: any }) {
    // const { query: { id } } = useRouter(); // taken query from useRouter and 
    // const [pokemon, setPokemon] = useState<SpecificPokemon | null>(null);

    // useEffect(() => {
    //     async function getPokemon() {
    //         const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`)
    //         setPokemon(await resp.json());
    //     }
    //     if (id) {
    //         console.log('getting pokemon.');

    //         getPokemon();
    //     }
    // }, [id])

    if (!pokemon) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{pokemon.name}</title>
            </Head>

            <div>
                <Link href={'/'}>
                    <b>Back to Home</b>
                </Link>
            </div>

            <div className={styles.layout}>
                <div>
                    <img
                        className={styles.picture}
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                        alt={pokemon.name}
                    />
                </div>
                <div>
                    <div>
                        <div className={styles.name}>{pokemon.name}</div>
                        <div className={styles.type}>{pokemon.type.join(", ")}</div>
                    </div>
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats.map(({ name, value }: any) => (
                                <tr key={name}>
                                    <td className={styles.attribute}>{name}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}