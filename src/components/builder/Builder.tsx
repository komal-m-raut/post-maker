"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Builder = () => {
  const buttonLabels = ["Title", "Description", "Code", "Username"];
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [content, setContent] = useState<{ [key: string]: { value: string; style: React.CSSProperties } }>({});

  const handleButtonClick = (label: string) => {
    if (!selectedFields.includes(label)) {
      setSelectedFields([...selectedFields, label]);
      setContent((prevContent) => ({
        ...prevContent,
        [label.toLowerCase()]: { value: "", style: {} },
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setContent((prevContent) => ({
      ...prevContent,
      [field]: { ...prevContent[field], value },
    }));
  };

  const handleStyleChange = (field: string, style: React.CSSProperties) => {
    setContent((prevContent) => ({
      ...prevContent,
      [field]: { ...prevContent[field], style: { ...prevContent[field].style, ...style } },
    }));
  };

  const jsonObject = {
    backgroundImage: "https://example.com/image.jpg",
    content: Object.keys(content).map((key) => ({
      type: key,
      value: content[key].value,
      style: content[key].style,
    })),
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-50 p-4 m-4 w-1/3 h-auto shadow-lg">
        <h1 className="text-center mb-4">Select fields</h1>
        <div className="flex gap-2">
          {buttonLabels.map((label) => (
            <Button
              key={label}
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => handleButtonClick(label)}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          {selectedFields.map((field) => (
            <div key={field} className="mb-2">
              <label className="block text-gray-700 mb-2">{field}</label>
              <Input
                type="text"
                name={field.toLowerCase()}
                className="border rounded py-2 px-4 w-full"
                placeholder={`Enter ${field.toLowerCase()}`}
                value={content[field.toLowerCase()]?.value || ""}
                onChange={(e) => handleInputChange(field.toLowerCase(), e.target.value)}
                style={content[field.toLowerCase()]?.style}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  className="bg-gray-500 text-white py-1 px-2 rounded"
                  onClick={() => handleStyleChange(field.toLowerCase(), { fontWeight: content[field.toLowerCase()]?.style?.fontWeight === 'bold' ? 'normal' : 'bold' })}
                >
                  Bold
                </Button>
                <Button
                  className="bg-gray-500 text-white py-1 px-2 rounded"
                  onClick={() => handleStyleChange(field.toLowerCase(), { fontStyle: content[field.toLowerCase()]?.style?.fontStyle === 'italic' ? 'normal' : 'italic' })}
                >
                  Italic
                </Button>
                <Button
                  className="bg-gray-500 text-white py-1 px-2 rounded"
                  onClick={() => handleStyleChange(field.toLowerCase(), { textDecoration: content[field.toLowerCase()]?.style?.textDecoration === 'underline' ? 'none' : 'underline' })}
                >
                  Underline
                </Button>
                <input
                  type="color"
                  onChange={(e) => handleStyleChange(field.toLowerCase(), { color: e.target.value })}
                  className="border rounded py-1 px-2"
                />
                <input
                  type="number"
                  placeholder="Font Size"
                  onChange={(e) => handleStyleChange(field.toLowerCase(), { fontSize: `${e.target.value}px` })}
                  className="border rounded py-1 px-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-50 p-4 m-4 w-1/3 h-auto shadow-lg">
        <h1 className="text-center mb-4">Box 2</h1>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(jsonObject, null, 2)}
        </pre>
        <div className="mt-4">
          {jsonObject.content.map((item, index) => (
            <div key={index} style={item.style}>
              {item.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Builder;