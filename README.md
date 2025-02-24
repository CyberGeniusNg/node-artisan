# Node Artisan CLI

A powerful CLI tool for Node.js development that streamlines project creation and management. Inspired by Laravel Artisan, Node Artisan CLI helps you generate boilerplate code, create projects, and manage various components of your Node.js applications.

## Features

- 🚀 Quick project scaffolding
- 🎮 Generate controllers, models, and routes
- 🛠️ Built-in authentication setup
- 📦 Modern project structure
- ⚡ Express.js integration
- 🗄️ MongoDB/Mongoose support
- 🧪 Testing utilities
- 🔄 Database migrations and seeders
- ✨ Middleware generation
- 📝 Validation helpers
- ⚙️ Configuration management
- 📨 Job/Queue management

## Installation

```bash
npm install -g @cybergenius/node-artisan
```

## Available Commands

### Project Creation
```bash
# Create a new Node.js project
node-artisan new <project-name>

# Start development server
node-artisan serve
node-artisan serve --port 3000
```

### Models, Controllers & Routes
```bash
# Generate a model
node-artisan make:model User
node-artisan make:model User --resource    # With controller and routes
node-artisan make:model User --rc          # Shorthand for --resource

# Generate a controller
node-artisan make:controller UserController
node-artisan make:controller UserController --resource    # With CRUD methods

# Generate a route
node-artisan make:route users
node-artisan make:route users --resource    # With CRUD endpoints
```

### Database Operations
```bash
# Generate a migration
node-artisan make:migration create_users_table

# Generate a seeder
node-artisan make:seeder UserSeeder

# Run seeders
node-artisan db:seed
```

### Middleware & Validation
```bash
# Generate middleware
node-artisan make:middleware Auth
node-artisan make:middleware RateLimit

# Generate validator
node-artisan make:validator User
```

### Testing
```bash
# Generate tests
node-artisan make:test UserTest
node-artisan make:test UserTest --unit      # Unit test
node-artisan make:test UserTest --feature   # Feature test
```

### Configuration
```bash
# Generate config file
node-artisan make:config database
node-artisan make:config cache

# List all config files
node-artisan config:list
```

### Jobs & Queue
```bash
# Generate jobs
node-artisan make:job SendEmail
node-artisan make:job ProcessPayment --sync    # Synchronous job
node-artisan make:job ImportData --async       # Asynchronous job
```

### Environment
```bash
# Generate .env file
node-artisan env:generate
```

## Project Structure

```
my-project/
├── src/
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── config/         # Configuration files
│   ├── validators/     # Request validation
│   └── jobs/          # Background jobs
├── tests/
│   ├── unit/          # Unit tests
│   └── feature/       # Feature tests
├── database/
│   ├── migrations/    # Database migrations
│   └── seeders/      # Database seeders
├── .env              # Environment variables
└── server.js         # Application entry point
```

## License

ISC License

## Author

Emmanuel Kolawole

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or need help, please file an issue on the GitHub repository.

