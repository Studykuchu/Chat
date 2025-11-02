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
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "https://cdn-icons-png.flaticon.com/512/1827/1827349.png"
  });
});