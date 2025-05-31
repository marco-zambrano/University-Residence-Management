import { roomsData, studentsData } from './data.js';
import { renderRoomsTable, renderStudentsTable, renderReservasTable } from './tables.js';

// helpers
const el = (selector) => document.querySelector(selector);
const els = (selector) => document.querySelectorAll(selector);

// initilize admin panel
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');
    renderRoomsTable();
    renderStudentsTable();
    renderReservasTable();
    updateStats();
});

// li item in aside
el('.dashboard-item').addEventListener('click', () => showSection('dashboard'));
el('.habitaciones-item').addEventListener('click', () => showSection('habitaciones'));
el('.estudiantes-item').addEventListener('click', () => showSection('estudiantes'));
el('.reservas-item').addEventListener('click', () => showSection('reservas'));

// navegation between sections
function showSection(sectionName) {
    // hide all the sections
    els('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // show the selected section
    el(`#${sectionName}`).classList.add('active');
    
    // update the li item activated
    els('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    el(`.${sectionName}-item`).classList.add('active');

    // Update section tittle
    const titles = {
        'dashboard': 'Dashboard',
        'habitaciones': 'Gestión de Habitaciones',
        'estudiantes': 'Gestión de Estudiantes',
        'reservas': 'Gestión de Reservas'
    };
    el('#sectionTitle').textContent = titles[sectionName];
}


// Update dashboard stats
export function updateStats() {
    const totalRooms = roomsData.length; // total rooms
    const occupiedRooms = roomsData.filter(room => room.status === 'ocupada').length; // occupied rooms
    const availableRooms = roomsData.filter(room => room.status === 'disponible').length; // avaible rooms
    const totalStudents = studentsData.filter(student => student.status === 'activo').length; // total students
    
    // Upadate stats cards values
    const statCards = els('.stat-card');
    if (statCards.length >= 4) {
        statCards[0].querySelector('h3').textContent = totalRooms; // total rooms value
        statCards[1].querySelector('h3').textContent = occupiedRooms; // occupied rooms value
        statCards[2].querySelector('h3').textContent = availableRooms; // avaible rooms value
        statCards[3].querySelector('h3').textContent = totalStudents; // total students value
    }
}

// Cerrar sesión
el('.logout-btn').addEventListener('click', logout);
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        console.log('redireccionando');
        // window.location.href = './../../../pages/dashboard.html';
    }
}

// Funciones auxiliares
export function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

// Responsive sidebar toggle
function toggleSidebar() {
    // const sidebar = document.querySelector('.sidebar');
    const sidebar = el('.sidebar');
    sidebar.classList.toggle('open');
}

// Cerrar sidebar al hacer clic fuera (móvil)
document.addEventListener('click', function(event) {
    // const sidebar = document.querySelector('.sidebar');
    const sidebar = el('.sidebar');
    const isClickInsideSidebar = sidebar.contains(event.target);
    
    if (!isClickInsideSidebar && window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
    }
});

// Animaciones de entrada
document.addEventListener('DOMContentLoaded', function() {
    const cards = els('.stat-card, .chart-card, .recent-activity');

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