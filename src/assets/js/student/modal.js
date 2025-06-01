import { roomsData } from '../data.js'
import { confirmarReserva } from './student.js'

const el = (selector) => document.querySelector(selector);
let selectedRoom = null;

// Abrir modal de reserva (versión moderna)
export const openReservationModal = (roomId) => {
    // Encontrar la habitación seleccionada
    selectedRoom = roomsData.find(room => room.id === roomId);

    const modal = el('#reservaModal');
    const modalDetails = el('#modalRoomDetails');
    
    // Limpiar contenido previo
    modalDetails.replaceChildren();
    
    // Room card contenedor
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
    roomStatus.className = 'room-status status-disponible'; // ya que solo se abren los modales de habitaciones disponibles
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
        createDetailElement('Edificio', selectedRoom.building),
        createDetailElement('Ubicación', `Piso ${selectedRoom.floor}`),
        createDetailElement('Precio', `€${selectedRoom.price}/mes`),
        createDetailElement('Incluye', selectedRoom.amenities.join(', '))
    );
    
    // Construir la tarjeta completa
    roomCard.append(roomHeader, roomDetails);
    modalDetails.appendChild(roomCard);
    
    const modalFotter = el('.modal-footer');
    modalFotter.innerHTML = '' // Limpiar contenido previo
    
    // construir los botones del modal
    const closeButton = document.createElement('button');
    closeButton.className = 'btn-secondary';
    closeButton.textContent = 'Cerrar';
    closeButton.dataset.roomId = selectedRoom.id;
    closeButton.addEventListener('click', closeModal);
    
    const reserveButton = document.createElement('button');
    reserveButton.className = 'btn-primary';
    reserveButton.textContent = 'Confirmar Reserva';
    reserveButton.addEventListener('click', () => {
        confirmarReserva(selectedRoom.id);
        closeModal();
    });

    modalFotter.appendChild(closeButton);
    modalFotter.appendChild(reserveButton);

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

// // Cerrar modal
function closeModal() {
    const modal = el('#reservaModal');

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedRoom = null;
    
    // Limpiar formulario
    el('#reservaForm').reset();
}