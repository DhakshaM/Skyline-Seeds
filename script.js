const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

document.getElementById("closebutton").addEventListener("click", function() {
    window.location.href = "index.html";
});

signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

function showMessage(message, type, elementId) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('signUpUsername').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const termsAccepted = document.getElementById('termsCheckbox').checked;

    if (username && email && password && termsAccepted) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Sign Up successful! You can now log in.', 'success', 'signUpMessage');
        setTimeout(() => {
            wrapper.classList.toggle('active');
        }, 3000); // Wait until the message disappears before toggling
    } else if (!termsAccepted) {
        showMessage('Agree to the terms & conditions to sign up.', 'error', 'signUpMessage');
    } else {
        showMessage('Please fill in all fields.', 'error', 'signUpMessage');
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        showMessage('Login successful! Welcome, ' + username, 'success', 'loginMessage');
    } else {
        showMessage('Invalid username or password.', 'error', 'loginMessage');
    }
});
