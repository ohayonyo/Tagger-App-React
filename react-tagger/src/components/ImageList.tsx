import React from 'react';
import { Grid, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../static/css/imageList.module.css';

interface ImageListProps {
  images: string[];
  onDelete: (index: number) => void;
}

const ImageList: React.FC<ImageListProps> = ({ images, onDelete }) => {
  return (
    <div className={styles['list-container']}>
      <Grid container spacing={2}>
        {images.map((imageUrl, index) => (
          <Grid item key={index} xs={12} md={4}>
            <Paper elevation={7} className={styles['image-container']}>
              <img src={imageUrl} alt={`Image ${index}`} className={styles.image} />
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