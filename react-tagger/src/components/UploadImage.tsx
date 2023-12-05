import React, { useState,useEffect,useRef } from "react";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import { UserHomePage } from "./UserHomePage";
import { Button,TextField } from "@mui/material";

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

type RectanglesType = { 
  startX: number,
  startY: number, 
  endX?: number,
  endY?: number,
  tag:string,
}[]

interface UploadImageProps {}

const UploadImage: React.FC<UploadImageProps> = () => {
  const classes = useStyles();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mainState, setMainState] = useState("initial");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [rectangles, setRectangles] = useState<RectanglesType>([]);

  const [tagName, setTagName] = useState<string>("");

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

          console.log('myRectangles:',rectangles)

          rectangles.map((rectangle) => {
            if(rectangle.endX && rectangle.endY){
              ctx.strokeRect(
                Math.min(rectangle.startX, rectangle.endX),
                Math.min(rectangle.startY, rectangle.endY), 
                Math.abs(rectangle.startX - rectangle.endX),
                Math.abs(rectangle.startY - rectangle.endY)
              );

              ctx.font = '30px Arial';
              ctx.fillStyle = 'red';
              let xBoxText = rectangle.startX < rectangle.endX ? rectangle.startX + 30 : rectangle.endX + 30;
              let yBoxText = rectangle.startY < rectangle.endY ? rectangle.startY + 30 : rectangle.endY + 30;
              ctx.fillText(rectangle.tag, xBoxText, yBoxText);
            }
            
          })

        };
      }
    }
  }, [selectedFile, rectangles]);

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value);
  };

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
        setRectangles([...rectangles, { startX: startPoint.x, startY: startPoint.y, endX: x, endY: y ,tag:tagName}]);
        setStartPoint(null);
      } 
    }
  };

  const resetRectangles = () => {
    setStartPoint(null);
    setRectangles([]);
    setTagName('');
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
      marginLeft:'10%',
      marginTop:'-4%',
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
      <div id="uploadForm" style={{ marginTop: 120, marginLeft: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '-10%', position: 'relative' }}>
          <label htmlFor="tagInput" style={{ marginRight: '4px',marginLeft:'18.5%' }}>
            Tag name:
          </label>
          <TextField 
            id="tagInput"
            variant="outlined"
            value={tagName}
            onChange={handleTagInputChange}
            inputProps={{
              style: {
                color: 'black',
                height: '30px',
                lineHeight: '30px',
                padding: '0 5px',
                width:170,
              },
            }}
            style={{
              height: '20px',
              lineHeight: '20px',
              padding: '0 5px',
            }}
          />

          <div style={{ marginLeft: '5px' }}>
          <Button variant="contained" style={{ marginRight: 3, marginLeft: 0, height: 30,top:5 }}>
            Submit
          </Button>

          <Button variant="contained" 
          style={{
             marginRight: 3, 
             marginLeft: 0, 
             height: 30 ,
             top:5
          }}
          onClick={resetRectangles}
          >
            Clear
          </Button>
          
          <Button variant="contained" 
          style={{
            height: 30,
            top:5
          }}
          onClick={()=>{setMainState("initial")}}
          >
          Change Image
          </Button>
          </div>
        </div>
  
        <canvas
          ref={canvasRef}
          style={{ border: '3px solid #ccc', width: '1000px', height: '600px', transform: 'scale(0.6)' }}
          onClick={handleCanvasClick}
        />
      </div>
    </div>
  );

  return (
    <>
      <UserHomePage></UserHomePage>
      <div>
        <div style={{textAlign:'center',marginBottom:-100}}>
          <h1>Upload Image</h1>
        </div>
        
        <div>
          {mainState === "initial" && renderInitialState()}
          {mainState === "uploaded" && renderUploadedState()}
        </div>
      </div>
    </>
  );
};

export default UploadImage;