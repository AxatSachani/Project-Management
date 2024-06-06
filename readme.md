# Task Collaboration Platform

## Overview
The Task Collaboration Platform is a web application that allows users to create projects, add tasks to projects, and assign tasks to team members. The platform supports user authentication, role-based access control, and provides an organized way to manage projects and tasks.

## Features
1. **User Authentication:**
   - Implement user authentication using JWT. Ensure that only authenticated users can access the application's features. Users must register and login to access the platform.
3. **User Registration and Login:**
   - Users can register for an account and login using their credentials. Only team members can register directly. Project managers and admins can only be created by an admin.
5. **CRUD Operations on Projects:**
   Users can perform CRUD operations on projects.
    - Create: Users can create new projects with required details.
    - Read: Users can view a list of all projects.
    - Update: Users can edit project details.
    - Delete: Users can delete projects if necessary.
7. **Project Management:**
   Users can create projects and organize tasks within them. Each project includes:
    - Project ID: A unique identifier for each project.
    - Title: The title of the project.
    - Description: Additional details about the project.
    - Start Date: The date when the project starts.
    - End Date: The deadline for completing the project.
9. **Task Management within Projects:**
    Users can add tasks to projects with the following details:
    - Task ID: A unique identifier for each task.
    - Title: The title of the task.
    - Description: Additional details about the task.
    - Due Date: The deadline for completing the task.
    - Priority: Priority level of the task.
11. **Role-Based Access Control (RBAC):**
    - Define roles such as admin, project manager, and team member. Admin users have full access to all projects and tasks, while project managers can create/edit tasks and assign them to team members. Team members can view and update tasks assigned to them.
13. **Validation and Error Handling:**
    - Implement validation to ensure that project and task data are complete and valid. Handle errors gracefully with appropriate HTTP status codes and error messages.

## Installation

### Prerequisites
- Node.js
- MongoDB

### Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/AxatSachani/Project-Management.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file with the following content:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/project_management
    TOKEN_SECRET=your_secret_key
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Seed the database with initial users:
    - When the server starts, the database will be seeded with three users: admin, project_manager, and team_member.

## Role-Based Access Control (RBAC)
- **admin:** Full access to all projects and tasks.
- **project_manager:** Can create/edit tasks and assign them to team members.
- **team_member:** Can view and update tasks assigned to them.
