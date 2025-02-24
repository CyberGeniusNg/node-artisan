import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { createProjectStructure, generatePackageJson, generateEnvFile } from '../utils/template.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function createNewProject(projectName) {
    try {
        console.log(chalk.blue(`Creating new project: ${projectName}`));
        
        // Create project directory
        const projectPath = path.join(process.cwd(), projectName);
        await fs.mkdir(projectPath, { recursive: true });

        // Create project structure
        await createProjectStructure(projectPath);
        
        // Generate package.json
        await generatePackageJson(projectPath, projectName);
        
        // Generate .env file
        await generateEnvFile(projectPath);

        console.log(chalk.green(`
✨ Project ${projectName} created successfully!
        
To get started:
    cd ${projectName}
    npm install
    npm start
`));
    } catch (error) {
        console.error(chalk.red('Error creating project:'), error);
        process.exit(1);
    }
}
