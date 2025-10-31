// Import Firebase SDKs directly from the web CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQmP2YgChWdkUyOyR5msGoog68KzNjDlk",
  authDomain: "chat-ab2b7.firebaseapp.com",
  databaseURL: "https://chat-ab2b7-default-rtdb.firebaseio.com", // 👈 You must add this line manually
  projectId: "chat-ab2b7",
  storageBucket: "chat-ab2b7.firebasestorage.app",
  messagingSenderId: "978470856109",
  appId: "1:978470856109:web:b8e64269b09ffd5225ed24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "messages");

// Prompt user for name
let name = prompt("Enter your name:") || "User";

// Send a message
window.send = function () {
  const msgInput = document.getElementById("msg");
  const msg = msgInput.value.trim();
  if (!msg) return;
  push(chatRef, { name, msg });
  msgInput.value = "";
};

// Listen for new messages
onChildAdded(chatRef, (data) => {
  const chatBox = document.getElementById("chat-box");
  const msgData = data.val();
  const div = document.createElement("div");
  div.className = "msg " + (msgData.name === name ? "you" : "other");
  div.textContent = `${msgData.name}: ${msgData.msg}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Clear chat
window.clearChat = function () {
  if (confirm("Clear the entire chat for everyone?")) {
    remove(chatRef);
    document.getElementById("chat-box").innerHTML = "";
  }
};