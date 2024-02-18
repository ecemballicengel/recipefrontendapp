import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import Category from './components/Category';
import RecipeDetailsPage from './page/RecipeDetailsPage';
import CreateRecipe from './components/CreateRecipe';
import ProfilPage from './page/ProfilPage';
import UserRecipeEdit from './components/UserRecipeEdit';


function App() {
 
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/kategori' element={<Category/>}/>
      <Route path='/recipe/:id' element={<RecipeDetailsPage/>}/>
      <Route path='/tarifEkle' element={<CreateRecipe/>}/>
      <Route path='/user/:id' element={<ProfilPage/>}/>
      <Route path='/tarifiniGuncelle' element={<UserRecipeEdit/>}/>
     </Routes>
    </div>
  );
}

export default App;
