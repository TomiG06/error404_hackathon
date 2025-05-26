# Unimates Web App Documentation

## Overview
Unimates is a web application designed to help students find compatible roommates. It features user registration, profile management, a Tinder-like match system, and filtering by preferences. The app is built with vanilla JavaScript, HTML, and CSS, and uses localStorage for data persistence.

## Filing System (Project Structure)

Below is a **visual directory tree** and detailed explanation of how the Unimates project is organized:

```
project-root/
│
├── src/
│   ├── js/
│   │   ├── components/      # Reusable UI components (side menu, theme toggle, etc.)
│   │   ├── pages/           # Page-specific JS logic (registration, profile, match, etc.)
│   │   └── utils/           # Utility/helper functions (extras.js)
│   │
│   ├── css/
│   │   └── pages/           # CSS for each page (index.css, match.css, etc.)
│   │
│   ├── assets/
│   │   ├── images/          # Images (ui, stock, team)
│   │   └── fonts/           # Fonts (currently empty)
│   │
│   └── pages/
│       ├── public/          # Public HTML pages (index, about, contact, match)
│       ├── dashboard/       # Dashboard HTML pages (for logged-in users)
│       └── auth/            # Authentication HTML pages (registration)
│
├── docs/                    # Project documentation (README.md, match.md, etc.)
└── ...                      # (Other config or support files)
```

### Folder-by-Folder Explanation

