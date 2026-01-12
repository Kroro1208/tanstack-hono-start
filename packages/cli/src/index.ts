#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import Handlebars from "handlebars";
import { createProject } from "./lib/create-project.js";
import { getTemplates } from "./lib/templates.js";

const program = new Command();

program
  .name("create-tanstack-hono-start")
  .description(
    "🚀 A modern fullstack CLI tool to quickly bootstrap applications with TanStack Router and Hono"
  )
  .version("1.2.2");

program
  .argument("[project-name]", "project name")
  .option("-t, --template <template>", "template to use", "basic")
  .option("-y, --yes", "skip prompts and use defaults")
  .action(async (projectName, options) => {
    try {
      console.log("🎉 Welcome to Modern Fullstack CLI!");
      console.log("📦 Let's create something amazing together\n");
      
      await createProject(projectName, options);
      
      console.log("\n✅ Project created successfully!");
      console.log("\n🚀 Next Steps:");
      console.log(`   cd ${projectName}`);
      console.log("   npm run dev");
      console.log("\n📱 Your app will be running at:");
      console.log("   🌐 Frontend: http://localhost:3000");
      console.log("   🔗 API: http://localhost:8000");
      console.log("   📚 API Docs: http://localhost:8000/ui");
      console.log("\n💡 Happy coding!");
    } catch (error) {
      console.error("❌ Error creating project:", error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command("list")
  .description("List available templates")
  .action(() => {
    const templates = getTemplates();
    console.log("📋 Available templates:\n");
    templates.forEach((template) => {
      console.log(`  ${template.name} - ${template.description}`);
    });
  });

program.parse();
