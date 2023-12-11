import { useState, useEffect } from 'react';
import ImageList from './ImageList';
import { UserNavbar } from './UserNavbar';
import axios from 'axios';


export interface Tag{
  top:number;
  left:number;
  width:number;
  height:number;
  tag:string;
}

export interface ImageTags{
  image_index:number;
  tags:Tag[];
}


interface ImageData {
  image_index: number;
  image: string; 
}

const fetchImageTags = async (imageIndex:number) => {
  try {
    const response = await fetch(`http://localhost:5000/users/${imageIndex}/image_tags`);
    if (!response.ok) {
      throw new Error('Failed to fetch image tags');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching image tags:', error);
    return { success: false, message: 'An error occurred.' };
  }
};



export const MyTags = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imagesWithIndexes, setImagesWithIndexes] = useState<ImageData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [ImageTags,setImageTags] = useState<ImageTags[]>([]);

  const url = window.location.href;
  const urlParts = url.split('/');
  const username = urlParts[3]; 

  const fetchAllTags = async (imageDataArray: ImageData[]) => {
    const allImageTags: ImageTags[] = [];
    for (const imageData of imageDataArray) {
      try {
        const tagsResponse = await fetchImageTags(imageData.image_index);
        if (tagsResponse) {
          const imageTags: ImageTags = {
            image_index: Number(tagsResponse.image_index),
            tags: tagsResponse.tags || [],
          };
          allImageTags.push(imageTags);
        } else {
          console.error('Error fetching tags for image index', imageData.image_index);
        }
      } catch (error) {
        console.error('An error occurred while fetching tags for image index', imageData.image_index, error);
      }
    }
    setImageTags(allImageTags);
  };

  useEffect(() => {
  const fetchImages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${username}/images`);
      const data: { success: boolean; data?: ImageData[]; message?: string } = await response.json();
      if (data.success) {
        setImages(data.data?.map(image => `data:image/png;base64, ${image.image}`) || []);

        const modifiedImageDataArray: ImageData[] = data.data?.map((item) => ({
          ...item,
          image: `data:image/png;base64, ${item.image}`,
        })) || [];

        setImagesWithIndexes(modifiedImageDataArray);
        // Call fetchAllTags after setting imagesWithIndexes
        fetchAllTags(modifiedImageDataArray);

      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (error) {
      setError('An error occurred while fetching images.');
    }
  };

  fetchImages();
}, [username]);



  const handleDelete = async (index: number) => {
    const image_index = imagesWithIndexes[index].image_index;

    await axios.delete(`http://localhost:5000/users/deleteImage/${image_index}`)
    .then(response => {
      
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    
      const newImagesWithIndexes = [...imagesWithIndexes];
      newImagesWithIndexes.splice(index, 1);
      setImagesWithIndexes(newImagesWithIndexes);
    })
    .catch(error => {
      console.error('Error deleting image: ', error);
    });
  
  };

  const myImageTags:ImageTags[] = [
    {image_index:1,
      tags:[
        {top:323,left:227,width:95,height:44,tag:'ID'},
        // {top:200,left:50,width:300,height:200,tag:'my'},
      ]
    },
    {
      image_index:2,
      tags:[
        // {top:0,left:0,width:200,height:300,tag:'name'},
        // {top:0,left:0,width:300,height:200,tag:'is'},
        {top:273.67,left:216.55,width:115.37,height:61.25,tag:'ID'},
      ]
    },
    {
      image_index:3,
      tags:[
        {top:0,left:0,width:355,height:350,tag:'all'},
        // {top:0,left:0,width:300,height:200,tag:'is'},
      ]
    }
  ]

  console.log('images:',images);

  return (
    <>
      <UserNavbar />
      <div style={{ marginTop: '0px', textAlign: 'center', overflow: 'hidden' }}>
        <h1>My Tags</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : images && images.length > 0 ? (
          <div style={{ transform: 'scale(0.8)', marginTop: -60 }}>
            <ImageList images={imagesWithIndexes} onDelete={handleDelete} imagesTags={ImageTags} />
          </div>
        ) : (
          <p>No existing tags</p>
        )}
      </div>
    </>
  );
};