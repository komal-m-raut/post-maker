"use client";

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
import React, { useRef } from "react";
import {
  AlignmentButtons,
  ColorPicker,
  FontSizeSlider,
  FontWeightSlider,
} from "./StyleControllers";
import { Editor } from "@monaco-editor/react";

type StyleType = "fontSize" | "fontWeight" | "color" | "alignment";

const getStyleBlock = (
  styleOptions: {
    styleType: "fontSize" | "fontWeight" | "color" | "alignment";
    updateStyle: (value: string | number) => void;
  }[]
) => {
  return (
    <div className="my-4 flex flex-col gap-y-4">
      <span className="font-bold">Customize your content here</span>
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
  customStyles: IField["style"],
  content: string
) => {
  switch (type) {
    case "title":
      return (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Enter title"
            className="w-full p-2 border border-gray-300 rounded"
            value={content}
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
              styleType: "color",
              updateStyle: (value) =>
                updateStyleState("color", value as string),
            },
            {
              styleType: "alignment",
              updateStyle: (value) =>
                updateStyleState("alignment", value as StyleType),
            },
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
          ])}
        </div>
      );

    case "description":
      return (
        <div className="mb-4">
          <Textarea
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded"
            value={content}
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
              styleType: "color",
              updateStyle: (value) =>
                updateStyleState("color", value as string),
            },
            {
              styleType: "alignment",
              updateStyle: (value) =>
                updateStyleState("alignment", value as StyleType),
            },
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
          ])}
        </div>
      );

    case "code":
      return (
        <div className="flex items-center gap-4 mb-4 p-2 font-semibold text-xl text-green-900">
          <Editor
            height="300px"
            defaultValue="<h1>Hello, World!</h1>"
            language="javascript"
            theme="vs-dark"
            value={content}
            onChange={(value) => {
              updateField({
                type: "code",
                content: value || "",
                style: customStyles,
              });
            }}
            options={{
              inlineSuggest: { enabled: true },
              fontSize: 14,
              formatOnType: true,
              autoClosingBrackets: "always",
              minimap: { enabled: false },
              lineNumbersMinChars: 1,
              tabSize: 2,
              cursorBlinking: "blink",
              matchBrackets: "always",
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
            value={content}
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
              styleType: "color",
              updateStyle: (value) =>
                updateStyleState("color", value as string),
            },
            {
              styleType: "alignment",
              updateStyle: (value) =>
                updateStyleState("alignment", value as StyleType),
            },
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
  const updateStyleState = (styleType: StyleType, value: string | number) => {
    updateField({
      type,
      content,
      style: { ...style, [styleType]: value },
    });
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <div className="flex gap-4">
        <Select
          value={type}
          onValueChange={(selectedType: IField["type"]) =>
            updateField({
              type: selectedType,
              content,
              style,
            })
          }
        >
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
      </div>
      {getBlock(type, updateField, updateStyleState, style, content)}
    </div>
  );
};

export default Field;
