# Match Feature Documentation

## Overview
The Match feature allows users to browse potential roommates in a Tinder-like interface, view profiles, and like or skip candidates. It includes filtering by interests and preferences.

## Involved Files
Below is a detailed breakdown of the files involved:

- **src/pages/public/match.html**  
  – Main public match page (HTML structure, includes links to CSS and JS).  
  – Contains a container for profile cards, a filter header, and a side menu.

- **src/pages/dashboard/match.html**  
  – Dashboard match page (for logged-in users).  
  – Displays a list (or grid) of potential matches (with compatibility bars, actions, etc.).

- **src/js/pages/match.js**  
  – Main logic for the Tinder-like swiping, gallery, and profile display.  
  – (Pseudo) code (example):  
    – Fetches candidate profiles (from localStorage or a mock API).  
    – Renders a stack of profile cards (using CSS transforms for "swipe" animations).  
    – Handles "like" and "skip" actions (updates localStorage).  
    – Opens a modal (or overlay) for a photo gallery (on click).  
    – Integrates with filter logic (e.g., from `filter-header.js` and `filter-window.js`).

- **src/js/pages/match-dashboard.js**  
  – Logic for the dashboard match list (and filters).  
  – (Pseudo) code (example):  
    – Fetches (or filters) a list of candidates (from localStorage or a mock API).  
    – Renders a list (or grid) (using a loop over candidate data).  
    – Displays compatibility bars (or badges) (e.g., based on common interests).  
    – Handles actions (e.g., "like", "skip", "view profile").

- **src/css/pages/match.css**  
  – Styles for the match interface (e.g., card layout, gallery overlay, filter panel).  
  – (Pseudo) CSS (example):  
    – `.profile-card { display: flex; flex-direction: column; border-radius: 8px; box-shadow: 0 2px 4px; }`  
    – `.gallery { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); }`  
    – (and so on).

- **Components (in src/js/components/)**  
  – **filter-header.js** – Header with a toggle (or button) to show/hide filters.  
  – **filter-window.js** – A draggable (or modal) window for filtering candidates (e.g., by interests, university, budget).  
  – **side-menu.js** – Displays user info, navigation links, and (optionally) logout.  
  – (and others, e.g., `burger-menu.js`).

## How It Works
Below is a conceptual breakdown (with pseudo code and diagrams) of how the Match feature works:

