"use client"

import React from 'react'
import NavBar from '@/components/shared/NavBar'


const Layout = ({children} : {children: React.ReactNode}) => {
  return (
    <main className="root">
      <NavBar />


      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
      </div>    
    </main>
  )
}

export default Layout