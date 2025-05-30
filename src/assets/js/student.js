// Datos de habitaciones simulados
const roomsData = [
    {
        id: 1,
        number: "101",
        type: "individual",
        floor: 1,
        status: "disponible",
        price: 350,
        amenities: ["WiFi", "Baño privado", "Escritorio"],
        size: "12 m²"
    },
    {
        id: 2,
        number: "102",
        type: "doble",
        floor: 1,
        status: "disponible",
        price: 280,
        amenities: ["WiFi", "Baño compartido", "2 Escritorios"],
        size: "18 m²"
    },
    {
        id: 3,
        number: "103",
        type: "individual",
        floor: 1,
        status: "ocupada",
        price: 350,
        amenities: ["WiFi", "Baño privado", "Escritorio"],
        size: "12 m²"
    },
    {
        id: 4,
        number: "201",
        type: "triple",
        floor: 2,
        status: "disponible",
        price: 220,
        amenities: ["WiFi", "Baño compartido", "3 Escritorios"],
        size: "25 m²"
    },
    {
        id: 5,
        number: "202",
        type: "doble",
        floor: 2,
        status: "disponible",
        price: 280,
        amenities: ["WiFi", "Baño privado", "2 Escritorios", "Balcón"],
        size: "20 m²"
    },
    {
        id: 6,
        number: "203",
        type: "individual",
        floor: 2,
        status: "disponible",
        price: 380,
        amenities: ["WiFi", "Baño privado", "Escritorio", "Vista al jardín"],
        size: "15 m²"
    },
    {
        id: 7,
        number: "301",
        type: "doble",
        floor: 3,
        status: "ocupada",
        price: 280,
        amenities: ["WiFi", "Baño compartido", "2 Escritorios"],
        size: "18 m²"
    },
    {
        id: 8,
        number: "302",
        type: "individual",
        floor: 3,
        status: "disponible",
        price: 350,
        amenities: ["WiFi", "Baño privado", "Escritorio"],
        size: "12 m²"
    }
];

let filteredRooms = [...roomsData];
let selectedRoom = null;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderRooms();
    updateRoomCount();
    
    // Establecer fecha mínima como hoy
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fechaIngreso').min = today;
});

// Renderizar habitaciones
function renderRooms() {
    const roomsGrid = document.getElementById('roomsGrid');
    roomsGrid.innerHTML = '';

    filteredRooms.forEach(room => {
        const roomCard = createRoomCard(room);
        roomsGrid.appendChild(roomCard);
    });
}

// Crear tarjeta de habitación
function createRoomCard(room) {
    const div = document.createElement('div');
    div.className = 'room-card';
    
    const statusClass = room.status === 'disponible' ? 'status-disponible' : 'status-ocupada';
    const statusText = room.status === 'disponible' ? 'Disponible' : 'Ocupada';
    
    div.innerHTML = `
        <div class="room-header">
            <div class="room-number">Habitación ${room.number}</div>
            <div class="room-status ${statusClass}">${statusText}</div>
        </div>
        
        <div class="room-details">
            <div class="room-detail">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 9V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V9M20 9V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V9M20 9H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Capacidad: ${capitalizeFirst(room.type)}
            </div>
            <div class="room-detail">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21L21 21M4 21V7L12 3L20 7V21M9 9H15M9 12H15M9 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Piso ${room.floor}
            </div>
            <div class="room-detail">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${room.amenities.join(', ')}
            </div>
        </div>
        
        <div class="room-price">€${room.price}/mes</div>
        
        <button 
            class="reserve-btn" 
            ${room.status === 'ocupada' ? 'disabled' : ''} 
            onclick="openReservationModal(${room.id})"
        >
            ${room.status === 'disponible' ? 'Reservar Habitación' : 'No Disponible'}
        </button>
    `;
    
    return div;
}

// Filtrar habitaciones
function filterRooms() {
    const tipoFilter = document.getElementById('tipoHabitacion').value;
    const pisoFilter = document.getElementById('piso').value;
    const searchTerm = document.getElementById('searchRoom').value.toLowerCase();
    
    filteredRooms = roomsData.filter(room => {
        const matchesTipo = !tipoFilter || room.type === tipoFilter;
        const matchesPiso = !pisoFilter || room.floor.toString() === pisoFilter;
        const matchesSearch = !searchTerm || 
            room.number.toLowerCase().includes(searchTerm) ||
            room.type.toLowerCase().includes(searchTerm) ||
            room.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm));
        
        return matchesTipo && matchesPiso && matchesSearch;
    });
    
    renderRooms();
    updateRoomCount();
}

// Actualizar contador de habitaciones
function updateRoomCount() {
    const countElement = document.querySelector('.room-count');
    const disponibles = filteredRooms.filter(room => room.status === 'disponible').length;
    countElement.textContent = `${filteredRooms.length} habitaciones encontradas (${disponibles} disponibles)`;
}

// Abrir modal de reserva
function openReservationModal(roomId) {
    selectedRoom = roomsData.find(room => room.id === roomId);
    if (!selectedRoom || selectedRoom.status !== 'disponible') return;
    
    const modal = document.getElementById('reservaModal');
    const modalDetails = document.getElementById('modalRoomDetails');
    
    modalDetails.innerHTML = `
        <div class="room-card" style="margin-bottom: 1.5rem;">
            <div class="room-header">
                <div class="room-number">Habitación ${selectedRoom.number}</div>
                <div class="room-status status-disponible">Disponible</div>
            </div>
            <div class="room-details">
                <div class="room-detail">
                    <strong>Tipo:</strong> ${capitalizeFirst(selectedRoom.type)}
                </div>
                <div class="room-detail">
                    <strong>Ubicación:</strong> Piso ${selectedRoom.floor} • ${selectedRoom.size}
                </div>
                <div class="room-detail">
                    <strong>Precio:</strong> €${selectedRoom.price}/mes
                </div>
                <div class="room-detail">
                    <strong>Incluye:</strong> ${selectedRoom.amenities.join(', ')}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('reservaModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedRoom = null;
    
    // Limpiar formulario
    document.getElementById('reservaForm').reset();
}

// Confirmar reserva
function confirmarReserva() {
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const duracion = document.getElementById('duracion').value;
    const comentarios = document.getElementById('comentarios').value;
    
    if (!fechaIngreso || !duracion) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    // Simular proceso de reserva
    const reservaData = {
        room: selectedRoom,
        fechaIngreso: fechaIngreso,
        duracion: duracion,
        comentarios: comentarios,
        fecha: new Date().toISOString()
    };
    
    console.log('Datos de reserva:', reservaData);
    
    // Simular éxito
    alert(`¡Reserva exitosa!\n\nHabitación: ${selectedRoom.number}\nFecha de ingreso: ${fechaIngreso}\nDuración: ${duracion}\n\nRecibirás un email de confirmación en breve.`);
    
    // Marcar habitación como ocupada (simulación)
    selectedRoom.status = 'ocupada';
    
    // Cerrar modal y actualizar vista
    closeModal();
    renderRooms();
    updateRoomCount();
}

// Cerrar sesión
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        window.location.href = 'index.html';
    }
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('reservaModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Función auxiliar
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Animaciones de entrada
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.room-card');
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