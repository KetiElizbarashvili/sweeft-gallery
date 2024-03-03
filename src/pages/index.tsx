import React, { useState, useCallback } from "react";
import Card from "../components/Card";
import useGallery from "../hooks/useGallery";
import { Image } from "../utils/interfaces";
import { useImages } from "../context/ImagesProvider";
import ImageModal from "../components/ImageModal/ImageModal"; 

function Home() {
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null); 
  const { loading, error } = useGallery(page);
  const { images } = useImages();

  const loadMoreImages = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image); 
  };

  const handleCloseModal = () => {
    setSelectedImage(null); 
  };

  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching images.</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-around">
          {images.map((image: Image, index: number) => {
            const cloudinaryUrl = `https://res.cloudinary.com/dlncc1m55/image/fetch/w_500,h_500,c_fill,g_auto,f_auto/${image.urls.full}`;
            return (
              <div key={image.id + index} className="p-4" onClick={() => handleImageClick(image)}> 
                <Card imageUrl={cloudinaryUrl} alt={image.alt_description} />
              </div>
            );
          })}
        </div>
        {loading && <p>Loading more...</p>}
      </div>
      {selectedImage && ( 
        <ImageModal
          imageUrl={selectedImage.urls.full}
          viewsCount={selectedImage.views}
          likesCount={selectedImage.likes}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default Home;
 