import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Test = styled.div`
  font-size: 20px;
`;

const Section = styled.span`
  display: flex;
  justify-content: space-between;
  background-color: blue;
`

const Reviews = () => {




  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/reviews/?id=40344')
      .then((results) => {
        console.log(results.data.results);
        setReviews(results.data.results);
      })
  }, []);


  return (
    <Test>
      {reviews.map((review) =>
        <div>
          <div>
            <Section>{review.rating}</Section>
            <Section>{review.date}</Section>
          </div>
          <div>hello</div>
        </div>
      )}
    </Test>
  )
}

export default Reviews;
