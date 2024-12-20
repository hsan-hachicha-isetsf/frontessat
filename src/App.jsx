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
const App = () => {
  return (

    <Router>
      <Menu/>
      <Routes>
        <Route path="/articles" element={<Listarticles/>}/>
        <Route path="/articles/add" element={<Insertarticle/>}/>
        <Route path="/articles/edit/:id" element={<Editarticle/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/categories" element={<Listcategories/>}/>
        <Route path="/categories/add" element={<Insertcategorie/>}/>
        <Route path="/categories/edit/:id" element={<Editcategorie/>}/>

        <Route path="/scategories" element={<Listscategories/>}/>
        <Route path="/scategories/add" element={<Insertscategorie/>}/>
        <Route path="/scategories/edit/:id" element={<Editscategorie/>}/>



      </Routes>

    </Router>
    
  )
}

export default App
