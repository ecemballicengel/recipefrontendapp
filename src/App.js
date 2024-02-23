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
import AdminPage from './page/AdminPage';
import CategoryAdd from './components/CategoryAdd';
import CategoryEdit from './components/CategoryEdit';
import CategoryDetails from './components/CategoryDetails';


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
      <Route path='/usertarif/:id' element={<UserRecipeEdit/>}/>
      <Route path='/adminPage' element={<AdminPage/>}/>
      <Route path='/kategoriEkle' element={<CategoryAdd/>}/>
      <Route path='/adminPage/kategoriGuncelle/:id' element={<CategoryEdit/>}/>
      <Route path='/Recipe/category/:id' element={<CategoryDetails/>}/>
     </Routes>
    </div>
  );
}

export default App;
