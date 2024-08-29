import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IField } from "@/types/builder";
import React from "react";
import { ColorPicker } from "./StyleControllers";
import { Input } from "@/components/ui/input";

const templatePresets: Record<
  string,
  {
    label: string;
    fields: IField[];
  }
> = {
  default: {
    label: "Default",
    fields: [
      {
        type: "title",
        content: "Variable declaration in javascript",
        style: {
          fontSize: 28,
          fontWeight: 600,
          color: "#111111",
          alignment: "left",
        },
      },
      {
        type: "code",
        content: `const name = "John Doe";`,
        style: {
          fontSize: 18,
          fontWeight: 400,
          color: "#333333",
          alignment: "left",
        },
      },
    ],
  },
  preset1: {
    label: "Preset 1",
    fields: [
      {
        type: "code",
        content: `print("Hello, World!")`,
        style: {
          fontSize: 18,
          fontWeight: 400,
          color: "#333333",
          alignment: "left",
        },
      },
    ],
  },
};

export const Template: React.FC<{
  assignTemplate: (templateFields: IField[], backgroundUrl: string) => void;
  backgroundImage: string;
}> = ({ assignTemplate, backgroundImage }) => {
  const [selectedTemplate, setSelectedTemplate] =
    React.useState<string>("default");
  return (
    <div className="flex flex-col">
      <Select
        value={selectedTemplate}
        onValueChange={(template: string) => {
          setSelectedTemplate(template);
          assignTemplate(templatePresets[template].fields, backgroundImage);
        }}
      >
        <SelectTrigger className="min-w-[180px] mb-4">
          <SelectValue placeholder="Select block" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(templatePresets).map((template) => (
            <SelectItem key={template} value={template}>
              {templatePresets[template].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="url"
        value={backgroundImage}
        onChange={(e) => {
          assignTemplate(
            templatePresets[selectedTemplate].fields,
            e.target.value
          );
        }}
      />
    </div>
  );
};
