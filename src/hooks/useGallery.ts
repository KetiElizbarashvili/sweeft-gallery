import { useEffect, useState } from "react";
import { fetchGallery } from "../server/fetchGallery";
import { NUMBER_OF_IMAGES_PER_PAGE } from "../utils/constants";
import { useImages } from "../context/ImagesProvider";
import { Image } from "../utils/interfaces"; 
import { useQueries } from '../context/SearchHistoryContext';


/**
 * Custom hook to fetch gallery images with caching mechanism.
 * @param initialPage The initial page number to load.
 */
const useGalleryWithCache = (initialPage: number = 1) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const [query, setQuery] = useState<string>(""); 
  const { images, setImages } = useImages();
  const { queries, setQueries } = useQueries(); 

  const fetchImages = async (pageNum: number, query: string) => {
    setLoading(true);
    setError(false);

    try {
      const fetchedImages: Image[] = await fetchGallery(pageNum, NUMBER_OF_IMAGES_PER_PAGE, query);
      setImages(prev => [...prev, ...fetchedImages]);
      setQueries(prevQueries => [...new Set([query, ...prevQueries])]);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedImagesForQuery = localStorage.getItem(query);
    if (cachedImagesForQuery) {
      setImages(JSON.parse(cachedImagesForQuery));
      setLoading(false);
    } else {
      fetchImages(pageNumber, query);
    }
  }, [pageNumber, query]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      goToNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goToNextPage = () => {
    setPageNumber(current => current + 1);
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPageNumber(1); 
  };

  return { loading, error, images, handleSearch };
};

export default useGalleryWithCache;
 