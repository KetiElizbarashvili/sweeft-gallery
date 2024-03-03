import React from "react";

interface CardProps {
  imageUrl: string;
  alt: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, alt }) => {
  return (
    <div className="m-4 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="relative">
        <img
          className="w-full h-auto object-cover transition-opacity duration-300 ease-in-out hover:opacity-75"
          src={imageUrl}
          alt={alt}
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-end bg-black bg-opacity-0 p-4 transition-all duration-300 ease-in-out hover:bg-opacity-50">
          <div className="text-white opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
 