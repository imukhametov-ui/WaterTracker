# WaterTracker

WaterTracker is a web application for tracking daily water consumption.

The project is developed as a team-based full-stack application using GitHub Flow, GitHub Issues, GitHub Projects, and Pull Requests.

## Project Goal

Develop a working MVP that allows users to track their water intake, manage personal records, and monitor daily hydration progress.

The final application will be deployed online and presented as a working MVP.

## Team

| Member | Role | Responsibilities |
|---|---|---|
| Ihor Mukhametov | Team Lead / Backend Developer | Architecture, backend, database, API, GitHub Projects, integration |
| Yelyzaveta Biryukova | Frontend Developer | React components, UI, styling, frontend integration |
| Both developers | QA / Code Review | Testing, bug fixing, Pull Request reviews |

All team members participate in development, task planning, and code review.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router
- CSS Modules
- React Hooks / Context API

### Backend
- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma
- JWT authentication
- Swagger / OpenAPI

### Infrastructure
- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL
- Version Control: Git / GitHub
- Project Management: GitHub Projects
- CI/CD: GitHub Actions (planned)

See [TECH.md](TECH.md) for detailed technology choices and explanations.

## Project Structure

```text
WaterTracker/
├── frontend/
│   └── .gitkeep
├── backend/
│   └── .gitkeep
├── README.md
├── TECH.md
└── .gitignore
```

Frontend and backend are independent applications with separate dependencies and configuration.

## Core MVP Features

- User registration and login
- Personal water consumption records
- Add, edit, and delete water intake records
- Daily water consumption tracking
- Daily progress visualization
- User-specific data access

The final scope will follow the approved project requirements.

## Team Workflow

We use GitHub Flow:

1. Create a GitHub Issue for each task.
2. Assign the issue to a team member.
3. Track progress in GitHub Projects.
4. Create a separate feature or fix branch.
5. Implement and test changes.
6. Open a Pull Request.
7. Complete Code Review and obtain at least one approval.
8. Merge approved changes into `main`.

Direct pushes to `main` are prohibited by the team workflow.

### Branch Naming

- `feature/issue-number-description`
- `fix/issue-number-description`
- `docs/issue-number-description`

### GitHub Projects Statuses

- Todo
- In Progress
- In Review
- Done

## Development Status

Project setup and planning are in progress.

Frontend and backend implementation will follow the approved technical specification.

## MVP Presentation

The completed MVP will include a deployed frontend, backend REST API, persistent database, and demonstration of the core user workflows.
