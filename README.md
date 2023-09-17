# Simple Todo List

This repository contains a simple Todo List application built using ReactJS, TypeScript, Styled-Components, react-beautiful-dnd, and Framer Motion for animation. The application includes a drag and drop feature implemented with react-beautiful-dnd, allowing users to easily organize their tasks in three states: Todo, Doing, and Done.

## My Journey and Challenges

During this interview practice, I was assigned a task to implement an automatic movement of tasks to the "Done" or "Todo" List after three seconds when a user checked
the checkbox to mark a task as "done" or "undone". However, a challenge arose when users attempted to drag and hold a task after clicking on "done" or "undone" and
only releasing it after three seconds. This posed an issue as the index of the task list would change during this process, which caused an error to be thrown due to
the dependency of "react-beautiful-dnd" on the index values.

I utilize the Context API and the useReducer hook for managing the application state. For solving this problem, I created a new state within the context called "isDragging"
and set it to "true" in the onDragStartHandler() function. Similarly, I set it to "false" in the onDragEndHandler() function.

In order to handle the scenario mentioned above, I modified the "toggleDone" reducer. Now, when "state.isDragging" is true, I save the entire action object { type, payload }
into a new state called "taskList."

Additionally, I implemented a useEffect hook, where I added "isDragging" to its dependency array. This allowed me to check for changes in "isDragging" and take action accordingly. Whenever "isDragging" changes and its value becomes false, I dispatch an action called "clearWaitList" within the reducer.

The purpose of the "clearWaitList" action is to iterate through each saved action object within the "waitList" and dispatch them one by one, while simultaneously removing them from the list.

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
