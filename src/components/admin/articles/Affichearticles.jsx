import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import { Box } from '@mui/material';
import { Button } from 'react-bootstrap';
import Editarticle from './Editarticle';

const Affichearticles = ({articles,deleteProduct,modifarticle}) => {
   


    const columns = useMemo(
        () => [
          {
            accessorKey: 'reference', //access nested data with dot notation
            header: 'Référence',
            size: 80,
          },
          {
            accessorKey: 'designation',
            header: 'Désignation',
            size: 100,
          },
          {
            accessorKey: 'marque', //normal accessorKey
            header: 'Marque',
            size: 80,
          },
          {
            accessorKey: 'prix',
            header: 'Prix',
            size: 80,
          },
          {
            accessorKey: 'qtestock',
            header: 'Stock',
            size: 80,
          },
          {
            accessorKey: 'imageart', //access nested data with dot notation
            header: 'Image',
            Cell: ({ cell}) => (
            <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            }}
            >
            <img
            alt=""
            height={100}
            src={cell.getValue()}
            loading="lazy"
            style={{ borderRadius: '20%' }}
            />
            
            </Box>),
            },

            {
                accessorKey: '_id',
                header: 'actions',
                size: 100,
                Cell: ({ cell, row }) => (
                <div >
                <Editarticle initialArticle={cell.row.original} modifarticle={modifarticle} />
                <Button
                onClick={(e) => {
                  deleteProduct(cell.row.original._id,cell.row.original.reference, e);
                }}
                variant="danger"
                size="md"
                className="text-danger btn-link delete"
                >
                <i className="fa fa-trash" />
                </Button>
                </div>
                ),
                },
    

        ],
        [articles] //dependency array
      );
    
      const table = useMaterialReactTable({
        columns,
        data:articles, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
      });
    


  return (
    
    <div>
        
      <MaterialReactTable table={table} />
    </div>
  )
}

export default Affichearticles
