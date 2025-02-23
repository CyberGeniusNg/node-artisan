import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const middlewarePath = path.resolve("middleware");

if (!fs.existsSync(middlewarePath)) {
    fs.mkdirSync(middlewarePath, { recursive: true });
}

export function createMiddleware(name) {
    const middlewareFile = path.join(middlewarePath, `${name}.js`);
    const content = `
export const ${name} = async (req, res, next) => {
    try {
        // Add your middleware logic here
        next();
    } catch (error) {
        next(error);
    }
};`;

    fs.writeFileSync(middlewareFile, content);
    console.log(chalk.green(`✔ Middleware created: ${middlewareFile}`));
}
