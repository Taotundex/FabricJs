"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

const Canvas = () => {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null);
  const [drawing, setDrawing] = useState(false); // State to track if drawing mode is active

  useEffect(() => {
    // Initialize Fabric.js canvas
    canvasInstance.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#fff', // Optional background color
    });

    canvasInstance.current.renderAll();

    // Clean up the canvas on component unmount
    return () => {
      canvasInstance.current.dispose();
    };
  }, []);

  const handleDragStart = (event, shapeType) => {
    event.dataTransfer.setData('shapeType', shapeType);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (drawing) return; // Prevent adding shapes while drawing mode is active

    const shapeType = event.dataTransfer.getData('shapeType');
    const mousePosition = canvasInstance.current.getPointer(event);

    switch (shapeType) {
      case 'rectangle':
        addRectangle(mousePosition);
        break;
      case 'circle':
        addCircle(mousePosition);
        break;
      case 'text':
        addText(mousePosition);
        break;
      default:
        break;
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // This is necessary to allow dropping
    setDrawing(false);
      canvasInstance.current.isDrawingMode = false; // Disable drawing mode
  };

  const addRectangle = (position) => {
    const rect = new fabric.Rect({
      left: position.x,
      top: position.y,
      fill: 'red',
      width: 100,
      height: 100,
      hasControls: true,
      lockScalingFlip: true,
    });
    canvasInstance.current.add(rect);
    rect.setCoords(); // Update coordinates to ensure proper dragging behavior
    canvasInstance.current.renderAll();
  };

  const addCircle = (position) => {
    const circle = new fabric.Circle({
      left: position.x,
      top: position.y,
      fill: 'blue',
      radius: 50,
      hasControls: true,
      lockScalingFlip: true,
    });
    canvasInstance.current.add(circle);
    circle.setCoords(); // Update coordinates for proper dragging
    canvasInstance.current.renderAll();
  };

  const addText = (position) => {
    const text = new fabric.Text('Hello, Fabric.js!', {
      left: position.x,
      top: position.y,
      fontSize: 24,
      fill: 'black',
      hasControls: true,
      lockScalingFlip: true,
      editable: true
    });
    canvasInstance.current.add(text);
    text.setCoords(); // Update coordinates to allow proper dragging
    canvasInstance.current.renderAll();
  };

  // Start Drawing
  const startDrawing = () => {
    if (!drawing) {
      setDrawing(true);
      const pencilBrush = new fabric.PencilBrush(canvasInstance.current);
      pencilBrush.width = 5; // Set brush width
      canvasInstance.current.freeDrawingBrush = pencilBrush;
      canvasInstance.current.isDrawingMode = true; // Enable drawing mode
    }
  };

  // Stop Drawing
  const stopDrawing = () => {
    if (drawing) {
      setDrawing(false);
      canvasInstance.current.isDrawingMode = false; // Disable drawing mode
    }
  };

  // Clear Canvas
  const clearCanvas = () => {
    canvasInstance.current.clear();
    canvasInstance.current = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#fff',
    })
  

    // canvasInstance.current.setBackgroundColor('#f3f3f3', canvasInstance.current.renderAll.bind(canvasInstance.current));
    setDrawing(false);
  };

  // Export Canvas as Image
  const exportAsImage = () => {
    const dataURL = canvasInstance.current.toDataURL({
      format: 'png',
      quality: 1.0,
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png';
    link.click();
    setDrawing(false);
    canvasInstance.current.isDrawingMode = false;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div>
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, 'rectangle')}
          style={{ display: 'inline-block', margin: '10px', padding: '10px', backgroundColor: 'red', color: 'white' }}
        >
          Rectangle
        </div>
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, 'circle')}
          style={{ display: 'inline-block', margin: '10px', padding: '10px', backgroundColor: 'blue', color: 'white' }}
        >
          Circle
        </div>
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, 'text')}
          style={{ display: 'inline-block', margin: '10px', padding: '10px', backgroundColor: 'green', color: 'white' }}
        >
          Text
        </div>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: '1px solid #ccc', marginTop: '20px', width: '800px', height: '600px', position: 'relative' }}
      >
        <canvas ref={canvasRef} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={startDrawing} style={buttonStyle}>Start Drawing</button>
        <button onClick={stopDrawing} style={buttonStyle}>Stop Drawing</button>
        <button onClick={clearCanvas} style={buttonStyle}>Clear Canvas</button>
        <button onClick={exportAsImage} style={buttonStyle}>Export as Image</button>
      </div>
    </div>
  );
};

// Button styling
const buttonStyle = {
  margin: '5px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Canvas;
