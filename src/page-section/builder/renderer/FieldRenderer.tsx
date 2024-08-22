import { IField } from "@/types/builder";
import React, { ReactNode } from "react";

const RenderField: React.FC<{ field: IField; type: IField["type"] }> = ({
  field,
  type,
}) => {
  switch (type) {
    case "description":
      return (
        <div
          style={{
            fontSize: field.style.fontSize,
            fontWeight: field.style.fontWeight,
            color: field.style.color,
          }}
        >
          {field.content}
        </div>
      );
    case "title":
      return (
        <h1
          style={{
            fontSize: field.style.fontSize,
            fontWeight: field.style.fontWeight,
            color: field.style.color,
          }}
        >
          {field.content}
        </h1>
      );
    case "username":
      return (
        <div
          style={{
            fontSize: field.style.fontSize,
            fontWeight: field.style.fontWeight,
            color: field.style.color,
          }}
        >
          {field.content}
        </div>
      );
    case "code":
      return (
        <code
          style={{
            fontSize: field.style.fontSize,
            fontWeight: field.style.fontWeight,
            color: field.style.color,
          }}
        >
          {field.content}
        </code>
      );
    default:
      return null;
  }
};

export const FieldRenderer: React.FC<{ field: IField }> = ({ field }) => {
  return RenderField({ field, type: field.type });
};
