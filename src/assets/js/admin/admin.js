// Datos simulados
let roomsData = [
    {
        id: 1,
        number: "101",
        type: "individual",
        floor: 1,
        status: "ocupada",
        price: 350,
        student: "Juan Pérez",
        studentId: 1
    },
    {
        id: 2,
        number: "102",
        type: "doble",
        floor: 1,
        status: "disponible",
        price: 280,
        student: null,
        studentId: null
    },
    {
        id: 3,
        number: "103",
        type: "individual",
        floor: 1,
        status: "mantenimiento",
        price: 350,
        student: null,
        studentId: null
    },
    {
        id: 4,
        number: "201",
        type: "triple",
        floor: 2,
        status: "ocupada",
        price: 220,
        student: "Ana López",
        studentId: 2
    },
    {
        id: 5,
        number: "202",
        type: "doble",
        floor: 2,
        status: "disponible",
        price: 280,
        student: null,
        studentId: null
    }
];

let studentsData = [
    {
        id: 1,
        name: "Juan Pérez",
        email: "juan.perez@universidad.edu",
        room: "101",
        checkIn: "2024-01-15",
        status: "activo"
    },
    {
        id: 2,
        name: "Ana López",
        email: "ana.lopez@universidad.edu",
        room: "201",
        checkIn: "2024-02-01",
        status: "activo"
    },
    {
        id: 3,
        name: "Carlos Ruiz",
        email: "carlos.ruiz@universidad.edu",
        room: null,
        checkIn: null,
        status: "pendiente"
    }
];

let reservasData = [
    {
        id: 1,
        student: "María García",
        room: "102",
        requestDate: "2024-01-20",
        checkInDate: "2024-02-15",
        status: "pendiente"
    },
    {
        id: 2,
        student: "Pedro Martín",
        room: "202",
        requestDate: "2024-01-18",
        checkInDate: "2024-02-10",
        status: "confirmada"
    },
    {
        id: 3,
        student: "Laura Sánchez",
        room: "301",
        requestDate: "2024-01-22",
        checkInDate: "2024-03-01",
        status: "pendiente"
    }
];

let currentReservasFilter = 'todas';

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    showSection('dashboard');
    renderRoomsTable();
    renderStudentsTable();
    renderReservasTable();
    updateStats();
    createOccupancyChart();
});

// Navegación entre secciones
function showSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(sectionName).classList.add('active');
    
    // Actualizar menú activo
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.${sectionName}-item`).classList.add('active');
    
    // Actualizar título
    const titles = {
        'dashboard': 'Dashboard',
        'habitaciones': 'Gestión de Habitaciones',
        'estudiantes': 'Gestión de Estudiantes',
        'reservas': 'Gestión de Reservas'
    };
    document.getElementById('sectionTitle').textContent = titles[sectionName];
}

// Actualizar estadísticas del dashboard
function updateStats() {
    const totalRooms = roomsData.length;
    const occupiedRooms = roomsData.filter(room => room.status === 'ocupada').length;
    const availableRooms = roomsData.filter(room => room.status === 'disponible').length;
    const totalStudents = studentsData.filter(student => student.status === 'activo').length;
    
    // Actualizar las tarjetas de estadísticas
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
        statCards[0].querySelector('h3').textContent = totalRooms;
        statCards[1].querySelector('h3').textContent = occupiedRooms;
        statCards[2].querySelector('h3').textContent = availableRooms;
        statCards[3].querySelector('h3').textContent = totalStudents;
    }
}

// Renderizar tabla de habitaciones
function renderRoomsTable() {
    const tbody = document.getElementById('roomsTableBody');
    tbody.innerHTML = '';
    
    roomsData.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${room.number}</strong></td>
            <td>${capitalizeFirst(room.type)}</td>
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
function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
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
function renderReservasTable() {
    const tbody = document.getElementById('reservasTableBody');
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

// Filtrar reservas
function filterReservas(filter) {
    currentReservasFilter = filter;
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.${filter}-filter`).classList.add('active');

    renderReservasTable();
}

// Funciones de gestión de habitaciones
function openAddRoomModal() {
    alert('Modal para agregar nueva habitación (por implementar)');
}

function editRoom(roomId) {
    const room = roomsData.find(r => r.id === roomId);
    alert(`Editar habitación ${room.number} (por implementar)`);
}

function deleteRoom(roomId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
        roomsData = roomsData.filter(r => r.id !== roomId);
        renderRoomsTable();
        updateStats();
        alert('Habitación eliminada correctamente');
    }
}

// Funciones de gestión de estudiantes
function openAddStudentModal() {
    alert('Modal para agregar nuevo estudiante (por implementar)');
}

function editStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    alert(`Editar estudiante ${student.name} (por implementar)`);
}

function deleteStudent(studentId) {
    if (confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
        studentsData = studentsData.filter(s => s.id !== studentId);
        renderStudentsTable();
        updateStats();
        alert('Estudiante eliminado correctamente');
    }
}

// Funciones de gestión de reservas
function approveReserva(reservaId) {
    const reserva = reservasData.find(r => r.id === reservaId);
    if (confirm(`¿Aprobar la reserva de ${reserva.student} para la habitación ${reserva.room}?`)) {
        reserva.status = 'confirmada';
        renderReservasTable();
        alert('Reserva aprobada correctamente');
    }
}

function rejectReserva(reservaId) {
    const reserva = reservasData.find(r => r.id === reservaId);
    if (confirm(`¿Rechazar la reserva de ${reserva.student}?`)) {
        reservasData = reservasData.filter(r => r.id !== reservaId);
        renderReservasTable();
        alert('Reserva rechazada');
    }
}

function editReserva(reservaId) {
    const reserva = reservasData.find(r => r.id === reservaId);
    alert(`Ver detalles de la reserva de ${reserva.student} (por implementar)`);
}

// Cerrar sesión
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        window.location.href = 'index.html';
    }
}

// Funciones auxiliares
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

// Responsive sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Cerrar sidebar al hacer clic fuera (móvil)
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const isClickInsideSidebar = sidebar.contains(event.target);
    
    if (!isClickInsideSidebar && window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
    }
});

// Animaciones de entrada
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.stat-card, .chart-card, .recent-activity');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});