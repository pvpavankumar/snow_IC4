> **Vercel deployment:** See [deployment instructions](friendbook/client/DEPLOYMENT.md). Use `friendbook/client` as the Vercel root directory. This branch serves the frontend and API together; the separate server installation instructions below describe the original setup.

# Snow_IC4_Friendsbook

Snow_IC4_Friendsbook is a social media application with features such as login, registration, creating posts with a rich text editor, editing and deleting posts, following/unfollowing users, liking/unliking posts, and filtering posts based on followed users.

## Features Done
- Login
- Register
- Create Post within a rich text editor
- Edit Post
- Delete Post
- Follow/Unfollow
- Like/Unlike
- Filter posts based on users followed

## Functionalities Yet to Be Done
- Forgot Password
- Friend Request
- Comments

## Dependencies Explained

### Client-Side Dependencies
- `@ant-design/icons` and `antd`: Ant Design framework for React applications, providing UI components and icons.
- `axios`: Promise-based HTTP client for making HTTP requests.
- `bootstrap` and `bootstrap-icons`: Front-end framework for responsive design and icons.
- `moment`: Library for handling dates and times.
- `next`: React framework for server-side rendering and static website generation.
- `react` and `react-dom`: Core libraries for building user interfaces.
- `react-quill`: React component for a modern rich text editor.
- `react-render-html`: Allows rendering HTML as React elements.
- `react-toastify`: Easy-to-use toast notifications for React applications.

### Server-Side Dependencies
- `bcrypt`: Library for hashing passwords securely.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing.
- `dotenv`: Loads environment variables from a `.env` file.
- `esm`: ECMAScript Module support for Node.js.
- `express`: Minimal and flexible Node.js web application framework.
- `express-jwt`: Middleware for validating JSON Web Tokens.
- `jsonwebtoken`: Implements JWT authentication.
- `mongodb`: Official MongoDB driver for Node.js.
- `mongoose`: MongoDB object modeling tool for Node.js.

## Why the MERN Stack
The MERN stack uses JavaScript for both client-side and server-side code, simplifying the development process. MongoDB's flexible schema design is beneficial for social media applications where data structures can evolve rapidly.

## Installation Steps

### Client Installation Steps
1. Navigate to the Client Directory:
   ```bash
   cd path/to/client
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
3. Environment Configuration: Populate with the required `.env` file.
4. Start the Development Server:
   ```bash
   npm start
   ```
   This command will start the development server, usually accessible at `http://localhost:3000`.

### Server Installation Steps
1. Navigate to the Server Directory:
   ```bash
   cd path/to/server
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
3. Environment Configuration: Provide the `.env` file given.
4. Start the Server:
   ```bash
   npm run start
   ```
   This will start the server on `http://localhost:8000`.

## Follow/Unfollow Functionality
Each time a user follows/unfollows, actions are executed on both users' sides.

### Follow Example
**Pavan follows Kumar:**
- Pavan: `following['kumar_id']`
- Kumar: `followers['pavan_id']`

**Kumar follows Pavan back:**
- Pavan: 
  ```json
  {
    "following": ["kumar_id"],
    "followers": ["kumar_id"]
  }
  ```
- Kumar: 
  ```json
  {
    "followers": ["pavan_id"],
    "following": ["pavan_id"]
  }
  ```

### Friend/Unfriend Approach Tried
**Friend Request:**
1. Pavan sends a friend request to Kumar.
   ```json
   {
     "friend_requests_sent": ["kumar_id"]
   }
   {
     "friend_requests_received": ["pavan_id"]
   }
   ```
2. Kumar accepts the friend request.
   ```json
   {
     "friends": ["kumar_id"],
     "friend_requests_sent": []
   }
   {
     "friends": ["pavan_id"],
     "friend_requests_received": []
   }
   ```

**Unfriend Action:**
```json
{
  "friends": []
}
```

## Models

### User Model
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "secret": "string",
  "about": "string",
  "photo": "string",
  "following": ["user_id"],
  "followers": ["user_id"],
  "friends": ["user_id"],
  "friendRequestsSent": ["user_id"],
  "friendRequestsReceived": ["user_id"],
  "timestamps": true
}
```

### Post Model
```json
{
  "content": "string",
  "postedBy": "user_id",
  "image": {
    "url": "string",
    "publicId": "string"
  },
  "likes": ["user_id"],
  "comments": [
    {
      "text": "string",
      "createdAt": "date",
      "postedBy": "user_id"
    }
  ],
  "timestamps": true
}
```

## Folder Structure

```
Friendbook/
│
├── client/                  # Client-side code (Frontend)
│   ├── public/              # Static files
│   │   ├── css      
│   │   └── images 
│   ├── components/          # Reusable UI components
│   │   ├── Navbar/
│   │   ├── PostCard/
│   │   └── ...
│   ├── pages/               # Application pages
│   │   ├── user/
│   │   ├── dashboard.js     # Page to see the user's timeline
│   │   ├── index.js         # Landing page
│   │   └── _app.js          # Application bootstrap and rendering
│   └── package.json         # Frontend dependencies and scripts
│
├── server/                  # Server-side code (Backend)
│   ├── controllers/         # Route controllers (business logic)
│   ├── models/              # Database models
│   ├── routes/              # Application routes
│   │   ├── userRoutes.js
│   │   ├── postRoutes.js
│   └── middleware/
└── package.json             # Backend dependencies and scripts
```

This README provides an overview of the features, installation steps, and the folder structure for the Snow_IC4_Friendsbook project, including explanations of the dependencies used and the data models implemented.

### What problem does this solve?

FriendBook is a full-stack social platform that helps users build a personalized community instead of browsing an undifferentiated list of content. Users can register securely, publish rich-text posts, discover and follow people, like content, and view a timeline filtered to posts from accounts they follow. The project demonstrates an interconnected social experience—not merely isolated CRUD screens—built with Next.js, React, Express, MongoDB, and Mongoose.

### What were the technical challenges?

The main challenge was maintaining relationships and consistent state across the stack. Following a user requires updating both users' follower and following collections, while likes must remain unique and the news-feed query must combine the current user's posts with posts from followed accounts. The implementation handles these cases using MongoDB references and atomic `$addToSet` and `$pull` operations, protects routes with JWT authentication, hashes passwords with bcrypt, populates author data for posts, and synchronizes authentication and feed changes between the API, React Context, and local storage.

### What would I do differently?

I would strengthen the project for production by enforcing ownership checks on post updates and deletions, wrapping two-user follow operations in MongoDB transactions, sanitizing rich-text HTML, and storing authentication in secure HTTP-only cookies instead of local storage. I would also introduce centralized error handling and validation, database indexes, cursor-based feed pagination, automated API and UI tests, and CI/CD checks. Finally, I would complete comments, password recovery, and friend requests, then add deployment documentation, screenshots, and a live demo to make the project easier to evaluate quickly.
