declare module '*.json' {
  const res: string;
  export default res;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
