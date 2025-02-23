import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const jobsPath = path.resolve("jobs");

if (!fs.existsSync(jobsPath)) {
    fs.mkdirSync(jobsPath, { recursive: true });
}

export function createJob(name, options) {
    const jobFile = path.join(jobsPath, `${name}.js`);
    const isAsync = options.async || (!options.sync && !options.async);
    
    const content = `
export default class ${name}Job {
    constructor(data) {
        this.data = data;
    }

    ${isAsync ? 'async ' : ''}handle() {
        // Add your job processing logic here
        console.log('Processing ${name}Job');
    }
}`;

    fs.writeFileSync(jobFile, content);
    console.log(chalk.green(`✔ Job created: ${jobFile}`));
}
