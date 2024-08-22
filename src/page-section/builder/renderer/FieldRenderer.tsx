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
      return (
        <h1 className="text-3xl font-bold text-center" style={commonStyles}>
          {field.content}
        </h1>
      );
    case "description":
      return (
        <p className="leading-relaxed text-center" style={commonStyles}>
          {field.content}
        </p>
      );
    case "username":
      return (
        <div className="italic text-gray-600" style={commonStyles}>
          {field.content}
        </div>
      );
    case "code":
      return (
        <pre
          className="bg-blue-100 p-4 w-3/4 rounded-lg shadow-inner text-left"
          style={{
            ...commonStyles,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          <code>{field.content}</code>
        </pre>
      );
    default:
      return null;
  }
};

export const FieldRenderer: React.FC<{ field: IField }> = ({ field }) => {
  return (
    <div className="max-w-lg mx-auto mb-6 flex flex-col items-center space-y-4">
      {RenderField({ field, type: field.type })}
    </div>
  );
};
