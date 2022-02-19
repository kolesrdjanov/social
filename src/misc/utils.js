export default {
    createUserObject
}

function createUserObject(user) {
    return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        display: user.display,
        icon: user.icon
    }
}