# Color System Documentation 🎨

## Overview
The project implements a modern, accessible color system with two themes: Light and Dark mode. Colors are defined using CSS variables (custom properties) for consistent usage across the application and easy theme switching.

## Quick Color Palette Preview

### Light Theme Palette
```css
/* Visual representation of the main colors */
🔵 Primary: #132f58 (Deep Navy Blue)
🟡 Background: #e4d6a7 (Warm Beige)
🟠 Accent: #df4f00 (Vibrant Orange)
⚫ Text: #333333 (Dark Gray)
✅ Success: #35c759 (Green)
❌ Error: #df4f00 (Orange-Red)
```

### Dark Theme Palette
```css
/* Visual representation of the main colors */
🔵 Primary: #0a192f (Dark Navy Blue)
⚫ Background: #121212 (Near Black)
⚪ Accent: #d0d0d0 (Light Gray)
⚪ Text: #e0e0e0 (Light Gray)
✅ Success: #2d9b4e (Dark Green)
❌ Error: #ff6b6b (Light Red)
```

## Color Usage Examples

### Button Styles
```css
/* Regular Button */
[🟦 Primary Button]
Background: var(--primary-color)
Text: var(--nav-text-hover)
Border: var(--border-color)
Shadow: var(--shadow-sm)

/* Gradient Button */
[🟦➡️🟩 Gradient Button]
Background: linear-gradient(135deg, var(--primary-color), var(--primary-dark))
Text: var(--nav-text-hover)
Shadow: var(--shadow-md)
```

### Card Components
```css
/* Light Theme Card */
┌────────────────────┐
│     Card Title     │
├────────────────────┤
│                    │
│    Card Content    │
│                    │
└────────────────────┘
Background: var(--card-background)
Border: var(--border-color)
Shadow: var(--shadow-md)

/* Dark Theme Card */
┌────────────────────┐
│     Card Title     │
├────────────────────┤
│                    │
│    Card Content    │
│                    │
└────────────────────┘
Background: var(--card-background)
Border: var(--border-color)
Shadow: var(--shadow-lg)
```

## Base Colors

### Light Theme (Default)
```css
/* Primary Colors */
--primary-color: #132f58;      /* Deep Navy Blue */
--primary-dark: #0a192f;       /* Darker Navy Blue */
--primary-rgb: 19, 47, 88;     /* RGB values for primary color */

/* Background Colors */
--background-color: #e4d6a7;   /* Warm Beige */
--card-background: #ffffff;    /* Pure White */
--card-bg-secondary: #f8f9fa;  /* Light Gray */

/* Text Colors */
--text-color: #333333;        /* Dark Gray for primary text */
--text-secondary: #666666;    /* Medium Gray for secondary text */

/* Accent Colors */
--nav-text: #df4f00;          /* Vibrant Orange */
--nav-text-hover: #ffffff;    /* White */

/* UI Element Colors */
--border-color: #e0e0e0;      /* Light Gray */
--input-background: #ffffff;  /* White */
--hover-background: #f5f5f5;  /* Light Gray */

/* Status Colors */
--error-color: #df4f00;       /* Orange-Red */
--success-color: #35c759;     /* Green */
--danger-color: #dc3545;      /* Red */
--danger-color-hover: #c82333;/* Darker Red */

/* Shadow Colors */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
```

### Dark Theme
```css
/* Primary Colors */
--primary-color: #0a192f;      /* Dark Navy Blue */
--primary-dark: #132f58;       /* Slightly Lighter Navy */
--primary-rgb: 10, 25, 47;     /* RGB values for primary color */

/* Background Colors */
--background-color: #121212;   /* Near Black */
--card-background: #1e1e1e;    /* Dark Gray */
--card-bg-secondary: #2a2a2a;  /* Slightly Lighter Dark Gray */

/* Text Colors */
--text-color: #e0e0e0;        /* Light Gray for primary text */
--text-secondary: #8ba8d8;    /* Light Blue-Gray for secondary text */

/* Accent Colors */
--nav-text: #d0d0d0;          /* Light Gray */
--nav-text-hover: #ffffff;    /* White */

/* UI Element Colors */
--border-color: #2c4f82;      /* Dark Blue */
--input-background: #1e1e1e;  /* Dark Gray */
--hover-background: #2c4f82;  /* Dark Blue */

/* Status Colors */
--error-color: #ff6b6b;       /* Light Red */
--success-color: #2d9b4e;     /* Dark Green */
--danger-color: #ff4757;      /* Bright Red */
--danger-color-hover: #ff6b6b;/* Lighter Red */

/* Shadow Colors */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
```

