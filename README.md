# Tokopedia Play Clone API

Welcome to the Tokopedia Play Clone API documentation. This API provides functionalities similar to Tokopedia, allowing users to interact with videos, products, and comments. Users can also register, log in, and create comments in both guest and authenticated modes.

## Table of Contents

- [Tokopedia Play Clone API](#tokopedia-play-clone-api)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Database Schema](#database-schema)
    - [Comment Schema](#comment-schema)
    - [Product Schema](#product-schema)
    - [User Schema](#user-schema)
    - [Video Schema](#video-schema)
    - [Transformations](#transformations)
  - [API Structure](#api-structure)
    - [1. dtos](#1-dtos)
    - [2. errors](#2-errors)
    - [3. models](#3-models)
    - [4. routers](#4-routers)
    - [5. services](#5-services)
    - [6. shared](#6-shared)
      - [a. config](#a-config)
      - [b. errors](#b-errors)
      - [c. libs](#c-libs)
      - [d. utils](#d-utils)
      - [e. constants](#e-constants)
      - [f. middlewares](#f-middlewares)
      - [g. interfaces](#g-interfaces)
  - [API Endpoints](#api-endpoints)
  - [Usage](#usage)
  - [Deployment](#deployment)
  - [Bonus Features](#bonus-features)

## Prerequisites

Before running the API, make sure you have the following prerequisites installed on your system:

1. Node.js (<https://nodejs.org>)
2. npm (Node Package Manager, usually installed along with Node.js)
3. MongoDB (<https://www.mongodb.com>)

## Installation

To set up the API, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory using the terminal.
3. Install the required dependencies by running:

   ```
   npm install
   ```

## Configuration

Before running the API, you need to set up the environment variables. Create a `.env` file based on the provided `.env.example` file. You can do this by running the following command:

```bash
cp .env.example .env
```

Then, open the `.env` file and fill in the values for the environment variables according to your setup.

## Database Schema

This section provides an in-depth description of the model schemas used within the Tokopedia Clone application. These schemas outline the structure of key data entities, including comments, products, users, and videos.

### Comment Schema

The `commentSchema` defines the structure of comments associated with videos. Comments capture user interactions and discussions related to video content. Each comment includes:

- **Comment Content**: The textual content of the comment.
- **Guest Username**: If the comment is made by a guest user, this field records the guest's username.
- **Timestamp**: The date and time when the comment was posted.
- **Video Reference**: A reference to the video that the comment is associated with.
- **User Reference**: An optional reference to the authenticated user who posted the comment.

### Product Schema

The `productSchema` outlines the structure of products featured within the application. Products are items that users can interact with, potentially making purchases or accessing related content. Each product includes:

- **Title**: The name or title of the product.
- **Price**: The cost associated with the product.
- **Link**: A URL pointing to the product's external page.
- **Image URL**: The URL of an image representing the product.
- **Video Reference**: A reference to the video that the product is associated with.

### User Schema

The `userSchema` details the structure of user profiles in the Tokopedia Clone application. Each user profile encompasses various information and attributes, including:

- **Username**: A unique identifier for the user.
- **Password**: The user's password, securely stored.
- **Profile Image**: An image representing the user's profile.
- **Bio**: A short biography or description provided by the user.
- **Online Status**: Indicates whether the user is currently online.
- **Comments**: An array of references to comments made by the user.

### Video Schema

The `videoSchema` describes the structure of videos available within the application. Videos are a central part of the user experience, and each video schema includes:

- **Title**: The title or name of the video.
- **Description**: A textual description or summary of the video's content.
- **Thumbnail URL**: The URL of an image representing the video.
- **Thumbnail Color**: A color associated with the video's thumbnail.
- **Embedded YouTube URL**: The embedded URL of the video from YouTube.
- **Products**: An array of references to products associated with the video.
- **Comments**: An array of references to comments made on the video.

### Transformations

Each schema is configured to transform the `_id` field into an `id` field during serialization. This modification provides a standardized structure for API responses and enhances consistency when interacting with the application's data.

## API Structure

The organization of the code into different folders follows a modular approach, promoting code reusability and maintainability. Below is an overview of each folder and its purpose:

### 1. dtos

The `dtos` folder contains Data Transfer Objects (DTOs). DTOs are objects that define how data will be sent over the network and are used to transfer data between different parts of the application. They help in decoupling the data exchanged between the client and server from the underlying data models.

### 2. errors

The `errors` folder contains custom error classes or error-handling utilities. Custom errors can be used to handle specific types of errors and provide meaningful error messages to clients. This helps in better error handling and improves the application's error reporting capabilities.

### 3. models

The `models` folder contains Mongoose models. Mongoose models are JavaScript classes that define the structure of the documents in the MongoDB collections. They represent the data and functionalities of the MongoDB documents and provide an abstraction layer over the database.

### 4. routers

The `routers` folder contains route handlers or route files. Route handlers define the logic for handling incoming HTTP requests and returning responses. These handlers are organized by route or resource to keep the code modular and maintainable.

### 5. services

The `services` folder contains business logic or services related to the application. Services encapsulate the application's business rules and handle complex operations that involve multiple models or components. They promote separation of concerns and make the codebase more organized.

### 6. shared

The `shared` folder contains shared modules or utilities that can be used across different parts of the application. It further includes sub-folders to group related utilities and modules:

#### a. config

The `config` folder contains configuration files or modules. Configuration files may store environment-specific settings, application constants, or other configurations needed for the application. It centralizes the configuration management and ensures consistency throughout the app.

#### b. errors

The `errors` folder within `shared` contains shared error classes or error-handling utilities that are used across different parts of the application. It provides a common place to define and manage errors, making error handling more efficient and consistent.

#### c. libs

The `libs` folder contains shared libraries or utility functions that can be used across different parts of the application. These libraries encapsulate reusable functionalities that are not specific to a single component or module.

#### d. utils

The `utils` folder contains utility functions that provide commonly used functionalities or helper methods that can be reused throughout the application. These utility functions improve code readability and avoid code duplication.

#### e. constants

The `constants` folder contains constant values or enumerations used in the application. Defining constants separately allows easy maintenance and modification of values without modifying the code everywhere they are used.

#### f. middlewares

The `middlewares` folder contains custom middleware functions. Middleware functions are functions that have access to the request and response objects and can perform actions before or after the main request handler. They can be used for tasks such as authentication, logging, or data validation. Centralizing middleware logic in this folder promotes code modularity and reusability.

#### g. interfaces

The `interfaces` folder contains TypeScript interfaces. Interfaces define the structure and type of objects in the application and help with type checking and code consistency. By using interfaces, the application can benefit from strong typing and better code integrity.

The folder structure design in this application follows best practices to maintain a clean and organized codebase, making it easier to navigate, manage, and extend as the application grows in complexity.

## API Endpoints

For a detailed explanation of the request and response format for each endpoint, please refer to this gist [API Endpoints](https://documenter.getpostman.com/view/16401831/2s9Xy6p99a).

## Usage

To start the API, run the following command in the terminal:

```
npm run dev
```

The API server will start, and you can access the endpoints at `http://localhost:3000` (assuming the default port is used).

## Deployment

The project has been deployed and can be accessed at [https://api.tkp3.tech](https://api.tkp3.tech).

## Bonus Features

- **Live Commenting with WebSocket**:

  - Users can create comments in two modes: guest and logged-in.
  - Logged-in users can delete their comments.

- **Authentication and Profile**:

  - Users can register, log in, and log out.
  - User profiles include profile images, bio, and username.
  - Users can edit their profiles and view profiles of other users.
  - Users can edit their profile picture by uploading the image.

- **Live Tracking Online Status**:

  - Users can see if other users are online or offline.

- **Fuzzy Search for Videos**:
  - Users can search for videos with typo tolerance.
