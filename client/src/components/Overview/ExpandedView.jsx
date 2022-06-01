import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useRef, useContext } from 'react';
import {DescriptionsContext} from './Overview.jsx';
import {AiOutlinePlus, AiOutlineClose} from 'react-icons/ai';

function ExpandedView() {

  const {displayed} = useContext(DescriptionsContext);
  const {curPhoto, setCurPhoto} = useContext(DescriptionsContext);
  const {expanded, setExpanded} = useContext(DescriptionsContext);
  const [[x, y], setPosition] = useState([0,0]);
  const [[w, h], setZoomSize] = useState([0,0]);
  const [isZoomed, setZoom] = useState(false);
  const [range, setRange] = useState({min: 0, max:6});
  const zoomRef = useRef(null);

  const prev = () => {
    if (range.min > 0) {
      setRange({min: range.min -1, max: range.max-1});
    }
  };

  const next = () => {
    if (range.max < displayed.photos.length - 1) {
      setRange({min: range.min +1, max: range.max+1});
    }
  };

  const handleMouseEnter = (e) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setZoomSize([width, height]);
  };



  const handleMouseMove = (e) => {
    const {top, left} = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setPosition([x,y]);
  };


  return (Object.keys(displayed).length === 0) ?
  (null) :
  (<FullContainer>
    <div>
      <ExitContainer>
        <button onClick={() => {setExpanded(!expanded)}}><AiOutlineClose/></button>
      </ExitContainer>
        <div>
          <ImgContainer
            ref={zoomRef}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseMove={(e) => handleMouseMove(e)}
            onClick={() => setZoom(!isZoomed)}
            cur={isZoomed ? 'zoom-out' : 'crosshair'}
          >
            {isZoomed ?
            <ZoomedImg
            img={displayed.photos[curPhoto].url}
            height={h}
            width={w}
            style={{
              backgroundSize: `${w * 2.5}px ${h * 2.5}px`,
              backgroundPositionX: `${-x * 2.5 / (1.68)}px`,
              backgroundPositionY: `${-y * 2.5 / (1.68)}px`
            }}>
            </ZoomedImg> :
            <FullItem
              src={displayed.photos[curPhoto].url}>
            </FullItem>
            }
          </ImgContainer>
        </div>
          <ThumbnailCarouselDiv>
            <PrevDiv>
              <UpDownBtns onClick={prev} >Prev</UpDownBtns>
            </PrevDiv>
            <div>
              <InnerDiv>
                {displayed.photos.map((img, indx) => {
                  return (indx >= range.min && indx <= range.max) ?
                  (<ThumbnailCarouselItem
                    className={indx === curPhoto ? 'selected' : ''}
                    key={indx}
                    img={img.thumbnail_url} onClick={() => {setCurPhoto(indx)}}>
                    </ThumbnailCarouselItem>)
                  : null
                })}
              </InnerDiv>
            </div>
            <NextDiv>
              <UpDownBtns onClick={next}>Next</UpDownBtns>
            </NextDiv>
          </ThumbnailCarouselDiv>
      </div>
  </FullContainer>)


}

const ExitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const FullContainer = styled.div`
  display: flex;
  background-color: #fafafa;
`
const FullItem = styled.img`
  position: relative;
  width: 100%;
  height: auto;
  transition: all ease-in-out 0.03s;
  margin: 7%;
  margin-top: 0;
  margin-bottom: 3%;
`;
const ZoomedImg = styled.div`
  pointerEvents: none;
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
  opacity: ${props => props.opacity};
  border: 1px solid lightgray;
  background-color: white;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
`;
const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  &:hover {
    cursor: ${props => props.cur};
  }
`;

const ThumbnailCarouselDiv = styled.div`
  cursor: default;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 130px;
  max-height: 800px;
  background-color: #fafafa;
  transition: all ease-in-out 0.05s;
  .selected {
    border-bottom: 6px solid #D3D3D3;
    transition: all ease-in-out 0.05s;
  }
`;
const InnerDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ThumbnailCarouselItem = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  min-width: 90px;
  min-height: 90px;
  max-height: 90px;
  margin-right: 10px;
  background-image: url(${(props) => props.img || ''});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  transition: all ease-in-out 0.03s;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    transition: all ease-in-out 0.03s;
    transform: scale(0.96);
  }
`;

const PrevDiv = styled.div`
  margin-right: 3%;
`;
const NextDiv = styled.div`
  margin-left: 3%;
`;


const UpDownBtns = styled.button`
`;
export default ExpandedView;