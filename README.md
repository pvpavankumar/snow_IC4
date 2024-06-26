# Snow_IC4_friendsbook

# Features Done:
Login
Register
Create Post within rich text editor
Edit Post
Delete Post
Follow/unfollow(Tried implementing friend/unfriend faced some issues so went ahead with follow/unfollow due to the time constraints).
Like/unlike
Filter the posts based on users followed

# Functionalities which could have been done
Forgot password
Friend Request
Comments

# Dependencies explained

@ant-design/icons and antd: These packages are part of Ant Design, a popular design framework for React applications. @ant-design/icons provides a wide range of icons, while antd offers a comprehensive library of UI components. These make it easier to build complex, interactive, and visually appealing user interfaces with consistency.

axios: Axios is a promise-based HTTP client for the browser and Node.js. It's used for making HTTP requests to fetch or save data. It's a popular choice due to its simple API, ability to intercept requests and responses, and automatic transformation of JSON data.

bootstrap and bootstrap-icons: Bootstrap is a front-end framework for developing responsive and mobile-first websites. bootstrap-icons provides a set of icons designed to work with Bootstrap components. Using Bootstrap can speed up the development process by providing pre-designed CSS and JavaScript components.

moment: Moment.js is a library for parsing, validating, manipulating, and formatting dates. It's widely used for handling dates and times in JavaScript, although it's now considered a legacy project in favor of newer libraries like Luxon or date-fns due to its large bundle size and mutable API.

next: Next.js is a React framework that enables functionality such as server-side rendering and generating static websites for React-based web applications. It's known for its ease of use, performance benefits, and features like automatic code splitting and optimized prefetching.

react and react-dom: React is a JavaScript library for building user interfaces, and react-dom provides DOM-specific methods that can be used at the top level of a web app to enable efficient updates of the web page. These are core to any project that uses React.

react-quill: React Quill is a React component that wraps Quill, a modern rich text editor. It provides a powerful editing interface that can be easily integrated into React applications.

react-render-html: This package allows React components to render HTML as React elements. It's useful for displaying dynamic content that includes HTML markup.

react-toastify: React Toastify provides easy-to-use notifications for React applications. It allows developers to add toast notifications to their app with minimal setup, offering a great user experience by providing feedback in a non-obtrusive way.

bcrypt: This package is used for hashing passwords. It's a crucial security measure for storing passwords safely in your database. Instead of saving plain text passwords, bcrypt hashes them, making it significantly harder for attackers to compromise user accounts even if they gain access to the database.

cors: Stands for Cross-Origin Resource Sharing. This package is a middleware that enables CORS in Express applications. It allows you to specify which domains can access resources on your server, an essential feature for APIs consumed by web applications hosted on different domains.

dotenv: This package loads environment variables from a .env file into process.env, making it easier to manage configuration and sensitive information (like API keys) outside of your codebase in a secure and scalable way.

esm: Provides ECMAScript Module (ESM) support for Node.js. It allows you to use ES module syntax (import/export) in Node.js applications, which is the standard in modern JavaScript development but was not initially supported in Node.js.

express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's widely used for building APIs and web servers due to its simplicity and performance.

express-jwt: This is middleware for Express applications that validates JSON Web Tokens (JWTs). It's used in authentication and authorization processes, ensuring that tokens are valid and allowing access to protected routes based on the token's payload.

jsonwebtoken: A package for implementing JWT authentication. JWTs are a method for securely transmitting information between parties as a JSON object. This package allows you to sign, verify, and decode JWTs in your application.

latest: This package seems to be an outlier and might be included by mistake or for a specific, less common use case. Typically, dependencies are named after their function or the library they provide, but "latest" is ambiguous without further context.

mongodb: The official MongoDB driver for Node.js. It provides a high-level API to interact with MongoDB databases, allowing you to perform CRUD operations, manage connections, and use MongoDB's features directly from your Node.js application.

mongoose: A MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, and business logic hooks.


# Installation steps
Client Installation Steps

Navigate to the Client Directory: Open a terminal and change to the directory containing the client application, usually named client or similar.
cd path/to/client

Install Dependencies: Run the following command to install the necessary dependencies defined in the package.json file.
npm install

Environment Configuration: Populate with the required .env file

Start the Development Server: To run the client application in development mode, execute:
npm start

This command will start the development server, usually accessible at http://localhost:3000.

Server Installation Steps
Navigate to the Server Directory: Open a new terminal window or tab and change to the directory containing the server application, often named server or similar.
cd path/to/server

Install Dependencies: Like with the client, install the server dependencies using npm.
npm install

Environment Configuration: Provide the .env file given

Start the Server: To launch the server, run:
npm run start

This will start the server on http://localhost:8000