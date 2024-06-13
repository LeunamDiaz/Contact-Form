document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        let hasError = false;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input, 'This field is required');
                hasError = true;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                showError(input, 'Please enter a valid email address');
                hasError = true;
            }
        });

        const radioGroups = form.querySelectorAll('input[type="radio"][required]');
        radioGroups.forEach(radio => {
            const groupName = radio.name;
            if (!form.querySelector(`input[name="${groupName}"]:checked`)) {
                showError(radio.closest('.form-group'), 'Please select an option');
                hasError = true;
            }
        });

        const checkboxes = form.querySelectorAll('input[type="checkbox"][required]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                showError(checkbox.closest('.form-group'), 'This checkbox is required');
                hasError = true;
            }
        });

        if (!hasError) {
            showToast();
            form.reset();
        }
    });

    function clearErrors() {
        const errorMessages = form.querySelectorAll('.error');
        errorMessages.forEach(error => error.textContent = '');
    }

    function showError(element, message) {
        const errorElement = element.closest('.form-group').querySelector('.error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showToast() {
        toast.textContent = 'Message Sent! Thanks for completing the form. We\'ll be in touch soon!';
        toast.className = 'toast show';
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }
});
