import { 
    currentEditingStudent, 
    setCurrentEditingStudent,
    clearFormErrors, 
    showFieldError,
    isValidEmail } from './modal.js';

import { studentsData, setNewStudentData, roomsData } from '../../data.js';
import { renderRoomsTable, renderStudentsTable } from '../tables.js';
import { updateStats } from '../admin.js'

const el = (selector) => document.querySelector(selector);
const els = (selector) => document.querySelectorAll(selector);

export function openAddStudentModal() {
    setCurrentEditingStudent(null);
    el('#studentModalTitle').textContent = 'Nuevo Estudiante';
    el('#studentForm').reset();
    el('#studentId').value = '';
    
    populateRoomSelect();
    // Abrimos el modal de student
    el('#studentModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}


export function editStudentModal(studentId) {
    setCurrentEditingStudent(studentsData.find(student => student.id === studentId));
    if (!currentEditingStudent) return;
    
    el('#studentModalTitle').textContent = 'Editar Estudiante';
    
    // Llenar formulario con datos existentes
    el('#studentId').value = currentEditingStudent.id;
    el('#studentName').value = currentEditingStudent.name;
    el('#studentEmail').value = currentEditingStudent.email;
    el('#studentCheckIn').value = currentEditingStudent.checkIn || '';
    el('#studentStatus').value = currentEditingStudent.status;
    
    populateRoomSelect();
    el('#studentRoom').value = currentEditingStudent.room || '';
    
    el('#studentModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}


els('.close-student-btn').forEach( btn => btn.addEventListener('click', closeStudentModal) );
el('.save-student-btn').addEventListener('click', saveStudent);

function closeStudentModal() {
    el('#studentModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    setCurrentEditingStudent(null);
    clearFormErrors('studentForm');
}

function saveStudent() {
    if (!validateStudentForm()) {
        return;
    }
    
    const studentData = {
        id: currentEditingStudent ? currentEditingStudent.id : Date.now(),
        name: el('#studentName').value,
        email: el('#studentEmail').value,
        room: el('#studentRoom').value || null,
        checkIn: el('#studentCheckIn').value || null,
        status: el('#studentStatus').value,
        role: 'student',
        username: el('#studentEmail').value.split(' ')[0],   // Username based on email
        password: 'defaultPassword123',
    };
    
    // Agregar o actualizar en datos extendidos
    const newStudentData = [...studentsData];
    if (currentEditingStudent) {
        const index = studentsData  .findIndex(student => student.id === currentEditingStudent.id);
        newStudentData[index] = studentData;
        
        // Actualizar también en datos básicos
        const basicIndex = studentsData.findIndex(student => student.id === currentEditingStudent.id);
        if (basicIndex !== -1) {
            newStudentData[basicIndex] = {
                id: studentData.id,
                name: studentData.name,
                email: studentData.email,
                room: studentData.room,
                checkIn: studentData.checkIn,
                status: studentData.status
            };
            setNewStudentData(newStudentData);
        }
    } else {
        newStudentData.push({
            id: studentData.id,
            name: studentData.name,
            email: studentData.email,
            room: studentData.room,
            checkIn: studentData.checkIn,
            status: studentData.status
        });
        setNewStudentData(newStudentData);
    }
    
    // Si se asignó habitación, actualizar habitación
    if (studentData.room) {
        const room = roomsData.find(r => r.number === studentData.room);
        if (room) {
            room.status = 'ocupada';
            room.student = studentData.name;
            room.studentId = studentData.id;
        }
        console.log(room);
        
    }
    
    // Actualizar vistas
    renderStudentsTable();
    renderRoomsTable();
    updateStats();
    closeStudentModal();
}

function validateStudentForm() {
    
    let isValid = true;
    clearFormErrors('studentForm');
    
    const name = el('#studentName').value;
    const email = el('#studentEmail').value;
    
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
    
    return isValid;
}

function populateRoomSelect() {
    const select = el('#studentRoom');
    select.innerHTML = ''; // Limpiar opciones existentes
    
    // Solo habitaciones disponibles
    const availableRooms = roomsData.filter(room => 
        room.status === 'disponible' || (currentEditingStudent && room.number === currentEditingStudent.room)
    );
    const option = document.createElement('option');
    option.value = '';
    select.appendChild(option);
    
    availableRooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.number;
        option.textContent = `${room.number} - ${room.building} (€${room.price}/mes)`;
        select.appendChild(option);
    });
}