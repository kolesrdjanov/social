export default {
    createUserObject
}

function createUserObject(user) {
    return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        displayName: user.displayName,
        icon: user.icon
    }
}