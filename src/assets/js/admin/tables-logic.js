import { roomsData, studentsData, reservasData } from '../data.js'; // variables
import { setNewRoomData, setNewStudentData, setNewReservasData } from '../data.js'; // functions
import { renderRoomsTable, renderStudentsTable, renderReservasTable } from './tables.js';
import {updateStats} from './admin.js';
// modals
import { viewReservation} from './modal/reservation-modal.js';
import { openAddRoomModal, editRoomModal } from './modal/room-modal.js'
import { openAddStudentModal, editStudentModal } from './modal/student-modal.js'

// filter for the reservs table
export let currentReservasFilter = 'todas';
// helpers
const el = (selector) => document.querySelector(selector);
const els = (selector) => document.querySelectorAll(selector);


// Room fns administrations
el('#new-room-btn').addEventListener('click', openAddRoomModal);

export function editRoom(roomId) {  //edits
    const room = roomsData.find(r => r.id === roomId);
    editRoomModal(room.id)
}
export function deleteRoom(roomId) { // deletes
    if (confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
        const newRoomsData = roomsData.filter(r => r.id !== roomId);
        setNewRoomData(newRoomsData);
        renderRoomsTable();
        updateStats();
        alert('Habitación eliminada correctamente');
    }
}


// Students fns administrations
el('#new-student-btn').addEventListener('click', openAddStudentModal);

export function editStudent(studentId) { // edit 
    const student = studentsData.find(s => s.id === studentId);
    editStudentModal(student.id);
}
export function deleteStudent(studentId) { // deletes
    if (confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
        const newStudentsData = studentsData.filter(s => s.id !== studentId);
        setNewStudentData(newStudentsData);
        renderStudentsTable();
        updateStats();
        alert('Estudiante eliminado correctamente');
    }
}


// Reservs fns administrations
export function approveReserva(reservaId) { //approves
    const reserva = reservasData.find(r => r.id === reservaId);
    if (confirm(`¿Aprobar la reserva de ${reserva.student} para la habitación ${reserva.room}?`)) {
        reserva.status = 'confirmada';
        renderReservasTable();
        alert('Reserva aprobada correctamente');
    }
}
export function rejectReserva(reservaId) { //rejects 
    const reserva = reservasData.find(r => r.id === reservaId);
    if (confirm(`¿Rechazar la reserva de ${reserva.student}?`)) {
        const newReservasData = reservasData.filter(r => r.id !== reservaId);
        setNewReservasData(newReservasData);
        renderReservasTable();
        alert('Reserva rechazada');
    }
}
export function viewReserva(reservaId) { // view
    const reserva = reservasData.find(r => r.id === reservaId);
    viewReservation(reserva)
}

// Reservs filter
el('.todas-filter').addEventListener('click', () => filterReservas('todas'));
el('.pendiente-filter').addEventListener('click', () => filterReservas('pendiente'));
el('.confirmada-filter').addEventListener('click', () => filterReservas('confirmada'));

// filter fn
function filterReservas(filter) {
    currentReservasFilter = filter; // set the new reservs current filter
    
    // update the actived filter css property
    els('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    })
    el(`.${filter}-filter`).classList.add('active');

    renderReservasTable();  // render the reserv table filtered (updated)
}