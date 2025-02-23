import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const seedersPath = path.resolve("database/seeders");

if (!fs.existsSync(seedersPath)) {
    fs.mkdirSync(seedersPath, { recursive: true });
}

export function createSeeder(name) {
    const seederFile = path.join(seedersPath, `${name}Seeder.js`);
    const content = `
export default class ${name}Seeder {
    async run() {
        // Add your seeder logic here
        try {
            console.log('Running ${name}Seeder...');
        } catch (error) {
            console.error('Error running ${name}Seeder:', error);
        }
    }
}`;

    fs.writeFileSync(seederFile, content);
    console.log(chalk.green(`✔ Seeder created: ${seederFile}`));
}

export async function runSeeders() {
    const files = fs.readdirSync(seedersPath);
    
    for (const file of files) {
        if (file.endsWith('Seeder.js')) {
            const { default: Seeder } = await import(`../database/seeders/${file}`);
            const seeder = new Seeder();
            await seeder.run();
        }
    }
}
