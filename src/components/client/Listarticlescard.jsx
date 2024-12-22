import React, { useEffect, useState } from 'react'
import Card from './Card'
import { fetcharticlesPagination } from '../../services/articleservice'
import Pagination from './Pagination'


const Listarticlescard = () => {
      const[articles, setArticles] = useState([])
      const[loading, setLoading] = useState(true)
      const[error, setError] = useState(false)
      const[currentPage,setCurrentPage]=useState(1)
      const[limit,setLimit]=useState(18)
   
      const[totalPages,setTotalPages]=useState(20)
      const getarticles = async (currentPage,limit) => {
        try {
            
          const res = await fetcharticlesPagination(currentPage,limit)
          setArticles(res.data.articles)
          setTotalPages(Math.ceil(res.data.tot/limit))
          setLoading(false)
        } catch (error) {
         setLoading(false)
          setError(true)
        }
      }
      useEffect(() => {
        getarticles(currentPage,limit)
      }
      , [currentPage,limit])

      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
      const handlePageChange = (page) => {
        setCurrentPage(page);
      };

  return (
    <>
    <div className='card-container'>
       
     {articles.map((art,index)=>
        
    <Card article={art} key={index} />
    )}
    </div>
    <Pagination handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      handlePageChange={handlePageChange}
      totalPages={totalPages}
      currentPage ={currentPage }
      />

    </>
  )
}

export default Listarticlescard

