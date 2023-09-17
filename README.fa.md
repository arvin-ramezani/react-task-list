<table>
    <td>
    <a href="README.fa.md">
        Persian
    </a>
    </td>
    <td>
        <a href="README.md">
            English
        </a>
    </td>
</table>

# Simple Todo List

این ریپازیتوری شامل یک برنامه ساده Todo List است که با استفاده از ReactJS، TypeScript، Styled-Components، react-beautiful-dnd و Framer Motion برای انیمیشن ساخته شده است. این برنامه شامل ویژگی Drag و Drop است که با react-beautiful-dnd پیاده سازی شده است و به کاربران این امکان را می دهد تا به راحتی تسک های خود را در سه حالت سازماندهی کنند: Todo، Doing و Done.

## My Journey and Challenges

این یک تست مصاحبه بود که باید به شکلی انجام میشد که پس از کلیک کاربر روی چک باکس، بعد از سه ثانیه تسک مربوطه به 'Done" یا 'Undone" تغییر میکرد.
در سناریویی که کاربر پس از کلیک کردن روی تسک، هر آیتم دیگری را 'Drag' کند و بعد از سه ثانیه آن را 'Drop' کند، برنامه ارور میداد.
علت آن هم این بود که چون react-beautiful-dnd از index استفاده می کند و بین زمان 'Drag' و 'Drop' کردن index لیست به علت تغییر وضعیت تسک کلیک شده تغییر خواهد کرد باعث ایجاد ارور تو برنامه می شد.

از اونجایی که برای مدیریت استیت ها من از Context API و useReducer استفاده کرده بودم برای حل مشکل تصمیم گرفتم،

در استیت های Context یک متغیر به اسم 'isDragging' تعریف کردم و آن را به ترتیب در فانکشن های 'onDragStart' و 'onDragEnd' برابر 'true' و 'false' قرار دادم.

و در reducer toggleDoneTask چک کردم که اگر 'isDragging' برابر 'true' بود آبجکت action را به طور کامل در استیت دیگری به اسم waitList در Context ذخیره کردم. { type, payload }.

سپس با استفاده از useEffect و اضافه کردن 'isDragging' به آرایه dependency چک کردم که اگر 'isDragging' برابر 'false' بود action به اسم 'clearWaitList' را dispatch کند.
سپس در reducer مربوطه درون waitList پیمایش کردم و action ها را تک به تک dispatch کرده و آنها را از لیست پاک میکنم.

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
