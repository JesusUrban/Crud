import axios from 'axios'
import React, { useState } from 'react'

function useCrudApi() {
   const [data, setData]= useState([])
   const [pending, setPending]= useState(false)
   const [error, setError]= useState(null)
   
   const request = async ({ url, method = 'GET', body = null, id = null }) => {
    setPending(true);
    setError(null);
  
    // Normalize method to uppercase
    const normalizedMethod = method.toUpperCase();
    
  
    try {
      const res = await axios({
        url,
        method: normalizedMethod,
        data: normalizedMethod !== 'GET' ? body : null
      }); 
      
      switch (normalizedMethod) {
         
        case 'POST':
         setData((prev) =>[...prev, res.data])
          
          break
  
        case 'PUT':
        case 'PATCH':
          setData((prev) => prev.map(i =>{ return i.id === res.data.id ? res.data : i}));
          break;
  
        case 'DELETE':
          setData((prev) => prev.filter(i => i.id !== id));
          break;
  
        default:
          setData(res.data.results);
      }
    } catch (error) {
      console.log(error)
      setError(error.message);
    } finally {
      setPending(false);
    }
  };
  
  

  return {data,request, pending,error} 
  
}

export default useCrudApi