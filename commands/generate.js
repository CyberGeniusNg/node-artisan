import fs from "fs";
import path from "path";
import chalk from "chalk";

const modelsPath = path.resolve("models");
const controllersPath = path.resolve("controllers");
const routesPath = path.resolve("routes");

if (!fs.existsSync(modelsPath)) fs.mkdirSync(modelsPath, { recursive: true });
if (!fs.existsSync(controllersPath))
  fs.mkdirSync(controllersPath, { recursive: true });
if (!fs.existsSync(routesPath)) fs.mkdirSync(routesPath, { recursive: true });

export function createModel(name, options) {
  const modelFile = path.join(modelsPath, `${name}.model.js`);
  const content = `import mongoose from 'mongoose';

const ${name}Schema = new mongoose.Schema({
  name: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('${name}', ${name}Schema);`;

  fs.writeFileSync(modelFile, content);
  console.log(chalk.green(`✔ Model created: ${modelFile}`));

  if (options.resource || options.rc) {
    createController(name, { resource: true });
    createRoute(name, { resource: true });
  }
}

export function createController(name, options) {
  const controllerFile = path.join(controllersPath, `${name}.controller.js`);
  const content = options.resource
    ? `export default {
  async index(req, res) {
    res.send('${name} index');
  },
  async show(req, res) {
    res.send('${name} show');
  },
  async store(req, res) {
    res.send('${name} store');
  },
  async update(req, res) {
    res.send('${name} update');
  },
  async destroy(req, res) {
    res.send('${name} destroy');
  }
};`
    : `export default {
  async handler(req, res) {
    res.send('${name} handler');
  }
};`;

  fs.writeFileSync(controllerFile, content);
  console.log(chalk.green(`✔ Controller created: ${controllerFile}`));
}

export function createRoute(name, options) {
  const routeFile = path.join(routesPath, `${name}.routes.js`);
  const content = options.resource
    ? `import express from 'express';
import ${name}Controller from '../controllers/${name}.controller.js';

const router = express.Router();
router.get('/', ${name}Controller.index);
router.get('/:id', ${name}Controller.show);
router.post('/', ${name}Controller.store);
router.put('/:id', ${name}Controller.update);
router.delete('/:id', ${name}Controller.destroy);

export default router;`
    : `import express from 'express';
import ${name}Controller from '../controllers/${name}.controller.js';

const router = express.Router();
router.get('/', ${name}Controller.handler);

export default router;`;

  fs.writeFileSync(routeFile, content);
  console.log(chalk.green(`✔ Route created: ${routeFile}`));
}
