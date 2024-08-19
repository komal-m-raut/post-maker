import { IBuilderContext, IField } from "@/types/builder";
import { createContext, ReactNode, useContext, useState } from "react";

const BuilderContext = createContext<IBuilderContext | null>(null);

export const BuilderProvider = ({ children }: { children: ReactNode }) => {
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
    <BuilderContext.Provider value={{ fields, updateField }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};
