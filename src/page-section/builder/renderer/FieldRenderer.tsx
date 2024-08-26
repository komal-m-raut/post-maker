import { IField } from "@/types/builder";
import React from "react";

const RenderField: React.FC<{ field: IField; type: IField["type"] }> = ({
  field,
  type,
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
          className="my-4"
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
          className="my-4"
        >
          {field.content}
        </p>
      );
    case "username":
      return (
        <div
          className="italic my-4"
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
        <div className="bg-[#001524] p-4 rounded-lg shadow-inner text-left text-white my-4">
          <div className="flex space-x-2 mb-4">
            <span className="w-3 h-3 bg-red-500 rounded-full block"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full block"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full block"></span>
          </div>
          <hr className="border-gray-300 my-4" />
          <pre className="whitespace-pre-wrap word-break-break-all text-base text-white">
            <code>{field.content}</code>
          </pre>
        </div>
      );

    default:
      return null;
  }
};

export const FieldRenderer: React.FC<{ field: IField }> = ({ field }) => {
  return (
    <div className="w-full">
      {RenderField({ field, type: field.type })}
    </div>
  );
};
