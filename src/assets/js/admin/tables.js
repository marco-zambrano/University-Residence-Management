import { roomsData, studentsData, reservasData } from './data.js';
import { capitalizeFirst, currentReservasFilter, formatDate} from './admin.js';
import { 
    editRoom,
    deleteRoom,
    editStudent,
    deleteStudent,
    approveReserva,
    rejectReserva,
    editReserva
} from './tables-logic.js';

// helper
const el = (selector) => document.querySelector(selector);
// scaper for XSS vulnerabilities
const escapeHtml = (unsafe) => {
    if (!unsafe) return '';
    return unsafe.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

// Buttons creation
const createActionButton = (type, id, actionFn) => {
    const button = document.createElement('button');
    button.className = `action-btn btn-${type}`;
    button.title = getButtonTitle(type);
    button.innerHTML = getButtonIcon(type);
    button.addEventListener('click', () => actionFn(id));
    return button;
};
const getButtonTitle = (type) => {
    const titles = {
        'edit': 'Editar',
        'delete': 'Eliminar',
        'approve': 'Aprobar',
        'reject': 'Rechazar',
        'view': 'Ver detalles'
    };
    return titles[type] || type;
};
const getButtonIcon = (type) => {
    const icons = {
        'edit': `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2"/>
                <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" stroke-width="2"/>
            </svg>
        `,
        'delete': `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2"/>
                <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2"/>
            </svg>
        `,
        'approve': `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20,6 9,17 4,12" stroke="currentColor" stroke-width="2"/>
            </svg>
        `,
        'reject': `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
            </svg>
        `,
        'view': `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
        `
    };
    return icons[type] || '';
};
// create buttons containers, this fn calls the one that creates the btns individualmente
const createActionButtons = (id, actions) => {
    const container = document.createElement('div');
    container.className = 'action-buttons';
    
    actions.forEach(action => {
        container.appendChild(createActionButton(action.type, id, action.handler));
    });
    return container;
};
// Status spam (in any table) this is reutilizable ya tu sabe
const createStatusBadge = (status) => {
    const span = document.createElement('span');
    span.className = `status-badge status-${status}`;
    span.textContent = capitalizeFirst(status);
    return span;
};

// Helper to add cells
function addCell(row, content) {
    const td = document.createElement('td');
    if (typeof content === 'string') {
        td.innerHTML = content;
    } else {
        td.appendChild(content);
    }
    row.appendChild(td);
}

// main functions for the tables creations
// Rooms table
export function renderRoomsTable() {
    const tbody = el('#roomsTableBody');
    tbody.innerHTML = '';
    
    roomsData.forEach(room => {
        const row = document.createElement('tr');
        
        addCell(row, `<strong>${escapeHtml(room.number)}</strong>`);
        addCell(row, escapeHtml(room.capacity));
        addCell(row, `Piso ${escapeHtml(room.floor)}`);
        addCell(row, createStatusBadge(room.status));
        addCell(row, `€${escapeHtml(room.price)}/mes`);
        addCell(row, escapeHtml(room.student || '-'));
        
        const actions = [
            { type: 'edit', handler: editRoom },
            { type: 'delete', handler: deleteRoom }
        ];
        addCell(row, createActionButtons(room.id, actions));
        
        tbody.appendChild(row);
    });
}
// Students table
export function renderStudentsTable() {
    const tbody = el('#studentsTableBody');
    tbody.innerHTML = '';
    
    studentsData.forEach(student => {
        const row = document.createElement('tr');
        
        addCell(row, `<strong>${escapeHtml(student.name)}</strong>`);
        addCell(row, escapeHtml(student.email));
        addCell(row, escapeHtml(student.room || '-')); 
        addCell(row, escapeHtml(student.checkIn || '-'));
        addCell(row, createStatusBadge(student.status));
        
        const actions = [
            { type: 'edit', handler: editStudent },
            { type: 'delete', handler: deleteStudent }
        ];
        addCell(row, createActionButtons(student.id, actions));
        
        tbody.appendChild(row);
    });
}
// Reservs table
export function renderReservasTable() {
    const tbody = el('#reservasTableBody');
    tbody.innerHTML = '';
    
    let filteredReservas = reservasData;
    if (currentReservasFilter !== 'todas') {
        filteredReservas = reservasData.filter(reserva => reserva.status === currentReservasFilter);
    }
    
    filteredReservas.forEach(reserva => {
        const row = document.createElement('tr');
        
        addCell(row, `<strong>${escapeHtml(reserva.student)}</strong>`);
        addCell(row, escapeHtml(reserva.room));
        addCell(row, formatDate(reserva.requestDate));
        addCell(row, formatDate(reserva.checkInDate));
        addCell(row, createStatusBadge(reserva.status));
        
        const actions = reserva.status === 'pendiente' ? [
            { type: 'approve', handler: approveReserva },
            { type: 'reject', handler: rejectReserva }
        ] : [
            { type: 'view', handler: editReserva }
        ];
        addCell(row, createActionButtons(reserva.id, actions));
        
        tbody.appendChild(row);
    });
}