import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Sidebar from '../components/sidebar'

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
    </>
  )
}

export default Home
