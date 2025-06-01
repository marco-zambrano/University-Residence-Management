import { roomsData, studentsData } from '../data.js'; //variables
import { setNewRoomData, setNewStudentData } from '../data.js'; // functions
import { renderRoomsTable, renderStudentsTable} from '../tables.js'
import { updateStats } from '../admin.js'

export let currentEditingRoom = null;
export const setcurrentEditingRoom = (newValue) => currentEditingRoom = newValue;
export let currentEditingStudent = null;
export const setCurrentEditingStudent = (newValue) => currentEditingStudent = newValue;

const el = (selector) => document.querySelector(selector);

// ==================== MODALES DE ESTUDIANTES ====================
// export function openAddStudentModal() {
//     currentEditingStudent = null;
//     el('#studentModalTitle').textContent = 'Nuevo Estudiante';
//     el('#studentForm').reset();
//     el('#studentId').value = '';
    
//     populateRoomSelect();
//     // Abrimos el modal de student
//     el('#studentModal').style.display = 'block';
//     document.body.style.overflow = 'hidden';
// }

// export function editStudentModal(studentId) {
//     currentEditingStudent = studentsData.find(student => student.id === studentId);
//     if (!currentEditingStudent) return;
    
//     el('#studentModalTitle').textContent = 'Editar Estudiante';
    
//     // Llenar formulario con datos existentes
//     el('#studentId').value = currentEditingStudent.id;
//     el('#studentName').value = currentEditingStudent.name;
//     el('#studentEmail').value = currentEditingStudent.email;
//     el('#studentCheckIn').value = currentEditingStudent.checkIn || '';
//     el('#studentStatus').value = currentEditingStudent.status;
    
//     populateRoomSelect();
//     el('#studentRoom').value = currentEditingStudent.room || '';
    
//     el('#studentModal').style.display = 'block';
//     document.body.style.overflow = 'hidden';
// }

// el('.close-student-btn').addEventListener('click', closeStudentModal);
// el('.save-student-btn').addEventListener('click', saveStudent);

// function closeStudentModal() {
//     el('#studentModal').style.display = 'none';
//     document.body.style.overflow = 'auto';
//     currentEditingStudent = null;
//     clearFormErrors('studentForm');
// }

// function saveStudent() {
//     if (!validateStudentForm()) {
//         return;
//     }
    
//     const studentData = {
//         id: currentEditingStudent ? currentEditingStudent.id : Date.now(),
//         name: el('#studentName').value,
//         email: el('#studentEmail').value,
//         room: el('#studentRoom').value || null,
//         checkIn: el('#studentCheckIn').value || null,
//         status: el('#studentStatus').value,
//     };
    
//     // Agregar o actualizar en datos extendidos
//     const newStudentData = [...studentsData];
//     if (currentEditingStudent) {
//         const index = studentsData  .findIndex(student => student.id === currentEditingStudent.id);
//         newStudentData[index] = studentData;
        
//         // Actualizar también en datos básicos
//         const basicIndex = studentsData.findIndex(student => student.id === currentEditingStudent.id);
//         if (basicIndex !== -1) {
//             newStudentData[basicIndex] = {
//                 id: studentData.id,
//                 name: studentData.name,
//                 email: studentData.email,
//                 room: studentData.room,
//                 checkIn: studentData.checkIn,
//                 status: studentData.status
//             };
//             setNewStudentData(newStudentData);
//         }
//     } else {
//         newStudentData.push({
//             id: studentData.id,
//             name: studentData.name,
//             email: studentData.email,
//             room: studentData.room,
//             checkIn: studentData.checkIn,
//             status: studentData.status
//         });
//         setNewStudentData(newStudentData);
//     }
    
//     // Si se asignó habitación, actualizar habitación
//     if (studentData.room) {
//         const room = roomsData.find(r => r.number === studentData.room);
//         if (room) {
//             room.status = 'ocupada';
//             room.student = studentData.name;
//             room.studentId = studentData.id;
//         }
//     }
    
