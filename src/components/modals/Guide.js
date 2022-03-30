import react from 'react';
import styled from 'styled-components';

import guide2 from '../../Images/guide2.png';
import guide2_2 from '../../Images/guide2_2.png';

const Guide = () => {
  return (
    <>
      {/* <div>랄라</div> */}
      <Img></Img>
      <SmallImg></SmallImg>
    </>
  );
};

const Img = styled.div`
  width: 260px;
  height: 296px;
  margin: 28px auto;
  background-image: url(${guide2});
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.045);
  position: relative;
`;
const SmallImg = styled.div`
  width: 378px;
  height: 78px;
  background-image: url(${guide2_2});
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.045);
  position: absolute;
  bottom: 41.9%;
  left: 27%;
`;

export default Guide;
