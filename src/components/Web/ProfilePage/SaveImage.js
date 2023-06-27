import React from 'react';
import html2canvas from 'html2canvas';

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
    <button onClick={handleSaveImage}>이미지 저장하기</button>
  );
};

export default ImageSaveButton;
