# **BTVerse Server**

## **Overview**

The BTVerse server is designed to handle various modules such as user management, project management, events management, and more. It provides APIs for handling users, projects, events, and member-related functionality, offering both CRUD operations and special actions like project collaboration, event registration, and speaker assignment.

---

## **Table of Contents**

- [Overview](#overview)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Modules](#modules)
- [API Documentation Access](#api-documentation-access)
- [API Documentation Guide](#api-documentation-guide)
- [Contribution Guidelines](#contribution-guidelines)

---

## **Installation**

## **Prerequisites**

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **MongoDB** (v4.x or later)

## **Steps to Install**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/btverse-server.git
   ```
2. Navigate to the project directory:
   ```bash
   cd btverse-server
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

---

# **Environment Setup**

Before running the server, you need to configure environment variables. Create a `.env` file in the root directory of your project and provide the following variable

  ```bash
  JWT_SECRET=your_super_secret_key
  ALLOWED_ORIGINS=http://localhost:3000,http://example.com
  FRONTEND_URL=https://www.tenantsphere.com
  PORT=5000
  MONGO_DB_URI=mongodb+srv://devteambiotech:test@test.3dntn.mongodb.net/?retryWrites=true&w=majority&appName=test
  EMAIL_USERNAME=nkengportfolio@gmail.com
  EMAIL_PASSWORD=lfxtryqkxpayjrjz
  EMAIL_FROM=nkengbderick@gmail.com
  ```

---

## **Running the Application**

To run the application locally:

1. **Run the NestJS server**:
```bash
  npm run start:dev
```

2. The server should now be running on `http://localhost:3000`.

To build and run the application in production:

  ```bash
  npm run build
  npm run start:prod
  ```

---

## **Folder Structure**

Here is an overview of the folder structure for the BTVerse server:

  ```bash
  /src
  ├── app.module.ts            # Root module
  ├── main.ts                  # Application entry point
  ├── common/                  # Common utilities like middleware, pipes, config
  ├── modules/                 # Contains the different feature modules
  │   ├── user-management/     # Module for managing users and authentication
  │   ├── projects/            # Module for managing projects
  │   ├── events/              # Module for managing events
  │   └── other-modules/       # Placeholder for additional modules
  └── test/                    # Unit and e2e tests
  ```
---

## **Modules**

### 1. **User Management Module**
Handles user authentication, registration, password management, and profile updates.

- **Features**:
  - User Registration and Authentication
  - Login/Logout
  - Password Reset and Change
  - User Profile Management
  - Role-Based Access Control (Admin, Member, Customer)

### 2. **Projects Module**
Manages project creation, updating, deleting, and member assignment.

- **Features**:
  - Create, Update, and Delete Projects
  - Assign Members to Projects
  - View Project Details and List of Projects
  - Manage Project Categories and Status (Ongoing, Completed)

### 3. **Events Module**
Manages event creation, updating, and handling attendees and speakers.

- **Features**:
  - Create, Update, and Delete Events
  - Register Attendees for Events
  - Assign Speakers to Events
  - Support for Online, Physical, and Hybrid Events
  - Event Management including Start/End Times, Location, and Status

### 4. **Services Module**
Handles management of services including creation, updating, and verification.

- **Features**:
  - Create, Update, and Delete Services
  - Verify Services
  - Manage Bookings and Service Status
  - View Service Details and List of Available Services

### 5. About Module
Manages content and information related to the `"About"` section of the application.

- **Features**:
  - Create and Update About Section
  - Manage Information Displayed on the About Page

### 6. **More Modules**
This server is designed to be easily extendable with new modules. Each module follows a clean structure based on **NestJS** conventions.

- **Features**:
  - Modular design for scalability
  - Easy integration of new features or functionalities
  - Separation of concerns for better maintainability

---

**Each Module Contains:**

- **Controllers**: Handles incoming HTTP requests and routing. It is responsible for receiving requests from the client, passing them to the appropriate service, and returning the response.

- **Services**: Encapsulates the business logic for each module. Services handle tasks such as database interactions, complex operations, and data processing. They are the main component for executing the business functionality.

- **Repositories**: Manages communication with the database. Repositories are responsible for interacting with the database models (schemas) to perform CRUD operations and other data manipulations.

- **Schemas**: Defines the data models for MongoDB using Mongoose. Schemas specify the structure of the documents stored in MongoDB and include validation rules for each field.

- **DTOs (Data Transfer Objects)**: Enforces validation rules and shapes incoming requests. DTOs are used to define the structure of data that is transferred between the client and server, ensuring that only valid and properly formatted data is accepted.

---

## **API Documentation Access**

The API documentation is automatically generated using **Swagger**. Once the server is running, you can access the **Swagger UI** for detailed information about all available API endpoints, including their request and response structure.

### **Accessing Swagger Documentation**

After starting the server, open the following URL in your browser to access the Swagger API documentation:

  ```bash
  http://localhost:3000/api-docs
  ```
### **Swagger Provides:**

- **Detailed information about each endpoint**: Swagger automatically generates detailed documentation for all available API endpoints, including the URL, HTTP method (GET, POST, PUT, DELETE), and descriptions.

- **Request body, query parameters, and path parameters for each API**: Swagger documents the structure of the request body, query parameters, and path parameters, making it easy to understand what data is required to make a request.

- **Response types, including success and error responses**: Swagger shows the possible response types for each API, including success and error responses, along with the expected data structure for each response.

- **Easy-to-use interface for testing API requests**: Swagger UI allows you to interact with the API directly from the browser. You can input parameters, send requests, and view the responses without needing an external tool like Postman.

---

## **Contribution Guidelines**

We welcome contributions to the **BTVerse Server**! Please follow the guidelines below for a smooth development process.

### **Branch Naming Conventions**

Use the following conventions for naming your branches:
- **feature/your-feature-name**: For new features.
- **bugfix/description-of-fix**: For fixing bugs.
- **chore/task-name**: For other tasks like documentation updates or refactoring.

### **Code Style**

- Follow the **Airbnb JavaScript Style Guide**.
- Use **Prettier** to automatically format your code.
- Ensure all functions and methods are properly commented and documented.

### **Commit Messages**
Use clear and concise commit messages with the following structure:
- **feat**: Description of the new feature.
- **fix**: Description of the bug fix.
- **docs**: Documentation updates.
- **style**: Code style changes (formatting, etc.).
- **refactor**: Code refactoring without changing functionality.
- **test**: Adding or updating tests.
- **chore**: Other updates like build scripts or dependency changes.

#### **Example commit message**:
```bash
feat: add event registration API
```

---

### **Testing**

Ensure that all new features and bug fixes are accompanied by appropriate unit tests and end-to-end tests.

#### **Run Unit Tests**:
To run unit tests, use the following command:
```bash
npm run test
```

### **Run End-to-End (E2E) Tests**:
To run end-to-end tests, use the following command:

```bash
npm run test:e2e
```

### **Code Coverage**:
Make sure to maintain or improve code coverage with the following command:

```bash
npm run test:cov
```

### **API Documentation Guide**

All new APIs must be properly documented using **Swagger** decorators. Ensure that you use the following Swagger decorators in your controllers:

- **`@ApiTags()`**: Tags the controller or route with a category name. This helps organize your API endpoints in Swagger UI.
- **`@ApiOperation()`**: Describes the purpose of the API endpoint.
- **`@ApiParam()`**: Describes the path parameters for the API.
- **`@ApiBody()`**: Describes the structure of the request body, including validation rules and expected data types.
- **`@ApiResponse()`**: Defines the possible responses, including success and error responses with their respective status codes.
- **`@ApiProperty()`**: Used within DTOs to document the properties of the request/response objects. It allows Swagger to auto-generate descriptions and examples for each property.

---

This code provides the structure and guidelines for contributing to the **BTVerse Server**, covering:
- **Branch Naming Conventions**: Describes how to name branches when working on different features or tasks.
- **Code Style**: Guidelines for maintaining consistent code formatting and style using tools like Prettier and adhering to the Airbnb JavaScript Style Guide.
- **Commit Messages**: Ensures that contributors use meaningful and clear commit messages with specific prefixes like `feat`, `fix`, `docs`, etc.
- **Testing**: Commands for running unit and end-to-end tests to ensure code quality and reliability.
- **API Documentation**: Ensures that all APIs are properly documented using Swagger for better clarity and collaboration.

This section includes commands for running tests, ensuring code coverage, and guidelines for documenting APIs with **Swagger** decorators. Make sure to follow these guidelines for smooth development and collaboration across the team.


