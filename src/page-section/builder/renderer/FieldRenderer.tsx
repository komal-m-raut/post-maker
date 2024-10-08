import { IField } from "@/types/builder";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const RenderField: React.FC<{ field: IField; type: IField["type"]; aspectRatio: String }> = ({
  field,
  type,
  aspectRatio,
}) => {
  switch (type) {
    case "title":
      return (
        <h1
          style={{
            fontSize: field.style.fontSize + "px" ?? "1.5rem",
            fontWeight: field.style.fontWeight ?? "bold",
            color: field.style.color ?? "#000",
            textAlign: field.style.alignment ?? "left",
          }}
          className="my-2"
        >
          {field.content}
        </h1>
      );
    case "description":
      return (
        <p
          style={{
            fontSize: field.style.fontSize + "px" ?? "1rem",
            fontWeight: field.style.fontWeight ?? "normal",
            color: field.style.color ?? "#000",
            textAlign: field.style.alignment ?? "left",
          }}
          className="my-2"
        >
          {field.content}
        </p>
      );
    case "username":
      return (
        <div
          className="italic my-2"
          style={{
            fontSize: field.style.fontSize + "px" ?? "1rem",
            fontWeight: field.style.fontWeight ?? "bold",
            color: field.style.color ?? "#000",
            textAlign: field.style.alignment ?? "left",
          }}
        >
          {field.content}
        </div>
      );
    case "code":
      return (
        <div className="bg-[#001524] p-4 rounded-lg shadow-inner text-left text-white my-4 overflow-auto">
          <div className="flex space-x-2 mb-4">
            <span className="w-3 h-3 bg-red-500 rounded-full block"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full block"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full block"></span>
          </div>
          <hr className="border-gray-300 my-4" />
          <SyntaxHighlighter
            language="jsx"
            showLineNumbers
            style={dracula}
            customStyle={{
              fontSize: aspectRatio === "linkedin" ? "12px" : "14px",  
              lineHeight: "1.5",
              overflow: "auto",
            }}
          >
            {field.content}
          </SyntaxHighlighter>
        </div>
      );

    default:
      return null;
  }
};

export const FieldRenderer: React.FC<{
  field: IField;
  aspectRatio: string;
}> = ({ field, aspectRatio }) => {
  return (
    <div className="w-full">{RenderField({ field, type: field.type, aspectRatio })}</div>
  );
};
