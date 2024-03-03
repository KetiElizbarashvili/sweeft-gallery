import React, { ReactNode, createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Image } from '../utils/interfaces';

interface ImageContextProps {
    images: Image[];
    setImages: (images: Image[]) => void;
    addImage: (image: Image) => void;
    removeImage: (id: string) => void;
}

const ImageContext = createContext<ImageContextProps | null>(null);

export const useImages = () => {
    const context = useContext(ImageContext);
    if (context === null) {
        throw new Error('useImages must be used within a ImageProvider');
    }
    return context;
};

export const ImageProvider = ({ children }: {children: ReactNode}) => {
    const [images, setImages] = useState<Image[]>([]);

    const addImage = useCallback((newImage: Image) => {
        setImages(prevImages => [...prevImages, newImage]);
    }, []);

    const removeImage = useCallback((id: string) => {
        setImages(prevImages => prevImages.filter(image => image.id !== id));
    }, []);

    const value = useMemo(() => ({
        images,
        setImages,
        addImage,
        removeImage
    }), [images, addImage, removeImage]);

    return (
        <ImageContext.Provider value={value}>
            {children}
        </ImageContext.Provider>
    );
};
