import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>React - Tic Tac Toe</title>
        <meta name="description" content="React Tic Tac Toe App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          React Tic Tac Toe - Ian Price
        </h1>

      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export default Home
