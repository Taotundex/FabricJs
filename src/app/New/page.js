'use client';
import React, { useEffect, useRef, useState } from 'react'
import '../globals.css';
import { Canvas, Circle, Rect } from 'fabric';
import { MdOutlineCircle, MdOutlineRectangle } from "react-icons/md";
import { HiOutlineTemplate } from "react-icons/hi";
import { RiShapesLine } from "react-icons/ri";
import { ImFontSize } from "react-icons/im";
import { BsVectorPen } from "react-icons/bs";
import { IoColorFillOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

// const Rect = fabric.Rect;

const page = () => {
    const [selectedSection, setSelectedSection] = useState('templates');
    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    const [changeStyle, setChangeStyle] = useState('arrows');
    const handleChangeStyle = (element) => {
        setChangeStyle(element);
    };

    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null)

    useEffect(() => {
        if (canvasRef.current){
            const initCanvas = new Canvas(canvasRef.current, {
                width:  1000,
                height: 500,
            });
            initCanvas.backgroundColor = '#fff';
            initCanvas.renderAll();

            setCanvas(initCanvas);

            return () => {
                initCanvas.dispose();
            };
        }
    }, [])
    const addRectangle = () => {
        if (canvas){
            const rect = new Rect({
                top: 50,
                left: 50,
                width: 100,
                height: 50, 
                fill: '#0e0e0e'
            });
            canvas.add(rect);
        }
    }
    const addCircle = () => {
        if (canvas){
            const circle = new Circle({
                top: 50,
                left: 50,
                radius: 50, 
                fill: '#0e0e0e'
            });
            canvas.add(circle);
        }
    }
    
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
                                    <Image src='/images/Component 74.svg' width={100} height={100} alt='Image' />
                                </div>
                                <div className="template-img">
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
                                        <div className="arrow-img w-fit">
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

export default page
