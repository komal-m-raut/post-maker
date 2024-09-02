"use client";

import React, { useState } from "react";
import { IField } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { Renderer } from "./renderer/Renderer";
import Field from "./Field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Template } from "./Template";

const Builder = () => {
  const [fields, setFields] = useState<IField[]>([
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
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "https://picsum.photos/400/300"
  );
  const [activeTab, setActiveTab] = useState<string>("tab-0");

  const assignTemplate = (templateFields: IField[], backgroundUrl: string) => {
    setFields(templateFields);
    setBackgroundImage(backgroundUrl);
  };

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
    setActiveTab(() => {
      if (fields.length > 1) {
        if (index === 0) {
          return `tab-0`;
        } else if (index < fields.length - 1) {
          return `tab-${index}`;
        } else {
          return `tab-${index - 1}`;
        }
      } else {
        return "";
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex gap-4 flex-col-reverse md:flex-row w-full p-6 md:px-12 justify-center">
        <div className="w-full md:min-w-96 md:max-w-[40vw]">
          <div className="p-4 h-auto shadow-md mb-4">
            <Template
              assignTemplate={assignTemplate}
              backgroundImage={backgroundImage}
            />
          </div>
          <div className="p-4 h-auto shadow-xl">
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
                      content: "",
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
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full mt-6"
            >
              <TabsList>
                {fields.map((_, index) => (
                  <div
                    key={`trigger-container-${index}`}
                    className="flex items-center"
                  >
                    <TabsTrigger
                      key={`trigger-${index}`}
                      value={`tab-${index}`}
                    >
                      Block {index + 1}
                    </TabsTrigger>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={cn("hover:bg-transparent")}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent switching to the tab when clicking the remove button
                        removeField(index);
                      }}
                      disabled={fields.length === 1}
                    >
                      <XIcon size={16} />
                    </Button>
                  </div>
                ))}
              </TabsList>
              {fields.map((field, index) => (
                <TabsContent key={`content-${index}`} value={`tab-${index}`}>
                  <Field
                    {...field}
                    updateField={(updatedField) =>
                      updateField(updatedField, index)
                    }
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        <Renderer fields={fields} backgroundImage={backgroundImage} />
      </div>
    </div>
  );
};

export default Builder;
