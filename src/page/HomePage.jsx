import React from 'react'
import Navbar from '../components/Navbar'
import Recipes from '../components/Recipes'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import CreateRecipe from '../components/CreateRecipe'

function HomePage() {
  return (
    <div>
        <Navbar/>
        <Recipes/>
        {/* <LoginPage/> */}
        {/* <RegisterPage/> */}
        {/* <CreateRecipe/> */}
        
      
    </div>
  )
}

export default HomePage