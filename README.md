# 📝 Todo App (React Native + Convex + Expo)

A clean and responsive Todo List app with light/dark mode, real-time database using Convex, and mobile/web support via Expo. Styled to match the provided Figma design.

---

## ✨ Features

- ✅ Add, complete, and delete todos
- ✅ Light & dark theme toggle 🌗
- ✅ Drag-and-drop reordering (optional)
- ✅ Filter: All / Active / Completed
- ✅ Clear completed tasks
- ✅ Real-time sync using Convex
- ✅ Mobile (Expo Go) & Web support
Link to the sites
---

## 🧱 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Convex](https://convex.dev/)
- [Styled-components](https://styled-components.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ikumtech/React-Native-Todo-App.git
cd todo-app

npm install
npx convex dev       # Start Convex backend
npx expo start --web # Run web version


Mobile (Expo Go)

Start Convex:

npx convex dev


Start Expo:

npx expo start


Scan the QR code in the terminal or browser using Expo Go (iOS/Android)

 Environment Variables

Create a .env.local file in the root:

# .env.local
EXPO_PUBLIC_CONVEX_URL=https://vivid-swan-243.convex.cloud


Ensure client.ts reads from this:

import { ConvexReactClient } from 'convex/react';
import Constants from 'expo-constants';

const convex = new ConvexReactClient(
  Constants.expoConfig?.extra?.convexUrl || process.env.EXPO_PUBLIC_CONVEX_URL!
);

export default convex;


Also expose it in app.config.js:

export default {
  expo: {
    name: "Todo App",
    slug: "todo-app",
    extra: {
      convexUrl: process.env.EXPO_PUBLIC_CONVEX_URL,
    },
  },
};

Convex Setup

If you haven’t yet:

Install Convex CLI:

npm install -g convex


Login / init Convex:

npx convex dev


This will generate:

convex/ folder

convex/_generated/ types

.env.local 



// convex/functions.ts
export const createTodo = mutation({...})
export const getTodos = query({...})


For details: https://docs.convex.dev/





🎨 Figma Design

If applicable:

Figma Design Link:  https://www.figma.com/design/NRbd5hcrQcAa1LBbctUhf9/todo-app?node-id=0-1&p=f&t=qkGLyEcOqqJn30ft-0 

 Build Commands
Web Production Build
expo export:web

Mobile Build (optional)

 Configure EAS if needed for building iOS/Android

 License

MIT License
© 2025 Abideen Ikumogunniyi

 Author

Built by Ikumtech
 


---

### ✅ Next Steps:
- Replace `https://your-convex-url.convex.cloud` with your actual Convex URL
- Add real Figma link and GitHub link if publishing
- Drop screenshots if desired