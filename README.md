# Node Artisan CLI

A powerful CLI tool for Node.js development that streamlines project creation and management. Inspired by Laravel Artisan, Node Artisan CLI helps you generate boilerplate code, create projects, and manage various components of your Node.js applications.

## Features

- 🚀 Quick project scaffolding
- 🎮 Generate controllers, models, and routes
- 🛠️ Built-in authentication setup
- 📦 Modern project structure
- ⚡ Express.js integration
- 🗄️ MongoDB/Mongoose support

## Installation

```bash
npm install -g @cybergenius/node-artisan
```

## Usage

Create a new project:
```bash
node-artisan new my-project
```

Generate a controller:
```bash
node-artisan make:controller UserController
```

Generate a model:
```bash
node-artisan make:model User
```

Generate authentication scaffolding:
```bash
node-artisan make:auth
```

## Project Structure

```
my-project/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
├── .env
└── server.js
```

## License

ISC License

## Author

Emmanuel Kolawole

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

