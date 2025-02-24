import fs from 'fs/promises';
import path from 'path';

export async function createProjectStructure(projectPath) {
    const dirs = [
        'controllers',
        'models',
        'routes',
        'middleware',
        'config'
    ];

    for (const dir of dirs) {
        await fs.mkdir(path.join(projectPath, dir), { recursive: true });
    }

    // Create server.js
    const serverContent = `
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
`;
    await fs.writeFile(path.join(projectPath, 'server.js'), serverContent.trim());
}

export async function generatePackageJson(projectPath, projectName) {
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        type: 'module',
        main: 'server.js',
        scripts: {
            start: 'node server.js',
            dev: 'nodemon server.js'
        },
        dependencies: {
            express: '^4.18.2',
            cors: '^2.8.5',
            dotenv: '^16.3.1',
            mongoose: '^8.0.0',
            morgan: '^1.10.0'
        },
        devDependencies: {
            nodemon: '^3.0.1'
        }
    };

    await fs.writeFile(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );
}

export async function generateEnvFile(projectPath) {
    const envContent = `
PORT=3000
MONGODB_URI=mongodb://localhost:27017/${path.basename(projectPath)}
JWT_SECRET=your_jwt_secret_here
`;
    await fs.writeFile(path.join(projectPath, '.env'), envContent.trim());
}
