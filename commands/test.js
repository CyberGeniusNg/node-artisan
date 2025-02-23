import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const testsPath = path.resolve("tests");

if (!fs.existsSync(testsPath)) {
    fs.mkdirSync(testsPath, { recursive: true });
}

export function createTest(name, options) {
    const isUnit = options.unit || (!options.unit && !options.feature);
    const testDir = path.join(testsPath, isUnit ? 'unit' : 'feature');
    
    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
    }

    const testFile = path.join(testDir, `${name}.test.js`);
    const content = `
import { describe, it, expect } from '@jest/globals';

describe('${name}', () => {
    it('should pass', async () => {
        // Add your test logic here
        expect(true).toBe(true);
    });
});`;

    fs.writeFileSync(testFile, content);
    console.log(chalk.green(`✔ Test created: ${testFile}`));
}
