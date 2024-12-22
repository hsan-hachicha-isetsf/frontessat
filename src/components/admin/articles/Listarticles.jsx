import { useEffect, useState } from "react"
import { deletearticle, fetcharticles } from "../../../services/articleservice"
import ReactLoading from 'react-loading';
import Affichearticles from "./Affichearticles";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Insertarticle from "./Insertarticle";


const Listarticles = () => {
  const[articles, setArticles] = useState([])
  const[loading, setLoading] = useState(true)
  const[error, setError] = useState(false)

  const getarticles = async () => {
    try {
      const res = await fetcharticles()
      setArticles(res.data)
      
      setLoading(false)
    } catch (error) {
     
      setLoading(false)
      setError(true)
    }
  }
  useEffect(() => {
    getarticles()
  }
  , [])

  const deleteProduct = (productId,ref) => {
    confirmAlert({
        title: "Confirm delete...",
        message: " supprimer l' article: " + ref,
        buttons: [
        {
        label: 'Oui',
        onClick: () => deletearticle(productId)
        .then(res=>
        setArticles(articles.filter((article) => article._id !== productId)))
        //.then(console.log("suppression effectuée avec success"))
        .catch(error=>console.log(error))
        },
        {
        label: 'Non',
        }
        ]
        });
        }




if(loading){
  return <center> <ReactLoading type={"spinningBubbles"} color={"#332"} height={667} width={375} /></center>
}
if(error){
  return <div>Une erreur est survenue</div>
}
const ajoutarticle=(article)=>{
  setArticles([article,...articles])
}
const modifarticle=(article)=>{ 
  setArticles(articles.map((item)=>item._id===article._id?article:item))
}

  return (
    <div>
     <Insertarticle ajoutarticle={ajoutarticle}/>
      
      <Affichearticles articles={articles} deleteProduct={deleteProduct} modifarticle={modifarticle}/>
    </div>
  )
}

export default Listarticles
