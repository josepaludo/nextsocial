# Social

Welcome to Social, a web app built with Next.js powered by TypeScript, Tailwind CSS and Prisma. This project allows users to create and share posts, comment on posts, vote on posts, create and follow groups, follow other users, and perform advanced search and filtering.

## Features

### User Management

- **Custom User Registration and Authentication**: Users can sign up, log in, and log out with a custom auth system built with JWT.
- **User Profiles**: Users can customize their profiles and view other users' profiles.
- **Follow/Unfollow Users**: Users can follow and unfollow other users to stay updated with their posts.

### Post Management

- **Create and Share Posts**: Users can create new posts and share them with the community.
- **Commenting**: Users can leave comments on posts.
- **Voting**: Users can upvote or downvote posts.
- **Advanced Search**: Users can filter posts by content, title, and user.

### Group Management

- **Create and Join Groups**: Users can create new groups and join existing ones.
- **Follow/Unfollow Groups**: Users can follow groups to see posts from those groups in their feed.
- **Group Admins**: Admins of a group have the authority to ban users from the group.

### Search Engine

- **Advanced Search**: Users can search group names and descriptions, posts titles and contents, user names and bios.

## Technologies Used

- **Next.js**: A React framework for building server-rendered React applications.
- **Prisma**: A modern database toolkit for Node.js and TypeScript.
- **Tailwind CSS**: A utility-first CSS framework for designing web applications.
- **TypeScript**: A statically-typed superset of JavaScript that enhances code quality.

## Getting Started

1. Clone this repository to your local machine.

   ```
   git clone git@github.com:josepaludo/nexttoken.git
   ```
   
2. Install the project dependencies.

   ```
   npm install
   ```
   
3. Set up your database connection in the .env file.

   ```
   DATABASE_URL="your-database-connection-url"
   ```
   Keep in mind that the default provider on this project is postgresql.
   
4. Set up your JWT secret in the .env.local file.

   ```
   JWT_SECRET='your-jwt-secret-here'
   ```
   
5. Migrate the database.

   ```
   npx prisma migrate dev
   ```

6. Start the development server.

   ```
   npm run dev
   ```

7. Access the application at http://localhost:3000 in your web browser.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE)
