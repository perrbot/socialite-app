// Common functions for all pages

// Logout function
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.replace('login.html');
  }).catch((error) => {
    alert('Error logging out: ' + error.message);
  });
}

// Quick profile update
function quickProfileUpdate() {
  const newBio = prompt('Enter new bio:');
  if (newBio) {
    const user = firebase.auth().currentUser;
    if (user) {
      // Update in Firestore
      firebase.firestore().collection('users').doc(user.displayName || user.email).update({
        bio: newBio
      }).then(() => {
        alert('Profile updated!');
      }).catch((error) => {
        alert('Error updating profile: ' + error.message);
      });
    }
  }
}

// Quick posting
function quickPost() {
  const content = prompt('Enter post content:');
  if (content) {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('posts').add({
        content: content,
        user: user.displayName || user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        alert('Post created!');
      }).catch((error) => {
        alert('Error creating post: ' + error.message);
      });
    }
  }
}

// Owner emergency payout
function emergencyPayout() {
  // Assume owner is user with email 'owner@socialite.com'
  const user = firebase.auth().currentUser;
  if (user && user.email === 'owner@socialite.com') {
    // Trigger payout logic, for now just alert
    alert('Emergency payout initiated!');
    // Here you would call backend API for payout
  } else {
    alert('Only owner can initiate payout.');
  }
}

// Add common elements to page
function addCommonElements() {
  // Add a floating menu button
  const menuBtn = document.createElement('button');
  menuBtn.innerHTML = '☰';
  menuBtn.style.position = 'fixed';
  menuBtn.style.top = '10px';
  menuBtn.style.right = '10px';
  menuBtn.style.zIndex = '1000';
  menuBtn.style.background = 'rgba(237,100,166,0.8)';
  menuBtn.style.border = 'none';
  menuBtn.style.borderRadius = '50%';
  menuBtn.style.width = '50px';
  menuBtn.style.height = '50px';
  menuBtn.style.color = 'white';
  menuBtn.style.fontSize = '20px';
  menuBtn.style.cursor = 'pointer';
  menuBtn.onclick = () => {
    const menu = document.getElementById('common-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  };
  document.body.appendChild(menuBtn);

  // Add menu
  const menu = document.createElement('div');
  menu.id = 'common-menu';
  menu.style.position = 'fixed';
  menu.style.top = '70px';
  menu.style.right = '10px';
  menu.style.background = 'white';
  menu.style.border = '1px solid #ED64A6';
  menu.style.borderRadius = '8px';
  menu.style.padding = '10px';
  menu.style.zIndex = '1000';
  menu.style.display = 'none';
  menu.innerHTML = `
    <button onclick="quickProfileUpdate()">Quick Profile Update</button><br>
    <button onclick="quickPost()">Quick Post</button><br>
    <button onclick="logout()">Logout</button><br>
    <button onclick="emergencyPayout()">Emergency Payout</button>
  `;
  document.body.appendChild(menu);
}

// Initialize when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for Firebase to load
  setTimeout(addCommonElements, 1000);
});

// Future-proof: Add new functions here
// function newFeature() { ... }
