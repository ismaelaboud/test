# Project Documentation

## 1. Setting up Environment Variables
To get started with the project, you need to configure environment variables.

### Steps to Configure
1. Locate the `env.example` file in the root of your project.
2. Copy the file and rename it to `.env`.
3. Replace the placeholder values with your own credentials:
   - **DATABASE_URL**: Your PostgreSQL database connection string.
   - **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**: Obtain these from the Google Cloud Console.
   - **GITHUB_CLIENT_ID** and **GITHUB_CLIENT_SECRET**: Obtain these from the GitHub Developer settings.
   - **NEXTAUTH_SECRET**: A random secret for securing authentication sessions.
   - **NEXTAUTH_URL**: The base URL of your application (e.g., `http://localhost:3000` for development).

## 2. Functional Pages and Their Descriptions

### a. Home Page (`/`)
- **Functionality**: Displays a hero section and a list of featured courses.
- **Notes**: Featured courses are currently static.
- **Pending Feature**: Make featured courses dynamic by fetching them from the database.

### b. Admin Pages (`/admin`)
- **Functionality**: Displays analytics for the project.
- **Notes**: The analytics data is currently static.
- **Pending Feature**: Make the analytics data dynamic.

#### i. Admin Users Page (`/admin/users`)
- **Functionality**: Displays a list of all users.
- **Notes**:
  - The UI requires updates.
  - Admins can navigate to the `create` page to add new users.

#### ii. Create User Page (`/admin/users/create`)
- **Functionality**: Allows admins to create new users.

#### iii. Admin Content Page (`/admin/content`)
- **Functionality**: Displays all available content (courses) in the project.

#### iv. Create Content Page (`/admin/content/create`)
- **Functionality**: Allows admins to create new courses that will be displayed to users.

### c. Courses Page (`/courses`)
- **Functionality**: Displays all available courses to users.
- **Features**:
  - Fetches courses dynamically from the database.
  - Includes a dynamic search functionality.

### d. Course Details Page (`/courses/[id]`)
- **Functionality**: Displays detailed content of a specific course based on the course ID.

### e. Protected Page (`/protected`)
- **Functionality**: A sample page to demonstrate authentication-protected content.
- **Notes**: This functionality will be implemented on pages requiring protection.

## 3. Running the Project
Follow these steps to set up and run the project:

### Step 1: Install Dependencies
Run the following command to install all required dependencies:
```bash
npm install
```

### Step 2: Set Up the Database
1. Ensure that PostgreSQL is installed and running on your system.
2. Create a database and schema as required (e.g., `lms_2k25` and `lms2k25_schema`).
3. Update the `DATABASE_URL` in your `.env` file to match your configuration.

### Step 3: Run Database Migrations
Apply database migrations to set up the necessary tables:
```bash
npx prisma migrate dev
```

### Step 4: Start the Development Server
Start the development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Step 5: Verify Authentication
Test Google and GitHub authentication by ensuring the respective client IDs and secrets are correctly set up in the `.env` file.

