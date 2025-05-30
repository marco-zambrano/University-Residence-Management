// // Variables globales
// let selectedZone = null;

// // Elementos del DOM
// const zoneCards = document.querySelectorAll('.zone-card');
// const selectedZoneDiv = document.getElementById('selectedZone');
// const zoneNameSpan = document.getElementById('zoneName');

// // Datos de las residencias
// const residencesData = {
//     '1': {
//         name: 'Residencia Norte',
//         building: 'Edificio A',
//         capacity: 120,
//         occupancy: 85
//     },
//     '2': {
//         name: 'Residencia Sur',
//         building: 'Edificio B',
//         capacity: 95,
//         occupancy: 92
//     },
//     '3': {
//         name: 'Residencia Este',
//         building: 'Edificio C',
//         capacity: 80,
//         occupancy: 78
//     },
//     '4': {
//         name: 'Residencia Oeste',
//         building: 'Edificio D',
//         capacity: 110,
//         occupancy: 67
//     }
// };

// // Inicializar eventos
// document.addEventListener('DOMContentLoaded', function() {
//     initializeZoneCards();
//     addAnimations();
// });

// // Inicializar las tarjetas de zona
// function initializeZoneCards() {
//     zoneCards.forEach(card => {
//         card.addEventListener('click', function() {
//             const zone = this.getAttribute('data-zone');
//             selectZone(zone);
//         });

//         // Agregar efecto de hover con sonido (opcional)
//         card.addEventListener('mouseenter', function() {
//             this.style.transform = 'translateY(-8px) scale(1.02)';
//         });

//         card.addEventListener('mouseleave', function() {
//             if (!this.classList.contains('selected')) {
//                 this.style.transform = 'translateY(0) scale(1)';
//             }
//         });
//     });
// }

// // Seleccionar una zona
// function selectZone(zone) {
//     // Remover selección anterior
//     zoneCards.forEach(card => {
//         card.classList.remove('selected');
//         card.style.transform = 'translateY(0) scale(1)';
//     });

//     // Seleccionar nueva zona
//     const selectedCard = document.querySelector(`[data-zone="${zone}"]`);
//     selectedCard.classList.add('selected');
//     selectedCard.style.transform = 'translateY(-8px) scale(1.02)';

//     selectedZone = zone;
//     const residenceData = residencesData[zone];
    
//     // Mostrar información de la zona seleccionada
//     zoneNameSpan.textContent = residenceData.name;
//     selectedZoneDiv.style.display = 'flex';

//     // Agregar efecto de vibración suave
//     selectedCard.style.animation = 'pulse 0.6s ease-in-out';
//     setTimeout(() => {
//         selectedCard.style.animation = '';
//     }, 600);

//     console.log(`Zona seleccionada: ${residenceData.name}`);
// }

// // Proceder a la gestión de la residencia
// function proceedToManagement() {
//     if (selectedZone) {
//         const residenceData = residencesData[selectedZone];
        
//         // Aquí puedes agregar la lógica para navegar a la página de gestión
//         alert(`Redirigiendo a la gestión de ${residenceData.name}...`);
        
//         // Ejemplo de redirección (descomenta cuando tengas las páginas):
//         // window.location.href = `gestion.html?zona=${selectedZone}`;
        
//         console.log('Datos de la residencia:', residenceData);
//     }
// }

// // Agregar animaciones de entrada
// function addAnimations() {
//     // Animar las tarjetas al cargar
//     zoneCards.forEach((card, index) => {
//         card.style.opacity = '0';
//         card.style.transform = 'translateY(30px)';
        
//         setTimeout(() => {
//             card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
//             card.style.opacity = '1';
//             card.style.transform = 'translateY(0)';
//         }, index * 150);
//     });
// }

// // Función para actualizar estadísticas (simulación)
// function updateOccupancyStats() {
//     zoneCards.forEach(card => {
//         const zone = card.getAttribute('data-zone');
//         const occupancyElement = card.querySelector('.occupancy');
//         const currentOccupancy = residencesData[zone].occupancy;
        
//         // Simular cambio aleatorio pequeño
//         const change = Math.floor(Math.random() * 3) - 1; // -1, 0, o 1
//         const newOccupancy = Math.max(0, Math.min(100, currentOccupancy + change));
        
//         residencesData[zone].occupancy = newOccupancy;
//         occupancyElement.textContent = `${newOccupancy}% ocupado`;
//     });
// }

// // Actualizar estadísticas cada 30 segundos (opcional)
// setInterval(updateOccupancyStats, 30000);

// // Agregar estilos CSS dinámicos para la animación pulse
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes pulse {
//         0% { transform: translateY(-8px) scale(1.02); }
//         50% { transform: translateY(-8px) scale(1.05); }
//         100% { transform: translateY(-8px) scale(1.02); }
//     }
// `;
// document.head.appendChild(style);