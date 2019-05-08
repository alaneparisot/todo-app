# Todo App

A simple todo app to **discover, study, and master how to build enterprise-ready applications with React**.

My purpose is to write a **React Cookbook** for my future self. Therefore, I'll try, as far as my knowledge and time allow me, to respect and embrase best practices, unit testing, and documentation.

Here are the topics I planned to cover:

- [x] React 16+
  - [x] Hooks
    - [x] `useState`
    - [x] `useEffect`
    - [ ] `useContext`
    - [ ] `useReducer`
    - [ ] `useRef`
    - [x] `React.Memo`
- [x] TypeScript
- [x] HTTP Requests (with Firebase's Cloud Firestore)
- [x] Routing
  - [x] Lazy Loading (with `React.Suspense`)
- [x] Redux
  - [x] Redux Thunk
  - [ ] Redux Saga
- [ ] Unit Testing
  - [x] Actions
  - [x] Reducers
  - [ ] Containers
  - [ ] Components
- [ ] Documentation
- [ ] Forms (with Formik)
- [ ] Authentication
- [ ] i18n
- [ ] Performance Optimization
- [ ] Styled Components
- [ ] Material-UI
- [ ] Animations
- [ ] Next.js
- [ ] Gatsby
- [ ] Preact
- [ ] React Native

Oh! I've almost forgot, any suggestion would be greatly appreciated 😊

## Installation

Clone this repository.

### Dependency Installation

```bash
$ yarn install
```

### Firebase Configuration

To execute this project, you must have a Firebase account and project.

Copy your project's credentials from Firebase, and add a JSON file named `firebaseConfig.json` in `src/db` from your cloned repository.

This file should have this form:

```jsonld
{
  "apiKey": "...",
  "authDomain": "...",
  "databaseURL": "...",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "..."
}
```

### Start

```bash
$ yarn start
```
