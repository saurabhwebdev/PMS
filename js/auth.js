// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA1vPwf3cqooqLlRmpJ3fySMNrjPuOZnp8",
  authDomain: "penguinpms.firebaseapp.com",
  projectId: "penguinpms",
  storageBucket: "penguinpms.appspot.com",
  messagingSenderId: "797363618186",
  appId: "1:797363618186:web:81f4c036891161c8044873"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Check auth state
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('User logged in:', user);
    if (window.location.pathname === '/index.html') {
      window.location.href = 'dashboard.html';
    }
  } else {
    console.log('User logged out');
    if (window.location.pathname !== '/index.html') {
      window.location.href = 'index.html';
    }
  }
});

// Login
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      console.error('Error logging in:', error);
      document.getElementById('error-message').textContent = error.message;
    });
}

// Sign Up
function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      console.error('Error signing up:', error);
      document.getElementById('error-message').textContent = error.message;
    });
}

// Logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  }).catch(error => {
    console.error('Error logging out:', error);
  });
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.addEventListener('click', login);

  const signupBtn = document.getElementById('signupBtn');
  if (signupBtn) signupBtn.addEventListener('click', signUp);

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
});