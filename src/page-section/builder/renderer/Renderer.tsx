import { IField } from "@/types/builder";
import React from "react";
import { FieldRenderer } from "./FieldRenderer";

export const Renderer: React.FC<{ fields: IField[] }> = ({ fields }) => {
  return (
    <div className="bg-slate-50 p-4 m-4 w-1/3 h-auto shadow-lg">
      <h1 className="text-center mb-4">Renderer</h1>
      <div className="mt-4">
        {fields.map((field, index) => (
          <FieldRenderer key={index} field={field} />
        ))}
      </div>
    </div>
  );
};
