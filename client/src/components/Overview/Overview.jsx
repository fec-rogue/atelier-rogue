<<<<<<< HEAD
import React, { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import {PropIdContext} from '../App.jsx';
import ProductPic from './ProductPic.jsx';
import ProductDetails from './ProductDetails.jsx';


export const DisplayedPhotoContext = createContext();
=======
import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
>>>>>>> main

function Overview() {

  const [styles, setProductStyles] = useState([]) // for product details
  const [displayed, setDisplayed] = useState([]) // for product pic
  const {id, setId} = useContext(PropIdContext); // for product details ((if user clicks on diff stlye, update id))

  useEffect(() => {
    axios.get('/products/styles', {params:{product_id:id}})
    .then((response) => {
      for (let i = 0; i < response.data.results.length; i++) {
        if (response.data.results[i]["default?"]) {
          setDisplayed(response.data.results[i]);
          response.data.results.splice(i, 1)
          setProductStyles(response.data.results);
          break;
        }
      }
    })
  }, [])

  return(
      <div>
        <h2>OVERVIEW</h2>
        <DisplayedPhotoContext.Provider value={{displayed, setDisplayed}}>
          <ProductPic/>
        </DisplayedPhotoContext.Provider>
        <ProductDetails/>
      </div>
  )
}

export default Overview;

// pass productsList to carosal to render out each picture
// pass gallery to ProductPic and ProductDetails
// get product info and product styles in productDetails
// get product info in productPic to display stlye pics