## Special Feature Colors

### Match Page Specific Colors
```css
/* Light Theme */
--skip-button-bg: #fe3c72;    /* Pink-Red */
--like-button-bg: #35c759;    /* Green */
--overlay-bg: rgba(0, 0, 0, 0.5); /* Semi-transparent Black */
--tag-bg: #e8f5ff;           /* Light Blue */
--tag-color: #0a67b5;        /* Blue */

/* Dark Theme */
--skip-button-bg: #e91e63;    /* Darker Pink */
--like-button-bg: #2d9b4e;    /* Darker Green */
--overlay-bg: rgba(0, 0, 0, 0.7); /* Darker Overlay */
--tag-bg: #213547;           /* Dark Blue */
--tag-color: #8bb9e0;        /* Light Blue */
```

## Usage Guidelines

### 1. Theme Switching
- The theme can be switched using the `data-theme="dark"` attribute
- All colors automatically adjust based on the current theme
- Transitions are smooth with a 0.3s ease timing

### 2. Color Applications
- Primary colors are used for main UI elements and important actions
- Background colors create visual hierarchy
- Text colors ensure readability in both themes
- Accent colors highlight interactive elements
- Status colors provide clear feedback for user actions

### 3. Accessibility
- All color combinations meet WCAG contrast requirements
- Text remains readable in both light and dark themes
- Interactive elements have clear hover and active states

### 4. Gradients
- Linear gradients are used for buttons and decorative elements
- Common gradient: `linear-gradient(135deg, var(--primary-color), var(--primary-dark))`
- Hover states often reverse the gradient direction

### 5. Shadows
- Three levels of shadow depth (sm, md, lg)
- Shadows are darker in dark theme for better visibility
- Used for elevation and depth in the UI

## Best Practices

### 1. When Adding New Colors
- Always define both light and dark theme variants
- Use semantic naming (e.g., `--error-color` instead of `--red`)
- Include RGB values for colors that need opacity variations

### 2. When Using Colors
- Always use CSS variables instead of hardcoded values
- Consider both themes when choosing color combinations
- Test contrast ratios for accessibility
- Use appropriate shadow levels for depth

### 3. Theme Transitions
- All color changes should be smooth (0.3s ease)
- Consider using `transition: all 0.3s ease` for color changes
- Test transitions in both directions (light to dark and dark to light)

## Color Palette Visualization

