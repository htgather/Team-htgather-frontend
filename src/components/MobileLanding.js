import React from 'react';
import styled from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import mobile1 from '../Images/mobile1.png';
import mobile2 from '../Images/mobile2.png';
import mobile3 from '../Images/mobile3.png';
import mobile4 from '../Images/mobile4.png';

const MobileLanding = () => {
  const { Kakao } = window;

  // 카카오 직접 만든 템플릿으로 링크 공유하기
  const shareLink = () => {
    Kakao.Link.sendCustom({
      templateId: 73709,
    });
  };

  // 배너 캐러셀
  var settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    className: 'carousel',
    dotsClass: 'indicators',
  };

  return (
    <DIV>
      <Contents>
        <CarouselWrap>
          <Slider {...settings}>
            {/* <img src={mobile1} />
            <img src={mobile2} />
            <img src={mobile3} />
            <img src={mobile4} /> */}
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </Slider>
        </CarouselWrap>
        <LinkBtn
          onClick={() => {
            shareLink();
          }}
        >
          홈트게더 링크 공유하기
        </LinkBtn>
        <TextWrap>
          홈트게더는 태블릿과 PC에서 이용할 수 있어요 <br />
          링크를 공유하고 태블릿 또는 PC에서 접속해 주세요!
        </TextWrap>
      </Contents>
    </DIV>
  );
};

const DIV = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #fff;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding-top: 40px; //84px;
`;

const CarouselWrap = styled.div`
  width: 292px;
  height: 344px;
  background-color: #add;
  .carousel {
    background-color: pink;
    width: 292px;
    height: 344px;
    position: relative;
  }
  .indicators {
    width: 100%
    position: absolute;
    bottom: 10px;
    margin: 0 auto;
    list-style: none;

    /* position: absolute;
    bottom: -25px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center; */
  }
`;

const IndicatorWrap = styled.div``;

const LinkBtn = styled.div`
  width: 220px; //232px;
  height: 56px;
  border-radius: 8px;
  background-color: #0028fa;
  font-size: 16px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 28px 0 24px;
`;

const TextWrap = styled.div`
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.48px;
`;

export default MobileLanding;
