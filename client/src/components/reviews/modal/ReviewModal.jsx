import React from 'react';
import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DynamicStars from '../../stars/DynamicStars.jsx';
import DisplayOverallRating from '../DisplayOverallRating.jsx';
import Characteristics from './Characteristics.jsx';
import ModalPage2 from './ModalPage2.jsx';
import { PropIdContext } from '../../App.jsx';


const Modal = styled.div`
  flex: 1;
  opacity: 1;
  z-index: 1;
  justifyContent: undefined;
  alignItems: undefined;
  background-color: #FFF;
  border-radius: 12px;
  border: 3px solid black;
  position: absolute;
  left: 35%;
  width: 1000px;
  height: 500px;
  `;

const Exit = styled.button`
  display: block;
  margin-left: auto;
  margin-right: 0;
  border-radius: 5px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: center;

`;

const Test = styled.div`
  position: absolute;
`;

const OverallRating = styled.div`
  padding-right: 5px;
`;

const LineOne = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 15px 20px 0 20px;
`;

const LineTwo = styled.div`
  display: flex;
  flex-direction: column;
`;

const LineThree = styled.div`
  display: flex;
  padding: 20px 15px 0 15px;
  justify-content: space-between;
`;

const LineFour = styled.div`
  display: flex;
  justify-content: right;
  padding-top: 20px;
  padding-right: 20px;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  `;

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecommendValue = styled.div`
  display: flex;
  justify-content: center;
`;

const OverallRatingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PrivacyWarning = styled.div`
font-size: 13px;
`;

const NextButton = styled.button`
height: 40px;
width: 80px;
`;


const ReviewModal = ({setModal}) => {

  const {id, setId} = useContext(PropIdContext);
  const [name, setName] = useState('');
  const [reviewStar, setReviewStar] = useState(0);
  const [productId, setProductId] = useState(40344);
  const [summary, setSummary] = useState('');
  const [recommend, setRecommend] = useState('');
  const [reset, setReset] = useState(false);
  const [allCharacteristics, setAllCharacteristics] = useState({
    product_id: id,
    rating: -1,
    email: '',
    name: '',
    summary: '',
    body: '',
    recommend: null,
    photos: [],
    characteristics: {}
  });
  const [size, setSize] = useState(0)
  const [width, setWidth] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [quality, setQuality] = useState(0);
  const [length, setLength] = useState(0);
  const [fit, setFit] = useState(0);
  const [next, setNext] = useState(false);

  const renderView = () => {
    switch (view.name) {
      case 'page1':
        return <ReviewModal />
      case 'page2':
        return <div>hello</div>
    }
  }

  useEffect(() => {
    axios.get('/products/info', {params: {product_id: 40351}})
      .then((results) => {
        setName(results.data.name)
      })
  }, [])

  const handleClick = (e) => {
    setModal(false);
  }

  const handleRecommendClick = (e) => {
    if (e.target.value === 'true') {
      setAllCharacteristics({...allCharacteristics, recommend: true});
      setRecommend(true);
    } else {
      setAllCharacteristics({...allCharacteristics, recommend: false});
      setRecommend(false);
    }
  }

  const handleEmailChange = (e) => {
    setAllCharacteristics({ ...allCharacteristics, email: e.target.value});
  }

  const handleNicknameChange = (e) => {
    setAllCharacteristics({ ...allCharacteristics, name: e.target.value});
  }

  const handleNextClick = (e) => {
    if (
      allCharacteristics.rating === -1 ||
      allCharacteristics.recommend === null ||
      allCharacteristics.email === '' ||
      allCharacteristics.name === ''
    ) {
      alert('one or more fields have not been filled in');
    } else {
      setNext(true);
    }
  }

  if (next) {
    return (
      <Modal>
        <Exit type="button" onClick={handleClick}>X</Exit>
        <Title>Write Your Review</Title>
        <Subtitle>About the {name}</Subtitle>
        <ModalPage2 allCharacteristics={allCharacteristics} setAllCharacteristics={setAllCharacteristics} setNext={setNext} setModal={setModal}/>
      </Modal>
    )
  } else {
    return (
      <Modal>
        <Exit type="button" onClick={handleClick}>X</Exit>
        <Title>Write Your Review</Title>
        <Subtitle>About the {name}</Subtitle>
        <LineOne>
          <OverallRatingContainer>
            <RatingContainer>
              <OverallRating>Overall Rating</OverallRating>
              <DynamicStars setReviewStar={setReviewStar} setReset={setReset} allCharacteristics={allCharacteristics} setAllCharacteristics={setAllCharacteristics} />
            </RatingContainer>
            {reset === false ? null
            : reviewStar === 1
            ? <div>- Poor</div>
            : reviewStar === 2
            ? <div>- Fair</div>
            : reviewStar === 3
            ? <div>- Average</div>
            : reviewStar === 4
            ? <div>- Good</div>
            : <div>- Great</div>}
          </OverallRatingContainer>
          <RecommendContainer>
            <div>Do you recommend this product?</div>
            <RecommendValue>
              <input type="radio" value="false" id="noValue" name="recommend" onClick={handleRecommendClick}></input>
              <label htmlFor="noValue">No</label>
              <input type="radio" value="true" id="yesValue" name="recommend" onClick={handleRecommendClick}></input>
              <label htmlFor="yesValue">Yes</label>
            </RecommendValue>
          </RecommendContainer>
        </LineOne>
        <LineTwo>
          <Characteristics allCharacteristics={allCharacteristics} setAllCharacteristics={setAllCharacteristics} />
        </LineTwo>
        <LineThree>
          <EmailContainer>
            <label>
              Email :&nbsp;
              <input type="email" value={allCharacteristics.email} onChange={handleEmailChange} placeholder="Ex: jackson11@email.com"></input>
            </label>
            <PrivacyWarning>* Please do not use your real email address</PrivacyWarning>
          </EmailContainer>
          <NicknameContainer>
            <label>
              Nickname :&nbsp;
              <input type="text" value={allCharacteristics.nickname} onChange={handleNicknameChange} placeholder="Ex: awesomeName1"></input>
            </label>
            <PrivacyWarning>* Please do not use your full name</PrivacyWarning>
          </NicknameContainer>
        </LineThree>
        <LineFour>
          <NextButton type="button" onClick={handleNextClick}>Next</NextButton>
        </LineFour>
      </Modal>
    )
  }
}

export default ReviewModal;