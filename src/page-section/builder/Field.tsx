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
import React from "react";

const getBlock = (
  type: IField["type"],
  updateField: (field: IField) => void
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
                style: {
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#000",
                },
              });
            }}
          />
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
                style: {
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "#000",
                },
              });
            }}
          />
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
                style: {
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "#000",
                },
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
                style: {
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "#000",
                },
              });
            }}
          />
        </div>
      );
    default:
      return "Unknown";
  }
};

const Field: React.FC<IField & { updateField: (field: IField) => void }> = ({
  type,
  content,
  style,
  updateField,
}) => {
  const [fieldType, setFieldType] = React.useState(type);
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
      {getBlock(fieldType, updateField)}
    </div>
  );
};

export default Field;