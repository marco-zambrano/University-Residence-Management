const el = (selector) => document.querySelector(selector);

export function viewReservation(reserva) {
    // Abrimos el modal de view reserva
    el('#reservaDetailsModal').style.display = 'block';
    
    // Declare and Clean de modal
    const bodyContent = el('#reservaDetailsContent');
    bodyContent.innerHTML = '';

    //  Student
    const studentContainer = document.createElement('div');
    const studentTitle = document.createElement('h3');
    studentTitle.textContent = 'Estudiante:';
    const studentContent = document.createElement('p');
    studentContent.textContent = reserva.student;

    studentContainer.appendChild(studentTitle);
    studentContainer.appendChild(studentContent);

    //  Room
    const roomContainer = document.createElement('div');
    const roomTitle = document.createElement('h3');
    roomTitle.textContent = 'Habitación:';
    const roomContent = document.createElement('p');
    roomContent.textContent = reserva.room;

    roomContainer.appendChild(roomTitle);
    roomContainer.appendChild(roomContent);

    //  Request Date 
    const requestContainer = document.createElement('div');
    const requestTitle = document.createElement('h3');
    requestTitle.textContent = 'Fecha de Solicitud:';
    const requestContent = document.createElement('p');
    requestContent.textContent = reserva.requestDate;

    requestContainer.appendChild(requestTitle);
    requestContainer.appendChild(requestContent);

    //  Checkin Date
    const checkinContainer = document.createElement('div');
    const checkinTitle = document.createElement('h3');
    checkinTitle.textContent = 'Duración de reserva:';
    const checkinContent = document.createElement('p');
    checkinContent.textContent = reserva.duracion;

    checkinContainer.appendChild(checkinTitle);
    checkinContainer.appendChild(checkinContent);

    
    bodyContent.appendChild(studentContainer);
    bodyContent.appendChild(roomContainer);
    bodyContent.appendChild(requestContainer);
    bodyContent.appendChild(checkinContainer);

    if (reserva.comments) {
        //  Comments
        const commentsContainer = document.createElement('div');
        const commentsTitle = document.createElement('h3');
        commentsTitle.textContent = 'Comentarios:';
        const commentsContent = document.createElement('p');
        commentsContent.textContent = reserva.comments;

        commentsContainer.appendChild(commentsTitle);
        commentsContainer.appendChild(commentsContent);

        bodyContent.appendChild(commentsContainer);
    }
}

el('.close-reseva-btn').addEventListener('click', closeReservationModal);

function closeReservationModal() {
    el('#reservaDetailsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}