
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';

import { useEffect, useState } from "react"
import { Form,Col,Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { fetchscategories } from '../../../services/scategorieservice';
import { addarticle } from '../../../services/articleservice';
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import axios from 'axios';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Insertarticle({ajoutarticle}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles] = useState([]);
  const[article,setArticle]=useState({})
  const[scategories,setScategories]=useState([])

const getscategories=async()=>{
  try {
      const res=await fetchscategories()
      setScategories(res.data)
     
  } catch (error) {
      console.log(error)
  }
}
useEffect(()=>{
  getscategories()
},[])

const handleSave=async(e)=>{
  try {
      e.preventDefault()
      await addarticle(article)
      .then(res=>{
          handleClose()
          ajoutarticle(res.data)
          vider()
})
} catch (error) {
      console.log(error)
  }
}

const vider=()=>{
  setArticle({})
  
}


const serverOptions = () => { 
  return {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
  
      const data = new FormData();
      
      data.append('file', file);
      data.append('upload_preset', 'Essat2025');
      data.append('cloud_name', 'debph61bu');
      data.append('publicid', file.name);

      axios.post('https://api.cloudinary.com/v1_1/debph61bu/image/upload', data)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
         setArticle({...article,imageart:data.url}) ;
          load(data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          error('Upload failed');
          abort();
        });
    },
  };
};


  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>Ajouter</Button>
      <Modal
        open={ open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <div >
        <center><h1>Insérer un article</h1></center>
       <Form>
        <Row>
      <Form.Group as={Col} md="6">
        <Form.Label>Référence</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Référence" 
        value={article.reference}
        onChange={(e)=>setArticle({...article,reference:e.target.value})}
        />
        </Form.Group>
        
        <Form.Group as={Col} md="6">
        <Form.Label>Désignation</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Désignation" 
        value={article.designation}
        onChange={(e)=>setArticle({...article,designation:e.target.value})}
        />
        </Form.Group>
        </Row>
        <Row>
      <Form.Group as={Col} md="6">
        <Form.Label>Marque</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Marque" 
        value={article.marque}
        onChange={(e)=>setArticle({...article,marque:e.target.value})}
        />
        </Form.Group>
        
        <Form.Group as={Col} md="6">
        <Form.Label>Prix</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Prix" 
        value={article.prix}
        onChange={(e)=>setArticle({...article,prix:e.target.value})}
        />
        </Form.Group>
        </Row>

        <Row>
      <Form.Group as={Col} md="6">
        <Form.Label>Stock</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Stock" 
        value={article.qtestock}
        onChange={(e)=>setArticle({...article,qtestock:e.target.value})}
        />
        </Form.Group>
        
        <Form.Group as={Col} md="6">
        <Form.Label>Image</Form.Label>
       <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
     <FilePond
                   files={files}
                   acceptedFileTypes="image/*"
                   onupdatefiles={setFiles}
                   allowMultiple={true}
                   server={serverOptions()}
                   name="file"
                      
          />

    </div> 
     </Form.Group>
        </Row>
        <Row>
      <Form.Group as={Col} md="12">
        <Form.Label>S/Catégorie</Form.Label>
        <Form.Control 
        type="text"
        as={"select"} 
        placeholder="S/Catégorie" 
        value={article.scategorieID}
        onChange={(e)=>setArticle({...article,scategorieID:e.target.value})}
        >
            <option>--Sélectionner une sous catégorie--</option>
            {
                scategories.map((scat,index)=>
                <option value={scat._id} key={index}>{scat.nomscategorie}</option>
                )
            }
           </Form.Control> 
        </Form.Group>
        </Row>

        
    </Form>
<div>
    <button className="btn btn-success btn-sm" onClick={(e)=>handleSave(e)}><i class="fa-solid fa-floppy-disk"></i> Enregistrer</button>
    &nbsp;
    <button className="btn btn-danger btn-sm" onClick={handleClose}><i class="fa-solid fa-arrow-right-from-bracket"></i> Annuler</button>
    </div>
</div>
     
        </Box>
      </Modal>
    </div>
  );
}