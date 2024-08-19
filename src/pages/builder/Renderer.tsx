import { IField } from "@/types/builder";
import React from "react";

export const Renderer: React.FC<{ fields: IField[] }> = ({ fields }) => {
  return (
    <div className="bg-slate-50 p-4 m-4 w-1/3 h-auto shadow-lg">
      <h1 className="text-center mb-4">Box 2</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(fields, null, 2)}
      </pre>
      <div className="mt-4">
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <div
              style={{
                fontSize: field.style.fontSize,
                fontWeight: field.style.fontWeight,
                color: field.style.color,
              }}
            >
              {field.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
