import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const validatorsPath = path.resolve("validators");

if (!fs.existsSync(validatorsPath)) {
    fs.mkdirSync(validatorsPath, { recursive: true });
}

export function createValidator(name) {
    const validatorFile = path.join(validatorsPath, `${name}.js`);
    const content = `
import { body, param, query } from 'express-validator';

export const ${name}Validator = {
    create: [
        // Add your validation rules here
        body('field').not().isEmpty().trim().escape()
    ],
    
    update: [
        param('id').isMongoId(),
        // Add your validation rules here
    ]
};`;

    fs.writeFileSync(validatorFile, content);
    console.log(chalk.green(`✔ Validator created: ${validatorFile}`));
}
