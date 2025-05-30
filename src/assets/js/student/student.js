// Datos de habitaciones simulados
import { roomsData } from './roomsData.js'
import { createRoomCard } from './dom.js'

const el = (selector) => document.querySelector(selector);
const els = (selector) => document.querySelectorAll(selector);
let filteredRooms = [...roomsData];
// let selectedRoom = null;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderRooms();
    updateRoomCount();
    
    // Establecer fecha mínima como hoy en el input date
    const today = new Date().toISOString().split('T')[0];
    el('#fechaIngreso').min = today;
});

// Renderizar habitaciones
function renderRooms() {
    // Creacion de cards
    const roomsGrid = el('#roomsGrid');
    roomsGrid.innerHTML = '';

    filteredRooms.forEach(room => {
        const roomCard = createRoomCard(room);
        roomsGrid.appendChild(roomCard);
    });

    // Animaciones de entrada
    const cards = els('.room-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}


el('#capacity').addEventListener('change', filterRooms);
el('#piso').addEventListener('change', filterRooms);
el('#searchRoom').addEventListener('keyup', filterRooms);

// Filtrar habitaciones
function filterRooms() {
    const capacity = el('#capacity').value;
    const pisoFilter = el('#piso').value;
    const searchTerm = el('#searchRoom').value;
    
    filteredRooms = roomsData.filter(room => {
        const matchesCapacity = !capacity || room.capacity.toString() === capacity;
        const matchesPiso = !pisoFilter || room.floor.toString() === pisoFilter;

        const matchesSearch = !searchTerm || 
            room.number.toString().includes(searchTerm) || 
            room.capacity.toString().includes(searchTerm) ||
            room.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm));
        
        return matchesCapacity && matchesPiso && matchesSearch;
    });

    renderRooms();
    updateRoomCount();
}

// Actualizar contador de habitaciones
function updateRoomCount() {
    const countElement = el('.room-count');

    const disponibles = filteredRooms.filter(room => room.status === 'disponible').length;
    countElement.textContent = `${filteredRooms.length} habitaciones encontradas (${disponibles} disponibles)`;
}

el('.btn-primary').addEventListener('click', confirmarReserva);
// Confirmar reserva
function confirmarReserva() {
    // const fechaIngreso = el('#fechaIngreso').value;
    // const duracion = el('#duracion').value;
    // const comentarios = el('#comentarios').value;
    
    // let selectedRoom = roomsData.find(room => room.id === roomId);
    // if (!fechaIngreso || !duracion) {
    //     alert('Por favor, completa todos los campos obligatorios.');
    //     return;
    // }
    
    // // Simular proceso de reserva
    // const reservaData = {
    //     room: selectedRoom,
    //     fechaIngreso: fechaIngreso,
    //     duracion: duracion,
    //     comentarios: comentarios,
    //     fecha: new Date().toISOString()
    // };
    
    // console.log('Datos de reserva:', reservaData);
    
    // // Simular éxito
    // alert(`¡Reserva exitosa!\n\nHabitación: ${selectedRoom.number}\nFecha de ingreso: ${fechaIngreso}\nDuración: ${duracion}\n\nRecibirás un email de confirmación en breve.`);
    
    // Marcar habitación como ocupada (simulación)
    // selectedRoom.status = 'ocupada';
    
    // Cerrar modal y actualizar vista
    // closeModal();
    // renderRooms();
    // updateRoomCount();
}

// // Cerrar sesión
// el('.logout-btn').addEventListener('click', logout);
// function logout() {
//     if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
//         window.location.href = 'index.html';
//     }
// }