#### **src/js/components/**
- **What:** Reusable UI components (e.g., side menu, theme toggle, filter window, burger menu).
- **Why:** Keeps UI logic modular and DRY (Don't Repeat Yourself).
- **Example:**
  - `theme-toggle.js` (theme switcher)
  - `side-menu.js` (user info & navigation)

#### **src/js/pages/**
- **What:** JavaScript files for each main feature or page.
- **Why:** Keeps feature logic separate and easy to maintain.
- **Example:**
  - `registration.js` (user signup)
  - `profile.js` (profile editing)
  - `match.js` (Tinder-like matching)

#### **src/js/utils/**
- **What:** Helper functions used across the app.
- **Why:** Centralizes utilities to avoid duplication.
- **Example:**
  - `extras.js` (list helpers, etc.)

#### **src/css/pages/**
- **What:** CSS files for each page.
- **Why:** Keeps styles focused and prevents conflicts.
- **Example:**
  - `match.css`, `profile.css`, `dashboard.css`

#### **src/assets/images/**
- **What:** All images (UI icons, stock photos, team images).
- **Why:** Centralizes static assets for easy management.

#### **src/pages/public/**
- **What:** Public-facing HTML pages (landing, about, contact, match).
- **Why:** Entry points for users who are not logged in.
- **Example:**
  - `index.html`, `about.html`, `contact.html`, `match.html`

#### **src/pages/dashboard/**
- **What:** Dashboard HTML pages for logged-in users.
- **Why:** Provides authenticated user experience (profile, match, dashboard overview).
- **Example:**
  - `index.html`, `match.html`, `profile.html`

#### **src/pages/auth/**
- **What:** Authentication HTML pages (registration, login).
- **Why:** Handles user sign-up and login flows.
- **Example:**
  - `registration.html`

#### **docs/**
- **What:** Markdown documentation for the project and each feature.
- **Why:** Helps developers understand, maintain, and migrate the project.
- **Example:**
  - `README.md`, `match.md`, `profile.md`, etc.

---

**Visual Summary:**

- **Components** = UI building blocks (reused everywhere)
- **Pages** = Feature logic (one JS file per feature/page)
- **CSS** = Styles for each page
- **Assets** = Images and fonts
- **HTML** = Page structure (public, dashboard, auth)
- **Docs** = All documentation

> **Tip:** If you want to find or edit a feature, look for its HTML in `src/pages/`, its logic in `src/js/pages/`, its styles in `src/css/pages/`, and any reusable UI in `src/js/components/`.

### Project Structure
Below is a detailed breakdown of the project's folder structure:

- **src/js/components/**  
  Reusable UI components (e.g., side menu, theme toggle, filter windows, burger menu).  
  - `theme-toggle.js` – Switches between dark and light themes (persists in localStorage).  
  - `side-menu.js` – Displays user info, navigation links, and handles login/logout.  
  - `filter-window.js` – A draggable window for filtering matches (uses mouse events).  
  - `filter-header.js` – Header with a toggle to show/hide filters.  
  - `burger-menu.js` – Toggles the side navigation (for small screens).

- **src/js/pages/**  
  Page-specific logic (e.g., registration, profile, match, dashboard, contact).  
  - `registration.js` – Handles form validation, user creation, and localStorage updates.  
  - `profile.js` – Displays and edits user profile (avatar, notifications, etc.).  
  - `match.js` – Implements a Tinder-like swiping interface (gallery, filters, etc.).  
  - `match-dashboard.js` – Logic for the dashboard match list and filters.  
  - `dashboard.js` – Dashboard overview (e.g., summary, navigation).  
  - `contact.js` – Contact form (validation, submission, feedback).  
  - `index.js` – (Public) index page logic.

- **src/js/utils/**  
  Utility/helper functions.  
  - `extras.js` – Provides helper functions (e.g., adding items to a list).

- **src/css/**  
  Stylesheets for pages, themes, and components.  
  - **pages/** – CSS for each page (e.g., `index.css`, `match.css`, `profile.css`, `registration.css`, `contact.css`, `dashboard.css`, `login.css`).  
  - (No subfolders for components or themes currently.)

- **src/assets/**  
  Contains images and fonts.  
  - **images/** – (Subfolders: ui, stock, team.)  
  - **fonts/** – (Currently empty.)

- **src/pages/public/**  
  Main HTML files for the app (e.g., index, about, contact, match).  
  - `index.html` – Landing page.  
  - `about.html` – About page.  
  - `contact.html` – Contact form page.  
  - `match.html` – Public match page (Tinder-like interface).

- **src/pages/dashboard/**  
  Dashboard HTML pages (for logged-in users).  
  - `index.html` – Dashboard overview.  
  - `match.html` – Dashboard match page (with filters).  
  - `profile.html` – Profile page (edit user info, notifications).

- **src/pages/auth/**  
  Authentication-related HTML pages.  
  - `registration.html` – Registration page (new user signup).

### Running the App
1. Open any HTML file (e.g., `src/pages/public/index.html` or `src/pages/dashboard/index.html`) in your browser.  
2. No backend is required for basic demo functionality (the app uses localStorage).  
3. For email/contact, update the API endpoint in `contact.js`.

### Transitioning to React Native
Below are detailed steps and considerations for migrating the Unimates web app to React Native:

- **Componentization**  
  Convert each HTML/JS component (e.g., side menu, theme toggle, filter windows) into a React Native component. Use functional components and hooks (e.g., useState, useEffect) for state and lifecycle management.  
  - **Example:**  
    – Convert `theme-toggle.js` (which reads/writes localStorage) into a React Native component using React Context (or Redux) and AsyncStorage.  
    – Use a library (e.g., `react-native-appearance` or custom hooks) for theme switching.  
    – Use icons from `react-native-vector-icons`.

- **Navigation**  
  Use `react-navigation` (e.g., StackNavigator, DrawerNavigator) for page routing instead of HTML pages.  
  - **Example:**  
    – Convert the public and dashboard HTML pages into screens (e.g., `MatchScreen`, `ProfileScreen`, `RegistrationScreen`).  
    – Use a drawer (or bottom tab) for navigation (e.g., using `DrawerNavigator`).

- **State Management**  
  Use React Context (or Redux) for global state (e.g., user, theme, matches).  
  - **Example:**  
    – Create a global context (or Redux store) for user info, theme, and match data.  
    – Replace localStorage calls (e.g., in `profile.js`, `match.js`) with AsyncStorage (or API calls).

- **Storage**  
  Replace `localStorage` with `@react-native-async-storage/async-storage`.  
  - **Example:**  
    – In `registration.js`, store new user data in AsyncStorage (or send to a backend API).  
    – In `profile.js`, retrieve and update user data using AsyncStorage.

- **Styling**  
  Convert CSS (e.g., in `src/css/pages/`) into React Native `StyleSheet` objects. Use libraries (e.g., `styled-components/native`) for theming.  
  - **Example:**  
    – Convert CSS classes (e.g., `.profile`, `.match-card`) into inline styles or StyleSheet objects.  
    – Use Flexbox (React Native's default) for layout.

- **APIs**  
  Replace fetches to localStorage (or mock data) with real backend API calls (e.g., using `fetch` or `axios`).  
  - **Example:**  
    – In `contact.js`, send form data to a backend endpoint (update the URL).  
    – In `match.js`, fetch candidate profiles from an API (or mock data).

- **Assets**  
  Move images (from `src/assets/images/`) and fonts (if any) to the React Native assets directory. Use `require()` (or remote URIs) for images.  
  - **Example:**  
    – Move images (e.g., `ui/unimates.svg`, stock photos) into the RN assets folder.  
    – Use `require('./assets/images/ui/unimates.svg')` (or a remote URL) in your RN component.

- **Platform Differences**  
  Adjust for mobile UI/UX (e.g., touch, gestures, screen sizes).  
  - **Example:**  
    – Use `react-native-gesture-handler` (or similar) for swiping (e.g., in the match feature).  
    – Use `Modal` (or a bottom sheet) for modals (e.g., photo gallery, filters).  
    – Use `FlatList` (or `ScrollView`) for lists (e.g., candidate profiles).

### Visual Aids (Diagrams)
Below are conceptual diagrams (in ASCII art) to illustrate the migration:

```
┌─────────────────────────────────────────────────────────────┐
│ (Web App)                                                   │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ HTML Pages  │ │ JS (DOM)    │ │ CSS         │            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ (React Native App)                                          │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ RN Screens  │ │ RN Components│ │ RN StyleSheet│            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### Code Snippets (Migration Examples)
Below are brief code snippets (in JavaScript) to illustrate migration:

- **Converting a Theme Toggle (Web)**  
  (In `theme-toggle.js` (Web))  
  (Reads/writes localStorage, updates DOM.)  
  (Example (pseudo) code:)

  ```js
  // (Web) theme-toggle.js (pseudo)
  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = (currentTheme === "light") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    // (update icon, etc.)
  };
  ```

- **Converting a Theme Toggle (React Native)**  
  (In a RN component (e.g., `ThemeToggle.js`))  
  (Uses AsyncStorage, React Context (or Redux), and RN icons.)  
  (Example (pseudo) code:)

  ```jsx
  // (RN) ThemeToggle.js (pseudo)
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useTheme } from './ThemeContext'; // (or Redux)
  import Icon from 'react-native-vector-icons/MaterialIcons';

  const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = async () => {
       const newTheme = (theme === "light") ? "dark" : "light";
       await AsyncStorage.setItem("theme", newTheme);
       setTheme(newTheme);
    };
    return (
       <TouchableOpacity onPress={toggleTheme}>
         <Icon name={theme === "light" ? "dark_mode" : "light_mode"} size={24} />
       </TouchableOpacity>
    );
  };
  ```

- **Converting a Profile (Web)**  
  (In `profile.js` (Web))  
  (Reads user data from localStorage, updates DOM.)  
  (Example (pseudo) code:)

  ```js
  // (Web) profile.js (pseudo)
  const loadProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
       document.getElementById("username").textContent = user.name;
       document.getElementById("email").textContent = user.email;
       // (update avatar, etc.)
    }
  };
  ```

- **Converting a Profile (React Native)**  
  (In a RN screen (e.g., `ProfileScreen.js`))  
  (Uses AsyncStorage (or API), React state, and RN components.)  
  (Example (pseudo) code:)

  ```jsx
  // (RN) ProfileScreen.js (pseudo)
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useState, useEffect } from 'react';
  import { View, Text, TextInput, Switch, TouchableOpacity } from 'react-native';

  const ProfileScreen = () => {
    const [user, setUser] = useState({ name: "", email: "" });
    useEffect(() => {
       const loadProfile = async () => {
         const userData = await AsyncStorage.getItem("user");
         if (userData) setUser(JSON.parse(userData));
       };
       loadProfile();
    }, []);
    return (
       <View>
         <Text>Name: {user.name}</Text>
         <Text>Email: {user.email}</Text>
         {/* (avatar, notifications, etc.) */}
       </View>
    );
  };
  ```

---

See each feature's `.md` file (e.g., `match.md`, `profile.md`, `registration.md`, `components.md`, `contact.md`, `utils.md`) for further detailed migration notes and code comments. 