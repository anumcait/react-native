# 🛍️ Fashion Shopping App

A clean and functional **React Native** mobile shopping app integrated with **Firebase Authentication** (Email & Google Sign-In), using **FakeStoreAPI** to display real-time fashion products.

> 📍 GitHub Repo: [anumcait/react-native/LoginApp](https://github.com/anumcait/react-native/tree/master/LoginApp)

---

## ✨ Features

- 🔐 Firebase Email Authentication
- 📦 Product listing via [FakeStoreAPI](https://fakestoreapi.com/)
- 🧭 Category selection: Men's, Women's, Jewelry, Electronics
- 🛍️ Add to cart, view cart, and checkout functionality
- 🎨 Beautiful UI with background image and smooth navigation
- 📱 APK-ready for real device deployment

---

## 📸 Screenshots

_Here is entire workflow :: running the app:_

- Login Screen  
- Product Listing Page  
- Cart Page
<img src="./screenshots/output.gif" height="500" alt="App Walkthrough" />

```markdown

🛠️ Tech Stack
React Native

Firebase Authentication

FakeStoreAPI

React Navigation

React Native Vector Icons

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/anumcait/react-native.git
cd react-native/LoginApp
npm install
🔑 Firebase Setup
Create a Firebase project at Firebase Console

Enable Email/Password under Authentication

Add your Android app:

Use your app’s package name (e.g., com.loginapp)

Download the google-services.json file

Place it in your project at: android/app/google-services.json

Make sure your android/build.gradle and android/app/build.gradle files are configured for Firebase (most of this is already set up if you followed docs).

▶️ Running the App

# Start Metro bundler
npx react-native start

# In a new terminal:
npx react-native run-android
🔄 Ensure an Android emulator or physical device is connected.

📦 Build APK
To generate a debug APK:

cd android
./gradlew assembleDebug
You’ll find the APK in:
android/app/build/outputs/apk/debug/app-debug.apk

🙌 Thanks To
FakeStoreAPI – for product data
Unsplash – for beautiful background images

👤 Author
Anumcait
DevOps Engineer | ERP Application Developer

🔗 LinkedIn

📂 GitHub

🏷 License
This project is licensed under the MIT License