import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, remove, onValue, set, onDisconnect } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBQmP2YgChWdkUyOyR5msGoog68KzNjDlk",
  authDomain: "chat-ab2b7.firebaseapp.com",
  databaseURL: "https://chat-ab2b7-default-rtdb.firebaseio.com/",
  projectId: "chat-ab2b7",
  storageBucket: "chat-ab2b7.firebasestorage.app",
  messagingSenderId: "978470856109",
  appId: "1:978470856109:web:b8e64269b09ffd5225ed24",
  measurementId: "G-S46Z82JYKW"
};

// 🔧 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const toggleBtn = document.getElementById("toggleMode");
const messageInput = document.getElementById("message");
const chatBox = document.getElementById("chatBox");
const statusText = document.getElementById("status");

// ✅ Online presence tracking
const userId = "user_" + Math.floor(Math.random() * 10000);
const userRef = ref(db, "presence/" + userId);
set(userRef, true);
onDisconnect(userRef).remove();

// 🟢 Detect if someone is online
const presenceRef = ref(db, "presence");
onValue(presenceRef, (snapshot) => {
  const onlineUsers = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
  if (onlineUsers > 1) {
    statusText.textContent = "🟢 Friend is online";
    statusText.className = "online";
  } else {
    statusText.textContent = "🔴 Friend is offline";
    statusText.className = "offline";
  }
});

// 🚀 Send Message
sendBtn.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if (msg) {
    push(ref(db, "messages"), msg);
    messageInput.value = "";
  }
});

// 📩 Receive Messages
onChildAdded(ref(db, "messages"), (data) => {
  const msgDiv = document.createElement("div");
  msgDiv.textContent = data.val();
  msgDiv.className = "message";
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// 🧹 Clear Chat
clearBtn.addEventListener("click", () => {
  remove(ref(db, "messages"));
  chatBox.innerHTML = "";
});

// 🌙 Toggle Dark Mode
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
