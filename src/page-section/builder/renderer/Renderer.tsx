import { IField } from "@/types/builder";
import React, { useId } from "react";
import { FieldRenderer } from "./FieldRenderer";

export const Renderer: React.FC<{ fields: IField[] }> = ({ fields }) => {
  const id = useId();

  return (
    <div className="p-4 w-1/3 h-auto shadow-lg">
      <div className="flex flex-col items-center">
        {fields.map((field) => (
          <FieldRenderer
            key={`${id}-${Math.random().toString(36).substr(2, 9)}`}
            field={field}
          />
        ))}
      </div>
    </div>
  );
};
