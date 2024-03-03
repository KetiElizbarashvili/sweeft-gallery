import React, { useState, useEffect } from "react";
import { useQueries } from "../context/SearchHistoryContext";
import { Image } from "../utils/interfaces";
import Card from "../components/Card";

function History() {
  const { queries } = useQueries();
  const [images, setImages] = useState<Image[] | null>(null);

  useEffect(() => {
    if (queries.length > 0) {
      const storedImages = localStorage.getItem(queries[0]);
      if (storedImages) {
        try {
          setImages(JSON.parse(storedImages));
        } catch (error) {
          console.error('Error parsing images from localStorage', error);
        }
      }
    }
  }, [queries]);

  if (queries.length === 0) {
    return <p>No search history found.</p>;
  }

  const getStoredImages = (query: string) => {
    const storedImages = localStorage.getItem(query);
    if (storedImages) {
      try {
        setImages(JSON.parse(storedImages));
      } catch (error) {
        console.error('Error parsing images from localStorage', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row flex-wrap">
        {queries.map((query: string) => (
          query.trim() !== "" && (
            <div
              key={query}
              className="bg-gray-200 p-2 m-2 rounded-md w-30 text-center cursor-pointer"
              onClick={() => getStoredImages(query)}
            >
              {query}
            </div>
          )
        ))}
      </div>
      <div className="flex flex-wrap justify-around">
        {images && images.map(({ id, urls, alt_description }: Image, index: number) => {
          const cloudinaryUrl = `https://res.cloudinary.com/dlncc1m55/image/fetch/w_500,h_500,c_fill,g_auto,f_auto/${urls.full}`;
          return (
            <div key={id + index} className="p-4">
              <Card imageUrl={cloudinaryUrl} alt={alt_description} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
 