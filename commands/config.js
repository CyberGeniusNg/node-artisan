import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const configPath = path.resolve("config");

if (!fs.existsSync(configPath)) {
    fs.mkdirSync(configPath, { recursive: true });
}

export function createConfig(name) {
    const configFile = path.join(configPath, `${name}.js`);
    const content = `
export default {
    // Add your configuration here
};`;

    fs.writeFileSync(configFile, content);
    console.log(chalk.green(`✔ Config created: ${configFile}`));
}

export function listConfigs() {
    const files = fs.readdirSync(configPath);
    console.log(chalk.blue('Available configurations:'));
    files.forEach(file => {
        console.log(chalk.green(`- ${file}`));
    });
}
