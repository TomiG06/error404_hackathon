# Contact Feature Documentation

## Overview
The Contact feature allows users to send messages to the site administrators via a contact form. It includes form validation and feedback messages.

## Involved Files
- `src/pages/public/contact.html`: Contact page.
- `src/js/pages/contact.js`: Handles form validation, submission, and feedback.
- `src/css/pages/contact.css`: Styles for the contact form.

## How It Works
- **Form Fields**: Name, email, subject (optional), message.
- **Validation**: Checks for required fields and valid email format.
- **Submission**: Sends data to a backend API endpoint (update the URL in `contact.js`).
- **Feedback**: Shows success or error messages and disables the submit button during processing.

## Transitioning to React Native
- **UI**: Use `TextInput` and `Button` for the form.
- **Validation**: Use form state and validation libraries like `yup` or custom logic.
- **Submission**: Use `fetch` or `axios` to send data to the backend API.
- **Feedback**: Use `Alert` or custom components for messages.
- **Navigation**: Use `react-navigation` to return to the main app after sending a message.

### Example Migration Steps
1. Create a `ContactScreen` component.
2. Use controlled components for form fields.
3. Validate input on submit and show errors inline.
4. Send data to the backend API using `fetch`.
5. Show success or error messages using `Alert` or a custom component.

See the code comments in `contact.js` for more details on logic. 