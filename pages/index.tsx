import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Authentication from '../components/authentication/authentication'
import { setupSocket } from '../services/notificationService'
import { isUserAuthenticated } from '../services/userService'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  let router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (isUserAuthenticated()) {
        router.push('/user/profiles');
    }
  }, []);
    return (
      !isUserAuthenticated() &&
      <div className={styles.container}>
        <Head>
          <title>Wellcome to our social media</title>
          <meta name="description" content="Social Media application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <Authentication></Authentication>
        </main>
  
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              Andin Avdiu
            </span>
          </a>
        </footer>
      </div>
    )
}

export default Home
