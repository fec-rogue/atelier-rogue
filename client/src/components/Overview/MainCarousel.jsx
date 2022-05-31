import styled from 'styled-components';
import React, { useEffect, useState, useContext, useRef } from 'react';
import {DescriptionsContext} from './Overview.jsx';
import {BiFullscreen} from "react-icons/bi";

//TODO:
// hovering over item with magnifying glass will magnify image
// clicking expanding will expand image
// expanded image will still be able to scroll through image gallery

function MainCarousel({cur, setCur}) {

  const {displayed} = useContext(DescriptionsContext);
  const [index, setIndex] = useState(cur);

  // if i were to redo this project, i would not have done this, but im in too deep
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [winDim, setWinDim] = useState({width: window.innerWidth})

  const [expanded, setExpanded] = useState(false);

  // buttons should disappear when last img is reached// first img is reached
  // buttons should work with left and right arrow keys
  const updateIndex = (indx) => {
    if (indx < 0) {
      setIndex(displayed.photos.length-1);
      setCur(displayed.photos.length-1)
    } else if (indx > displayed.photos.length-1) {
      setIndex(0)
      setCur(0);
    } else {
      setIndex(indx);
      setCur(indx);
    }
  };

  const expandImg = () => {
    console.log('clicked expand');
    setModal(true);
  };

  const getHeight = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = function() {setHeight(this.height)};
    return height;
  };

  const getWidth = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = function() {setWidth(this.width)};
    return width;
  };



  return (Object.keys(displayed).length === 0) ?
  (null) :
  (<CarouselDiv>
       <InnerDiv>
         <div>
          <UpDownDiv>
            <UpDownBtns onClick={() => {updateIndex(index-1)}} >Prev</UpDownBtns>
          </UpDownDiv>
         </div>
         <ImgContainer>
          {displayed.photos.map((img, indx) => {
            return (indx === cur) ?
            ( <CarouselItem
                key={indx}
                src={img.url}>
                </CarouselItem> )
            : null
          })}
         </ImgContainer>
         <RightImgDiv>
           <FullBtn>
             <BiFullscreen onClick={expandImg}/>
           </FullBtn>
          <UpDownDiv>
            <UpDownBtns onClick={() => {updateIndex(index+1)}}>Next</UpDownBtns>
          </UpDownDiv>
         </RightImgDiv>
        </InnerDiv>
    </CarouselDiv>
  )

};


const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  :hover {
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.55), 0 14px 18px rgba(0, 0, 0, 0.55);
  }
`;

const CarouselDiv = styled.div`
  display: inline-flex;
  max-width: 100%;
  height: auto;
  background-color: white;
  transition: all ease-in-out 0.5s;
  .magnify {
    cursor: zoom-in;
  }
`;
const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// make height and width proportional to the screen size....
const CarouselItem = styled.img`
  position: relative;
  width: 100%;
  height: auto;
  transition: all ease-in-out 0.03s;
  &:hover {
    cursor: zoom-in;
  }

`;

const UpDownDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: gray;
  transition: all ease-in-out 0.1s;
`;

const RightImgDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const FullBtn = styled.button`
  align-self: flex-start;
`;
const UpDownBtns = styled.button`
`;

export default MainCarousel;