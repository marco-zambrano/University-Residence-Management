export let roomsData = [
    {
        id: 1,
        number: "101",
        capacity: 1,
        floor: 1,
        status: "disponible",
        price: 350,
        student: "Juan Pérez",
        studentId: 1
    },
    {
        id: 2,
        number: "102",
        capacity: 2,
        floor: 1,
        status: "disponible",
        price: 280,
        student: null,
        studentId: null
    },
    {
        id: 3,
        number: "103",
        capacity: 3,
        floor: 1,
        status: "ocupada",
        price: 350,
        student: null,
        studentId: null
    },
    {
        id: 4,
        number: "201",
        capacity: 1,
        floor: 2,
        status: "disponible",
        price: 220,
        student: "Ana López",
        studentId: 2
    },
    {
        id: 5,
        number: "202",
        capacity: 2,
        floor: 2,
        status: "disponible",
        price: 280,
        student: null,
        studentId: null
    }
];

export function setNewRoomData(newData) {
    roomsData = [...newData]
}

export let studentsData = [
    {
        id: 1,
        name: "Juan Pérez",
        email: "juan.perez@universidad.edu",
        room: "101",
        checkIn: "2024-01-15",
        status: "activo"
    },
    {
        id: 2,
        name: "Ana López",
        email: "ana.lopez@universidad.edu",
        room: "201",
        checkIn: "2024-02-01",
        status: "activo"
    },
    {
        id: 3,
        name: "Carlos Ruiz",
        email: "carlos.ruiz@universidad.edu",
        room: null,
        checkIn: null,
        status: "pendiente"
    }
];

export function setNewStudentData(newData) {
    studentsData = [...newData]
}

export let reservasData = [
    {
        id: 1,
        student: "María García",
        room: "102",
        requestDate: "2024-01-20",
        checkInDate: "2024-02-15",
        status: "pendiente"
    },
    {
        id: 2,
        student: "Pedro Martín",
        room: "202",
        requestDate: "2024-01-18",
        checkInDate: "2024-02-10",
        status: "confirmada"
    },
    {
        id: 3,
        student: "Laura Sánchez",
        room: "301",
        requestDate: "2024-01-22",
        checkInDate: "2024-03-01",
        status: "pendiente"
    }
];

export function setNewSReservatData(newData) {
    reservasData = [...newData]
}