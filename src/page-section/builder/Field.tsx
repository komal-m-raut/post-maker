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
        <div>
          <h2>Title</h2>
          <Input
            type="text"
            className=""
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
          {/* Add style section here */}
        </div>
      );

    case "description":
      return (
        <div>
          <h2>Description</h2>
          <Textarea
            className=""
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
          {/* Add style section here */}
        </div>
      );
    case "code":
      return (
        <div>
          <h2>Title</h2>
          <Textarea
            className=""
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
        <div>
          <h2>Title</h2>
          <Input
            type="text"
            className=""
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
    <div>
      <Select onValueChange={(type: IField["type"]) => setFieldType(type)}>
        <SelectTrigger className="min-w-[180px]">
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
