document.addEventListener("DOMContentLoaded", function () {
    // Referencat në DOM
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");
    const errorMessage = document.getElementById("error-message");
    const signupErrorMessage = document.getElementById("signup-error-message");
    const passwordToggles = document.querySelectorAll('.toggle-password');
    const backgroundVideo = document.querySelector('.background-video');
  
    // Video control - play once and pause at the end
    if (backgroundVideo) {
        backgroundVideo.addEventListener('ended', () => {
            // Pause the video at the last frame
            backgroundVideo.pause();
            // Ensure the video stays at the last frame
            backgroundVideo.currentTime = backgroundVideo.duration;
        });
    }
  
    // Password visibility toggle
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordInput = toggle.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggle.classList.toggle('fa-eye');
            toggle.classList.toggle('fa-eye-slash');
        });
    });
  
    // Butoni Sign In
    const signInButton = document.getElementById("sign-in-btn");
    if (signInButton) {
        signInButton.addEventListener("click", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            
            // Kontrollo nëse fushat janë bosh
            if (email === "" || password === "") {
                errorMessage.textContent = "Please fill in all fields!";
                shakeElement(loginForm);
                return;
            }
            
            // Nëse të gjitha fushat janë plotësuar, lejo kalimin
            window.location.href = "/home/home.html";
        });
    }
  
    // Për kalimin nga login në sign-up
    if (signupLink) {
        signupLink.addEventListener("click", function (event) {
            event.preventDefault();
            loginForm.style.display = "none";
            signupForm.style.display = "block";
            resetMessages();
        });
    }
    
    if (loginLink) {
        loginLink.addEventListener("click", function (event) {
            event.preventDefault();
            signupForm.style.display = "none";
            loginForm.style.display = "block";
            resetMessages();
        });
    }
  
    // Butoni Sign Up
    const signUpButton = document.getElementById("signup-btn");
    if (signUpButton) {
        signUpButton.addEventListener("click", function (event) {
            event.preventDefault();
            console.log("Sign up button clicked");
            
            // Merrni të dhënat nga forma
            const firstName = document.getElementById("first-name").value.trim();
            const lastName = document.getElementById("last-name").value.trim();
            const email = document.getElementById("signup-email").value.trim();
            const password = document.getElementById("signup-password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();
            const agreeChecked = document.getElementById("agree").checked;
            
            // Kontrolloni nëse të gjitha fushat janë të mbushura
            if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
                signupErrorMessage.textContent = "Please fill in all fields!";
                shakeElement(signupForm);
                return;
            }
            
            // Kontrolloni nëse email është valid
            if (!validateEmail(email)) {
                signupErrorMessage.textContent = "Please enter a valid email address!";
                shakeElement(signupForm);
                return;
            }
            
            // Kontrolloni nëse password-i dhe confirm password përputhen
            if (password !== confirmPassword) {
                signupErrorMessage.textContent = "Passwords do not match!";
                shakeElement(signupForm);
                return;
            }
            
            // Kontrolloni nëse është pranuar termat dhe kushtet
            if (!agreeChecked) {
                signupErrorMessage.textContent = "You must agree to the terms and conditions!";
                shakeElement(signupForm);
                return;
            }
            
            // Nëse të gjitha kushtet plotësohen, lejo kalimin
            window.location.href = "/home/home.html";
        });
    }
  
    // Helper Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
  
    function resetMessages() {
        if (errorMessage) errorMessage.textContent = '';
        if (signupErrorMessage) signupErrorMessage.textContent = '';
    }
  
    function shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }
  });