//     // Actualizar vistas
//     renderStudentsTable();
//     renderRoomsTable();
//     updateStats();
//     closeStudentModal();
// }

export function validateStudentForm() {
    
    let isValid = true;
    clearFormErrors('studentForm');
    
    const name = el('#studentName').value;
    const email = el('#studentEmail').value;
    const status = el('#studentStatus').value;
    
    // Validar email único
    const existingStudent = studentsData.find(student => 
        student.email === email && (!currentEditingStudent || student.id !== currentEditingStudent.id)
    );
    
    if (existingStudent) {
        showFieldError('studentEmail', 'Este email ya está registrado');
        isValid = false;
    }
    
    if (!name) {
        showFieldError('studentName', 'El nombre es obligatorio');
        isValid = false;
    }
    
    if (!email) {
        showFieldError('studentEmail', 'El email es obligatorio');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('studentEmail', 'El email no es válido');
        isValid = false;
    }
    
    if (!status) {
        showFieldError('studentStatus', 'El estado es obligatorio');
        isValid = false;
    }
    
    return isValid;
}

export function populateRoomSelect() {
    const select = el('#studentRoom');
    
    // Solo habitaciones disponibles
    const availableRooms = roomsData.filter(room => 
        room.status === 'disponible' || (currentEditingStudent && room.number === currentEditingStudent.room)
    );
    
    availableRooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.number;
        option.textContent = `${room.number} - ${room.capacity} (€${room.price}/mes)`;
        select.appendChild(option);
    });
}

// ============================== SHOW RESERVATION ===============================
export function viewReservation(reserva) {
    // Abrimos el modal de view reserva
    el('#reservaDetailsModal').style.display = 'block';
    
    // Declare and Clean de modal
    const bodyContent = el('#reservaDetailsContent');
    bodyContent.innerHTML = '';

    //  Student
    const studentContainer = document.createElement('div');
    const studentTitle = document.createElement('h3');
    studentTitle.textContent = 'Estudiante:';
    const studentContent = document.createElement('p');
    studentContent.textContent = reserva.student;

    studentContainer.appendChild(studentTitle);
    studentContainer.appendChild(studentContent);

    //  Room
    const roomContainer = document.createElement('div');
    const roomTitle = document.createElement('h3');
    roomTitle.textContent = 'Habitación:';
    const roomContent = document.createElement('p');
    roomContent.textContent = reserva.room;

    roomContainer.appendChild(roomTitle);
    roomContainer.appendChild(roomContent);

    //  Request Date 
    const requestContainer = document.createElement('div');
    const requestTitle = document.createElement('h3');
    requestTitle.textContent = 'Fecha de Solicitud:';
    const requestContent = document.createElement('p');
    requestContent.textContent = reserva.requestDate;

    requestContainer.appendChild(requestTitle);
    requestContainer.appendChild(requestContent);

    //  Checkin Date
    const checkinContainer = document.createElement('div');
    const checkinTitle = document.createElement('h3');
    checkinTitle.textContent = 'Fecha de Ingreso:';
    const checkinContent = document.createElement('p');
    checkinContent.textContent = reserva.checkInDate;

    checkinContainer.appendChild(checkinTitle);
    checkinContainer.appendChild(checkinContent);

    bodyContent.appendChild(studentContainer);
    bodyContent.appendChild(roomContainer);
    bodyContent.appendChild(requestContainer);
    bodyContent.appendChild(checkinContainer);
}

el('.close-reseva-btn').addEventListener('click', closeReservationModal);

function closeReservationModal() {
    el('#reservaDetailsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}



// ================ ADTIONAL FUNCTIONS ==============================
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

export function clearFormErrors(formId) {
    const form = el(`#${formId}`);
    const errorFields = form.querySelectorAll('.error');
    const errorGroups = form.querySelectorAll('.has-error');
    const errorMessages = form.querySelectorAll('.error-message');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorGroups.forEach(group => group.classList.remove('has-error'));
    errorMessages.forEach(message => message.style.display = 'none');
}

function isValidEmail(email) {
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