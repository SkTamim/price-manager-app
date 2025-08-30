# Price Manager (React Native CLI) 📱

A modern, cross-platform mobile application for personal price management, built from the ground up with the React Native CLI. This project provides a seamless experience for tracking product prices on the go, connecting to a robust Firebase backend.

![App Screenshot Placeholder](https://user-images.githubusercontent.com/2633304/134212953-33318f13-79e5-4a7a-a621-b4c6c21e25e9.png)
_(Suggestion: Replace the image link above with a real screenshot of your beautiful login screen!)_

---

## ✨ Features

- **Firebase Authentication:** Secure user login and signup with Email/Password.
- **Protected Routes:** A robust navigation stack that separates public (auth) and private (main app) routes.
- **Real-time Database:** Add and view products in real-time using Firestore's `onSnapshot` listener.
- **Modern UI/UX:** A beautiful, modern user interface built with:
  - **React Native Paper:** For a consistent, Material Design component library.
  - **Custom Fonts:** Using "Agbalumo" for headings and "Poppins" for body text.
  - **Advanced Styling:** A clean, two-panel layout on authentication screens.
  - **User-Friendly Feedback:** Global snackbar system for non-disruptive notifications.
- **Native Functionality:** Built with the React Native CLI for full control over the native project.

---

## 🛠️ Tech Stack

- **Framework:** React Native CLI
- **Backend:** Firebase (Authentication, Firestore)
- **UI Library:** React Native Paper
- **Navigation:** React Navigation (`Stack` & `Bottom Tabs`)
- **Styling:** React Native StyleSheet
- **Icons:** `react-native-vector-icons`
- **Assets:** SVG illustrations via `react-native-svg`

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have a complete React Native development environment set up for your OS by following the **[official guide](https://reactnative.dev/docs/environment-setup)**. This includes:

- Node.js (LTS version)
- JDK (Version 17 is recommended)
- Android Studio (for the Android SDK and emulator)
- A configured Android emulator or a physical device with USB debugging enabled.

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/your-username/priceManager.git](https://github.com/your-username/priceManager.git)
    cd priceManager
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Set up your environment variables**

    - Create a file named `.env` in the root of the project.
    - Add your Firebase project credentials.
      ```env
      REACT_APP_API_KEY="YOUR_API_KEY"
      REACT_APP_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
      REACT_APP_PROJECT_ID="YOUR_PROJECT_ID"
      REACT_APP_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
      REACT_APP_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
      REACT_APP_APP_ID="YOUR_APP_ID"
      ```

4.  **Set up Firebase for Android**

    - Go to your Firebase project settings.
    - Download your `google-services.json` file.
    - Place it in the **`android/app`** directory.

5.  **Link Custom Fonts**
    ```sh
    npx react-native-asset
    ```

### Running the App

1.  **Start the Metro Server**
    - Open a terminal in your project root and run:
    ```sh
    npx react-native start
    ```
2.  **Run on Android**
    - Make sure you have an Android emulator running or a physical device connected.
    - Open a **second terminal** and run:
    ```sh
    npx react-native run-android
    ```
