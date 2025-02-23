#!/usr/bin/env node

import { program } from "commander";
import {
  createModel,
  createController,
  createRoute,
} from "../commands/generate.js";
import { createSeeder, runSeeders } from "../commands/seeder.js";
import { generateEnv } from "../commands/env.js";
import { createTest } from "../commands/test.js";
import { createMiddleware } from "../commands/middleware.js";
import { createConfig, listConfigs } from "../commands/config.js";
import { createJob } from "../commands/job.js";
import { createValidator } from "../commands/validator.js";

program.version("1.0.0").description("Node Artisan CLI");

// Command: Create Model
program
  .command("make:model <name>")
  .option("--rc", "Generate route and controller")
  .option("--resource", "Generate resource model with a controller and route")
  .description("Create a new Mongoose model")
  .action((name, options) => {
    createModel(name, options);
  });

//   Command: Create Controller
program
  .command("make:controller <name>")
  .option("--resource", "Generate a resource controller with CRUD methods")
  .description("Create a new controller")
  .action((name, options) => {
    createController(name, options);
  });

//   Command: Create Route
program
  .command("make:route <name>")
  .option(
    "--resource",
    "Generate a resource route file with standard CRUD routes"
  )
  .description("Create a new route")
  .action((name, options) => {
    createRoute(name, options);
  });

// Seeder Commands
program
  .command("make:seeder <name>")
  .description("Create a new database seeder")
  .action((name) => {
    createSeeder(name);
  });

program
  .command("db:seed")
  .description("Run all database seeders")
  .action(() => {
    runSeeders();
  });

// Environment Commands
program
  .command("env:generate")
  .description("Generate a new .env file")
  .action(() => {
    generateEnv();
  });

// Server Commands
program
  .command("serve")
  .description("Start the development server")
  .option("-p, --port <port>", "Port to run the server on", "5000")
  .action((options) => {
    process.env.PORT = options.port;
    import("../server.js");
  });

// Test Generation Commands
program
  .command("make:test <name>")
  .option("--unit", "Create a unit test")
  .option("--feature", "Create a feature test")
  .description("Create a new test file")
  .action((name, options) => {
    createTest(name, options);
  });

// Middleware Generation
program
  .command("make:middleware <name>")
  .description("Create a new middleware")
  .action((name) => {
    createMiddleware(name);
  });

// Configuration Management
program
  .command("make:config <name>")
  .description("Create a new configuration file")
  .action((name) => {
    createConfig(name);
  });

program
  .command("config:list")
  .description("List all configuration files")
  .action(() => {
    listConfigs();
  });

// Queue/Job Generation
program
  .command("make:job <name>")
  .option("--sync", "Create a synchronous job")
  .option("--async", "Create an asynchronous job")
  .description("Create a new job")
  .action((name, options) => {
    createJob(name, options);
  });

// Validation Generation
program
  .command("make:validator <name>")
  .description("Create a new validator")
  .action((name) => {
    createValidator(name);
  });

program.parse(process.argv);
