# Profile Feature Documentation

## Overview
The Profile feature allows users to view and edit their personal information, preferences, and settings. It includes avatar display, editable fields (e.g., name, email, university), and notification settings. (In the demo, data is stored in localStorage.)

## Involved Files
Below is a detailed breakdown of the files involved:

- **src/pages/dashboard/profile.html**  
  – Main profile page (for logged-in users).  
  – Contains a container (or form) for displaying (and editing) user info (e.g., avatar, name, email, university, notifications).

- **src/js/pages/profile.js**  
  – Logic for displaying (and editing) profile data, notifications, and avatar.  
  – (Pseudo) code (example):  
    – Reads user data (e.g., from localStorage) (e.g.,  
      ```js
      const user = JSON.parse(localStorage.getItem("user")) || { name: "", email: "", university: "", notifications: false };
      ```
    – (In a real app, fetch from an API or AsyncStorage.)  
    – Updates the DOM (e.g., fills in `<input>` (or `<span>`) fields, toggles a "notifications" switch).  
    – (Example (pseudo) JS (in `profile.js`):)  
      ```js
      const loadProfile = () => {
         const user = JSON.parse(localStorage.getItem("user"));
         if (user) {
            document.getElementById("username").value = user.name;
            document.getElementById("email").value = user.email;
            document.getElementById("university").value = user.university;
            document.getElementById("notifications").checked = user.notifications;
            // (update avatar (e.g., display the first letter of the name).)
         }
      };
      ```
    – (In RN, use React state (e.g., useState) and AsyncStorage (or an API) to load (and update) user data.)

- **src/css/pages/profile.css**  
  – Styles for the profile interface (e.g., avatar, form layout, buttons).  
  – (Pseudo) CSS (example):  
    – `.avatar { width: 80px; height: 80px; border-radius: 50%; background: #ccc; display: flex; justify-content: center; align-items: center; font-size: 24px; }`  
    – `.profile-form { display: flex; flex-direction: column; gap: 16px; }`  
    – (and so on.)

## How It Works
Below is a conceptual breakdown (with pseudo code and diagrams) of how the Profile feature works:

### Profile Display (Avatar & Editable Fields)
- **Avatar**  
  – (Pseudo) code (example (Web)):  
    – (Display a "circle" (or a `<div class="avatar">`) (e.g., with the first letter of the user's name).)  
    – (Example (pseudo) JS (in `profile.js`):)  
      ```js
      const updateAvatar = (name) => {
         const avatar = document.querySelector(".avatar");
         if (avatar) avatar.textContent = name.charAt(0).toUpperCase();
      };
      ```
    – (In RN, use a `<View>` (or a custom component) (e.g., with a `<Text>` (or an `<Image>` (if a real avatar is used)).)

- **Editable Fields (Form)**  
  – (Pseudo) code (example (Web)):  
    – (A form (or a container) (e.g., a `<form class="profile-form">`) (with `<input>` (or `<span>`) fields (e.g., "Name", "Email", "University").)  
    – (Example (pseudo) HTML:)  
      ```html
      <form class="profile-form">
         <input id="username" placeholder="Name" />
         <input id="email" placeholder="Email" />
         <input id="university" placeholder="University" />
         <label>
            <input id="notifications" type="checkbox" /> Enable Notifications
         </label>
         <button type="submit">Save</button>
      </form>
      ```
    – (In RN, use `<TextInput>` (or `<Text>`) (and a `<Switch>` (for notifications)) (e.g., inside a `<View>` (or a `<ScrollView>`).)

- **Edit Mode (Toggle)**  
  – (Pseudo) code (example (Web)):  
    – (A "toggle" (or a button) (e.g., "Edit Profile") (switches "view" (or "display") mode to "edit" mode (e.g., by enabling (or disabling) `<input>` fields).)  
    – (Example (pseudo) JS (in `profile.js`):)  
      ```js
      const toggleEdit = () => {
         const inputs = document.querySelectorAll(".profile-form input");
         inputs.forEach(input => { input.disabled = !input.disabled; });
         const submitButton = document.querySelector(".profile-form button");
         if (submitButton) submitButton.disabled = !submitButton.disabled;
      };
      ```
    – (In RN, use a state variable (e.g., `isEditing`) (and a `<TouchableOpacity>` (or a `<Button>`) (to toggle "edit" mode).)

- **Notifications (Switch)**  
  – (Pseudo) code (example (Web)):  
    – (A `<input type="checkbox" id="notifications" />` (or a `<Switch>`) (toggles "notifications" (e.g., stored in localStorage).)  
    – (Example (pseudo) JS (in `profile.js`):)  
      ```js
      const toggleNotifications = () => {
         const notif = document.getElementById("notifications");
         if (notif) {
            const user = JSON.parse(localStorage.getItem("user")) || {};
            user.notifications = notif.checked;
            localStorage.setItem("user", JSON.stringify(user));
         }
      };
      ```
    – (In RN, use a `<Switch>` (e.g., from `react-native` (or a library)) (and update AsyncStorage (or an API) (on change).)

### Persistence (Storage)
- **Storage (localStorage (Demo) or AsyncStorage (RN))**  
  – (Pseudo) code (example (Web)):  
    – (On "Save" (or "Submit"), update (or store) user data (e.g., in localStorage).)  
    – (Example (pseudo) JS (in `profile.js`):)  
      ```js
      const saveProfile = () => {
         const user = {
            name: document.getElementById("username").value,
            email: document.getElementById("email").value,
            university: document.getElementById("university").value,
            notifications: document.getElementById("notifications").checked
         };
         localStorage.setItem("user", JSON.stringify(user));
         // (e.g., show a "Saved!" (or "Success") message.)
      };
      ```
    – (In RN, use AsyncStorage (or an API) (e.g.,  
      ```jsx
      const saveProfile = async () => {
         const user = { name, email, university, notifications };
         await AsyncStorage.setItem("user", JSON.stringify(user));
         // (e.g., show an Alert (or a custom message).)
      };
      ```
    – (and so on.)

## Transitioning to React Native
Below are detailed steps (with diagrams and code snippets) for migrating the Profile feature to React Native:

### UI (Avatar & Editable Fields)
- **Avatar**  
  – Convert a "circle" (or a `<div class="avatar">`) (e.g., in `profile.html`) into a RN component (e.g., a `<View>` (or a custom component) (with a `<Text>` (or an `<Image>`)).  
  – (Example (pseudo) RN (in a `Avatar.js` component):)  
    ```jsx
    import { View, Text, StyleSheet } from 'react-native';
    const Avatar = ({ name }) => (
       <View style={styles.avatar}>
         <Text style={styles.avatarText}>{ name.charAt(0).toUpperCase() }</Text>
       </View>
    );
    const styles = StyleSheet.create({ avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }, avatarText: { fontSize: 24, fontWeight: 'bold' } });
    export default Avatar;
    ```

- **Editable Fields (Form)**  
  – Convert a form (or a container) (e.g., a `<form class="profile-form">`) (with `<input>` (or `<span>`) fields) into a RN component (e.g., a `<View>` (or a `<ScrollView>`) (with `<TextInput>` (or `<Text>`) (and a `<Switch>` (for notifications)).)  
  – (Example (pseudo) RN (in a `ProfileForm.js` component):)  
    ```jsx
    import { View, TextInput, Switch, Text, TouchableOpacity, StyleSheet } from 'react-native';
    const ProfileForm = ({ user, isEditing, onToggleEdit, onSave, onToggleNotifications }) => (
       <View style={styles.form}>
         <TextInput
            value={user.name}
            placeholder="Name"
            editable={isEditing}
            onChangeText={(text) => onSave({ ...user, name: text })}
            style={styles.input}
         />
         <TextInput
            value={user.email}
            placeholder="Email"
            editable={isEditing}
            onChangeText={(text) => onSave({ ...user, email: text })}
            style={styles.input}
         />
         <TextInput
            value={user.university}
            placeholder="University"
            editable={isEditing}
            onChangeText={(text) => onSave({ ...user, university: text })}
            style={styles.input}
         />
         <View style={styles.switchContainer}>
            <Text>Enable Notifications</Text>
            <Switch value={user.notifications} onValueChange={onToggleNotifications} disabled={!isEditing} />
         </View>
         <TouchableOpacity onPress={onToggleEdit} style={styles.editButton}>
            <Text>{ isEditing ? "Cancel" : "Edit Profile" }</Text>
         </TouchableOpacity>
         { isEditing && (
            <TouchableOpacity onPress={onSave} style={styles.saveButton}>
               <Text>Save</Text>
            </TouchableOpacity>
         )}
       </View>
    );
    const styles = StyleSheet.create({ form: { flexDirection: 'column', gap: 16, padding: 16 }, input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }, switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, editButton: { padding: 8, backgroundColor: '#f0f0f0', borderRadius: 4, alignItems: 'center' }, saveButton: { padding: 8, backgroundColor: 'green', borderRadius: 4, alignItems: 'center' } });
    export default ProfileForm;
    ```

### Persistence (Storage (AsyncStorage))
- **Storage (AsyncStorage (or API))**  
  – (Pseudo) code (example (RN) (in a `ProfileScreen.js` component):)  
    – (On "Save" (or "Submit"), update (or store) user data (e.g., in AsyncStorage).)  
- **Profile Display**: Shows user name, email, university, and avatar.
- **Edit Mode**: Users can toggle edit mode to update their information.
- **Notifications**: Users can enable/disable notifications.
- **Avatar**: Displays the first letter of the user's name as an avatar.
- **Persistence**: Data is stored in localStorage (mocked for demo).

## Transitioning to React Native
- **UI**: Use `View`, `Text`, `TextInput`, `Switch`, and `TouchableOpacity` for layout and interactivity.
- **State**: Use React state/hooks for profile data and edit mode.
- **Storage**: Use `@react-native-async-storage/async-storage` for persistence.
- **Avatar**: Use libraries like `react-native-paper` or custom components for avatars.
- **Notifications**: Integrate with `react-native-push-notification` for real notifications.
- **Styling**: Convert CSS to `StyleSheet` or use `styled-components/native`.
- **Navigation**: Use `react-navigation` to access the profile screen from other parts of the app.

### Example Migration Steps
1. Create a `ProfileScreen` component.
2. Use `TextInput` for editable fields and `Switch` for toggles.
3. Store and retrieve user data from AsyncStorage.
4. Use a modal or separate screen for changing the password or deleting the account.
5. Integrate push notifications for real notification settings.

See the code comments in `profile.js` for more details on logic. 