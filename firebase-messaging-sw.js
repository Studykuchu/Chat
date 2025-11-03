// firebase-messaging-sw.js  (save in repo root)
importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBQmP2YgChWdkUyOyR5msGoog68KzNjDlk",
  authDomain: "chat-ab2b7.firebaseapp.com",
  projectId: "chat-ab2b7",
  storageBucket: "chat-ab2b7.firebasestorage.app",
  messagingSenderId: "978470856109",
  appId: "1:978470856109:web:b8e64269b09ffd5225ed24"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notification = payload.notification || {};
  const title = notification.title || 'New message';
  const options = {
    body: notification.body || '',
    icon: notification.icon || '/icon.png',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});
