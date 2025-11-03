// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBQmP2YgChWdkUyOyR5msGoog68KzNjDlk",
  authDomain: "chat-ab2b7.firebaseapp.com",
  projectId: "chat-ab2b7",
  storageBucket: "chat-ab2b7.firebasestorage.app",
  messagingSenderId: "978470856109",
  appId: "1:978470856109:web:b8e64269b09ffd5225ed24"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title || "New Message";
  const notificationOptions = {
    body: payload.notification.body || "Someone sent a message.",
    icon: "/icon.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
