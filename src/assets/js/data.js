export let roomsData = [
    {
        id: 1,
        number: "101",
        building: "Edificio A",
        floor: 1,
        status: "ocupada",
        price: 350,
        student: "Juan Pérez",
        studentId: 1,
        amenities: ["WiFi", "Baño privado", "Escritorio"],
    },
    {
        id: 2,
        number: "102",
        building: "Edificio A",
        floor: 1,
        status: "disponible",
        price: 280,
        student: null,
        studentId: null,
        amenities: ["WiFi", "Baño compartido", "2 Escritorios"],
    },
    {
        id: 3,
        number: "103",
        building: "Edificio B",
        floor: 1,
        status: "disponible",
        price: 350,
        student: null,
        studentId: null,
        amenities: ["WiFi", "Baño privado", "Escritorio"],
    },
    {
        id: 4,
        number: "201",
        building: "Edificio B",
        floor: 2,
        status: "ocupada",
        price: 220,
        student: "Ana López",
        studentId: 2,
        amenities: ["WiFi", "Baño compartido", "3 Escritorios"],
    },
    {
        id: 5,
        number: "202",
        building: "Edificio A",
        floor: 2,
        status: "disponible",
        price: 280,
        student: null,
        studentId: null,
        amenities: ["WiFi", "Baño compartido", "3 Escritorios"],
    }
];
// New rooms setter
export function setNewRoomData(newData) {
    roomsData = [...newData]
}

export let studentsData = [
    {
        id: 1,
        name: "Juan Pérez",
        email: "juan.perez@universidad.edu",
        username: "perez",
        password: "1234",
        room: "101",
        checkIn: "2024-01-15",
        status: "activo",
        role: "student"
    },
    {
        id: 2,
        name: "Ana López",
        email: "ana.lopez@universidad.edu",
        username: "alopez",
        password: "Alopez.2024",
        room: "201",
        checkIn: "2024-02-01",
        status: "activo",
        role: "student"
    },
    {
        id: 3,
        name: "Carlos Ruiz",
        email: "carlos.ruiz@universidad.edu",
        username: "cruiz",
        password: "Cruiz.2024",
        room: null,
        checkIn: null,
        status: "pendiente",
        role: "student"
    }
];
// New students setter
export function setNewStudentData(newData) {
    studentsData = [...newData]
}

export let reservasData = [
    {
        id: 1,
        student: "María García",
        room: "102",
        requestDate: "2024-01-20",
        duracion: "2 semanas",
        status: "pendiente",
        comments: null,
    },
    {
        id: 2,
        student: "Pedro Martín",
        room: "202",
        requestDate: "2024-01-18",
        duracion: "1 semana",
        status: "confirmada",
        comments: "Me gustaria buen wifi",
    },
    {
        id: 3,
        student: "Laura Sánchez",
        room: "301",
        requestDate: "2024-01-22",
        duracion: "1 semana",
        status: "pendiente",
        comments: null,
    }
];
// New reservations setter
export function setNewReservasData(newData) {
    reservasData = [...newData]
}

export let adminsData = [
    {
        id: 1,
        username: "admin",
        password: "admin123",
        role: "admin"
    }
]