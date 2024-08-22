"use client";
import React, { useState } from "react";
import { IField } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { Field } from "./Field";
import { Renderer } from "./renderer/rendrer";

const Builder = () => {
  const [fields, setFields] = useState<IField[]>([]);
  const updateField = (field: IField, index: number) => {
    setFields((prevFields) => {
      if (index === -1) {
        return [...prevFields, field];
      }
      prevFields[index] = field;
      return [...prevFields];
    });
  };

  return (
    <div className="flex justify-center items-center min-h-svh">
      <div className="bg-slate-50 p-4 mr-4 min-w-96 h-auto shadow-lg">
        <div className="flex justify-between items-center w-full">
          <h1>Builder blocks</h1>
          <Button
            variant="outline"
            onClick={() =>
              setFields((prev) => [
                ...prev,
                {
                  type: "description",
                  content: "Hello world",
                  style: {
                    fontSize: "16px",
                    fontWeight: "normal",
                    color: "#000",
                  },
                },
              ])
            }
          >
            Add block
          </Button>
        </div>
        {fields.map((field, index) => (
          <div key={index} className="mt-4">
            <Field
              {...field}
              updateField={(field) => updateField(field, index)}
            />
          </div>
        ))}
      </div>
      <Renderer fields={fields} />
    </div>
  );
};

export default Builder;
