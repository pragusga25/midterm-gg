# Video Management RESTful API (Express.js + TypeScript + MongoDB)

This repository contains a Video Management RESTful API built using Express.js, TypeScript, and MongoDB (with Mongoose). The API allows clients to manage video data, including retrieving videos, fetching associated products and comments, and creating new comments for specific videos. Below, you will find detailed instructions on how to set up and run the API, along with an explanation of the database schema used for video storage.

## Table of Contents

- [Video Management RESTful API (Express.js + TypeScript + MongoDB)](#video-management-restful-api-expressjs--typescript--mongodb)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Database Schema](#database-schema)
    - [1. Video Collection Schema](#1-video-collection-schema)
    - [2. Product Collection Schema](#2-product-collection-schema)
    - [3. Comment Collection Schema](#3-comment-collection-schema)
  - [API Endpoints](#api-endpoints)
  - [Usage](#usage)

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

Then, open the `.env` file and fill in the values for the environment variables according to your MongoDB setup.

Example `.env` file:

```plaintext
PORT=3000
MONGO_URI=mongodb://localhost:27017/video_management_db
```

Make sure to replace `MONGO_URI` with the connection string for your MongoDB database.

## Database Schema

The MongoDB database schema used for storing video-related data is defined using Mongoose. The schema includes three main collections: `Video`, `Product`, and `Comment`.

### 1. Video Collection Schema

The Video collection stores information about videos and their associated data.

**Schema Definition:**

```typescript
const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    embededYoutubeUrl: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
```

**Fields:**

- `title` (String, required): The title of the video.
- `description` (String, required): A description or summary of the video's content.
- `thumbnailUrl` (String, required): The URL of the video's thumbnail image.
- `embededYoutubeUrl` (String, required): The embedded YouTube URL of the video.
- `products` (Array of ObjectIds, ref: 'Product'): An array of references to `Product` documents associated with the video.
- `comments` (Array of ObjectIds, ref: 'Comment'): An array of references to `Comment` documents representing comments on the video.

### 2. Product Collection Schema

The Product collection stores information about products associated with videos.

**Schema Definition:**

```typescript
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
```

**Fields:**

- `title` (String, required): The title or name of the product.
- `price` (Number, required, min: 0): The price of the product (non-negative).
- `video` (ObjectId, ref: 'Video', required): A reference to the `Video` document to which the product belongs.

### 3. Comment Collection Schema

The Comment collection stores information about comments made on videos.

**Schema Definition:**

```typescript
const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: new Date(),
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
```

**Fields:**

- `username` (String, required): The username of the commenter who posted the comment.
- `comment` (String, required): The actual comment text.
- `timestamp` (Date, default: new Date(), required): The timestamp of when the comment was posted.
- `video` (ObjectId, ref: 'Video', required): A reference to the `Video` document to which the comment belongs.

## API Endpoints

The API provides the following endpoints for managing video data:

1. `GET /api/v1/videos`: Retrieve a list of videos.
2. `GET /api/v1/videos/:videoId/comments`: Retrieve comments for a specific video.
3. `GET /api/v1/videos/:videoId/products`: Retrieve products associated with a specific video.
4. `POST /api/v1/videos/:videoId/comments`: Create a new comment for a specific video.

For a detailed explanation of the request and response format for each endpoint, please refer to this gist [API Endpoints](https://gist.github.com/pragusga25/81da817700086e851cbcd709c0253bbc).

## Usage

To start the API, run the following command in the terminal:

```
npm run dev
```

The API server will start, and you can access the endpoints at `http://localhost:3000` (assuming the default port is used).
