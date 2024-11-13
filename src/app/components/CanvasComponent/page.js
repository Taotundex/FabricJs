// // 'use client';
// import { useEffect, useRef } from 'react';
// import { fabric } from 'fabric';

// const CanvasComponent = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (canvasRef.current) {
//       const canvas = new fabric.Canvas(canvasRef.current);
//       canvas.setWidth(500);
//       canvas.setHeight(500);

//       // Adding an example rectangle
//       const rect = new fabric.Rect({
//         left: 100,
//         top: 100,
//         fill: 'red',
//         width: 60,
//         height: 70,
//       });

//       canvas.add(rect);
//     }
//   }, []);

//   return <canvas ref={canvasRef}></canvas>;
// };

// export default CanvasComponent;
