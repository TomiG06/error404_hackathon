# Registration Feature Documentation

## Overview
The Registration feature allows new users to create an account by providing their username, email, password, and university. It includes validation, password strength checking, and duplicate email prevention.

## Involved Files
- `src/pages/auth/registration.html`: Registration page.
- `src/js/pages/registration.js`: Handles form validation, user creation, and localStorage updates.
- `src/css/pages/registration.css`: Styles for the registration form.

## How It Works
- **Form Fields**: Username, email, password, confirm password, university.
- **Validation**: Checks for required fields, valid email, strong password, and matching passwords.
- **Duplicate Check**: Prevents registration with an already registered email.
- **Persistence**: Stores new user in localStorage and logs them in.
- **Feedback**: Shows success/error messages and disables the submit button during processing.

## Transitioning to React Native
- **UI**: Use `TextInput`, `Picker` (or `react-native-picker-select`), and `Button` for the form.
- **Validation**: Use form state and validation libraries like `yup` or custom logic.
- **Storage**: Use `@react-native-async-storage/async-storage` or connect to a backend API for real registration.
- **Feedback**: Use `Alert` or custom components for messages.
- **Navigation**: Use `react-navigation` to move to the login or main app after registration.
- **Password Strength**: Use a progress bar or color indicator for password strength.

### Example Migration Steps
1. Create a `RegistrationScreen` component.
2. Use controlled components for form fields.
3. Validate input on submit and show errors inline.
4. Store user data in AsyncStorage or send to backend.
5. Navigate to the main app or login screen on success.

See the code comments in `registration.js` for more details on logic. 