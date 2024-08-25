"use client";
import React, { useState } from "react";
import { IField } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { Renderer } from "./renderer/Renderer";
import Field from "./Field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Builder = () => {
  const [fields, setFields] = useState<IField[]>([
    {
      type: "title",
      content: "Hello world",
      style: {
        fontSize: undefined,
        fontWeight: undefined,
        color: undefined,
        alignment: "center",
      },
    },
  ]);
  const [activeTab, setActiveTab] = useState<string>("tab-0");

  const updateField = (field: IField, index: number) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = field;
      return updatedFields;
    });
  };

  const removeField = (index: number) => {
    setFields((prevFields) => {
      const updatedFields = prevFields.filter((_, i) => i !== index);
      return updatedFields;
    });
    setActiveTab((prevActiveTab) => {
      if (prevActiveTab === `tab-${index}`) {
        if (index > 0) {
          return `tab-${index - 1}`;
        } else if (index < fields.length - 1) {
          return `tab-${index + 1}`;
        } else {
          return "";
        }
      }
      return prevActiveTab;
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-slate-50 p-4 mr-4 min-w-96 h-auto shadow-lg">
        <div className="flex justify-between items-center w-full">
          <h1>Builder blocks</h1>
          <Button
            variant="outline"
            onClick={() => {
              const newIndex = fields.length;
              setFields((prev) => [
                ...prev,
                {
                  type: "description",
                  content: "Hello world",
                  style: {
                    fontSize: undefined,
                    fontWeight: undefined,
                    color: undefined,
                    alignment: "center",
                  },
                },
              ]);
              setActiveTab(`tab-${newIndex}`); // Automatically set the new tab as active
            }}
          >
            Add block
          </Button>
        </div>

        {fields.length > 0 && (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-[400px]"
          >
            <TabsList>
              {fields.map((_, index) => (
                <TabsTrigger key={`trigger-${index}`} value={`tab-${index}`}>
                  Block {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {fields.map((field, index) => (
              <TabsContent key={`content-${index}`} value={`tab-${index}`}>
                <Field
                  {...field}
                  updateField={(updatedField) =>
                    updateField(updatedField, index)
                  }
                  removeField={() => removeField(index)}
                />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
      <Renderer fields={fields} />
      
    </div>
  );
};

export default Builder;