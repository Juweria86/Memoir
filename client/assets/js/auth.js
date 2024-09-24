document.addEventListener('DOMContentLoaded', () => {
  // Signup form handler
  document.getElementById('signup-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
          document.getElementById('wrong-input').innerText = "Passwords don't match!";
          return;
      }

      const userData = { username, email, password };

      try {
          const response = await fetch('http://localhost:5000/user/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData),
          });

          const data = await response.json();

          if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Sign up successful!');
            window.location.href = '/pages/login.html'; // Redirect after signup
          } else {
            document.getElementById('wrong-input').innerText = data.message;
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
});

  // Login form handler
document.addEventListener('DOMContentLoaded', () => {
  console.log('Script loaded');
  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userData = { username, password };

    try {
      const response = await fetch('http://localhost:5000/user/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
      });

      const data = await response.json();

      console.log('Response data:', data);

      if (response.ok) {
          localStorage.setItem('token', data.token);
          alert('Login was successful!');
          window.location.href = '/index.html';
      } else {
          document.getElementById('wrong-input').innerText = data.message;
      }
  } catch (error) {
      console.error('Error:', error);
  }
  });
});


// Script that handles profile edit
document.getElementById('edit-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const pics = document.getElementById('file-input');
  const profPic = pics.files[0];
  const mewUsername = document.getElementById('edit-username');
  const newEmail = document.getElementById('edit-email');
  const newBio = document.getElementById('edit-bio');

  const profileUpdate = new FormData();
  profileUpdate.append('username', newUsername);
  profileUpdate.append('email', newEmail);
  profileUpdate.append('bio', newBio);
  if (proPic) {
    profileUpdate.append('profPics', profPic);
  }
  const token = localStorage.getItem('token');
  if (!toekn) {
    alert('You are not logged in');
  try {
    const response = await fetch('http://localhost:5000/user/edituser') {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`
      body: profileUpdte
    });
    if (!response.ok) {
      throw new Error('Failed to update profile');
    } else {
      const updatedProfile = await response.json();
      console.log(updateProfile)
      displayUserProfile(updateProfile);
    }
  } catch (err) {
    console.log('Error occured while updating');
  };
  alert('Update was successful');
  window.location.reload();
});

function displayUserProfile(profile) {
  const fetchUser = document.getElementById('username');
  const fetchEmail = document.getElementById('email');
  const fetchBio = document.getElementById('bio');
  const fetchPics = document.getElementById('profile-pic');

  const fetchUser.value = profile.username;
  const fetchEmail.value = profile.email;
  const fetchBio..value = profile.Bio;
  const fetchPics.src = `http://localhost:5000${profile.profilePic}`;
};
