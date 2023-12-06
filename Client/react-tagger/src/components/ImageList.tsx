import React from 'react';
import { Grid, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../static/css/imageList.module.css';
import { ImageTags } from './MyTags';

interface ImageData {
  image_index: number;
  image: string;
}

interface ImageListProps {
  images: ImageData[];
  onDelete: (index: number) => void;
  imagesTags: ImageTags[];
}


const ImageList: React.FC<ImageListProps> = ({ images, onDelete, imagesTags }) => {

  return (
    <div className={styles['list-container']}>
      <Grid container spacing={2}>
        {images.map(({ image_index, image }: ImageData, index: number) => (
          <Grid item key={index} xs={12} md={4}>
            <Paper elevation={7} className={styles['image-container']} style={{ position: 'relative' }}>
              {imagesTags
                .find((imageTag) => imageTag.image_index === image_index)
                ?.tags.map((tag, tagIndex) => (
                  <div
                    key={tagIndex}
                    style={{
                      position: 'absolute',
                      top: tag.top, 
                      left: tag.left, 
                      width: tag.width, 
                      height: tag.height,
                      border: '2px solid red',
                      boxSizing: 'border-box',
                      pointerEvents: 'none',
                      color:'red',
                      fontSize:20,
                      fontWeight:'bold',
                    }}
                  >
                    {tag.tag}
                  </div>
                  
                ))}
              <img src={image} alt={`Image ${index}`} className={styles.image} />
              <IconButton
                aria-label="delete"
                onClick={() => onDelete(index)}
                className={styles['delete-button']}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ImageList;