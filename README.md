# Node Artisan CLI

Node Artisan CLI is a command-line tool for rapidly generating common backend components in a Node.js application. It simplifies the creation of models, controllers, routes, seeders, tests, middleware, jobs, and more.

## Installation

Install globally using npm:

```sh
npm install -g @cybergenius/node-artisan
```

Or use it locally in a project:

```sh
npm install --save-dev @cybergenius/node-artisan
```

## Usage

Run the CLI using:

```sh
node-artisan <command>
```

### Available Commands

#### Model Generation
```sh
node-artisan make:model <name>
```
Options:
- `--rc` - Generate a route and controller
- `--resource` - Generate a model with a resource controller and route

#### Controller Generation
```sh
node-artisan make:controller <name>
```
Options:
- `--resource` - Generate a resource controller with CRUD methods

#### Route Generation
```sh
node-artisan make:route <name>
```
Options:
- `--resource` - Generate a route file with CRUD routes

#### Seeder Generation
```sh
node-artisan make:seeder <name>
```
Creates a new database seeder.

#### Run Seeders
```sh
node-artisan db:seed
```
Runs all database seeders.

#### Environment File Generation
```sh
node-artisan env:generate
```
Generates a new `.env` file.

#### Start Development Server
```sh
node-artisan serve -p <port>
```
Starts the development server (default port: 5000).

#### Test Generation
```sh
node-artisan make:test <name>
```
Options:
- `--unit` - Create a unit test
- `--feature` - Create a feature test

#### Middleware Generation
```sh
node-artisan make:middleware <name>
```
Creates a new middleware file.

#### Configuration Management
```sh
node-artisan make:config <name>
```
Creates a new configuration file.

```sh
node-artisan config:list
```
Lists all configuration files.

#### Job Generation
```sh
node-artisan make:job <name>
```
Options:
- `--sync` - Create a synchronous job
- `--async` - Create an asynchronous job

#### Validator Generation
```sh
node-artisan make:validator <name>
```
Creates a new validator file.

## License
This project is licensed under the MIT License.

## Contributing
Pull requests are welcome! Feel free to improve or add new features.

## Author
Developed by [Cyber Genius Ltd](https://www.cybergenius.com.ng).

