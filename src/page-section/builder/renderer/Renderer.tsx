"use client";

import { IField } from "@/types/builder";
import React, { useId, useRef, useState } from "react";
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Camera,
  Instagram,
  InstagramIcon,
  Linkedin,
  LinkedinIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Renderer: React.FC<{ fields: IField[] }> = ({ fields }) => {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState("instagram"); // Default to Instagram

  const downloadPNG = () => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { pixelRatio: 20 }) // Increase pixel ratio for higher quality
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "post.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error("Failed to convert to PNG", err);
      });
  };

  return (
    <div className="p-4 w-1/3 h-auto shadow-xl">
      <div className="text-center mb-4">Aspect Ratio</div>
      <div className="flex justify-center gap-4 mb-4">
        <Button onClick={() => setAspectRatio("linkedin")} size={"icon"} className={cn("bg-blue-500")}>
          <Linkedin />
        </Button>
        <Button onClick={() => setAspectRatio("instagram")} size={"icon"} className={cn("bg-orange-700")}>
          <Instagram size={24} />
        </Button>
      </div>
      <div ref={ref} className="flex flex-col items-center p-6 bg-green-50">
        <AspectRatio ratio={aspectRatio === "linkedin" ? 1.91 / 1 : 4 / 3}>
          {fields.map((field) => (
            <FieldRenderer
              key={`${id}-${Math.random().toString(36)}`}
              field={field}
            />
          ))}
        </AspectRatio>
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={downloadPNG}>Download</Button>
      </div>
    </div>
  );
};
