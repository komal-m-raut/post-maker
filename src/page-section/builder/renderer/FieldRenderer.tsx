import { IField } from "@/types/builder";
import React from "react";

const RenderField: React.FC<{ field: IField; type: IField["type"] }> = ({
  field,
  type,
}) => {
  const commonStyles = {
    fontSize: field.style.fontSize,
    fontWeight: field.style.fontWeight,
    color: field.style.color,
  };

  switch (type) {
    case "title":
      return <h1 className="text-2xl text-center">{field.content}</h1>;
    case "description":
      return (
        <p className="leading-relaxed text-center" style={commonStyles}>
          {field.content}
        </p>
      );
    case "username":
      return (
        <div className="italic text-end" style={commonStyles}>
          {field.content}
        </div>
      );
    case "code":
      return (
        <div className="bg-[#001524] p-4 rounded-lg shadow-inner text-left text-white">
          <div className="flex space-x-2 mb-4">
            <span className="w-3 h-3 bg-red-500 rounded-full block"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full block"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full block"></span>
          </div>
          <hr className="border-gray-300 my-4" />
          <pre
            style={{
              ...commonStyles,
              color: "#fff",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
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
    <div className="mb-6 w-4/5">
      {RenderField({ field, type: field.type })}
    </div>
  );
};