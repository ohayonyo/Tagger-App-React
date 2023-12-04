import React, { useState,useEffect,useRef } from "react";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import { UserHomePage } from "./UserHomePage";

const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  centerWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%", 
    position: "relative", 
  },
  uploadButton: {
    position: "absolute",
    transform: "translate(-50%, -50%)", 
  },
});

interface UploadImageProps {}

const UploadImage: React.FC<UploadImageProps> = () => {
  const classes = useStyles();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mainState, setMainState] = useState("initial");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [rectangles, setRectangles] = useState<{ startX: number; startY: number; endX?: number; endY?: number }[]>([]);


  useEffect(() => {
    if (selectedFile && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      if (ctx) {
        const image = new Image();
        image.src = URL.createObjectURL(selectedFile);
  
        image.onload = () => {
          canvas.width = 1000;
          canvas.height = 600;
          ctx.drawImage(image, 0, 0, 1000, 600);
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;

          rectangles.map((rectangle) => {
            if(rectangle.endX && rectangle.endY){
              ctx.strokeRect(
                Math.min(rectangle.startX, rectangle.endX),
                Math.min(rectangle.startY, rectangle.endY), 
                Math.abs(rectangle.startX - rectangle.endX),
                Math.abs(rectangle.startY - rectangle.endY)
              );
            }
            
          })

        };
      }
    }
  }, [selectedFile, rectangles]);


  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleFactor = 0.6;
      const x = (event.clientX - rect.left) / scaleFactor;
      const y = (event.clientY - rect.top) / scaleFactor;

      if (!startPoint) {
        setStartPoint({ x, y });
      }else{
        setRectangles([...rectangles, { startX: startPoint.x, startY: startPoint.y, endX: x, endY: y }]);
        setStartPoint(null);
        console.log('rectangles:',rectangles)
      } 
    }
  };

  const resetRectangles = () => {
    setStartPoint(null);
    setRectangles([]);
  }

  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMainState("uploaded");
    }
  };

  const renderInitialState = () => (
    <div style={{
      transform: 'scale(0.6)',
      border: "3px solid #ccc",
      width: "1000px", 
      height: "600px", 
    }}>
      <div className={`${classes.container} centerWrapper`}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleUploadClick}
        />
        <label htmlFor="contained-button-file">
          <Fab
            className={classes.uploadButton}
            component="span"
            color="primary"
            style={{ width: "100px", height: "100px" }} 
          >
            <AddPhotoAlternateIcon style={{ fontSize: "3rem" }} /> 
          </Fab>
        </label>
      </div>
    </div>
  );

  const renderUploadedState = () => (
    <div>
      <button onClick={resetRectangles}>Clear</button>
      <canvas
        ref={canvasRef}
        style={{ border: '3px solid #ccc', width: '1000px', height: '600px', transform: 'scale(0.6)' }}
        onClick={handleCanvasClick}
      />
    </div>
  );

  return (
    <>
      <UserHomePage></UserHomePage>
      <div>
        <div>
          {mainState === "initial" && renderInitialState()}
          {mainState === "uploaded" && renderUploadedState()}
        </div>
      </div>
    </>
  );
};

export default UploadImage;