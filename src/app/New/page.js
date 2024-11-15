'use client';
import React, { useEffect, useRef, useState } from 'react';
import '../globals.css';
import { Canvas, Circle, Group, IText, Line, PencilBrush, Polygon, Rect, Triangle } from 'fabric';
import { HiOutlineTemplate } from "react-icons/hi";
import { RiShapesLine } from "react-icons/ri";
import { ImFontSize } from "react-icons/im";
import { BsVectorPen } from "react-icons/bs";
import { IoColorFillOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';


import { handleObjectMoving, clearGuidelines } from '../components/SnappingHelpers';

export default function Page() {
    const [guidelines, setGuidelines] = useState([]);
    const [selectedSection, setSelectedSection] = useState('templates');
    const [canvas, setCanvas] = useState(null);
    const [lineWidth, setLineWidth] = useState(1);
    const [lineColor, setLineColor] = useState('#000000'); // Default color black
    const [fillColor, setFillColor] = useState('#000000'); // Default fill color black
    const canvasRef = useRef(null);

    const colors = ['#000000', '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF9', '#FFC733', '#8D33FF', '#FF8D33', '#4A4A4A'];
    const lineWidths = [1, 2, 3, 4, 5];  // Corresponding line widths for each pen
    const fillColors = colors; // Fill colors are the same as line colors in this case

    // Define URLs for each image
    // const imageUrls = {
    //     image1: '/images/Component 77.svg', // Adjust path according to your project structure
    //     image2: '/images/Component 78.svg',
    //     image3: '/images/Frame 1171276869.svg',
    // };

    

    const handleSectionClick = (section) => setSelectedSection(section);
    const [changeStyle, setChangeStyle] = useState('arrows');
    const handleChangeStyle = (element) => setChangeStyle(element);

    // let canvas;
    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 1000,
                height: 500,
                backgroundColor: '#fff',
            });
            initCanvas.isDrawingMode = false; // Start with drawing mode disabled
            initCanvas.freeDrawingBrush = new PencilBrush(initCanvas);
            setCanvas(initCanvas);

            // Selection listener to handle fill color changes
            initCanvas.on('selection:created', updateFillColor);
            initCanvas.on('selection:updated', updateFillColor);

            // Selection listener to handle fill color changes
            initCanvas.on('object:moving', (event) => {
                handleObjectMoving(initCanvas, event.target, guidelines, setGuidelines)
            });
            initCanvas.on('object:modified', () => {
                clearGuidelines(initCanvas, guidelines, setGuidelines)
            });

            return () => initCanvas.dispose();
        }
    }, [canvasRef]);

    // Function to add an image to the canvas
    // const addImageToCanvas = (url) => {
    //     if (canvas) {
    //         Image.fromURL(url, (img) => {
    //             img.set({
    //                 left: 50,
    //                 top: 50,
    //                 scaleX: 0.5,
    //                 scaleY: 0.5,
    //             });
    //             canvas.add(img);
    //             canvas.renderAll();
    //         });
    //     }
    // };

    const addRectangle = () => {
        if (canvas) {
            const rect = new Rect({
                top: 100,
                left: 50,
                width: 100,
                height: 50,
                fill: '#576fab'
            });
            canvas.add(rect);
        }
    };

    const addCircle = () => {
        if (canvas) {
            const circle = new Circle({
                top: 100,
                left: 100,
                radius: 50,
                fill: '#54baac'
            });
            canvas.add(circle);
        }
    };

    const addTriangle = () => {
        if (canvas) {
            const triangle = new Triangle({
                top: 100,
                left: 150,
                width: 100,
                height: 100,
                fill: '#ff5722'
            });
            canvas.add(triangle);
        }
    };

    const addStar = () => {
        if (canvas) {
            const points = [
                { x: 50, y: 0 }, { x: 60, y: 35 }, { x: 100, y: 35 },
                { x: 65, y: 55 }, { x: 80, y: 100 }, { x: 50, y: 75 },
                { x: 20, y: 100 }, { x: 35, y: 55 }, { x: 0, y: 35 },
                { x: 40, y: 35 }
            ];
            const star = new Polygon(points, {
                left: 200,
                top: 100,
                fill: '#ffd700',
                scaleX: 1,
                scaleY: 1
            });
            canvas.add(star);
        }
    };

    const addText = () => {
        if (canvas) {
            const text = new IText('Edit me', {
                left: 100,
                top: 100,
                fontSize: 24,
                fontFamily: 'Arial',
                fontWeight: 'normal',
                fill: '#000000'
            });
            canvas.add(text);
            canvas.setActiveObject(text);
        }
    };
    const changeFontSize = (size) => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.set({ fontSize: parseInt(size) });
            canvas.requestRenderAll();
        }
    };
    const changeFontFamily = (fontFamily) => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.set({ fontFamily });
            canvas.requestRenderAll();
        }
    };
    const changeFontWeight = (weight) => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.set({ fontWeight: weight });
            canvas.requestRenderAll();
        }
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

    const selectPen = (width) => {
        setLineWidth(width);
        if (canvas) {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.width = width;
            canvas.freeDrawingBrush.color = lineColor;
        }
    };

    const selectColor = (color) => {
        setLineColor(color);
        if (canvas && canvas.isDrawingMode) {
            canvas.freeDrawingBrush.color = color;
        }
    };

    const activateEraser = () => {
        if (canvas) {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.color = '#fff';
        }
    };

    const updateFillColor = () => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.fill) {
            setFillColor(activeObject.fill);
        }
    };

    const applyFillColor = (color) => {
        setFillColor(color);
        const activeObject = canvas?.getActiveObject();
        if (activeObject && 'fill' in activeObject) {
            activeObject.set('fill', color);
            canvas.requestRenderAll();
        }
    };

    
    const addArrow = (canvas, x1, y1, x2, y2, color = 'black') => {
        if (!canvas) return; // Guard against null or undefined canvas

        const line = new Line([x1, y1, x2, y2], {
            stroke: color,
            strokeWidth: 2,
            selectable: true,
            evented: true,
        });

        const angle = Math.atan2(y2 - y1, x2 - x1);
        const arrowHeadLength = 10;
        const arrowHeadWidth = 5;

        const arrowHeadLeft = new Triangle({
            left: x2 - arrowHeadLength * Math.cos(angle - Math.PI / 6),
            top: y2 - arrowHeadLength * Math.sin(angle - Math.PI / 6),
            angle: (angle * 180) / Math.PI + 90,
            width: arrowHeadWidth,
            height: arrowHeadLength,
            fill: color,
            selectable: false,
            evented: false,
        });

        const arrowHeadRight = new Triangle({
            left: x2 - arrowHeadLength * Math.cos(angle + Math.PI / 6),
            top: y2 - arrowHeadLength * Math.sin(angle + Math.PI / 6),
            angle: (angle * 180) / Math.PI + 90,
            width: arrowHeadWidth,
            height: arrowHeadLength,
            fill: color,
            selectable: false,
            evented: false,
        });

        const arrow = new Group([line, arrowHeadLeft, arrowHeadRight], {
            selectable: true,
            evented: true,
        });

        canvas.add(arrow);
        canvas.renderAll();
    };

    const handleAddArrow = () => {
        if (canvasRef.current) {
            addArrow(canvasRef.current, 50, 50, 200, 200, 'red');
        }
    };
  return (
    <div className='new text-black'>
        <div className="grid grid-cols-4 gap-5">
            <div className="styles col-span-1">
                <div className="grid grid-cols-4 gap-4">
                    <div className="stylings col-span-1 flex flex-col bg-white rounded-[10px] p-5 gap-3">
                        <div onClick={() => handleSectionClick('templates')} className="text-xs flex flex-col gap-1 items-center">
                            <HiOutlineTemplate className='text-[20px]' />
                            Templates
                        </div>
                        <div onClick={() => handleSectionClick('elements')} className="text-xs flex flex-col gap-1 items-center">
                            <RiShapesLine className='text-[20px]' />
                            Elements
                        </div>
                        <div onClick={() => handleSectionClick('texts')} className="text-xs flex flex-col gap-1 items-center">
                            <ImFontSize className='text-[20px]' />
                            Texts
                        </div>
                        <div onClick={() => handleSectionClick('draw')} className="text-xs flex flex-col gap-1 items-center">
                            <BsVectorPen className='text-[20px]' />
                            Draw
                        </div>
                        <div onClick={() => handleSectionClick('fill')} className="text-xs flex flex-col gap-1 items-center">
                            <IoColorFillOutline className='text-[20px]' />
                            Fill
                        </div>
                    </div>
                    <div className="style-display col-span-3 gap-3 flex flex-col">
                        <div className="top text-sm flex items-center justify-center gap-2 h-[30px] rounded-[10px] w-full bg-white text-black">
                            <FiPlus /> New Design
                        </div>

                        {/* TEMPLATE STARTS */}
                        <div  style={{ display: selectedSection === 'templates' ? 'block' : 'none' }} className="temp bg-white rounded-[10px] p-5 flex flex-col gap-2">
                            <div className="detail">
                                <h1 className='text-base font-semibold'>Templates</h1>
                                <p className='text-[13px]'>Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                            <div className="all-templates grid grid-cols-3 gap-2">
                                <div className="template-img">
                                    {/* <Image onClick={() => addImageToCanvas(imageUrls.image1)} src='/images/Component 74.svg' width={100} height={100} alt='Image' /> */}
                                    <Image src='/images/Component 74.svg' width={100} height={100} alt='Image' />
                                </div>
                                <div className="template-img">
                                    {/* <Image onClick={() => addImageToCanvas(imageUrls.image2)} src='/images/Component 77.svg' width={100} height={100} alt='Image' /> */}
                                    <Image src='/images/Component 77.svg' width={100} height={100} alt='Image' />
                                </div>
                                <div className="template-img">
                                    {/* <Image onClick={() => addImageToCanvas(imageUrls.image3)} src='/images/Component 77.svg' width={100} height={100} alt='Image' /> */}
                                    <Image src='/images/Component 77.svg' width={100} height={100} alt='Image' />
                                </div>
                            </div>
                        </div>
                         {/* TEMPLATE ENDS */}

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

                                <div style={{ display: changeStyle === 'arrows' ? 'block' : 'none' }}>
                                    <div className="all-arrows flex flex-wrap gap-2 p-3">
                                        <div onClick={handleAddArrow} variant='ghost' size='medium'  className="arrow-img w-fit">
                                            <Image src='/images/Line 7.svg' width={65} height={100} alt='Image' />
                                        </div>
                                        <div className="arrow-img w-fit">
                                            <Image src='/images/Line 8.svg' width={65} height={100} alt='Image' />
                                        </div>
                                        <div className="arrow-img">
                                            <Image src='/images/Line 7.svg' width={65} height={100} alt='Image' />
                                        </div>                                
                                    </div>                                
                                </div>

                                <div style={{ display: changeStyle === 'shapes' ? 'block' : 'none' }}>
                                    <div className="all-shapes grid grid-cols-3 gap-2 p-3">
                                        <div onClick={addRectangle} variant='ghost' size='medium' className="line-img">
                                            <Image src='/images/Frame 1171276935.svg' width={100} height={100} alt='Image' />
                                        </div>
                                        <div onClick={addCircle} variant='ghost' size='medium' className="line-img">
                                            <Image src='/images/Frame 1171276936.svg' width={100} height={100} alt='Image' />
                                        </div>
                                        <div onClick={addTriangle} variant='ghost' size='medium' className="line-img">
                                            <Image src='/images/Frame 1171276937.svg' width={100} height={100} alt='Image' />
                                        </div>
                                        <div onClick={addStar} variant='ghost' size='medium' className="line-img">
                                            <Image src='/images/Frame 1171276939.svg' width={100} height={100} alt='Image' />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: changeStyle === 'lines' ? 'block' : 'none' }}>
                                    <div className="all-lines grid grid-cols-2 gap-4 p-3">
                                        <div onClick={addRectangle} variant='ghost' size='medium' className="line-img">
                                            <Image src='/images/Group 1.svg' width={100} height={100} alt='Image' />
                                        </div>
                                        <div onClick={addCircle} variant='ghost' size='medium' className="line-img">
                                            <Image src='/images/Group 13.svg' width={100} height={100} alt='Image' />
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
                            
                                {/* <Menu as="div" className="relative text-left">
                                    <div className='w-full'>
                                        <MenuButton className="flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        texts 
                                        <IoIosArrowDown aria-hidden="true" className="size-5 text-gray-400" />
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
                                </Menu> */}

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
                        
                          {/* DRAW STARTS */}
                        <div style={{ display: selectedSection === 'draw' ? 'block' : 'none' }}>
                            <div className="temp bg-white rounded-[10px] p-5 flex flex-col gap-2">
                                <div className="detail">
                                    <h1 className='text-base font-semibold'>Draw</h1>
                                    <p className='text-[13px]'>Lorem ipsum dolor sit amet consectetur.</p>
                                </div>
                            
                                {/* <Menu as="div" className="relative text-left">
                                    <div className='w-full'>
                                        <MenuButton className="flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        texts 
                                        <IoIosArrowDown aria-hidden="true" className="size-5 text-gray-400" />
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
                                </Menu> */}

                                <button onClick={addLine} className="bg-blue-500 text-white px-4 py-2 rounded">Draw</button>
                                {/* Pen Selection */}
                                <div className="flex items-center space-x-2">
                                    {lineWidths.map((width, index) => (
                                        <button 
                                            key={index} 
                                            onClick={() => selectPen(width)} 
                                            className={`w-8 h-8 border ${width === lineWidth ? 'border-blue-500' : 'border-gray-300'} bg-gray-200 flex justify-center items-center`}
                                        >
                                            <div style={{ height: `${width}px`, width: `${width}px`, backgroundColor: lineColor }} />
                                        </button>
                                    ))}
                                    
                                    {/* Eraser */}
                                    <button 
                                        onClick={activateEraser} 
                                        className="w-8 h-8 border border-gray-300 bg-gray-200 flex justify-center items-center"
                                        title="Eraser"
                                    >
                                        🧽
                                    </button>
                                </div>

                                {/* Color Selection */}
                                <div className="flex items-center space-x-2">
                                    {colors.map((color, index) => (
                                        <button 
                                            key={index} 
                                            onClick={() => selectColor(color)} 
                                            style={{ backgroundColor: color }}
                                            className={`w-8 h-8 rounded-full border ${color === lineColor ? 'border-blue-500' : 'border-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* DRAW ENDS */}
                        
                          {/* FILL STARTS */}
                        <div style={{ display: selectedSection === 'fill' ? 'block' : 'none' }}>
                            <div className="temp bg-white rounded-[10px] p-5 flex flex-col gap-2">
                                <div className="detail">
                                    <h1 className='text-base font-semibold'>Fill</h1>
                                    <p className='text-[13px]'>Lorem ipsum dolor sit amet consectetur.</p>
                                </div>
                            
                                {/* Fill Color Palette */}
                                <div className="flex items-center space-x-2">
                                    {fillColors.map((color, index) => (
                                        <button 
                                            key={index} 
                                            onClick={() => applyFillColor(color)} 
                                            style={{ backgroundColor: color }}
                                            className={`w-8 h-8 rounded-full border ${color === fillColor ? 'border-blue-500' : 'border-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* FILL ENDS */}
                    </div>
                </div>
            </div>
            <div className="col-span-3 p-5">
                <h2 className='text-[20px] flex items-center justify-center font-medium bg-transparent'>Preview</h2>
                <div className="bg-white p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between px-5 h-[50px] rounded-[10px] bg-black">
                        <h3 className='font-medium text-lg text-white'>Verse Mapping</h3>
                        <p className='text-sm text-white'>John 3:16 (ESV)</p>
                    </div>
                    <div className="canvas">
                        <canvas className='rounded-[10px]' id='canvas' ref={canvasRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div className="toolbar darkmode ">
        </div>
    </div>
  )
}

// export default page
