# **Frontend Documentation**

## **Overview**

This project serves as the frontend for a CV management and recommendation platform. It provides users with a modern and intuitive interface to create, view, update, and manage their CVs and recommendations. The project leverages **TailwindCSS** for responsive and sleek design and integrates seamlessly with the backend API for smooth functionality.

---

## **Table of Contents**
1. [Features](#features)
2. [Routes](#routes)
3. [Payload Examples](#payload-examples)
4. [Setup and Installation](#setup-and-installation)
5. [Development Workflow](#development-workflow)
6. [Contribution Guidelines](#contribution-guidelines)

---

## **Features**

- **User Authentication**:
  - Register, login, and logout using session-based JWT cookies.

- **CV Management**:
  - Create, view, update, and delete CVs.
  - Access public CVs and manage user-specific CVs.

- **Recommendations**:
  - Add, view, and delete recommendations for CVs.

- **Profile Management**:
  - Update or delete user accounts.

- **Modern Design**:
  - Sleek, responsive design using **TailwindCSS**.

- **API Integration**:
  - Fully integrated with the backend API to provide real-time and efficient operations.

- **Developer Friendly**:
  - Easy-to-read codebase with clear documentation for smooth onboarding and collaboration.

---

## **Routes**

### **Public Routes**
| Route       | Description                          |
|-------------|--------------------------------------|
| `/`         | Displays public CVs.                |
| `/login`    | User login page.                    |
| `/register` | User registration page.             |

### **Protected Routes (Authentication Required)**
| Route                           | Description                                           |
|---------------------------------|-------------------------------------------------------|
| `/cvs`                          | Displays public CVs for authenticated users.          |
| `/cvs/:cvId`                    | Displays details of a specific CV.                   |
| `/recommendation/create/:cvId`  | Allows users to create a recommendation for a CV.     |
| `/profile`                      | User profile page for updating or deleting accounts. |
| `/myCvs`                        | Displays CVs created by the user.                    |
| `/myRecommendations`            | Shows recommendations submitted by the user.         |
| `/cv/create`                    | Page for creating a new CV.                          |
| `/cv/update/:cvId`              | Page for editing an existing CV.                     |
| `/logout`                       | Logs the user out of the session.                    |

---

## **Payload Examples**

### **Creating a CV**
```json
{
  "title": "Software Engineer",
  "summary": "Experienced in full-stack development.",
  "skills": ["JavaScript", "React", "Node.js"],
  "experiences": [
    {
      "company": "Tech Corp",
      "position": "Developer",
      "startDate": "2020-01-01",
      "endDate": "2022-01-01",
      "description": "Worked on various projects using modern technologies."
    }
  ],
  "education": [
    {
      "school": "Tech University",
      "degree": "Bachelor's in Computer Science",
      "startDate": "2015-09-01",
      "endDate": "2019-06-01"
    }
  ],
  "visibility": "public"
}
```

### **Form Examples for CV Creation**

- **Experiences Field**:
  ```json
  [
    {
      "company": "Tech Corp",
      "position": "Developer",
      "startDate": "2020-01-01",
      "endDate": "2022-01-01",
      "description": "Worked on various projects using modern technologies."
    }
  ]
  ```

- **Education Field**:
  ```json
  [
    {
      "school": "Tech University",
      "degree": "Bachelor's in Computer Science",
      "startDate": "2015-09-01",
      "endDate": "2019-06-01"
    }
  ]
  ```

For additional payload examples, refer to Swagger or the backend's README. APIs can be tested directly through Swagger.

---

## **Setup and Installation**

### **Local Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/Enstso/CVGenerator-Frontend
   cd CVGenerator-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests (if available):
   ```bash
   npm test
   ```

---

## **Development Workflow**

1. **Branching Strategy**:
   - Use feature branches for new functionalities.
   - Follow a naming convention like `feature/your-feature-name`.

2. **Code Standards**:
   - Adhere to the established linting rules.
   - Use Prettier for consistent code formatting.

3. **Pull Requests**:
   - Ensure your branch is up-to-date with `main`.
   - Submit a detailed pull request for review.

---

## **Contribution Guidelines**

We welcome contributions to enhance the platform. Here’s how you can help:

1. **Report Bugs**:
   - Open an issue with detailed steps to reproduce the bug.

2. **Request Features**:
   - Suggest new features by opening an issue.

3. **Submit Code Changes**:
   - Fork the repository.
   - Create a new branch for your changes.
   - Submit a pull request with a detailed description of your changes.

4. **Documentation Updates**:
   - Improve the README or other documentation files.

Thank you for contributing to our project!
