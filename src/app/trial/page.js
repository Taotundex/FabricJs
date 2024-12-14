"use client"

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineTemplate } from "react-icons/hi";
import { RiShapesLine } from "react-icons/ri";
import { ImFontSize } from "react-icons/im";
import { BsVectorPen } from "react-icons/bs";
import { IoColorFillOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import * as fabric from 'fabric';

const Canvas = () => {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null);
  const [drawing, setDrawing] = useState(false); // State to track if drawing mode is active
  const [lineWidth, setLineWidth] = useState(1);
  const [lineColor, setLineColor] = useState('#000000'); // Default color black
    const [fillColor, setFillColor] = useState('#000000'); // Default fill color black
 

  const [selectedSection, setSelectedSection] = useState('elements');



  const handleSectionClick = (section) => setSelectedSection(section);
  const [changeStyle, setChangeStyle] = useState('arrows');
  const handleChangeStyle = (element) => setChangeStyle(element);

  const colors = ['#000000', '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF9', '#FFC733', '#8D33FF', '#FF8D33', '#4A4A4A'];
  const lineWidths = [1, 2, 3, 4, 5];  // Corresponding line widths for each pen
  const fillColors = colors; // Fill colors are the same as line colors in this case

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
      case 'triangle':
        addTriangle(mousePosition);
        break;
      case 'star':
        addStar(mousePosition);
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
      fill: 'grey',
      width: 100,
      height: 100,
      hasControls: true,
      lockScalingFlip: true,
    });
    canvasInstance.current.add(rect);
    rect.setCoords(); // Update coordinates to ensure proper dragging behavior
    canvasInstance.current.renderAll();
  };

  const activateEraser = () => {
    if ( canvasInstance.current) {
      canvasInstance.current.isDrawingMode = true;
      canvasInstance.current.freeDrawingBrush.color = '#fff';
    }
};




  const addCircle = (position) => {
    const circle = new fabric.Circle({
      left: position.x,
      top: position.y,
      fill: '#ffd700',
      radius: 50,
      hasControls: true,
      lockScalingFlip: true,
    });
    canvasInstance.current.add(circle);
    circle.setCoords(); // Update coordinates for proper dragging
    canvasInstance.current.renderAll();
  };
  const addTriangle = (position) => {
    const triangle = new fabric.Triangle({
      left: position.x,
      top: position.y,
      fill: '#ffd700',
      radius: 50,
      hasControls: true,
      lockScalingFlip: true,
    });
    canvasInstance.current.add(triangle);
    triangle.setCoords(); // Update coordinates for proper dragging
    canvasInstance.current.renderAll();
  };
  const addStar = (position) => {

    const points = [
      { x: 50, y: 0 }, { x: 60, y: 35 }, { x: 100, y: 35 },
      { x: 65, y: 55 }, { x: 80, y: 100 }, { x: 50, y: 75 },
      { x: 20, y: 100 }, { x: 35, y: 55 }, { x: 0, y: 35 },
      { x: 40, y: 35 }
  ];

    const star = new fabric.Polygon(points, {
      left: position.x,
      top: position.y,
      fill: '#ffd700',
      radius: 50,
      hasControls: true,
      lockScalingFlip: true,
    });
    canvasInstance.current.add(star);
    star.setCoords(); // Update coordinates for proper dragging
    canvasInstance.current.renderAll();
  };





