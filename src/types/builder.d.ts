export interface IField {
  type: "title" | "description" | "code" | "username";
  content: string;
  style: {
    fontSize: React.CSSProperties["fontSize"];
    fontWeight: React.CSSProperties["fontWeight"];
    color: React.CSSProperties["color"];
    alignment?: "left" | "center" | "right";
  };
}

export interface IBuilderContext {
  fields: IField[];
  updateField: (field: IField, index: number) => void;
}
