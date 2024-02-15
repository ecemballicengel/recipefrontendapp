import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import Category from './components/Category';
import RecipeDetailsPage from './page/RecipeDetailsPage';
import CreateRecipe from './components/CreateRecipe';


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
     </Routes>
    </div>
  );
}

export default App;
