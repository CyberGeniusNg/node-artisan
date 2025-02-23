import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export function generateEnv() {
    const envFile = path.resolve('.env');
    const envExample = `
PORT=5000
MONGO_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_jwt_secret
NODE_ENV=development
    `.trim();

    if (fs.existsSync(envFile)) {
        console.log(chalk.yellow('⚠ .env file already exists'));
        return;
    }

    fs.writeFileSync(envFile, envExample);
    console.log(chalk.green('✔ .env file generated'));
}
