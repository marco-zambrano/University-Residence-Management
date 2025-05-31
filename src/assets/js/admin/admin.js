import { roomsData, studentsData, reservasData } from './data.js';
import { renderRoomsTable, renderStudentsTable, renderReservasTable } from './tables.js';

export let currentReservasFilter = 'todas';
const el = (selector) => document.querySelector(selector);
const els = (selector) => document.querySelectorAll(selector);

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');
    renderRoomsTable();
    renderStudentsTable();
    renderReservasTable();
    updateStats();
});


el('.dashboard-item').addEventListener('click', () => showSection('dashboard'));
el('.habitaciones-item').addEventListener('click', () => showSection('habitaciones'));
el('.estudiantes-item').addEventListener('click', () => showSection('estudiantes'));
el('.reservas-item').addEventListener('click', () => showSection('reservas'));

// Navegación entre secciones
function showSection(sectionName) {
    // Ocultar todas las secciones
    els('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar sección seleccionada
    el(`#${sectionName}`).classList.add('active');
    
    // Actualizar menú activo
    els('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    el(`.${sectionName}-item`).classList.add('active');

    
    // Actualizar título
    const titles = {
        'dashboard': 'Dashboard',
        'habitaciones': 'Gestión de Habitaciones',
        'estudiantes': 'Gestión de Estudiantes',
        'reservas': 'Gestión de Reservas'
    };

    el('#sectionTitle').textContent = titles[sectionName];
}

// Actualizar estadísticas del dashboard
export function updateStats() {
    console.log('updating');
    
    const totalRooms = roomsData.length;
    const occupiedRooms = roomsData.filter(room => room.status === 'ocupada').length;
    const availableRooms = roomsData.filter(room => room.status === 'disponible').length;
    const totalStudents = studentsData.filter(student => student.status === 'activo').length;
    
    // Actualizar las tarjetas de estadísticas
    const statCards = els('.stat-card');
    if (statCards.length >= 4) {
        statCards[0].querySelector('h3').textContent = totalRooms;
        statCards[1].querySelector('h3').textContent = occupiedRooms;
        statCards[2].querySelector('h3').textContent = availableRooms;
        statCards[3].querySelector('h3').textContent = totalStudents;
    }
}

el('.todas-filter').addEventListener('click', () => filterReservas('todas'));
el('.pendiente-filter').addEventListener('click', () => filterReservas('pendiente'));
el('.confirmada-filter').addEventListener('click', () => filterReservas('confirmada'));

// Filtrar reservas
function filterReservas(filter) {
    currentReservasFilter = filter;
    
    els('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    })
    el(`.${filter}-filter`).classList.add('active');

    renderReservasTable();
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