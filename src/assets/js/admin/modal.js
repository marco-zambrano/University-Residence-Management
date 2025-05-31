import { roomsData, studentsData, reservasData } from './data.js'; //variables
import { renderRoomsTable} from './tables.js'
import { updateStats} from './admin.js'

let currentEditingRoom = null;
let currentEditingStudent = null;
let currentViewingReserva = null;

const el = (selector) => document.querySelector(selector);


// ============================ MODALES DE ROOMS =============================

export function openAddRoomModal() {
    currentEditingRoom = null;
    
    el('#roomModalTitle').textContent = 'Nueva Habitación';
    el('#roomForm').reset();
    el('#roomId').value = '';

    // Open modal
    el('#roomModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

export function editRoomModal(roomId) {
    currentEditingRoom = roomsData.find(room => room.id === roomId);
    if (!currentEditingRoom) return;

    el('#roomModalTitle').textContent = 'Editar Habitación';
    // // Llenar formulario con datos existentes
    el('#roomId').value = currentEditingRoom.id;
    el('#roomNumber').value = currentEditingRoom.number;
    el('#roomCapacity').value = currentEditingRoom.capacity;
    el('#roomFloor').value = currentEditingRoom.floor;
    el('#roomPrice').value = currentEditingRoom.price;
    el('#roomStatus').value = currentEditingRoom.status;
    // Open room Modal
    el('#roomModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

el('.save-room-btn').addEventListener('click', saveRoom);
el('.close-room-btn').addEventListener('click', closeRoomModal);

function closeRoomModal() {
    el('#roomModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentEditingRoom = null;
    clearFormErrors('roomForm');
}

function saveRoom() {
    const form = el('#roomForm');
    // const formData = new FormData(form);
    
    // Validar formulario
    if (!validateRoomForm()) {
        return;
    }
    
    const roomData = {
        id: currentEditingRoom ? currentEditingRoom.id : Date.now(),
        number: el('#roomNumber').value,
        capacity: el('#roomCapacity').value,
        floor: parseInt(el('#roomFloor').value),
        price: parseInt(el('#roomPrice').value),
        status: el('#roomStatus').value,
        student: null,
        studentId: null
    };
    
    // Agregar o actualizar
    if (currentEditingRoom) {
        const index = roomsData.findIndex(room => room.id === currentEditingRoom.id);
        roomsData[index] = roomData;
    } else {
        roomsData.push(roomData);
    }

    // Actualizar vista
    renderRoomsTable();
    updateStats();
    closeRoomModal();
}

function validateRoomForm() {
    let isValid = true;
    clearFormErrors('roomForm');
    
    const number = el('#roomNumber').value;
    const type = el('#roomCapacity').value;
    const floor = el('#roomFloor').value;
    const price = el('#roomPrice').value;
    const status = el('#roomStatus').value;
    
    // Validar número único
    const existingRoom = roomsData.find(room => 
        room.number === number && (!currentEditingRoom || room.id !== currentEditingRoom.id)
    );
    
    if (existingRoom) {
        showFieldError('roomNumber', 'Este número de habitación ya existe');
        isValid = false;
    }
    
    if (!number) {
        showFieldError('roomNumber', 'El número de habitación es obligatorio');
        isValid = false;
    }
    
    if (!type) {
        showFieldError('roomCapacity', 'El tipo de habitación es obligatorio');
        isValid = false;
    }
    
    if (!floor) {
        showFieldError('roomFloor', 'El piso es obligatorio');
        isValid = false;
    }
    
    if (!price || price < 0) {
        showFieldError('roomPrice', 'El precio debe ser mayor a 0');
        isValid = false;
    }
    
    if (!status) {
        showFieldError('roomStatus', 'El estado es obligatorio');
        isValid = false;
    }
    
    return isValid;
}

// ==================== MODALES DE ESTUDIANTES ====================

function openAddStudentModal() {
    currentEditingStudent = null;
    document.getElementById('studentModalTitle').textContent = 'Nuevo Estudiante';
    document.getElementById('studentForm').reset();
    document.getElementById('studentId').value = '';
    
    populateRoomSelect();
    document.getElementById('studentModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function editStudent(studentId) {
    currentEditingStudent = extendedStudentsData.find(student => student.id === studentId);
    if (!currentEditingStudent) return;
    
    document.getElementById('studentModalTitle').textContent = 'Editar Estudiante';
    
    // Llenar formulario con datos existentes
    document.getElementById('studentId').value = currentEditingStudent.id;
    document.getElementById('studentName').value = currentEditingStudent.name;
    document.getElementById('studentEmail').value = currentEditingStudent.email;
    document.getElementById('studentPhone').value = currentEditingStudent.phone || '';
    document.getElementById('studentDNI').value = currentEditingStudent.dni;
    document.getElementById('studentCareer').value = currentEditingStudent.career || '';
    document.getElementById('studentYear').value = currentEditingStudent.year || '';
    document.getElementById('studentCheckIn').value = currentEditingStudent.checkIn || '';
    document.getElementById('studentStatus').value = currentEditingStudent.status;
    document.getElementById('studentNotes').value = currentEditingStudent.notes || '';
    
    populateRoomSelect();
    document.getElementById('studentRoom').value = currentEditingStudent.room || '';
    
    document.getElementById('studentModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeStudentModal() {
    document.getElementById('studentModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentEditingStudent = null;
    clearFormErrors('studentForm');
}

function saveStudent() {
    if (!validateStudentForm()) {
        return;
    }
    
    const studentData = {
        id: currentEditingStudent ? currentEditingStudent.id : Date.now(),
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        dni: document.getElementById('studentDNI').value,
        career: document.getElementById('studentCareer').value,
        year: document.getElementById('studentYear').value,
        room: document.getElementById('studentRoom').value || null,
        checkIn: document.getElementById('studentCheckIn').value || null,
        status: document.getElementById('studentStatus').value,
        notes: document.getElementById('studentNotes').value
    };
    
    // Agregar o actualizar en datos extendidos
    if (currentEditingStudent) {
        const index = extendedStudentsData.findIndex(student => student.id === currentEditingStudent.id);
        extendedStudentsData[index] = studentData;
        
        // Actualizar también en datos básicos
        const basicIndex = studentsData.findIndex(student => student.id === currentEditingStudent.id);
        if (basicIndex !== -1) {
            studentsData[basicIndex] = {
                id: studentData.id,
                name: studentData.name,
                email: studentData.email,
                room: studentData.room,
                checkIn: studentData.checkIn,
                status: studentData.status
            };
        }
    } else {
        extendedStudentsData.push(studentData);
        studentsData.push({
            id: studentData.id,
            name: studentData.name,
            email: studentData.email,
            room: studentData.room,
            checkIn: studentData.checkIn,
            status: studentData.status
        });
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
    
    showNotification(
        currentEditingStudent ? 'Estudiante actualizado correctamente' : 'Estudiante creado correctamente',
        'success'
    );
}

function validateStudentForm() {
    console.log('validating student');
    
    let isValid = true;
    clearFormErrors('studentForm');
    
    const name = el('#studentName').value;
    const email = el('#studentEmail').value;
    const dni = el('#studentDNI').value;
    const status = el('#studentStatus').value;

    console.log(name);
    console.log(email);
    console.log(dni);
    console.log(status);
    
    // Validar email único
    const existingStudent = extendedStudentsData.find(student => 
        student.email === email && (!currentEditingStudent || student.id !== currentEditingStudent.id)
    );
    
    if (existingStudent) {
        showFieldError('studentEmail', 'Este email ya está registrado');
        isValid = false;
    }
    
    // Validar DNI único
    const existingDNI = extendedStudentsData.find(student => 
        student.dni === dni && (!currentEditingStudent || student.id !== currentEditingStudent.id)
    );
    
    if (existingDNI) {
        showFieldError('studentDNI', 'Este DNI ya está registrado');
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
    
    if (!dni) {
        showFieldError('studentDNI', 'El DNI es obligatorio');
        isValid = false;
    }
    
    if (!status) {
        showFieldError('studentStatus', 'El estado es obligatorio');
        isValid = false;
    }
    
    return isValid;
}

// ==================== MODALES DE DETALLES ====================

function viewRoomDetails(roomId) {
    const room = roomsData.find(r => r.id === roomId);
    if (!room) return;
    
    const student = room.studentId ? extendedStudentsData.find(s => s.id === room.studentId) : null;
    
    const detailsHTML = `
        <div class="details-grid">
            <div class="detail-card">
                <h4>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 9V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V9M20 9V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V9M20 9H4" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Información Básica
                </h4>
                <div class="detail-item">
                    <span class="detail-label">Número:</span>
                    <span class="detail-value">${room.number}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tipo:</span>
                    <span class="detail-value">${capitalizeFirst(room.type)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Piso:</span>
                    <span class="detail-value">Piso ${room.floor}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Estado:</span>
                    <span class="detail-value">
                        <span class="status-badge status-${room.status}">${capitalizeFirst(room.status)}</span>
                    </span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Precio/mes:</span>
                    <span class="detail-value">€${room.price}</span>
                </div>
            </div>
            
            ${student ? `
            <div class="detail-card">
                <h4>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2"/>
                        <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Estudiante Asignado
                </h4>
                <div class="detail-item">
                    <span class="detail-label">Nombre:</span>
                    <span class="detail-value">${student.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${student.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Carrera:</span>
                    <span class="detail-value">${student.career || 'No especificada'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Fecha ingreso:</span>
                    <span class="detail-value">${student.checkIn ? formatDate(student.checkIn) : 'No especificada'}</span>
                </div>
            </div>
            ` : `
            <div class="detail-card">
                <h4>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
                        <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Estado de Ocupación
                </h4>
                <p style="text-align: center; color: var(--main); opacity: 0.7; padding: 2rem;">
                    ${room.status === 'disponible' ? 'Habitación disponible para asignar' : 'Habitación en mantenimiento'}
                </p>
            </div>
            `}
        </div>
    `;
    
    document.getElementById('roomDetailsContent').innerHTML = detailsHTML;
    document.getElementById('roomDetailsModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Guardar ID para edición
    currentEditingRoom = room;
}

function viewStudentDetails(studentId) {
    const student = extendedStudentsData.find(s => s.id === studentId);
    if (!student) return;
    
    const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    const detailsHTML = `
        <div class="student-avatar">${initials}</div>
        
        <div class="details-grid">
            <div class="detail-card">
                <h4>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2"/>
                        <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Información Personal
                </h4>
                <div class="detail-item">
                    <span class="detail-label">Nombre:</span>
                    <span class="detail-value">${student.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">DNI:</span>
                    <span class="detail-value">${student.dni}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Estado:</span>
                    <span class="detail-value">
                        <span class="status-badge status-${student.status}">${capitalizeFirst(student.status)}</span>
                    </span>
                </div>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2"/>
                            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        ${student.email}
                    </div>
                    ${student.phone ? `
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C9.4 21 0 11.6 0 0.08C0 -0.52 0.48 -1 1.08 -1H4.08C4.68 -1 5.16 -0.52 5.16 0.08V3.08" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        ${student.phone}
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="detail-card">
                <h4>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 10V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V10M22 10L12 15L2 10M22 10V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V10" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Información Académica
                </h4>
                <div class="detail-item">
                    <span class="detail-label">Carrera:</span>
                    <span class="detail-value">${student.career || 'No especificada'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Año:</span>
                    <span class="detail-value">${student.year ? student.year + 'º Año' : 'No especificado'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Habitación:</span>
                    <span class="detail-value">${student.room || 'Sin asignar'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Fecha ingreso:</span>
                    <span class="detail-value">${student.checkIn ? formatDate(student.checkIn) : 'Pendiente'}</span>
                </div>
            </div>
        </div>
        
        ${student.notes ? `
        <div class="detail-card" style="margin-top: 1rem;">
            <h4>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
                </svg>
                Notas Adicionales
            </h4>
            <p style="color: var(--main); line-height: 1.6;">${student.notes}</p>
        </div>
        ` : ''}
    `;
    
    document.getElementById('studentDetailsContent').innerHTML = detailsHTML;
    document.getElementById('studentDetailsModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Guardar ID para edición
    currentEditingStudent = student;
}

function viewReservaDetails(reservaId) {
    const reserva = reservasData.find(r => r.id === reservaId);
    if (!reserva) return;
    
    currentViewingReserva = reserva;
    
    const detailsHTML = `
        <div class="details-grid">
            <div class="detail-card">
                <h4>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2"/>
                        <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Información de la Reserva
                </h4>
                <div class="detail-item">
                    <span class="detail-label">Estudiante:</span>
                    <span class="detail-value">${reserva.student}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Habitación:</span>
                    <span class="detail-value">${reserva.room}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Estado:</span>
                    <span class="detail-value">
                        <span class="status-badge status-${reserva.status}">${capitalizeFirst(reserva.status)}</span>
                    </span>
                </div>
            </div>
            
            <div class="detail-card">
                <h4>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Fechas Importantes
                </h4>
                <div class="detail-item">
                    <span class="detail-label">Fecha solicitud:</span>
                    <span class="detail-value">${formatDate(reserva.requestDate)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Fecha ingreso:</span>
                    <span class="detail-value">${formatDate(reserva.checkInDate)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Días restantes:</span>
                    <span class="detail-value">${getDaysUntil(reserva.checkInDate)} días</span>
                </div>
            </div>
        </div>
        
        <div class="timeline">
            <div class="timeline-item">
                <div class="timeline-date">${formatDate(reserva.requestDate)}</div>
                <div class="timeline-content">Solicitud de reserva enviada</div>
            </div>
            ${reserva.status === 'confirmada' ? `
            <div class="timeline-item">
                <div class="timeline-date">${formatDate(new Date())}</div>
                <div class="timeline-content">Reserva confirmada por administración</div>
            </div>
            ` : ''}
            <div class="timeline-item">
                <div class="timeline-date">${formatDate(reserva.checkInDate)}</div>
                <div class="timeline-content">Fecha prevista de ingreso</div>
            </div>
        </div>
    `;
    
    document.getElementById('reservaDetailsContent').innerHTML = detailsHTML;
    
    // Configurar botones de acción
    const actionsHTML = reserva.status === 'pendiente' ? `
        <button class="btn-primary" onclick="approveReservaFromDetails()" style="background: var(--success);">
            Aprobar Reserva
        </button>
        <button class="btn-secondary" onclick="rejectReservaFromDetails()" style="border-color: var(--danger); color: var(--danger);">
            Rechazar Reserva
        </button>
    ` : '';
    
    document.getElementById('reservaActions').innerHTML = actionsHTML;
    
    document.getElementById('reservaDetailsModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// ==================== FUNCIONES DE CIERRE DE MODALES ====================

function closeRoomDetailsModal() {
    document.getElementById('roomDetailsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentEditingRoom = null;
}

function closeStudentDetailsModal() {
    document.getElementById('studentDetailsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentEditingStudent = null;
}

function closeReservaDetailsModal() {
    document.getElementById('reservaDetailsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentViewingReserva = null;
}

// ==================== FUNCIONES DE EDICIÓN DESDE DETALLES ====================

function editRoomFromDetails() {
    closeRoomDetailsModal();
    if (currentEditingRoom) {
        editRoom(currentEditingRoom.id);
    }
}

function editStudentFromDetails() {
    closeStudentDetailsModal();
    if (currentEditingStudent) {
        editStudent(currentEditingStudent.id);
    }
}

function approveReservaFromDetails() {
    if (currentViewingReserva) {
        approveReserva(currentViewingReserva.id);
        closeReservaDetailsModal();
    }
}

function rejectReservaFromDetails() {
    if (currentViewingReserva) {
        rejectReserva(currentViewingReserva.id);
        closeReservaDetailsModal();
    }
}

// ==================== FUNCIONES AUXILIARES ====================

// function populateStudentSelect() {
//     const select = document.getElementById('roomStudent');
//     select.innerHTML = '<option value="">Sin asignar</option>';
    
//     // Solo estudiantes sin habitación asignada
//     const availableStudents = extendedStudentsData.filter(student => 
//         !student.room || (currentEditingRoom && student.room === currentEditingRoom.number)
//     );
    
//     availableStudents.forEach(student => {
//         const option = document.createElement('option');
//         option.value = student.id;
//         option.textContent = student.name;
//         select.appendChild(option);
//     });
// }

function populateRoomSelect() {
    const select = document.getElementById('studentRoom');
    select.innerHTML = '<option value="">Sin asignar</option>';
    
    // Solo habitaciones disponibles
    const availableRooms = roomsData.filter(room => 
        room.status === 'disponible' || (currentEditingStudent && room.number === currentEditingStudent.room)
    );
    
    availableRooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.number;
        option.textContent = `${room.number} - ${capitalizeFirst(room.type)} (€${room.price}/mes)`;
        select.appendChild(option);
    });
}

function showFieldError(fieldId, message) {
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

function clearFormErrors(formId) {
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

function getDaysUntil(dateString) {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// function showNotification(message, type = 'info') {
//     // Crear notificación toast (implementación básica)
//     const notification = document.createElement('div');
//     notification.className = `notification notification-${type}`;
//     notification.textContent = message;
//     notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         background: var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'});
//         color: white;
//         padding: 1rem 1.5rem;
//         border-radius: 8px;
//         box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//         z-index: 10000;
//         animation: slideInRight 0.3s ease;
//     `;
    
//     document.body.appendChild(notification);
    
//     setTimeout(() => {
//         notification.style.animation = 'slideOutRight 0.3s ease';
//         setTimeout(() => {
//             document.body.removeChild(notification);
//         }, 300);
//     }, 3000);
// }

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    const modals = ['roomModal', 'studentModal', 'roomDetailsModal', 'studentDetailsModal', 'reservaDetailsModal'];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Actualizar el evento de cambio de estado de habitación
// document.addEventListener('DOMContentLoaded', () => {
//     const roomStatusSelect = el('#roomStatus');
//     if (roomStatusSelect) {
//         roomStatusSelect.addEventListener('change', () => {
//             const studentGroup = el('#studentSelectGroup');
//             if (this.value === 'ocupada') {
//                 studentGroup.style.display = 'block';
//                 populateStudentSelect();
//             } else {
//                 studentGroup.style.display = 'none';
//             }
//         });
//     }
// });