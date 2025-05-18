document.addEventListener('DOMContentLoaded', function() {
    // Elementët e DOM
    const form = document.getElementById('profile-form');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const updatePasswordBtn = document.querySelector('.update-password');
    const signOutBtn = document.querySelector('.sign-out-button');
    const changeAvatarBtn = document.querySelector('.change-avatar');
    const loadingIndicator = document.getElementById('loading');
    const navbar = document.querySelector('.navbar');
    const profileAvatar = document.querySelector('.profile-avatar img');

    // Check if there's a saved profile image in localStorage and load it
    if (localStorage.getItem('profileImage')) {
        profileAvatar.src = localStorage.getItem('profileImage');
    }

    // Fshehja e loading indicator pas ngarkimit të faqes
    setTimeout(() => {
        loadingIndicator.classList.add('hidden');
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
        }, 500);
    }, 800);

    // Ndryshimi i navbar-it gjatë scroll-it
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Ndryshimi i passwordit
    updatePasswordBtn.addEventListener('click', function() {
        // Krijimi i një dialog-u me përshtypje më të mirë
        const dialog = document.createElement('div');
        dialog.className = 'password-dialog animate-fade';
        dialog.innerHTML = `
            <div class="dialog-content">
                <h3>Ndrysho Password-in</h3>
                <div class="form-group">
                    <label for="current-password">Password-i aktual:</label>
                    <input type="password" id="current-password" required>
                </div>
                <div class="form-group">
                    <label for="new-password">Password-i i ri:</label>
                    <input type="password" id="new-password" required>
                </div>
                <div class="form-group">
                    <label for="confirm-password">Konfirmo password-in:</label>
                    <input type="password" id="confirm-password" required>
                </div>
                <div class="dialog-actions">
                    <button type="button" class="btn cancel-btn">Anulo</button>
                    <button type="button" class="btn confirm-btn">Ndrysho</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // Stilimi i dialogut me CSS
        const style = document.createElement('style');
        style.textContent = `
            .password-dialog {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            .dialog-content {
                background-color: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                width: 90%;
                max-width: 400px;
            }
            .dialog-content h3 {
                margin-bottom: 20px;
                text-align: center;
                color: var(--primary-color);
            }
            .dialog-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
            }
            .cancel-btn {
                background-color: #6c757d;
                color: white;
            }
            .confirm-btn {
                background-color: var(--primary-color);
                color: white;
            }
        `;
        document.head.appendChild(style);
        
        // Event listeners për butonat e dialog-ut
        dialog.querySelector('.cancel-btn').addEventListener('click', function() {
            document.body.removeChild(dialog);
        });
        
        dialog.querySelector('.confirm-btn').addEventListener('click', function() {
            const currentPassword = dialog.querySelector('#current-password').value;
            const newPassword = dialog.querySelector('#new-password').value;
            const confirmPassword = dialog.querySelector('#confirm-password').value;
            
            if (!currentPassword || !newPassword || !confirmPassword) {
                showNotification('Ju lutem plotësoni të gjitha fushat', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification('Password-et e rinj nuk përputhen', 'error');
                return;
            }
            
            // Simulimi i ndryshimit të password-it
            showLoading();
            setTimeout(() => {
                hideLoading();
                document.body.removeChild(dialog);
                showNotification('Password-i u ndryshua me sukses!', 'success');
            }, 1500);
        });
    });

    // Ndryshimi i visibilitetit të password-it
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Ruajtja e formës
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showLoading();
        
        // Simulimi i ruajtjes së të dhënave
        setTimeout(() => {
            hideLoading();
            showNotification('Të dhënat u ruajtën me sukses!', 'success');
        }, 1500);
    });

    // Funksioni për daljen nga llogaria
    signOutBtn.addEventListener('click', function() {
        const dialog = document.createElement('div');
        dialog.className = 'logout-dialog animate-fade';
        dialog.innerHTML = `
            <div class="dialog-content">
                <h3>Dil nga llogaria</h3>
                <p>Jeni i sigurt që dëshironi të dilni?</p>
                <div class="dialog-actions">
                    <button type="button" class="btn cancel-btn">Jo</button>
                    <button type="button" class="btn confirm-btn">Po, dil</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // Stilimi i dialogut
        const style = document.createElement('style');
        style.textContent = `
            .logout-dialog {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            .dialog-content {
                background-color: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                width: 90%;
                max-width: 400px;
                text-align: center;
            }
            .dialog-content h3 {
                margin-bottom: 10px;
                color: var(--primary-color);
            }
            .dialog-content p {
                margin-bottom: 20px;
                color: #666;
            }
            .dialog-actions {
                display: flex;
                justify-content: center;
                gap: 10px;
            }
            .cancel-btn {
                background-color: #6c757d;
                color: white;
            }
            .confirm-btn {
                background-color: var(--danger-color);
                color: white;
            }
        `;
        document.head.appendChild(style);
        
        // Event listeners për butonat e dialog-ut
        dialog.querySelector('.cancel-btn').addEventListener('click', function() {
            document.body.removeChild(dialog);
        });
        
        dialog.querySelector('.confirm-btn').addEventListener('click', function() {
            showLoading();
            setTimeout(() => {
                hideLoading();
                // Clear localStorage when logging out (optional - remove if you want to keep the profile image)
                localStorage.removeItem('profileImage');
                // Simulimi i redirect-it në faqen e login-it
                showNotification('Po dilni nga llogaria...', 'info');
                setTimeout(() => {
                    window.location.href = "/login/login.html";
                }, 1500);
            }, 1000);
        });
    });

    // Funksioni për ndryshimin e fotos së profilit
    changeAvatarBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageData = e.target.result;
                    // Update the profile image
                    profileAvatar.src = imageData;
                    // Save the image data to localStorage
                    localStorage.setItem('profileImage', imageData);
                    showNotification('Fotoja u ndryshua dhe u ruajt me sukses!', 'success');
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });

    // Funksioni për shfaqjen e njoftimeve
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type} animate-fade`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Stilimi i njoftimit
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                color: white;
                z-index: 9999;
                max-width: 350px;
                animation: slideIn 0.3s ease forwards, fadeOut 0.3s ease 2.7s forwards;
            }
            .notification.success {
                background-color: var(--success-color);
            }
            .notification.error {
                background-color: var(--danger-color);
            }
            .notification.info {
                background-color: var(--secondary-color);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification i {
                font-size: 18px;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Fshirja e njoftimit pas 3 sekondash
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
    
    // Funksioni për marrjen e ikonës së njoftimit
    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'info': return 'fa-info-circle';
            default: return 'fa-bell';
        }
    }

    // Funksioni për shfaqjen e loading indicator
    function showLoading() {
        loadingIndicator.style.display = 'flex';
        setTimeout(() => {
            loadingIndicator.classList.remove('hidden');
        }, 10);
    }
    
    // Funksioni për fshehjen e loading indicator
    function hideLoading() {
        loadingIndicator.classList.add('hidden');
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
        }, 500);
    }

    // Shfaqja e timestamp-it aktual
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('sq-AL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Shfaqja e datës aktuale
    const dateElement = document.querySelector('.current-date');
    dateElement.textContent = `${formattedDate}`;

    // Smooth scroll për links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efekti i ripple për butonat
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                top: ${y}px;
                left: ${x}px;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Shtimi i stilit për ripple efektin
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Validimi i formës për inputet
    const inputs = document.querySelectorAll('.editable');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
            validateInput(this);
        });
    });
    
    function validateInput(input) {
        const value = input.value.trim();
        
        if (value === '') {
            showInputError(input, 'Fusha nuk mund të jetë bosh');
        } else {
            clearInputError(input);
        }
    }
    
    function showInputError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
        
        if (!formGroup.querySelector('.error-message')) {
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
        input.classList.add('error');
    }
    
    function clearInputError(input) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
        
        input.classList.remove('error');
    }
    
    // Shtimi i stilit për input validation
    const validationStyle = document.createElement('style');
    validationStyle.textContent = `
        .error-message {
            color: var(--danger-color);
            font-size: 12px;
            margin-top: 5px;
        }
        
        input.error {
            border-color: var(--danger-color);
        }
        
        input.focused {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(41, 182, 246, 0.2);
        }
    `;
    document.head.appendChild(validationStyle);
});