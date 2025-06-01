import { currentEditingRoom, setcurrentEditingRoom, clearFormErrors, showFieldError } from './modal.js'
import { roomsData, setNewRoomData } from '../data.js';
import { renderRoomsTable } from '../tables.js';
import { updateStats } from '../admin.js'

const el = (selector) => document.querySelector(selector);
const els = (selector) => document.querySelectorAll(selector);

export function openAddRoomModal() {
    setcurrentEditingRoom(null);
    
    el('#roomModalTitle').textContent = 'Nueva Habitación';
    el('#roomForm').reset();
    el('#roomId').value = '';

    // Open modal
    el('#roomModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

export function editRoomModal(roomId) {
    setcurrentEditingRoom(roomsData.find(room => room.id === roomId));
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

els('.close-room-btn').forEach(btn => btn.addEventListener('click', closeRoomModal) );
el('.save-room-btn').addEventListener('click', saveRoom);

function closeRoomModal() {
    el('#roomModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    setcurrentEditingRoom(null);
    clearFormErrors('roomForm');
}

function saveRoom() {
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
    const newRoomData = [...roomsData];
    if (currentEditingRoom) {
        const index = roomsData.findIndex(room => room.id === currentEditingRoom.id);
        newRoomData[index] = roomData;
        setNewRoomData(newRoomData);
    } else {
        newRoomData.push(roomData);
        setNewRoomData(newRoomData);
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
    const capacity = el('#roomCapacity').value;
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
    
    if (!capacity) {
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