const addLine = () => {
  if (canvas) {
      const line = new Line([50, 50, 200, 200], {
          stroke: 'black',
          strokeWidth: 5
      });
      canvas.add(line);
  }
};

  const addText = () => {
    const text = new fabric.IText('Hello, Fabric.js!', {
      left: 100,
      top: 100,
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

    //   const addText = () => {
    //     if (canvas) {
    //         const text = new IText('Edit me', {
    //             left: 100,
    //             top: 100,
    //             fontSize: 24,
    //             fontFamily: 'Arial',
    //             fontWeight: 'normal',
    //             fill: '#000000'
    //         });
    //         canvas.add(text);
    //         canvas.setActiveObject(text);
    //     }
    // };

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
    <div className='new text-black px-10 mx-auto my-5 grid lg:grid-cols-4 md:grid-cols-1 grid-cols-1 lg:gap-5 gap-3'>


        <div className="styles col-span-1">
                <div className="grid grid-cols-4 gap-4">
                    <div className="stylings col-span-1 flex flex-col bg-white rounded-[10px] p-5 gap-3">
     
                        <div onClick={() => handleSectionClick('elements')} className="text-xs flex flex-col gap-1 items-center">
                            <RiShapesLine className='text-[20px]' />
                            Elements
                        </div>
                        <div onClick={() => handleSectionClick('texts')} className="text-xs flex flex-col gap-1 items-center">
                            <ImFontSize className='text-[20px]' />
                            Texts
                        </div>
                       
                    </div>
                    <div className="style-display col-span-3 gap-3 flex flex-col">
                        <div className="top text-sm flex items-center justify-center gap-2 h-[30px] rounded-[10px] w-full bg-white text-black">
                            <FiPlus /> New Design
                        </div>


                          {/* ELEMENTS STARTS */}
                        <div style={{ display: selectedSection === 'elements' ? 'block' : 'none' }}>
                            <div className="temp bg-white rounded-[10px] p-5 flex flex-col gap-2">
                                <div className="detail">
                                    <h1 className='text-base font-semibold'>Elements</h1>
                                    <p className='text-[13px]'>Lorem ipsum dolor sit amet consectetur.</p>
                                </div>
                            
                                <Menu as="div" className="relative text-left">
                                    <div className='w-full'>
                                        <MenuButton className="flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        Elements 
                                        <IoIosArrowDown aria-hidden="true" className="size-5 text-gray-400" />
                                        {/* <ChevronDownIcon /> */}
                                        </MenuButton>
                                    </div>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="py-1">
                                        <MenuItem>
                                            <div onClick={() => handleChangeStyle('arrows')}
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                            >
                                            Arrows
                                            </div>
                                        </MenuItem>
                                        <MenuItem>
                                            <div onClick={() => handleChangeStyle('shapes')}
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                            >
                                            Shapes
                                            </div>
                                        </MenuItem>
                                        <MenuItem>
                                            <div onClick={() => handleChangeStyle('lines')}
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                            >
                                            Lines
                                            </div>
                                        </MenuItem>
                                        </div>
                                    </MenuItems>
                                </Menu>

                               

                                <div style={{ display: changeStyle === 'shapes' ? 'block' : 'none' }}>
                                   
                                    <div>
                                        <div
                                          draggable
                                          variant='ghost'
                                          className="line-img"
                                          onDragStart={(event) => handleDragStart(event, 'rectangle')}
                                          style={{ display: 'inline-block', margin: '10px', padding: '10px', backgroundColor: 'white', color: 'white' }}
                                        >
                                           <Image src='/images/Frame 1171276935.svg' width={100} height={100} alt='Image' />
                                        </div>
                                        <div
                                          draggable
                                          variant='ghost'
                                          className="line-img"
                                          onDragStart={(event) => handleDragStart(event, 'circle')}
                                          style={{ display: 'inline-block', margin: '10px', padding: '10px', color: 'white' }}
                                        >
                                         <Image src='/images/Frame 1171276936.svg' width={100} height={100} alt='Image' />
                                        </div>
                                        <div
                                          draggable
                                          variant='ghost'
                                          className="line-img"
                                          onDragStart={(event) => handleDragStart(event, 'triangle')}
                                          style={{ display: 'inline-block', margin: '10px', padding: '10px', color: 'white' }}
                                        >
                                         <Image src='/images/Frame 1171276937.svg' width={100} height={100} alt='Image' />
                                        </div>
                                        <div
                                          draggable
                                          variant='ghost'
                                          className="line-img"
                                          onDragStart={(event) => handleDragStart(event, 'star')}
                                          style={{ display: 'inline-block', margin: '10px', padding: '10px', color: 'white' }}
                                        >
                                          <Image src='/images/Frame 1171276939.svg' width={100} height={100} alt='Image' />
                                        </div>
                                        
                                      </div>

                                </div>

                               
                            </div>
                        </div>
                        {/* ELEMENTS ENDS */}

                          {/* TEXTS STARTS */}
                        <div style={{ display: selectedSection === 'texts' ? 'block' : 'none' }}>
                            <div className="temp bg-white rounded-[10px] p-5 flex flex-col gap-2">
                                <div className="detail">
                                    <h1 className='text-base font-semibold'>Texts</h1>
                                    <p className='text-[13px]'>Lorem ipsum dolor sit amet consectetur.</p>
                                </div>

                               
                               

                                <button onClick={addText} className="bg-blue-500 text-white px-4 py-2 rounded">Add Text</button>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className='col-span-2'>
                                        {/* <label className="block text-sm font-medium">Font Family</label> */}
                                        <select
                                            onChange={(e) => changeFontFamily(e.target.value)}
                                            className="w-full border px-2 py-1 rounded"
                                        >
                                            <option value="Arial">Arial</option>
                                            <option value="Times New Roman">Times New Roman</option>
                                            <option value="Courier New">Courier New</option>
                                        </select>
                                    </div>
                                    <div className='col-span-1'>
                                        {/* <label className="block text-sm font-medium">Font Weight</label> */}
                                        <select
                                            onChange={(e) => changeFontWeight(e.target.value)}
                                            className="w-full border px-2 py-1 rounded"
                                        >
                                            <option value="normal">Normal</option>
                                            <option value="bold">Bold</option>
                                        </select>
                                    </div>
                                    <div className='col-span-1'>
                                        {/* <label className="block text-sm font-medium">Font Size</label> */}
                                        <input
                                            type="number"
                                            onChange={(e) => changeFontSize(e.target.value)}
                                            defaultValue={24}
                                            className="w-full border px-2 py-1 rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* TEXTS ENDS */}
                        
                       
                        
                     
                    </div>
                </div>
            </div>
     
     <div className="lg:col-span-3 col-span-1 lg:p-5 md:p-3 p-0">
      
     <div className="lg:col-span-3 col-span-1 lg:p-5 md:p-3 p-0">
                <h2 className='text-[20px] flex items-center justify-center font-medium bg-transparent'>Preview</h2>
                <div className="bg-white p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between px-5 h-[50px] rounded-[10px] bg-black">
                        <h3 className='font-medium text-lg text-white'>Verse Mapping</h3>
                        <p className='text-sm text-white'>John 3:16 (ESV)</p>
                    </div>
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      style={{ border: '1px solid #ccc', marginTop: '20px', width: '100%', height: '600px', position: 'relative' }}
                      className=" overflow-hidden"
                    >
                      <canvas ref={canvasRef} />
                    </div>
                </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={startDrawing} style={buttonStyle}>Start Drawing</button>
        <button onClick={stopDrawing} style={buttonStyle}>Stop Drawing</button>
        <button onClick={clearCanvas} style={buttonStyle}>Clear Canvas</button>
        <button onClick={exportAsImage} style={buttonStyle}>Export as Image</button>
      </div>
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
