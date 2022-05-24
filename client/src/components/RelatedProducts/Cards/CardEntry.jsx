import React from 'react';
import styled from 'styled-components';


const CardEntry = ({defaultsStyles, category, name, price, index, current}) => {
  // console.log('defaultsStylesURL', defaultsStyles[0] && defaultsStyles[0].photos[0].url);
  // console.log('defaultprice', defaultsStyles[0] )
  return(
      <Carditem>
        {defaultsStyles[0] && index === current ? <Cardimage src={defaultsStyles[0].photos[0].url}/> : <Cardimage src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" />}
        <CardInfo>
          Category: {category}
          Name: {name}
          Price: {price}
          {/* Price: { defaultsStyles[0] !== undefined && defaultsStyles[0].sale_price === null ? defaultsStyles[0].original_price : defaultsStyles[0].sale_price } */}
        </CardInfo>
      </Carditem>
  )
}

const Carditem = styled.div`
  height: 400px;
  width: 200px;
  position: relative;
`
const Cardimage = styled.img`
  width: 100%;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`
export default CardEntry;