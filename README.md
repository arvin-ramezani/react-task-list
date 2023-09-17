# Simple Todo List

This repository contains a simple Todo List application built using ReactJS and Styled-Components with Drag Drop feature.

## Installation

To run the application locally, please make sure you have Node.js installed. The recommended version of Node.js for this project is 18.17.1 Follow these steps:

1. Clone the repository:

```
git clone https://github.com/arvin-ramezani/react-task-list
```

2. Navigate to the project directory:

```
cd react-task-list
```

3. Install the dependencies:

```
npm install
```

## Development

To start the development server and view the application, run the following command:

```
npm start
```

Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the application.

## Production

To build the application for production use the following command:

```
npm run build
```

The production build artifacts will be generated in the `dist` directory.

## Testing

The application contains unit tests and end-to-end tests. The testing stack includes Jest, React Testing Library, and Cypress. To run the tests, execute the following commands:

- Unit Tests:

```
npm test
```

- End-to-End Tests with Cypress:

```
npm run cypress
```

When running the Cypress tests, follow these steps:

1. Choose the "E2E Testing" option from the Cypress window.
2. Select your preferred browser.
3. Choose the file that you want to run tests against.

## Version Control

Git and GitHub are used for version control in this project. A feature development workflow is followed, with each new feature or enhancement being developed on a separate branch, e.g., `feat/tasks`. Additionally, branches are created for tasks like refactoring or debugging, e.g. `chore/refactoring` or `chore/debugging`. These branches are later merged into a single `dev` branch, where all tests are executed before merging into the `main` branch for deployment. This ensures a systematic and collaborative development process within the team.

## Component Documentation

For documenting components, I suggest using a tool like Storybook. Storybook provides a development environment for UI components, allowing you to document, test, and showcase your components in isolation. It facilitates collaboration and helps maintain a consistent and up-to-date component library.

## Deployment

The application has been deployed using Vercel and can be accessed:
<br />
<a href="https://react-task-list-rho.vercel.app/">
(https://react-task-list-rho.vercel.app/)
</a>

## Additional Suggestions

I think it would be great if we use libraries like "framer-motion" to create engagement and complex animations.
