import { IField } from "@/types/builder";
import React, { useId } from "react";
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "@/components/ui/button";

export const Renderer: React.FC<{ fields: IField[] }> = ({ fields }) => {
  const id = useId();

  return (
    <div className="p-4 w-1/3 h-auto shadow-xl">
      <div className="text-center mb-4">Aspect Ratio</div>
      <div className="flex flex-col items-center p-4 bg-green-100">
        {fields.map((field) => (
          <FieldRenderer
            key={`${id}-${Math.random().toString(36)}`}
            field={field}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button>Download</Button>
      </div>
    </div>
  );
};
