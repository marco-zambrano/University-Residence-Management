import { roomsData, studentsData, reservasData } from './data.js';
const el = (selector) => document.querySelector(selector);

// Funciones de gestión de habitaciones
el('#new-room-btn').addEventListener('click', openAddRoomModal);
function openAddRoomModal() {
    alert('Modal para agregar nueva habitación (por implementar)');
}

export function editRoom(roomId) {
    const room = roomsData.find(r => r.id === roomId);
    alert(`Editar habitación ${room.number} (por implementar)`);
}

export function deleteRoom(roomId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
        roomsData = roomsData.filter(r => r.id !== roomId);
        renderRoomsTable();
        updateStats();
        alert('Habitación eliminada correctamente');
    }
}


// Funciones de gestión de estudiantes
el('#new-student-btn').addEventListener('click', openAddStudentModal);
function openAddStudentModal() {
    alert('Modal para agregar nuevo estudiante (por implementar)');
}

export function editStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    alert(`Editar estudiante ${student.name} (por implementar)`);
}

export function deleteStudent(studentId) {
    if (confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
        studentsData = studentsData.filter(s => s.id !== studentId);
        renderStudentsTable();
        updateStats();
        alert('Estudiante eliminado correctamente');
    }
}


// Funciones de gestión de reservas
export function approveReserva(reservaId) {
    const reserva = reservasData.find(r => r.id === reservaId);
    if (confirm(`¿Aprobar la reserva de ${reserva.student} para la habitación ${reserva.room}?`)) {
        reserva.status = 'confirmada';
        renderReservasTable();
        alert('Reserva aprobada correctamente');
    }
}

export function rejectReserva(reservaId) {
    const reserva = reservasData.find(r => r.id === reservaId);
    if (confirm(`¿Rechazar la reserva de ${reserva.student}?`)) {
        reservasData = reservasData.filter(r => r.id !== reservaId);
        renderReservasTable();
        alert('Reserva rechazada');
    }
}

export function editReserva(reservaId) {
    const reserva = reservasData.find(r => r.id === reservaId);
    alert(`Ver detalles de la reserva de ${reserva.student} (por implementar)`);
}