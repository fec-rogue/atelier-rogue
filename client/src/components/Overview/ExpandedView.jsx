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
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
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
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => {handleMouseMove(e)}}
          >
            {isZoomed ?
            <ZoomedImg
            img={displayed.photos[curPhoto].url}
            cursor={AiOutlinePlus}
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
        <ThummbnailContainer>

        </ThummbnailContainer>
      </div>
  </FullContainer>)


}

const ExitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ThummbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
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
  &:hover {
    cursor: url(${props => props.cursor});
  }
`;
const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
`;
export default ExpandedView;