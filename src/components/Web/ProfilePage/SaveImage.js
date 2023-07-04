import React from 'react';
import html2canvas from 'html2canvas';
import styled from "styled-components";
import SaveImage from '../../../img/SaveImage.png';

const SaveButton = styled.img`
    width: 157px;
    height: 48px;
    margin-left: 24px;
`;

const ImageSaveButton = () => {
  const handleSaveImage = () => {
    const element = document.documentElement;

    html2canvas(element)
      .then(canvas => {
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "dotZip.png";
        link.click();
      });
  };

  return (
    <SaveButton src = {SaveImage} onClick={handleSaveImage} />
  );
};

export default ImageSaveButton;
