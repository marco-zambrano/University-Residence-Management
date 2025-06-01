import { 
    currentEditingStudent, 
    setCurrentEditingStudent, 
    populateRoomSelect, 
    clearFormErrors, 
    showFieldError, 
    validateStudentForm } from './modal.js';

import { studentsData, setNewStudentData, roomsData } from '../data.js';
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
    }
    
    // Actualizar vistas
    renderStudentsTable();
    renderRoomsTable();
    updateStats();
    closeStudentModal();
}