### Profile Cards (Tinder-like Swiping)
- **Profile Data**  
  – (Pseudo) data (example):  
    – An array (or object) of candidate profiles (e.g.,  
      ```js
      const candidates = [
         { id: 1, name: "Alice", bio: "CS Student, loves hiking", images: ["alice1.jpg", "alice2.jpg"] },
         { id: 2, name: "Bob", bio: "Math Student, loves music", images: ["bob1.jpg", "bob2.jpg"] },
         // (and so on)
      ];
      ```
    – (In a real app, fetch from an API or AsyncStorage.)

- **Rendering Cards**  
  – (Pseudo) code (example):  
    – Loop over candidates (or a slice) and render a "card" (e.g., a `<div>` with CSS classes).  
    – (Example (pseudo) HTML:)  
      ```html
      <div class="profile-card" data-id="1">
         <img src="alice1.jpg" alt="Alice" />
         <h2>Alice</h2>
         <p>CS Student, loves hiking</p>
         <button class="like">Like</button>
         <button class="skip">Skip</button>
      </div>
      ```
    – (In RN, use a `<View>` (or a custom component) with a `<Text>` and `<Image>`.)

- **Swiping (or Buttons)**  
  – (Pseudo) code (example (Web)):  
    – (Using CSS transforms (or a library) to "swipe" a card (e.g., on button click).)  
    – (Example (pseudo) JS (in `match.js`):)  
      ```js
      const swipe = (id, action) => {
         const card = document.querySelector(`.profile-card[data-id="${id}"]`);
         if (card) {
            // (animate (e.g., slide out) the card (using CSS or a library).)
            // (update localStorage (e.g., add to "likes" or "skips").)
         }
      };
      ```
    – (In RN, use a library (e.g., `react-native-deck-swiper`) or gesture handlers (e.g., `react-native-gesture-handler`) for swiping.)

### Gallery (Modal Overlay)
- **Gallery Trigger**  
  – (Pseudo) code (example (Web)):  
    – (On click (or tap) on a profile image, open a modal (or overlay) (e.g., a `<div class="gallery">`).)  
    – (Example (pseudo) JS (in `match.js`):)  
      ```js
      const openGallery = (images) => {
         const gallery = document.createElement("div");
         gallery.className = "gallery";
         images.forEach(img => {
            const imgEl = document.createElement("img");
            imgEl.src = img;
            gallery.appendChild(imgEl);
         });
         document.body.appendChild(gallery);
         // (add a close button (or click outside) to remove the gallery.)
      };
      ```
    – (In RN, use a `<Modal>` (or a custom overlay) to display a gallery (e.g., using `<FlatList>` or `<ScrollView>`).)

### Filters (Filter Header & Filter Window)
- **Filter Header**  
  – (Pseudo) code (example (Web)):  
    – (A header (or button) (e.g., in `filter-header.js`) toggles the visibility of a filter panel (or window).)  
    – (Example (pseudo) JS (in `filter-header.js`):)  
      ```js
      const toggleFilter = () => {
         const filterPanel = document.querySelector(".filter-panel");
         if (filterPanel) filterPanel.classList.toggle("visible");
      };
      ```
    – (In RN, use a collapsible panel (or a `<Modal>`) (e.g., using a state variable) for filters.)

- **Filter Window (Draggable)**  
  – (Pseudo) code (example (Web)):  
    – (A draggable window (e.g., in `filter-window.js`) (using mouse events) (e.g., "mousedown", "mousemove", "mouseup").)  
    – (Example (pseudo) JS (in `filter-window.js`):)  
      ```js
      const filterWindow = document.querySelector(".filter-window");
      let isDragging = false, offsetX, offsetY;
      filterWindow.addEventListener("mousedown", (e) => {
         isDragging = true;
         offsetX = e.clientX – filterWindow.offsetLeft;
         offsetY = e.clientY – (filterWindow.offsetTop);
      });
      document.addEventListener("mousemove", (e) => {
         if (isDragging) {
            filterWindow.style.left = (e.clientX – offsetX) + "px";
            filterWindow.style.top = (e.clientY – offsetY) + "px";
         }
      });
      document.addEventListener("mouseup", () => { isDragging = false; });
      ```
    – (In RN, use a modal (or a bottom sheet) (e.g., using `react-native-gesture-handler`) for a draggable filter panel.)

### Dashboard (Match List)
- **Dashboard Logic (in `match-dashboard.js`)**  
  – (Pseudo) code (example (Web)):  
    – (Fetch (or filter) a list (or grid) of candidates (e.g., from localStorage or a mock API).)  
    – (Loop over candidates and render a "card" (or row) (e.g., a `<div>` with compatibility bars, actions).)  
    – (Example (pseudo) JS (in `match-dashboard.js`):)  
      ```js
      const renderDashboard = () => {
         const candidates = JSON.parse(localStorage.getItem("candidates")) || [];
         const container = document.querySelector(".dashboard-container");
         container.innerHTML = "";
         candidates.forEach(c => {
            const card = document.createElement("div");
            card.className = "dashboard-card";
            card.innerHTML = `
               <h3>${c.name}</h3>
               <p>${c.bio}</p>
               <div class="compatibility" style="width: ${c.score}%;"></div>
               <button class="action">Like</button>
            `;
            container.appendChild(card);
         });
      };
      ```
    – (In RN, use a `<FlatList>` (or `<ScrollView>`) (e.g., with a custom "card" component) for the dashboard.)

## Transitioning to React Native
Below are detailed steps (with diagrams and code snippets) for migrating the Match feature to React Native:

### UI (Profile Cards & Swiping)
- **Profile Cards**  
  – Convert HTML (e.g., a `<div class="profile-card">`) into a RN component (e.g., a `<View>` with `<Text>`, `<Image>`, and `<TouchableOpacity>`).  
  – (Example (pseudo) RN (in a `ProfileCard.js` component):)  
    ```jsx
    import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
    const ProfileCard = ({ candidate, onLike, onSkip }) => (
       <View style={styles.card}>
         <Image source={{ uri: candidate.images[0] }} style={styles.image} />
         <Text style={styles.name}>{ candidate.name }</Text>
         <Text style={styles.bio}>{ candidate.bio }</Text>
         <View style={styles.actions}>
            <TouchableOpacity onPress={() => onSkip(candidate.id)} style={styles.skipButton}>
               <Text>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onLike(candidate.id)} style={styles.likeButton}>
               <Text>Like</Text>
            </TouchableOpacity>
         </View>
       </View>
    );
    const styles = StyleSheet.create({ card: { flexDirection: 'column', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 2, padding: 16, margin: 8, backgroundColor: 'white' }, image: { width: 200, height: 200, borderRadius: 8 }, name: { fontSize: 18, fontWeight: 'bold' }, bio: { marginTop: 4 }, actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 } });
    export default ProfileCard;
    ```
  – (Use a library (e.g., `react-native-deck-swiper`) (or gesture handlers) for "swiping" (or "like"/"skip" buttons).)

- **Gallery (Modal)**  
  – Use a `<Modal>` (or a custom overlay) (e.g., a `<View>` with a `<FlatList>` (or `<ScrollView>`) of images).  
  – (Example (pseudo) RN (in a `GalleryModal.js` component):)  
    ```jsx
    import { Modal, View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
    const GalleryModal = ({ visible, images, onClose }) => (
       <Modal visible={visible} transparent={true} animationType="fade">
         <View style={styles.modalContainer}>
            <FlatList
               data={images}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item }) => <Image source={{ uri: item }} style={styles.galleryImage} />}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
               <Text>Close</Text>
            </TouchableOpacity>
         </View>
       </Modal>
    );
    const styles = StyleSheet.create({ modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }, galleryImage: { width: 300, height: 300, margin: 4, borderRadius: 8 }, closeButton: { position: 'absolute', top: 40, right: 20, padding: 8, backgroundColor: 'white', borderRadius: 4 } });
    export default GalleryModal;
    ```

### Filters (Filter Header & Filter Window)
- **Filter Header**  
  – Convert a header (or button) (e.g., in `filter-header.js`) into a RN component (e.g., a `<View>` with a `<TouchableOpacity>`).  
  – (Example (pseudo) RN (in a `FilterHeader.js` component):)  
    ```jsx
    import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
    const FilterHeader = ({ onToggleFilter }) => (
       <View style={styles.header}>
         <TouchableOpacity onPress={onToggleFilter} style={styles.toggleButton}>
            <Text>Filter</Text>
         </TouchableOpacity>
       </View>
    );
    const styles = StyleSheet.create({ header: { flexDirection: 'row', justifyContent: 'flex-end', padding: 8, backgroundColor: '#f0f0f0' }, toggleButton: { padding: 8, backgroundColor: 'white', borderRadius: 4 } });
    export default FilterHeader;
    ```

- **Filter Window (Modal or Bottom Sheet)**  
  – Use a `<Modal>` (or a bottom sheet (e.g., using a library like `react-native-modal` or `react-native-gesture-handler`)) for a filter panel.  
  – (Example (pseudo) RN (in a `FilterModal.js` component):)  
    ```jsx
    import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
    const FilterModal = ({ visible, onClose, onApplyFilter }) => (
       <Modal visible={visible} transparent={true} animationType="slide">
         <View style={styles.modalContainer}>
            <View style={styles.filterPanel}>
               <Text style={styles.title}>Filter Matches</Text>
               {/* (e.g., use a Picker (or react-native-picker-select) for "University", a Slider for "Budget", etc.) */}
               <TouchableOpacity onPress={onApplyFilter} style={styles.applyButton}>
                  <Text>Apply</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text>Close</Text>
               </TouchableOpacity>
            </View>
         </View>
       </Modal>
    );
    const styles = StyleSheet.create({ modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }, filterPanel: { width: '80%', backgroundColor: 'white', borderRadius: 8, padding: 16 }, title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 }, applyButton: { marginTop: 16, padding: 8, backgroundColor: 'green', borderRadius: 4, alignItems: 'center' }, closeButton: { marginTop: 8, padding: 8, backgroundColor: 'red', borderRadius: 4, alignItems: 'center' } });
    export default FilterModal;
    ```

### Dashboard (Match List)
- **Dashboard (FlatList or ScrollView)**  
  – Convert a loop (or grid) (e.g., in `match-dashboard.js`) into a RN `<FlatList>` (or `<ScrollView>`) (e.g., with a custom "card" component).  
  – (Example (pseudo) RN (in a `DashboardScreen.js` component):)  
    ```jsx
    import { FlatList, View, StyleSheet } from 'react-native';
    import DashboardCard from './DashboardCard'; // (a custom component for a "card" (or row).)
    const DashboardScreen = () => {
       const [candidates, setCandidates] = useState([]);
       useEffect(() => {
          // (fetch (or filter) candidates (e.g., from AsyncStorage or an API).)
          const loadCandidates = async () => {
             const data = await AsyncStorage.getItem("candidates");
             if (data) setCandidates(JSON.parse(data));
          };
          loadCandidates();
       }, []);
       return (
          <FlatList
             data={candidates}
             keyExtractor={(item) => item.id.toString()}
             renderItem={({ item }) => <DashboardCard candidate={item} />}
             contentContainerStyle={styles.list}
          />
       );
    };
    const styles = StyleSheet.create({ list: { padding: 8 } });
    export default DashboardScreen;
    ```

### Visual Aids (Diagrams)
Below are conceptual diagrams (in ASCII art) to illustrate the migration:

```
┌─────────────────────────────────────────────────────────────┐
│ (Web Match Feature)                                         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ HTML (Cards)│ │ JS (Swipe)  │ │ CSS (Modal) │            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ (RN Match Feature)                                          │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ RN Component│ │ RN Gesture  │ │ RN Modal    │            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

See the code comments in `match.js` (and `match-dashboard.js`) for further details on logic. 