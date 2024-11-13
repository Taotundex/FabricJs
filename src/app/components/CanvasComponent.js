// import { useEffect, useRef, useState } from 'react';
// import { fabric } from 'fabric';

// const CanvasComponent = () => {
//   const canvasRef = useRef(null);
//   const [selectedStyle, setSelectedStyle] = useState('arrow'); // Default to 'arrow'

//   useEffect(() => {
//     // Initialize fabric canvas
//     const canvas = new fabric.Canvas(canvasRef.current);
//     canvas.setWidth(800);
//     canvas.setHeight(600);

//     // Function to add the Bible verse text on the canvas
//     const addBibleVerse = (verse) => {
//       const verseText = new fabric.Text(verse, {
//         left: 50,
//         top: 50,
//         fontSize: 20,
//         fill: 'black',
//       });
//       canvas.add(verseText);
//     };

//     // Example Bible verse text
//     addBibleVerse('For God so loved the world...');

//     // Function to add shapes or styles
//     const addShapeToCanvas = (type) => {
//       if (type === 'arrow') {
//         const arrow = new fabric.Line([50, 50, 150, 150], {
//           left: 100,
//           top: 100,
//           stroke: 'red',
//           strokeWidth: 5,
//         });
//         canvas.add(arrow);
//       }
//       // Add more styles as needed (e.g., circle, rectangle, etc.)
//     };

//     // Apply the selected style to the canvas
//     if (selectedStyle === 'arrow') {
//       addShapeToCanvas('arrow');
//     }

//     // Cleanup function to dispose of canvas on component unmount
//     return () => {
//       canvas.dispose();
//     };
//   }, [selectedStyle]);

//   return (
//     <div>
//       <canvas ref={canvasRef} />
      
//       <div>
//         {/* Style selection buttons */}
//         <button onClick={() => setSelectedStyle('arrow')}>Arrow</button>
//         {/* Add more buttons for other shapes/styles */}
//       </div>
//     </div>
//   );
// };

// export default CanvasComponent;
