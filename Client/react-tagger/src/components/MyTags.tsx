import { useState, useEffect } from 'react';
import ImageList from './ImageList';
import { UserNavbar } from './UserNavbar';

interface ImageData {
  image_index: number;
  image: string; 
}

export const MyTags = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const url = window.location.href;
  const urlParts = url.split('/');
  const username = urlParts[3]; 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${username}/images`);
        const data: { success: boolean; data?: ImageData[]; message?: string } = await response.json();
        if (data.success) {
          setImages(data.data?.map(image => `data:image/png;base64, ${image.image}`) || []);
        } else {
          setError(data.message || 'An error occurred.');
        }
      } catch (error) {
        setError('An error occurred while fetching images.');
      }
    };

    fetchImages();
  }, [username]);



  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <>
      <UserNavbar />
      <div style={{ marginTop: '0px', textAlign: 'center', overflow: 'hidden' }}>
        <h1>My Tags</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : images && images.length > 0 ? (
          <div style={{ transform: 'scale(0.8)', marginTop: -60 }}>
            <ImageList images={images} onDelete={handleDelete} />
          </div>
        ) : (
          <p>No existing tags</p>
        )}
      </div>
    </>
  );
};