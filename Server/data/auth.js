//admin123: $2a$12$ERGaWFqOYmSKbf4lnXfs.e0kjaroF/UWJVMl38dbT15VJIbO6bzaO
let users = [
    {
        username: "admin",
        password:
            "$2a$12$ERGaWFqOYmSKbf4lnXfs.e0kjaroF/UWJVMl38dbT15VJIbO6bzaO",
        name: "ADMIN",
        email: "admin@dwiiter.com",
        url: "",
    },
];

export async function getMe() {
    return user;
}

export async function findByUsername(username) {
    return users.find((i) => i.username === username);
}

export async function createUser(user) {
    const created = {...user, id: Date.now().toString()};
    users.push(created);
    return created.id;
}
