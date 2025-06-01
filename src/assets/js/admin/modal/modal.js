export let currentEditingRoom = null;
export const setcurrentEditingRoom = (newValue) => currentEditingRoom = newValue;
export let currentEditingStudent = null;
export const setCurrentEditingStudent = (newValue) => currentEditingStudent = newValue;

const el = (selector) => document.querySelector(selector);

export function showFieldError(fieldId, message) {
    const field = el(`#${fieldId}`);
    const formGroup = field.closest('.form-group');
    
    field.classList.add('error');
    formGroup.classList.add('has-error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Clear the errors from modal inputs
export function clearFormErrors(formId) {
    const form = el(`#${formId}`);
    const errorFields = form.querySelectorAll('.error');
    const errorGroups = form.querySelectorAll('.has-error');
    const errorMessages = form.querySelectorAll('.error-message');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorGroups.forEach(group => group.classList.remove('has-error'));
    errorMessages.forEach(message => message.style.display = 'none');
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    const modals = ['roomModal', 'studentModal', 'roomDetailsModal', 'studentDetailsModal', 'reservaDetailsModal'];
    
    modals.forEach(modalId => {
        const modal = el(`#${modalId}`);
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}