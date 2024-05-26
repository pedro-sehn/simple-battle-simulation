class Person {
    constructor(name, damage) {
        this._name = name
        this._hp = 100
        this._damage = damage
        this._dodge = 0
        this._state = "alive"
    }
    set hp(number) {
        this._hp = number
    }
    set dodge(number) {
        this._dodge = number
    }
    set state(string) {
        this._state = string
    }
    get name() {
        return this._name
    }
    get hp() {
        return this._hp
    }
    get damage() {
        return this._damage
    }
    get dodge() {
        return this._dodge
    }
    get state() {
        return this._state
    }

    Attack(receiving) {
        if (receiving.name === this.name) {
            let randomActionIndex = Math.floor(Math.random() * 3)

            if (this.hp - 40 <= 0 && randomActionIndex === 2 || this.hp - 30 <= 0 && randomActionIndex === 1 || this.hp - 10 <= 0 && randomActionIndex === 0) {
                if (randomActionIndex === 0) {
                    receiving.hp = receiving.hp - 10
                } else if (randomActionIndex === 1) {
                    receiving.hp = receiving.hp - 30
                } else if (randomActionIndex === 2) {
                    receiving.hp = receiving.hp - 40
                }
                const actions = [
                    `${this.name} stumbled on the ground and died`,
                    `${this.name} lost a lot of blood and died alone`,
                    `${this.name} fell headfirst onto a rock and died`
                ]
                console.log(actions[randomActionIndex])

                if (this.hp <= 0) receiving.state = "dead"
            } else if (this.hp > 0) {
                if (randomActionIndex === 0) {
                    receiving.hp = receiving.hp - 10
                } else if (randomActionIndex === 1) {
                    receiving.hp = receiving.hp - 30
                } else if (randomActionIndex === 2) {
                    receiving.hp = receiving.hp - 40
                }
                const actions = [
                    `${this.name} stumbled on the ground, and his HP went up to ${this.hp}`,
                    `${this.name} sprained his hand falling from a high place, and his HP went down to ${this.hp}`,
                    `${this.name} stumbled and fell headfirst onto a rock; his current HP is ${this.hp}`
                ]
                console.log(actions[randomActionIndex])
            }
        } else {
            if (receiving._dodge === 3) {
                console.log(`${receiving.name} dodged ${this.name}'s attack`)
            } else {
                receiving.hp = receiving.hp - this.damage
                if (receiving.hp <= 0 && receiving.state === "alive") {
                    console.log(`${receiving.name} was killed by ${this.name}`)
                    receiving.state = "dead"
                } else if (receiving.state === "dead") {
                    this.Attack(players[Math.floor(Math.random() * players.length)])
                } else {
                    console.log(`${this.name} attacked ${receiving.name}, and ${receiving.name}'s life went down to ${receiving.hp}`)
                }
            }
            if (receiving._dodge > 0) {
                receiving._dodge = receiving._dodge - 1
            }
        }
    }
    Heal() {
        if (this.state === "dead") return
        if (this.hp < 80) {
            this.hp = this.hp + 20
            console.log(`${this.name} healed himself, and his life went up to ${this.hp}`)
        } else {
            this.hp = 100
            console.log(`${this.name} healed himself, and his life went up to ${this.hp}`)
        }
    }
    Dodge() {
        if (this._dodge === 0) {
            console.log(`${this.name} activated the dodge ability`)
            this.dodge = 3
        } else {
            console.log(this._dodge)
            console.log(`${this.name} tried to dodge but couldn't because the dodge is on cooldown`)
        }
    }
}

const players = []

function createPlayer(name, damage) {
    const newPlayer = new Person(name, damage)
    players.push(newPlayer)
}

createPlayer("Pedro", 20)
createPlayer("Willy", 20)
createPlayer("Alex", 20)

function simula() {
    for (let i = 0; i < 1000000; i++) {
        let winner

        for (let j = 0; j < players.length; j++) {
            let playersDead = 0
            let checkPlayerAlive = players.length - 1

            for (let k = 0; k < players.length; k++) {
                if (players[k].state == "dead") playersDead++
            }
            if (playersDead == checkPlayerAlive) {
                if (players[j].state === "alive") {
                    winner = players[j].name
                }
            }
        }

        if (winner) {
            console.log(`\nThe winner of this simulation is ${winner}!`)
            i = 1000000
            return
        }

        let randomPlayerIndex = Math.floor(Math.random() * players.length)

        function d() {
            players[randomPlayerIndex].Dodge()
        }
        function a() {
            let randomPlayerReceivingIndex = Math.floor(Math.random() * players.length)
            let playerAttacking = players[randomPlayerIndex]
            let playerReceiving = players[randomPlayerReceivingIndex]

            playerAttacking.Attack(playerReceiving)
        }
        function h() {
            players[randomPlayerIndex].Heal()
        }
        if (players[randomPlayerIndex]._hp > 0) {
            if (players[randomPlayerIndex]._dodge > 0 && players[randomPlayerIndex]._hp === 100) {
                a()
            } else {
                if (players[randomPlayerIndex]._hp === 100) {
                    let possibleMovesNum = Math.floor(Math.random() * 2)

                    { possibleMovesNum === 0 ? a() : d() }
                } else if (players[randomPlayerIndex]._dodge > 0) {
                    let possibleMovesNum = Math.floor(Math.random() * 2)

                    { possibleMovesNum === 0 ? a() : h() }
                } else {
                    let possibleMovesNum = Math.floor(Math.random() * 3)

                    if (possibleMovesNum === 0) d()
                    if (possibleMovesNum === 1) h()
                    if (possibleMovesNum === 2) a()
                }
            }
        }
    }
}

simula()