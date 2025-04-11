/**
 * Simple Frontend Authentication using localStorage
 * Handles registration, login, logout, and session management
 */

// Save user to localStorage
function registerUser(username, email, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  // Check if username or email already exists
  const exists = users.some(
    (u) => u.username === username || u.email === email
  );
  if (exists) {
    return { success: false, message: 'User already exists' };
  }
  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true };
}

// Authenticate user
function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(
    (u) => (u.username === username || u.email === username) && u.password === password
  );
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
}

// Check if user is logged in
function isLoggedIn() {
  return !!localStorage.getItem('currentUser');
}

// Logout user
function logoutUser() {
  localStorage.removeItem('currentUser');
}

// Protect page
function protectPage() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

// Attach event listeners for login form
function setupLoginForm() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    const result = loginUser(username, password);
    if (result.success) {
      window.location.href = 'menu.html';
    } else {
      alert(result.message);
    }
  });
}

// Attach event listeners for registration form
function setupRegistrationForm() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form['confirm-password'].value.trim();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const result = registerUser(username, email, password);
    if (result.success) {
      alert('Registration successful! Please login.');
      window.location.href = 'login.html';
    } else {
      alert(result.message);
    }
  });
}

// Attach logout button event
function setupLogoutButton() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      logoutUser();
      window.location.href = 'login.html';
    });
  }
}
