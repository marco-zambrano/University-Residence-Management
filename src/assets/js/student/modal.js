import { roomsData } from './roomsData.js'

const el = (selector) => document.querySelector(selector);

// Abrir modal de reserva (versión moderna)
export const openReservationModal = (roomId) => {
    // Encontrar la habitación seleccionada
    let selectedRoom = roomsData.find(room => room.id === roomId);

    const modal = el('#reservaModal');
    const modalDetails = el('#modalRoomDetails');
    
    // Limpiar contenido previo
    modalDetails.replaceChildren();
    
    // Crear elementos del modal de forma programática
    const roomCard = document.createElement('div');
    roomCard.className = 'room-card';
    roomCard.style.marginBottom = '1.5rem';
    
    // Crear header de la habitación
    const roomHeader = document.createElement('div');
    roomHeader.className = 'room-header';
    
    const roomNumber = document.createElement('div');
    roomNumber.className = 'room-number';
    roomNumber.textContent = `Habitación ${selectedRoom.number}`;
    
    const roomStatus = document.createElement('div');
    roomStatus.className = 'room-status status-disponible';
    roomStatus.textContent = 'Disponible';
    
    roomHeader.append(roomNumber, roomStatus);
    
    // Crear detalles de la habitación
    const roomDetails = document.createElement('div');
    roomDetails.className = 'room-details';
    
    // Función auxiliar para crear elementos de detalle
    const createDetailElement = (label, value) => {
        const detail = document.createElement('div');
        detail.className = 'room-detail';
        
        const strong = document.createElement('strong');
        strong.textContent = `${label}: `;
        
        detail.append(strong, document.createTextNode(value));
        return detail;
    };
    
    // Añadir detalles
    roomDetails.append(
        createDetailElement('Capacidad', selectedRoom.capacity),
        createDetailElement('Ubicación', `Piso ${selectedRoom.floor}`),
        createDetailElement('Precio', `€${selectedRoom.price}/mes`),
        createDetailElement('Incluye', selectedRoom.amenities.join(', '))
    );
    
    // Construir la tarjeta completa
    roomCard.append(roomHeader, roomDetails);
    modalDetails.appendChild(roomCard);
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Añadir event listener para cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Mejorar accesibilidad
    modal.setAttribute('aria-hidden', 'false');
    el('#modalCloseBtn')?.focus();
};

el('.close-btn').addEventListener('click', closeModal);
el('.btn-secondary').addEventListener('click', closeModal);

// // Cerrar modal
function closeModal() {
    const modal = el('#reservaModal');

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedRoom = null;
    
    // Limpiar formulario
    el('#reservaForm').reset();
}