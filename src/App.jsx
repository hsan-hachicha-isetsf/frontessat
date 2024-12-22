import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Listarticles from "./components/admin/articles/Listarticles"
import Insertarticle from "./components/admin/articles/Insertarticle"
import Editarticle from "./components/admin/articles/Editarticle"
import Listcategories from "./components/admin/categories/Listcategories"
import Insertcategorie from "./components/admin/categories/Insertcategorie"
import Editcategorie from "./components/admin/categories/Editcategorie"
import Listscategories from "./components/admin/scategories/Listscategories"
import Insertscategorie from "./components/admin/scategories/Insertscategorie"
import Editscategorie from "./components/admin/scategories/Editscategorie"
import Menu from "./components/admin/Menu"
import Home from "./components/admin/Home"
import { CartProvider } from "use-shopping-cart"
import Listarticlescard from "./components/client/Listarticlescard"
import Cart from "./components/client/Cart"
import Login from "./components/authentification/Login"
import Dashboard from "./components/admin/dashboard"
import Logout from "./components/authentification/Logout"
import RegisterForm from "./components/authentification/Register"
import ProtectedRoutes from "./ProtectedRoute"

const App = () => {
  return (
    <CartProvider>
    <Router>
  
      <Routes>
      <Route element={<ProtectedRoutes/>}>
      <Route path="/articles" element={<Listarticles/>}/>
      <Route path="/articles/add" element={<Insertarticle/>}/>
      <Route path="/articles/edit/:id" element={<Editarticle/>}/>
      <Route path="/scategories" element={<Listscategories/>}/>
      <Route path="/scategories/add" element={<Insertscategorie/>}/>
      <Route path="/scategories/edit/:id" element={<Editscategorie/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/logout" element={<Logout/>}/>
      </Route>    
        
        <Route path="/" element={<Home/>}/>
        <Route path="/categories" element={<Listcategories/>}/>
        <Route path="/categories/add" element={<Insertcategorie/>}/>
        <Route path="/categories/edit/:id" element={<Editcategorie/>}/>
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/client" element={<Listarticlescard/>}/>
        <Route path="/cart" element={<Cart/>}/>
      
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/menu" element={<Menu/>}/>
      </Routes>

    </Router>
    </CartProvider>
  )
}

export default App
