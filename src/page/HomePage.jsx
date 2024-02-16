import React from 'react'
import MyNavbar from '../components/MyNavbar'
import Recipes from '../components/Recipes'
import GetMenu from '../components/GetMenu'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div >
        <MyNavbar/>
        <GetMenu/>
        <Recipes/>
        <Footer/>
      
    </div>
  )
}

export default HomePage