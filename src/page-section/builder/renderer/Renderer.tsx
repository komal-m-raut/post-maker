import { IField } from "@/types/builder";
import React, { useId, useRef } from "react";
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "@/components/ui/button";
import { toPng } from 'html-to-image';

export const Renderer: React.FC<{ fields: IField[] }> = ({ fields }) => {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const downloadPNG = () => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { pixelRatio: 20}) // Increase pixel ratio for higher quality
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'post.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error('Failed to convert to PNG', err);
      });
  };

  return (
    <div className="p-4 w-1/3 h-auto shadow-xl">
      <div className="text-center mb-4">Aspect Ratio</div>
      <div ref={ref} className="flex flex-col items-center p-6 bg-green-50">
        {fields.map((field) => (
          <FieldRenderer key={`${id}-${Math.random().toString(36)}`} field={field} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={downloadPNG}>Download</Button>
      </div>
    </div>
  );
};