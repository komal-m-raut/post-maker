import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IField } from "@/types/builder";
import { contentBlocks } from "@/util/constants";
import React, { useState } from "react";
import {
  AlignmentButtons,
  ColorPicker,
  FontSizeSlider,
  FontWeightSlider,
} from "./StyleControllers";

type StyleType = "fontSize" | "fontWeight" | "color" | "alignment";

const getStyleBlock = (
  styleOptions: {
    styleType: "fontSize" | "fontWeight" | "color" | "alignment";
    updateStyle: (value: string | number) => void;
  }[]
) => {
  return (
    <div className="my-4 flex flex-col gap-y-4">
      {styleOptions.map((styleOption) => {
        switch (styleOption.styleType) {
          case "fontSize":
            return <FontSizeSlider updateStyle={styleOption.updateStyle} />;
          case "fontWeight":
            return <FontWeightSlider updateStyle={styleOption.updateStyle} />;
          case "color":
            return <ColorPicker updateStyle={styleOption.updateStyle} />;
          case "alignment":
            return <AlignmentButtons updateStyle={styleOption.updateStyle} />;

          default:
            return null;
        }
      })}
    </div>
  );
};

const getBlock = (
  type: IField["type"],
  updateField: (field: IField) => void,
  updateStyleState: (styleType: StyleType, value: string | number) => void,
  customStyles: IField["style"]
) => {
  switch (type) {
    case "title":
      return (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Enter title"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => {
              updateField({
                type: "title",
                content: e.target.value,
                style: customStyles,
              });
            }}
          />
          {getStyleBlock([
            {
              styleType: "fontSize",
              updateStyle: (value) =>
                updateStyleState("fontSize", value as number),
            },
            {
              styleType: "fontWeight",
              updateStyle: (value) =>
                updateStyleState("fontWeight", value as number),
            },
            {
              styleType: "color",
              updateStyle: (value) =>
                updateStyleState("color", value as string),
            },
            {
              styleType: "alignment",
              updateStyle: (value) =>
                updateStyleState("alignment", value as StyleType),
            },
          ])}
        </div>
      );

    case "description":
      return (
        <div className="mb-4">
          <Textarea
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => {
              updateField({
                type: "description",
                content: e.target.value,
                style: customStyles,
              });
            }}
          />
          {getStyleBlock([
            {
              styleType: "fontSize",
              updateStyle: (value) =>
                updateStyleState("fontSize", value as number),
            },
            {
              styleType: "fontWeight",
              updateStyle: (value) =>
                updateStyleState("fontWeight", value as number),
            },
            {
              styleType: "color",
              updateStyle: (value) =>
                updateStyleState("color", value as string),
            },
            {
              styleType: "alignment",
              updateStyle: (value) =>
                updateStyleState("alignment", value as StyleType),
            },
          ])}
        </div>
      );
    case "code":
      return (
        <div className="mb-4">
          <Textarea
            placeholder="Enter code"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => {
              updateField({
                type: "code",
                content: e.target.value,
                style: customStyles,
              });
            }}
          />
        </div>
      );
    case "username":
      return (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Enter username"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => {
              updateField({
                type: "username",
                content: e.target.value,
                style: customStyles,
              });
            }}
          />
          {getStyleBlock([
            {
              styleType: "fontSize",
              updateStyle: (value) =>
                updateStyleState("fontSize", value as number),
            },
            {
              styleType: "fontWeight",
              updateStyle: (value) =>
                updateStyleState("fontWeight", value as number),
            },
            {
              styleType: "color",
              updateStyle: (value) =>
                updateStyleState("color", value as string),
            },
            {
              styleType: "alignment",
              updateStyle: (value) =>
                updateStyleState("alignment", value as StyleType),
            },
          ])}
        </div>
      );
    default:
      return "Unknown";
  }
};

const Field: React.FC<IField & { updateField: (field: IField) => void }> = ({
  style,
  content,
  type,
  updateField,
}) => {
  const [fieldType, setFieldType] = useState(type);
  const updateStyleState = (styleType: StyleType, value: string | number) => {
    updateField({
      type: fieldType,
      content,
      style: { ...style, [styleType]: value },
    });
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <Select onValueChange={(type: IField["type"]) => setFieldType(type)}>
        <SelectTrigger className="min-w-[180px] mb-4">
          <SelectValue placeholder="Select block" />
        </SelectTrigger>
        <SelectContent>
          {contentBlocks.map((block) => (
            <SelectItem key={block.value} value={block.value}>
              {block.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {getBlock(fieldType, updateField, updateStyleState, style)}
    </div>
  );
};

export default Field;
