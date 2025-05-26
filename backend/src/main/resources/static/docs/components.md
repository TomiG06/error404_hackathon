# UI Components Documentation

## Overview
This document covers the main reusable UI components in the app, their purpose, how they work, and how to migrate them to React Native.

---

## Theme Toggle (`theme-toggle.js`)
- **Purpose**: Switches between dark and light themes, persists user preference.
- **How it works**: Reads/writes `localStorage`, updates the `data-theme` attribute, and changes the toggle icon.
- **React Native Migration**:
  - Use React Context or a state manager for theme.
  - Use `@react-native-async-storage/async-storage` for persistence.
  - Use a library like `react-native-appearance` or custom hooks for theme switching.
  - Use icons from `react-native-vector-icons`.

---

## Side Menu (`side-menu.js`)
- **Purpose**: Displays user info, navigation links, and handles login/logout.
- **How it works**: Reads user data from `localStorage`, updates DOM, and manages logout.
- **React Native Migration**:
  - Use a `DrawerNavigator` or custom sidebar with `react-navigation`.
  - Store user info in global state/context.
  - Use `TouchableOpacity` for links and buttons.
  - Use avatar libraries or custom components for user initials.

---

## Filter Window (`filter-window.js`)
- **Purpose**: Draggable window for filtering matches by interests.
- **How it works**: Handles mouse events for dragging, constrains movement, and allows closing.
- **React Native Migration**:
  - Use a modal or bottom sheet for filters.
  - Use gesture handlers (`react-native-gesture-handler`) for drag.
  - Use state for open/close and filter values.

---

## Filter Header (`filter-header.js`)
- **Purpose**: Header with a toggle to show/hide filters.
- **How it works**: Toggles filter window visibility, handles outside clicks and escape key.
- **React Native Migration**:
  - Use a collapsible panel or modal for filters.
  - Use state for visibility.
  - Use `TouchableOpacity` for toggles.

---

## Burger Menu (`burger-menu.js`)
- **Purpose**: Toggles the side navigation on small screens.
- **How it works**: Adds/removes the `expanded` class on the sidebar.
- **React Native Migration**:
  - Use a hamburger icon with `react-native-vector-icons`.
  - Use state to show/hide the drawer or sidebar.
  - Integrate with `DrawerNavigator` for navigation.

---

See each component's JS file for more details and code comments. 