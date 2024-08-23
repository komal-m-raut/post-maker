import { IField } from "@/types/builder";
import React from "react";
import { FieldRenderer } from "./FieldRenderer";

export const Renderer: React.FC<{ fields: IField[] }> = ({ fields }) => {
  return (
    <div className="p-4 w-1/3 h-auto shadow-lg">
      <div className="flex flex-col items-center">
        {fields.map((field, index) => (
          <FieldRenderer key={index} field={field} />
        ))}
      </div>
    </div>
  );
};
