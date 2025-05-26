# Utility Functions Documentation

## Overview
This document covers the utility functions in the app, their purpose, and how to migrate them to React Native.

---

## Extras (`extras.js`)
- **Purpose**: Provides helper functions for UI features, such as adding items to a list.
- **How it works**: Manipulates the DOM to add new list items based on user input.
- **React Native Migration**:
  - Use React state to manage lists instead of direct DOM manipulation.
  - Use `FlatList` or `ScrollView` to render dynamic lists.
  - Use `TextInput` and `Button` for user input.
  - Update the list state on button press to add new items.

---

See the code comments in `extras.js` for more details and logic. 