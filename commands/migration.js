import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const migrationsPath = path.resolve("database/migrations");

if (!fs.existsSync(migrationsPath)) {
    fs.mkdirSync(migrationsPath, { recursive: true });
}

export function createMigration(name) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const migrationFile = path.join(migrationsPath, `${timestamp}_${name}.js`);
    
    const content = `
export default {
    async up() {
        // Add migration logic here
    },

    async down() {
        // Add rollback logic here
    }
}`;

    fs.writeFileSync(migrationFile, content);
    console.log(chalk.green(`✔ Migration created: ${migrationFile}`));
}

export async function runMigrations(direction = 'up') {
    const files = fs.readdirSync(migrationsPath).sort();
    
    for (const file of files) {
        if (file.endsWith('.js')) {
            const { default: migration } = await import(`../database/migrations/${file}`);
            await migration[direction]();
            console.log(chalk.green(`✔ Migration ${direction}: ${file}`));
        }
    }
}
