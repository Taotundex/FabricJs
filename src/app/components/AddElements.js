// 'use client';
// import React, { useEffect, useRef, useState } from 'react'
// import { Canvas, Circle, Rect } from 'fabric';
// import Image from 'next/image';
// import '../globals.css';

// const AddElements = () => {
//     const canvasRef = useRef(null);
//     const [canvas, setCanvas] = useState(null);

//     useEffect(() => {
//         if (canvasRef.current){
//             const initCanvas = new Canvas(canvasRef.current, {
//                 width:  500,
//                 height: 500,
//             });
//             initCanvas.backgroundColor = '#fff';
//             initCanvas.renderAll();
//         // }

//     setCanvas(initCanvas);
//         return () => {
//             initCanvas.dispose();
//         };
//     }}, [])
            
//     const addRectangle = () => {
//         if (canvas){
//             const rect = new Rect({
//                 top: 50,
//                 left: 50,
//                 width: 100,
//                 height: 50, 
//                 fill: '#0e0e0e'
//             });
//             canvas.add(rect);
//         }
//     }
//     const addCircle = () => {
//         if (canvas){
//             const circle = new Circle({
//                 top: 50,
//                 left: 50,
//                 radius: 50, 
//                 fill: '#0e0e0e'
//             });
//             canvas.add(circle);
//         }
//     }

//   return (
//     // <div>
//             <div className="all-shapes grid grid-cols-3 gap-2 p-3">
//                 <div onClick={addRectangle} variant='ghost' size='medium' className="line-img">
//                     <Image src='/images/Frame 1171276935.svg' width={100} height={100} alt='Image' />
//                 </div>
//                 <div onClick={addCircle} variant='ghost' size='medium' className="line-img">
//                     <Image src='/images/Frame 1171276936.svg' width={100} height={100} alt='Image' />
//                 </div>
//             </div>
//     // </div>
//   )
// }

// export default AddElements
