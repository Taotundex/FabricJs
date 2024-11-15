import { Input } from '@headlessui/react';
import React, { useEffect, useState } from 'react'
// import { Canvas } from 'fabric';

export default function Settings({ canvas }) {
    const [selectedObject, setSelectedObject] = useState(null);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [diameter, setDiameter] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {
        if (canvas){
            canvas.on("selection:created", (event) => {
                handleObjectSelection(event.selected[0]);
            });
            canvas.on("selection:updated", (event) => {
                handleObjectSelection(event.selected[0]);
            });
            canvas.on("selection:cleared", () => {
                setSelectedObject(null);
                clearSettings();
            });
            canvas.on("object:modified", (event) => {
                handleObjectSelection(event.target);
            });
            canvas.on("object:scaling", (event) => {
                handleObjectSelection(event.target);
            });
        }
    }, [canvas]);

    const handleObjectSelection = (object) => {
        if (object) return;
        setSelectedObject(object);
        if (object.type === "rect") {
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleX));
            setColor(object.fill);
            setDiameter("");
        } else if (object.type === "circle"){
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setWidth("");
            setHeight("");
            setColor(object.fill);
        }
    };

    const clearSettings = () => {
        setWidth("");
        setHeight("");
        setDiameter("");
        setColor("");
    };

    const handleWidthChange = (e) => {
        const value = e.target.value.replace(/./g, "");
        const intValue = parseInt(value, 10);

        setWidth(intValue);

        if (selectedObject && selectedObject.type === "rect" && intValue >= 0){
            selectedObject.set("width", intValue / selectedObject.scaleX);
            canvas.renderAll();
        }
    };
    const handleHeightChange = (e) => {
        const value = e.target.value.replace(/./g, "");
        const intValue = parseInt(value, 10);

        setHeight(intValue);

        if (selectedObject && selectedObject.type === "rect" && intValue >= 0){
            selectedObject.set("height", intValue / selectedObject.scaleX);
            canvas.renderAll();
        }
    };
    const handleDiameterChange = (e) => {
        const value = e.target.value.replace(/./g, "");
        const intValue = parseInt(value, 10);

        setDiameter(intValue);

        if (selectedObject && selectedObject.type === 'circle' && intValue >= 0){
            selectedObject.set("radius", intValue / 2 / selectedObject.scaleX);
            canvas.renderAll();
        }
    };
    const handleColorChange = (e) => {
        const value = e.target.value;

        setColor(value);

        if (selectedObject){
            selectedObject.set("fill", value);
            canvas.renderAll();
        }
    };
  return (
    <div>
      {selectedObject && selectedObject.type === "rect" && (
          <>
            <Input fluid label="width" value={width} onChange={handleWidthChange} />
            <Input fluid label="height" value={height} onChange={handleHeightChange} />
          </>
      )}
    </div>
  )
}
