import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { HiVolumeUp } from 'react-icons/hi';
import { FaVolumeMute } from 'react-icons/fa';
import ExitModal from '../components/modals/ExitModal';

const gyuDetail = () => {
  return (
    <>
      <ExitModal />
    </>
  );
};

export default gyuDetail;
