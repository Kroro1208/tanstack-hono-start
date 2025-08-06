import path from "path";
import fs from "fs-extra";

export interface Template {
  name: string;
  description: string;
  features: string[];
  version: string;
}

export function getTemplates(): Template[] {
  return [
    {
      name: "basic",
      description: "Basic fullstack template with TanStack Router and Hono",
      features: ["router", "api", "typescript"],
      version: "0.1.0",
    },
    {
      name: "advanced",
      description: "Advanced template with auth, database, and testing",
      features: ["router", "api", "typescript", "auth", "database", "testing"],
      version: "0.1.0",
    },
  ];
}

export function getTemplateData(templateName: string): Template {
  const templates = getTemplates();
  const template = templates.find(t => t.name === templateName);
  
  if (!template) {
    throw new Error(`Template ${templateName} not found`);
  }
  
  return template;
}

export async function validateTemplate(templateName: string): Promise<boolean> {
  const templatePath = path.join(__dirname, "../../templates", templateName);
  return fs.pathExists(templatePath);
}