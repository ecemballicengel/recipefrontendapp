import React from 'react'
import Navbar from '../components/Navbar'
import Recipes from '../components/Recipes'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import CreateRecipe from '../components/CreateRecipe'
import GetMenu from '../components/GetMenu'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div >
        <Navbar/>
        <GetMenu/>
        <Recipes/>
        {/* <h1 style={{backgroundColor:"rgb(227, 212, 241)"}}></h1> */}
        <Footer/>
      
    </div>
  )
}

export default HomePage