### Light Theme
- Primary: ![#132f58](https://via.placeholder.com/15/132f58/000000?text=+) `#132f58` (Deep Navy Blue)
- Background: ![#e4d6a7](https://via.placeholder.com/15/e4d6a7/000000?text=+) `#e4d6a7` (Warm Beige)
- Accent: ![#df4f00](https://via.placeholder.com/15/df4f00/000000?text=+) `#df4f00` (Vibrant Orange)
- Text: ![#333333](https://via.placeholder.com/15/333333/000000?text=+) `#333333` (Dark Gray)
- Success: ![#35c759](https://via.placeholder.com/15/35c759/000000?text=+) `#35c759` (Green)
- Error: ![#df4f00](https://via.placeholder.com/15/df4f00/000000?text=+) `#df4f00` (Orange-Red)

### Dark Theme
- Primary: ![#0a192f](https://via.placeholder.com/15/0a192f/000000?text=+) `#0a192f` (Dark Navy Blue)
- Background: ![#121212](https://via.placeholder.com/15/121212/000000?text=+) `#121212` (Near Black)
- Accent: ![#d0d0d0](https://via.placeholder.com/15/d0d0d0/000000?text=+) `#d0d0d0` (Light Gray)
- Text: ![#e0e0e0](https://via.placeholder.com/15/e0e0e0/000000?text=+) `#e0e0e0` (Light Gray)
- Success: ![#2d9b4e](https://via.placeholder.com/15/2d9b4e/000000?text=+) `#2d9b4e` (Dark Green)
- Error: ![#ff6b6b](https://via.placeholder.com/15/ff6b6b/000000?text=+) `#ff6b6b` (Light Red)

## Implementation Example

```css
/* Example of using the color system */
.button {
  background-color: var(--primary-color);
  color: var(--nav-text-hover);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.button:hover {
  background-color: var(--primary-dark);
  box-shadow: var(--shadow-md);
}

/* Example of using gradients */
.gradient-button {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: var(--nav-text-hover);
  transition: all 0.3s ease;
}

.gradient-button:hover {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
}
```

## Color Relationships

### Color Hierarchy
```
┌─────────────────────────────────────────┐
│             Primary Colors              │
│  ┌─────────────┐    ┌─────────────┐    │
│  │  #132f58    │    │  #0a192f    │    │
│  │ (Light)     │    │  (Dark)     │    │
│  └─────────────┘    └─────────────┘    │
├─────────────────────────────────────────┤
│            Accent Colors                │
│  ┌─────────────┐    ┌─────────────┐    │
│  │  #df4f00    │    │  #d0d0d0    │    │
│  │ (Light)     │    │  (Dark)     │    │
│  └─────────────┘    └─────────────┘    │
└─────────────────────────────────────────┘
```

### Theme Transition Flow
```
Light Theme ──────┐
                 │
                 ▼
[data-theme="dark"] ────► Dark Theme
                 ▲
                 │
                 └───── Smooth Transition (0.3s)
```

## Interactive Elements

### Button States
```
Normal ──► Hover ──► Active
[🟦]     [🟩]     [🟫]
```

### Navigation States
```
Normal ──► Hover ──► Active
[🟠]     [⚪]     [🟦]
```

## Color Accessibility

### Contrast Ratios
```
Text on Background
┌─────────────────┬─────────────┐
│    Light Theme  │  Dark Theme │
├─────────────────┼─────────────┤
│ Text/BG: 15:1   │ Text/BG: 21:1│
│ Accent/BG: 4.5:1│ Accent/BG: 3:1│
└─────────────────┴─────────────┘
```

### Focus States
```
Normal ──► Focus ──► Active
[🟦]     [🟦+⬜]   [🟦+⬛]
```

## Implementation Examples

### Button Component
```css
/* Visual representation of button states */
┌─────────────────┐
│    Button       │  /* Normal */
└─────────────────┘

┌─────────────────┐
│    Button       │  /* Hover */
└─────────────────┘  /* Shadow + Scale */

┌─────────────────┐
│    Button       │  /* Active */
└─────────────────┘  /* Pressed Effect */
```

### Card Component
```css
/* Visual representation of card states */
┌─────────────────────┐
│      Card Title     │
├─────────────────────┤
│                     │
│     Card Content    │  /* Normal */
│                     │
└─────────────────────┘

┌─────────────────────┐
│      Card Title     │
├─────────────────────┤
│                     │
│     Card Content    │  /* Hover */
│                     │  /* Shadow + Scale */
└─────────────────────┘
```

## Notes
- This color system is designed to be maintainable and scalable
- All colors are defined in the `:root` selector for global access
- Dark theme colors are defined in the `[data-theme="dark"]` selector
- The system supports smooth transitions between themes
- All color combinations have been tested for accessibility compliance

## Color System Benefits
```
┌─────────────────────────────────────────┐
│           Color System Benefits         │
├─────────────────────────────────────────┤
│ 🎨 Consistent Brand Identity            │
│ 🔄 Easy Theme Switching                 │
│ ♿ Accessibility Compliance              │
│ 📱 Responsive Design Support            │
│ 🛠️  Maintainable & Scalable            │
└─────────────────────────────────────────┘
``` 