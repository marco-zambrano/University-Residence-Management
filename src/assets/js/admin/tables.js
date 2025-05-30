import { roomsData, studentsData, reservasData } from './data.js';
import { capitalizeFirst, currentReservasFilter, formatDate  } from './admin.js';

const el = (selector) => document.querySelector(selector);

// Renderizar tabla de habitaciones
export function renderRoomsTable() {
    const tbody = el('#roomsTableBody')
    tbody.innerHTML = '';
    
    roomsData.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${room.number}</strong></td>
            <td>${room.capacity}</td>
            <td>Piso ${room.floor}</td>
            <td><span class="status-badge status-${room.status}">${capitalizeFirst(room.status)}</span></td>
            <td>€${room.price}/mes</td>
            <td>${room.student || '-'}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn btn-edit" onclick="editRoom(${room.id})" title="Editar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2"/>
                            <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="action-btn btn-delete" onclick="deleteRoom(${room.id})" title="Eliminar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2"/>
                            <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Renderizar tabla de estudiantes
export function renderStudentsTable() {
    const tbody = el('#studentsTableBody');
    tbody.innerHTML = '';
    
    studentsData.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${student.name}</strong></td>
            <td>${student.email}</td>
            <td>${student.room || '-'}</td>
            <td>${student.checkIn || '-'}</td>
            <td><span class="status-badge status-${student.status}">${capitalizeFirst(student.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn btn-edit" onclick="editStudent(${student.id})" title="Editar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2"/>
                            <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="action-btn btn-delete" onclick="deleteStudent(${student.id})" title="Eliminar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2"/>
                            <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Renderizar tabla de reservas
export function renderReservasTable() {
    const tbody = el('#reservasTableBody');
    tbody.innerHTML = '';
    
    let filteredReservas = reservasData;
    if (currentReservasFilter !== 'todas') {
        filteredReservas = reservasData.filter(reserva => reserva.status === currentReservasFilter);
    }
    
    filteredReservas.forEach(reserva => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${reserva.student}</strong></td>
            <td>${reserva.room}</td>
            <td>${formatDate(reserva.requestDate)}</td>
            <td>${formatDate(reserva.checkInDate)}</td>
            <td><span class="status-badge status-${reserva.status}">${capitalizeFirst(reserva.status)}</span></td>
            <td>
                <div class="action-buttons">
                    ${reserva.status === 'pendiente' ? `
                        <button class="action-btn btn-approve" onclick="approveReserva(${reserva.id})" title="Aprobar">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <polyline points="20,6 9,17 4,12" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                        <button class="action-btn btn-reject" onclick="rejectReserva(${reserva.id})" title="Rechazar">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
                                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    ` : `
                        <button class="action-btn btn-edit" onclick="editReserva(${reserva.id})" title="Ver detalles">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    `}
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}