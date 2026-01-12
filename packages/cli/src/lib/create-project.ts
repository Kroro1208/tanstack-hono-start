import fs from "fs-extra";
import path from "path";
import Handlebars from "handlebars";
import { loadInquirer } from "./inquirer.js";
import { getTemplateData, getTemplates, getTemplatePath } from "./templates.js";

export interface ProjectOptions {
  template?: string;
  yes?: boolean;
  features?: string[];
}

export async function createProject(projectName?: string, options: ProjectOptions = {}) {
  let finalProjectName = projectName;
  let selectedTemplate = options.template || "basic";

  if (!options.yes) {
    const inquirer = await loadInquirer();
    if (!finalProjectName) {
      const namePrompt = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "What's your project name?",
          default: "my-awesome-app",
          validate: (input: string) => {
            if (!input.trim()) return "Project name is required";
            if (!/^[a-z0-9-_]+$/i.test(input)) {
              return "Project name can only contain letters, numbers, hyphens, and underscores";
            }
            return true;
          },
        },
      ]);
      finalProjectName = namePrompt.projectName;
    }

    const templates = getTemplates();
    const templatePrompt = await inquirer.prompt([
      {
        type: "select",
        name: "template",
        message: "Which template would you like to use?",
        choices: templates.map((t) => ({
          name: `${t.name} - ${t.description}`,
          value: t.name,
        })),
        default: selectedTemplate,
      },
    ]);
    selectedTemplate = templatePrompt.template;

    // Skip feature selection for advanced template (all features included by default)
    if (selectedTemplate === 'advanced') {
      options = { 
        ...options, 
        features: ["vitest", "tailwind", "auth", "database", "linting", "github-actions", "docker"] 
      };
    } else {
      const featuresPrompt = await inquirer.prompt([
        {
          type: "checkbox",
          name: "features",
          message: "Select additional features:",
          choices: [
            { name: "🧪 Vitest Testing", value: "vitest" },
            { name: "🎨 Tailwind CSS", value: "tailwind" },
            { name: "🔒 Authentication (Auth.js)", value: "auth" },
            { name: "🗃️ Database (Drizzle ORM)", value: "database" },
            { name: "🔧 ESLint + Prettier", value: "linting" },
            { name: "🚀 GitHub Actions CI/CD", value: "github-actions" },
            { name: "🐳 Docker", value: "docker" },
          ],
          default: ["linting", "vitest"],
        },
      ]);
      options = { ...options, features: featuresPrompt.features };
    }
  }

  const projectPath = path.resolve(process.cwd(), finalProjectName!);

  if (await fs.pathExists(projectPath)) {
    throw new Error(`Directory ${finalProjectName} already exists`);
  }

  console.log(`\n🏗️  Creating project in ${projectPath}...`);

  await fs.ensureDir(projectPath);
  
  const templateData = getTemplateData(selectedTemplate);
  
  // Convert features array to object for Handlebars templates
  const featuresObj = (options.features || []).reduce((acc, feature) => {
    acc[feature] = true;
    return acc;
  }, {} as Record<string, boolean>);
  
  await scaffoldTemplate(projectPath, templateData, {
    projectName: finalProjectName!,
    features: featuresObj,
    author: "Your Name",
  });

  if (process.env.SKIP_INSTALL === "1") {
    return;
  }

  console.log(`\n📦 Installing dependencies...`);
  
  const { spawn } = await import("child_process");
  await new Promise((resolve, reject) => {
    const install = spawn("npm", ["install"], {
      cwd: projectPath,
      stdio: process.stdin.isTTY ? "inherit" : ["ignore", "ignore", "pipe"],
    });

    let stderr = '';

    if (!process.stdin.isTTY) {
      install.stderr?.on('data', (data) => {
        stderr += data.toString();
      });
    }

    install.on("close", (code) => {
      if (code === 0) resolve(undefined);
      else {
        const errorMsg = stderr || `npm install failed with code ${code}`;
        reject(new Error(errorMsg));
      }
    });
  });
}

async function scaffoldTemplate(
  projectPath: string,
  templateData: any,
  variables: Record<string, any>
) {
  const templatePath = getTemplatePath(templateData.name);
  
  await copyAndProcessTemplate(templatePath, projectPath, variables);
}

async function copyAndProcessTemplate(
  templatePath: string,
  outputPath: string,
  variables: Record<string, any>
) {
  const files = await fs.readdir(templatePath);
  
  for (const file of files) {
    const sourcePath = path.join(templatePath, file);
    const targetPath = path.join(outputPath, file);
    
    const stat = await fs.stat(sourcePath);
    
    if (stat.isDirectory()) {
      await fs.ensureDir(targetPath);
      await copyAndProcessTemplate(sourcePath, targetPath, variables);
    } else {
      if (file.endsWith('.hbs')) {
        const content = await fs.readFile(sourcePath, 'utf-8');
        const template = Handlebars.compile(content);
        const processed = template(variables);
        
        // Skip empty files (when features are not selected)
        if (processed.trim()) {
          const outputFileName = file.replace('.hbs', '');
          await fs.writeFile(path.join(outputPath, outputFileName), processed);
        }
      } else {
        await fs.copy(sourcePath, targetPath);
      }
    }
  }
}
