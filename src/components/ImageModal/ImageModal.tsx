import React from 'react';
import './ImageModal.css'; // Import the CSS file

interface ImageModalProps {
  imageUrl: string;
  viewsCount: number;
  likesCount: number;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, viewsCount, likesCount, onClose }) => {

  const handleDownload = () => {
    window.open(imageUrl, '_blank');
  };

  const openImageInPopup = () => {
    const popupWindow = window.open('', '_blank');
    if (popupWindow) {
      popupWindow.document.write(`<img src="${imageUrl}" alt="Full Image" />`);
    } else {
      console.error('Popup blocked!');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        <div className="image-container">
          <img src={imageUrl} alt="Full Image" onClick={openImageInPopup} />
          <button className="download-button" onClick={handleDownload}>Download</button>
        </div>
        <div className="modal-details">
          <p>Views: {viewsCount}</p>
          <p>Likes: {likesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
 