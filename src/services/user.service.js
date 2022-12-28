import { storageService } from './storage.service'

const USER_STORAGE_KEY = 'user'

export const userService = {
    getUser,
    signup,
    remove,
    addMove,
    loadCoins,
    getMoves,
}

function getUser() {
    return storageService.load(USER_STORAGE_KEY) || null

    // return {
    //   imgUrl:
    //     'https://res.cloudinary.com/raz-mister-toy/image/upload/v1670229254/wbgnvdojxyealwsczvec.png',
    //   name: 'Raz Israeli',
    //   coins: 100,
    //   moves: [],
    // }
}

function signup(name) {
    const user = {
        name: name,
        coins: 100,
        moves: [],
        imgUrl: `https://robohash.org/set_set5/${Math.random() + 100}.png`,
    }

    storageService.store(USER_STORAGE_KEY, user)
    return Promise.resolve(user)
}

function remove() {
    storageService.store(USER_STORAGE_KEY, null)
}

function addMove(contact, amount) {
    if (amount < 1) return null
    const loggedinUser = getUser()
    const balance = loggedinUser.coins

    if (amount > balance) return null

    const move = {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount,
    }

    loggedinUser.coins -= amount
    loggedinUser.moves.push(move)

    storageService.store(USER_STORAGE_KEY, loggedinUser)

    return loggedinUser

    //should remove the amount from the user's coins.
}

function loadCoins() {
    const loggedinUser = getUser()
    loggedinUser.coins = 100
    storageService.store(USER_STORAGE_KEY, loggedinUser)
    return loggedinUser
}

function getMoves() {
    const user = getUser()
    return user.moves
}
