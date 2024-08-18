"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Builder = () => {
  const [content, setContent] = useState<{
    [key: string]: { value: string; style: React.CSSProperties };
  }>({
    title: { value: "", style: { fontSize: "24px", fontWeight: "bold" } },
    description: { value: "", style: { fontSize: "16px" } },
    username: { value: "", style: { fontSize: "16px" } },
  });
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("title");

  const handleInputChange = (field: string, value: string) => {
    setContent((prevContent) => ({
      ...prevContent,
      [field]: { ...prevContent[field], value },
    }));
  };

  const handleStyleChange = (style: React.CSSProperties) => {
    setContent((prevContent) => ({
      ...prevContent,
      [activeTab]: {
        ...prevContent[activeTab],
        style: { ...prevContent[activeTab].style, ...style },
      },
    }));
  };

  const jsonObject = {
    backgroundImage,
    content: Object.keys(content).map((key) => ({
      type: key,
      value: content[key].value,
      style: content[key].style,
    })),
  };

  const renderStyleButtons = () => (
        <div className="flex gap-2 mt-2">
      <div className="flex flex-col">
        <label className="block text-gray-700 mb-1">Select Color</label>
        <input
          type="color"
          onChange={(e) => handleStyleChange({ color: e.target.value })}
          className="border rounded py-1 px-2"
        />
      </div>
      <div className="flex flex-col w-2/3">
        <label className="block text-gray-700 mb-1">Select Background Image</label>
        <Input
          type="text"
          className="border rounded py-2 px-4"
          placeholder="Enter background image URL"
          value={backgroundImage}
          onChange={(e) => setBackgroundImage(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-50 p-4 m-4 w-1/3 h-auto shadow-lg">
        <h1 className="text-center mb-4">Styles</h1>
        {renderStyleButtons()}
        <h1 className="text-center mb-4 mt-4">Enter Details</h1>
        <div className="flex gap-2 mb-4">
          {["title", "description", "username"].map((tab) => (
            <Button
              key={tab}
              className={`py-2 px-4 rounded ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </label>
          <Input
            type="text"
            name={activeTab}
            className="border rounded py-2 px-4 w-full"
            placeholder={`Enter ${activeTab}`}
            value={content[activeTab]?.value || ""}
            onChange={(e) => handleInputChange(activeTab, e.target.value)}
          />
        </div>
      </div>
      <div
        className="bg-slate-50 p-4 m-4 w-1/3 h-auto shadow-lg"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h1 className="text-center mb-4">Box 2</h1>
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