import { openReservationModal } from './modal.js'

// Crear tarjeta de habitación
export const createRoomCard = (room) => {
    // Crear elementos DOM de forma programática en lugar de usar innerHTML
    const card = document.createElement('article');
    card.className = 'room-card';
    
    // Determinar clases y texto de estado
    const isAvailable = room.status === 'disponible';
    const statusClass = isAvailable ? 'status-disponible' : 'status-ocupada';
    const statusText = isAvailable ? 'Disponible' : 'Ocupada';
    
    // Crear elementos
    const header = document.createElement('header');
    header.className = 'room-header';
    
    const number = document.createElement('div');
    number.className = 'room-number';
    number.textContent = `Habitación ${room.number}`;
    
    const status = document.createElement('div');
    status.className = `room-status ${statusClass}`;
    status.textContent = statusText;
    
    header.append(number, status);
    
    // Detalles de la habitación
    const details = document.createElement('div');
    details.className = 'room-details';
    
    // Iconos SVG como funciones reutilizables
    const createSvgIcon = (paths) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        
        paths.forEach(pathData => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            Object.entries(pathData).forEach(([attr, value]) => path.setAttribute(attr, value));
            svg.appendChild(path);
        });
        
        return svg;
    };
    
    // Detalles individuales
    const capacityDetail = createDetail(
        createSvgIcon([{
            d: 'M20 9V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V9M20 9V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V9M20 9H4',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        }]),
        `Capacidad: ${room.capacity}`
    );
    
    const floorDetail = createDetail(
        createSvgIcon([{
            d: 'M3 21L21 21M4 21V7L12 3L20 7V21M9 9H15M9 12H15M9 15H15',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        }]),
        `Piso ${room.floor}`
    );
    
    const amenitiesDetail = createDetail(
        createSvgIcon([
        {
            d: 'M12 2L2 7L12 12L22 7L12 2Z',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        },
        {
            d: 'M2 17L12 22L22 17',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        },
        {
            d: 'M2 12L12 17L22 12',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        }
        ]),
        room.amenities.join(', ')
    );
    
    details.append(capacityDetail, floorDetail, amenitiesDetail);
    
    // Precio
    const price = document.createElement('div');
    price.className = 'room-price';
    price.textContent = `€${room.price}/mes`;
    
    // Botón de reserva
    const reserveBtn = document.createElement('button');
    reserveBtn.className = 'reserve-btn';
    reserveBtn.textContent = isAvailable ? 'Reservar Habitación' : 'No Disponible';
    reserveBtn.disabled = !isAvailable;
    
    // Usando dataset para almacenar el ID de la habitación
    reserveBtn.dataset.roomId = room.id;
    reserveBtn.addEventListener('click', () => openReservationModal(room.id));
    
    // Ensamblar la tarjeta
    card.append(header, details, price, reserveBtn);
    
    return card;
};

// Función auxiliar para crear detalles
const createDetail = (icon, text) => {
    const detail = document.createElement('span');
    detail.className = 'room-detail';
    
    const textNode = document.createTextNode(text);
    
    detail.append(icon, textNode);
    return detail;
};

