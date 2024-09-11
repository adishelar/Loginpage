document.querySelector('form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.querySelector('input[type="text"]').value;
  const password = document.querySelector('input[type="password"]').value;

  // field validation
  if (!validateForm(username, password)) return;

  toggleLoadingSpinner(true);

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    response.ok ?handleSuccess() : handleError('Login failed. Try again.');
  } catch {
    handleError('Something went wrong. Try again later.');
  } finally {
    toggleLoadingSpinner(false);
  }
});

function validateForm(username, password) {
  if (!validateEmail(username)) return showError('Please enter a valid email.');
  if (password.length < 6) return showError('Password must be at least 6 characters long.');
  return true;
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function showError(message) {
  showMessage(message, 'text-red-500');
}

function showMessage(message, type) {
  const msg = document.createElement('div');
  msg.textContent = message;
  msg.className = type;
  document.querySelector('form').prepend(msg);
  setTimeout(() => msg.remove(), 3000);
}

function toggleLoadingSpinner(show) {
  const spinner = document.getElementById('spinner');
  if (spinner) spinner.classList.toggle('hidden', !show);
}

function handleSuccess() {
  showMessage('Login successful!', 'text-green-500');
  setTimeout(() => (window.location.href = 'welcome.html'), 1000);
}

// Password toggle
document.getElementById('togglePassword').addEventListener('click', () => {
  const password = document.getElementById('password');
  password.type = password.type === 'password' ? 'text' : 'password';
});


