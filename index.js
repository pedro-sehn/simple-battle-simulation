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

    attack(receiving) {
        if (receiving.name === this.name) {
            let randomActionIndex = Math.floor(Math.random() * 3)

            if (this.hp > 0 & this.hp - 10 <= 0 || this.hp > 0 & this.hp - 30 <= 0 || this.hp > 0 & this.hp - 40 <= 0) {
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
                receiving.state = "dead"
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
            if (this.hp <= 0) {
                console.log(`${this.name}'s body is angry and tried to hit ${receiving.name} but couldn't`)
            } else {
                if (receiving.dodge === 3) {
                    console.log(`${receiving.name} dodged ${this.name}'s attack`)
                } else {
                    receiving.hp = receiving.hp - this.damage
                    if (receiving.hp <= 0 && receiving.state === "alive") {
                        receiving.state = "dead"
                        console.log(`${receiving.name} was killed by ${this.name}`)
                    } else if (receiving.hp <= 0 && receiving.state === "dead") {
                        console.log(`${this.name} attacked the lifeless body of ${receiving.name}`)
                    } else {
                        console.log(`${this.name} attacked ${receiving.name}, and ${receiving.name}'s life went down to ${receiving.hp}`)
                    }
                }
                if (receiving.dodge > 0) {
                    receiving.dodge = receiving.dodge - 1
                }
            }
        }
    }
    heal() {
        if (this.hp <= 0) {
            console.log(`${this.name}'s body tried to heal itself but cannot heal because it's dead`)
        } else {
            if (this.hp < 80) {
                this.hp = this.hp + 20
                console.log(`${this.name} healed himself, and his life went up to ${this.hp}`)
            } else {
                this.hp = 100
                console.log(`${this.name} tried to heal himself but his health is already full`)
            }
        }
    }
    dodge() {
        if (this.hp <= 0) {
            console.log(`The lifeless body of ${this.name} tried to avoid something but couldn't because it's dead`)
        } else {
            if (this.dodge === 0) {
                console.log(`${this.name} activated the dodge ability`)
                this.dodge = 3
            } else {
                console.log(`${this.name} tried to dodge but couldn't because the dodge is on cooldown`)
            }
        }
    }
}

const pedro = new Person("Pedro", 35)
const arthur = new Person("Arthur", 25)

const players = [pedro, arthur]

function simula(num) {
    for (let i = 0; i < num; i++) {
        let winner = ""

        for (let j = 0; j < players.length; j++) {
            let playersDead = 0
            let checkPlayerAlive = players.length-1 
            
            for (let k = 0; k <players.length; k++) {
                if (players[k].state == "dead") {
                    playersDead++
                }
            }
            if (playersDead == checkPlayerAlive) {
                if (players[j].state === "alive") {
                    winner = players[j].name
                }
            }
        }
        if (winner.length > 0) {
            console.log(`The winner of this simulation is ${winner}!`)
            i = num
        } else {
            let randomPlayerIndex = Math.floor(Math.random() * players.length)
            let skills = Math.floor(Math.random() * 3)

            if (skills === 0) {
                players[randomPlayerIndex].dodge()
            } else if (skills === 1) {
                let randomPlayerReceivingIndex = Math.floor(Math.random() * players.length)
                let playerAttacking = players[randomPlayerIndex]
                let playerReceiving = players[randomPlayerReceivingIndex]

                playerAttacking.attack(playerReceiving)
            } else if (skills === 2) {
                players[randomPlayerIndex].heal()
            }
        }
    }
}

simula(100)
