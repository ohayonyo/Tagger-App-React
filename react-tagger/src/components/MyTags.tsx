import { useState } from 'react';
import ImageList from './ImageList';
import { UserNavbar } from './UserNavbar';

export const MyTags = () => {
  const [images, setImages] = useState<string[]>([
    'https://www.w3schools.com/images/w3schools_green.jpg',
    'https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png',
    'https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png',
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg',
  ]);

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <>
      <UserNavbar />
      <div style={{ marginTop: '0px',textAlign: 'center',overflow:'hidden' }}>
        <h1>My Tags</h1>
        {images && images.length > 0 ? (
          <div style={{ transform: 'scale(0.8)',marginTop:-60 }}>
            <ImageList images={images} onDelete={handleDelete} />
          </div>
        ) : (
          <p>No existing tags</p>
        )}
      </div>   
    </>
  );
};