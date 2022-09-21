import { ReactElement } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { NextPageWithLayout } from './_app'
import SidebarLayout from '@components/layouts'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <h1>This is indexpage</h1>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <SidebarLayout>
      {page}
    </SidebarLayout>
  )
}

export default Home
