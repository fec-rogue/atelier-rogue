import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import {AiFillStar} from "react-icons/Ai";
import AverageStars from "../../stars/AverageStars.jsx"

const CardEntry = ({defaultsStyles, detailProduct, detailRatings,  setShowModal, setSelectedid}) => {
  const [hover, setHover] = useState(false);
  const imageNotFound = "http://placecorgi.com/260/180";

  const imagesArr = defaultsStyles[0].photos;
  const defaultImage = imagesArr[0].url === null ? imageNotFound : imagesArr[0].url;
  // const defaultHover =  imagesArr[1].url === null ? imageNotFound : imagesArr[1].url

  let imgSrc;
  const onMouseEnter = () => {
    setHover(true)
    imgSrc = defaultHover;
  }

  const onMouseLeave = () => {
    setHover(false)
    imgSrc = defaultImage;
  }

  return(
      <Carditem  >
        <CardImageBox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <Cardimage src={defaultImage}/>
        <MultiImages >

        { hover &&
          imagesArr.slice(1).map((eachImage,index) => (
            eachImage.url === null ? <MultiImage src={imageNotFound} /> : <MultiImage src = {eachImage.url} />
          ))}

        </MultiImages>


        </CardImageBox>
        <StarButton onClick={() => {
          setShowModal(true)
          setSelectedid(detailProduct)}}>
          <AiFillStar/>
        </StarButton>
        <CardInfo>
          <p>{detailProduct.category}</p>
          <h3><b>{detailProduct.name}</b></h3>
          <Price>${ defaultsStyles[0].sale_price === null
          ?  defaultsStyles[0].original_price
          :  defaultsStyles[0].sale_price }</Price>
          <Ratings>{ AverageStars(detailRatings.ratings) }</Ratings>
        </CardInfo>
      </Carditem>
  )
}

const Carditem = styled.div`
  width: 250px;
  height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`

const CardImageBox = styled.div`
  width: 100%;
  height: 50%;
`

const Cardimage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const MultiImages = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: relative;
  transitions: .5s;
  scroll-behavior: smooth;
`
const MultiImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`
const CardInfo = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Price = styled.p`
`
const StarButton = styled.button`
  position:absolute;
  top:10px;
  right: 10px;
`
const Ratings = styled.div`
  display:inline-block
`
const Indicators = styled.div`
top:50%;
display:flex;
justify-content: center;
position: absolute;
z-index: 500;
cursor:pointer;
user-select:none;
`
const PrevButton = styled.button`
left:0;
`
const NextButton = styled.button`
right:0
`
export default CardEntry;
