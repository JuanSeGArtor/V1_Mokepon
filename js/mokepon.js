const sectionSelectPet = document.getElementById("seleccionar-mascota")
const sectionSelectAttack = document.getElementById("combate")
const mainContent = document.getElementById("main-content")
const sectionReiniciar = document.getElementById("reiniciar")
const cardsContainer = document.getElementById("contenedor-tarjetas")
const fire = "FIRE-🔥"
const water = "WATER-💧"
const plant = "PLANT-🌱"
const fireImg = "icon/fire-svgrepo-com.svg"
const waterImg = "icon/raindrop-svgrepo-com.svg"
const plantImg = "icon/plants-svgrepo-com.svg"
const sectionShowMap = document.getElementById("ver-mapa")
const map = document.getElementById("mapa")
const mapMaxWidth = 480

let mokepones = []
let rivalMokepones = []
let buttons = []
let playerAttack = []
let rivalAttack = []
let optionMokepones
let playerPet
let playerPetObj
let playerPetLives = 3
let rivalPetLives = 3
let canvas = map.getContext("2d")
let interval
let bakcgroundMap = new Image()
bakcgroundMap.src = "img/mokemap.png"
let mapNewHeight
let mapNewWidth = window.innerWidth/1.5
let mokeponHeight = 60
let mokeponWidth = 60

if (mapNewWidth > mapMaxWidth) {
    mapNewHeight = 440
    mapNewWidth = 700
} else {
    mapNewHeight = mapNewWidth * 600 / 800
    mokeponHeight = 40
    mokeponWidth = 40
}
map.height = mapNewHeight
map.width = mapNewWidth


class Mokepon {
    constructor(name, photo, life, photoMap, x=10, y=10) {
        this.name = name
        this.photo = photo
        this.life = life
        this.attacks = []
        this.height = mokeponHeight
        this.width = mokeponWidth
        this.x = x
        this.y = y
        this.mapPhoto = new Image()
        this.mapPhoto.src = photoMap
        this.speedX = 0
        this.speedY = 0
    }

    paintMokepon() {
        canvas.drawImage(
            this.mapPhoto,
            this.x,
            this.y,
            this.width,
            this.height
            )
    }
}

let hipodoge = new Mokepon("Hipodoge", "img/mokepons_mokepon_hipodoge_attack.jpg", 5, "img/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "img/mokepons_mokepon_capipepo_attack.jpg", 5, "img/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "img/mokepons_mokepon_ratigueya_attack.jpg", 5, "img/ratigueya.png")
let pydos = new Mokepon("Pydos", "img/mokepons_mokepon_pydos_attack.jpg", 5, "img/pydos.png")
let tucapalma = new Mokepon("Tucapalma", "img/mokepons_mokepon_tucapalma_attack.jpg", 5, "img/tucapalma.png")
let langostelvis = new Mokepon("Langostelvis", "img/mokepons_mokepon_langostelvis_attack.jpg", 5, "img/langostelvis.png")

let rivalHipodoge = new Mokepon("Hipodoge", "img/mokepons_mokepon_hipodoge_attack.jpg", 5, "img/hipodoge.png", random(map.width - hipodoge.width), random(map.height - hipodoge.height))
let rivalCapipepo = new Mokepon("Capipepo", "img/mokepons_mokepon_capipepo_attack.jpg", 5, "img/capipepo.png", random(map.width - hipodoge.width), random(map.height - hipodoge.height))
let rivalRatigueya = new Mokepon("Ratigueya", "img/mokepons_mokepon_ratigueya_attack.jpg", 5, "img/ratigueya.png", random(map.width - hipodoge.width), random(map.height - hipodoge.height))
let rivalPydos = new Mokepon("Pydos", "img/mokepons_mokepon_pydos_attack.jpg", 5, "img/pydos.png", random(map.width - hipodoge.width), random(map.height - hipodoge.height))
let rivalTucapalma = new Mokepon("Tucapalma", "img/mokepons_mokepon_tucapalma_attack.jpg", 5, "img/tucapalma.png", random(map.width - hipodoge.width), random(map.height - hipodoge.height))
let rivalLangostelvis = new Mokepon("Langostelvis", "img/mokepons_mokepon_langostelvis_attack.jpg", 5, "img/langostelvis.png", random(map.width - hipodoge.width), random(map.height - hipodoge.height))
let rivalRandom = new Mokepon("Random", "icon/perspective-dice-six-faces-random-svgrepo-com.svg", 5, "icon/perspective-dice-six-faces-random-svgrepo-com.svg", random(map.width - hipodoge.width), random(map.height - hipodoge.height))

hipodoge.attacks.push(
    {name: water, id: "boton-agua", img: waterImg},
    {name: water, id: "boton-agua", img: waterImg},
    {name: water, id: "boton-agua", img: waterImg},
    {name: fire, id: "boton-fuego", img: fireImg},
    {name: plant, id: "boton-planta", img: plantImg},
    )
capipepo.attacks.push(
    {name: plant, id: "boton-planta", img: plantImg},
    {name: plant, id: "boton-planta", img: plantImg},
    {name: plant, id: "boton-planta", img: plantImg},
    {name: fire, id: "boton-fuego", img: fireImg},
    {name: water, id: "boton-agua", img: waterImg},
)
ratigueya.attacks.push(
    {name: fire, id: "boton-fuego", img: fireImg},
    {name: fire, id: "boton-fuego", img: fireImg},
    {name: fire, id: "boton-fuego", img: fireImg},
    {name: plant, id: "boton-planta", img: plantImg},
    {name: water, id: "boton-agua", img: waterImg},
)
pydos.attacks.push(
    {name: water, id: "boton-agua", img: waterImg},
    {name: water, id: "boton-agua", img: waterImg},
    {name: plant, id: "boton-planta", img: plantImg},
    {name: fire, id: "boton-fuego", img: fireImg},
    {name: plant, id: "boton-planta", img: plantImg},
)
tucapalma.attacks.push(
    {name: plant, id: "boton-planta", img: plantImg},
    {name: plant, id: "boton-planta", img: plantImg},
    {name: fire, id: "boton-fuego", img: fireImg},
    {name: water, id: "boton-agua", img: waterImg},
    {name: fire, id: "boton-fuego", img: fireImg},
)
langostelvis.attacks.push(
    {name: fire, id: "boton-fuego", img: fireImg},
    {name: fire, id: "boton-fuego", img: fireImg},
    {name: water, id: "boton-agua", img: waterImg},
    {name: plant, id: "boton-planta", img: plantImg},
    {name: water, id: "boton-agua", img: waterImg},
)

mokepones.push(hipodoge, capipepo, ratigueya, pydos, tucapalma, langostelvis)
rivalMokepones.push(rivalHipodoge, rivalCapipepo, rivalRatigueya, rivalPydos, rivalTucapalma, rivalLangostelvis, rivalRandom)

// INICIO JUEGO
function startGame() {
    sectionShowMap.style.display = "none"
    sectionSelectAttack.style.display = "none"
    mainContent.style.display = "none"
    sectionReiniciar.style.display = "none"
    
    mokepones.forEach((mokepon) => {
        optionMokepones = `
        <button class="tarjeta-mokepon" id=${mokepon.name}>
            <p class="mascota-nombre">${mokepon.name}</p>
            <img src=${mokepon.photo} alt=${mokepon.name}>
        </button>
        `
        cardsContainer.innerHTML += optionMokepones
    })

    selectPlayerPet()
}

function selectPlayerPet() {
    const buttonHipodoge = document.getElementById("Hipodoge")
    buttonHipodoge.addEventListener("click", petSelectedHipodoge)
    const buttonCapipepo = document.getElementById("Capipepo")
    buttonCapipepo.addEventListener("click", petSelectedCapipepo)
    const buttonRatigueya = document.getElementById("Ratigueya")
    buttonRatigueya.addEventListener("click", petSelectedRatigueya)
    const buttonPydos = document.getElementById("Pydos")
    buttonPydos.addEventListener("click", petSelectedPydos)
    const buttonTucapalma = document.getElementById("Tucapalma")
    buttonTucapalma.addEventListener("click", petSelectedTucapalma)
    const buttonLangostelvis = document.getElementById("Langostelvis")
    buttonLangostelvis.addEventListener("click", petSelectedLangostelvis)

    const buttonRandomPlayerPet = document.getElementById("boton-mascota-azar")
    buttonRandomPlayerPet.addEventListener("click", petSelectedRandom)
}
function petSelectedHipodoge() {
    petSelected(hipodoge.name, hipodoge.photo)
}
function petSelectedCapipepo() {
    petSelected(capipepo.name, capipepo.photo)
}
function petSelectedRatigueya() {
    petSelected(ratigueya.name, ratigueya.photo)
}
function petSelectedPydos() {
    petSelected(pydos.name, pydos.photo)
}
function petSelectedTucapalma() {
    petSelected(tucapalma.name, tucapalma.photo)
}
function petSelectedLangostelvis() {
    petSelected(langostelvis.name, langostelvis.photo)
}
function petSelectedRandom() {
    let playerPetRandom = random(mokepones.length)
    petSelected(mokepones[playerPetRandom].name, mokepones[playerPetRandom].photo)
}

const spanPlayerPet = document.getElementById("mascota-jugador")
const imagePlayerPet = new Image(100)
function petSelected(petName, imgPetSrc) {
    spanPlayerPet.innerHTML = petName
    playerPet = petName
    imagePlayerPet.src = imgPetSrc
    document.querySelector("#mascota-jugador-img").appendChild(imagePlayerPet)
    extractPlayerAttacks(playerPet)
}

let attacks
function extractPlayerAttacks(playerPet) {
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].name === playerPet) {
            attacks = mokepones[i].attacks
        }
    }
    showAttacks(attacks)
}

// INICIAR CANVAS
function showAttacks(attacks) {
    sectionSelectPet.style.display = "none"
    sectionShowMap.style.display= "flex"
    startMap()

    const attacksContainer = document.getElementById("seleccionar-ataque")
    let attacksMokepones
    attacks.forEach((attack) => {
        attacksMokepones = `
        <button id=${attack.id} class="botones-ataque b-ataque"><img src=${attack.img} alt=${attack.name}></button>
        `
        attacksContainer.innerHTML += attacksMokepones
    })
    
    buttons = document.querySelectorAll(".b-ataque")
}

// ENEMIGO SELECCIONADO Y SUS ATAQUES
let attacksRivalMokepon
const spanRivalPet = document.getElementById("mascota-rival")
const imageRivalPet = new Image(100)
function selectRandomRivalPet() {
    let rivalPetRandom = random(mokepones.length)
    
    spanRivalPet.innerHTML = mokepones[rivalPetRandom].name
    imageRivalPet.src = mokepones[rivalPetRandom].photo
    document.querySelector("#mascota-rival-img").appendChild(imageRivalPet)    
    
    attacksRivalMokepon = mokepones[rivalPetRandom].attacks
    attackSequence()
}
function selectRivalPet(rivalSelected) {
    spanRivalPet.innerHTML = rivalSelected.name
    imageRivalPet.src = rivalSelected.photo
    document.querySelector("#mascota-rival-img").appendChild(imageRivalPet)    
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].name == rivalSelected.name) {
            attacksRivalMokepon = mokepones[i].attacks
        }
    }
    attackSequence()
}

function attackSequence() {
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            if (e.target.alt == fire) {
                playerAttack.push(fire)
                console.log(playerAttack)
                button.style.display = "none"
            } else if (e.target.alt == water) {
                playerAttack.push(water)
                console.log(playerAttack)
                button.style.display = "none"
            } else {
                playerAttack.push(plant)
                console.log(playerAttack)
                button.style.display = "none"
            }
            rivalAttacks()
        })
    })
}

function rivalAttacks() {
    let rivalAttackRandom = random(attacksRivalMokepon.length)
    let attackRival = attacksRivalMokepon[rivalAttackRandom].name
    attacksRivalMokepon.splice(rivalAttackRandom, 1)

    if (attackRival == fire) {
        rivalAttack.push(fire)
    } else if (attackRival == water) {
        rivalAttack.push(water)
    } else {
        rivalAttack.push(plant)
    }

    console.log(rivalAttack)
    startCombat()
}

// COMBATE
function startCombat() {
    if (playerAttack.length === 5) {
        combat()
    }
}

let indexPlayerAttack
let indexRivalAttack
function indexBothCharacters(player, rival) {
    indexPlayerAttack = playerAttack[player]
    indexRivalAttack = rivalAttack[rival]
}

let rivalWins = 0
let playerWins = 0
function combat() {
    const spanPlayerPetWins = document.getElementById("victorias-mascota-jugador")
    const spanRivalPetWins = document.getElementById("victorias-mascota-rival")
    for (let i = 0; i < playerAttack.length; i++) {
        if (playerAttack[i] == rivalAttack[i]) {
            indexBothCharacters(i, i)
            createCombatMessages("Draw")
        } else if (playerAttack[i] == fire && rivalAttack[i] == plant || playerAttack[i] == water && rivalAttack[i] == fire || playerAttack[i] == plant && rivalAttack[i] == water) {
            playerWins++
            spanPlayerPetWins.innerHTML = playerWins
            indexBothCharacters(i, i)
            createCombatMessages("Win")
            const resultStar1 = document.getElementById("estrella-resultado-1")
            const resultStar2 = document.getElementById("estrella-resultado-2")
            const resultStar3 = document.getElementById("estrella-resultado-3")
            const resultStar4 = document.getElementById("estrella-resultado-4")
            const resultStar5 = document.getElementById("estrella-resultado-5")
            switch (playerWins) {
                case 0:
                    resultStar1.style.display = "none"
                    resultStar2.style.display = "none"
                    resultStar3.style.display = "none"
                    resultStar4.style.display = "none"
                    resultStar5.style.display = "none"
                    break;
                case 1:
                    resultStar1.style.color = "yellow"
                    break;
                case 2:
                    resultStar2.style.color = "yellow"
                    break;
                case 3:
                    resultStar3.style.color = "yellow"
                    break;
                case 4:
                    resultStar4.style.color = "yellow"
                    break;
                case 5:
                    resultStar5.style.color = "yellow"
                    break;
                default:
                    break;
            }
        } else {
            indexBothCharacters(i, i)
            createCombatMessages("Lose")
            rivalWins++
            spanRivalPetWins.innerHTML = rivalWins
        }
    }
    reviewCombatWins(rivalWins, playerWins)
}

function reviewCombatWins(totalRivalPetWins, totalPlayerPetWins) {
    if (totalRivalPetWins === totalPlayerPetWins) { 
        createFinalMessage("DRAW")
        sectionReiniciar.style.borderColor = "steelblue"
    } else if (totalPlayerPetWins > totalRivalPetWins) { 
        createFinalMessage("YOU WIN")
        sectionReiniciar.style.borderColor = "springgreen"
    } else {
        createFinalMessage("YOU LOSE")
        sectionReiniciar.style.borderColor = "crimson"
    }
}

function createCombatMessages(roundResult) {
    const playerAttackMessages = document.getElementById("jugador-mensajes-ataque")
    const rivalAttackMessages = document.getElementById("rival-mensajes-ataque")
    const playerCard = document.getElementById("tarjeta-jugador")
    const rivalCard = document.getElementById("tarjeta-rival")
    const combatMessage = document.getElementById("mensaje-combate")

    playerCard.style.height = "auto"
    rivalCard.style.height = "auto"
    playerAttackMessages.style.display = "block"
    rivalAttackMessages.style.display = "block"

    playerAttackMessages.innerHTML += indexPlayerAttack
    rivalAttackMessages.innerHTML += indexRivalAttack
    combatMessage.innerHTML += roundResult + " | "
}

function createFinalMessage(gameResult) {
    mainContent.style.display = "block"
    sectionReiniciar.style.display = "flex"
    
    const resultCombat = document.getElementById("mensaje-combate-final")
    resultCombat.innerHTML = gameResult

    const resetButton = document.getElementById("boton-reiniciar")
    resetButton.addEventListener("click", resetGame)
}

function resetGame() {
    location.reload()
}

function random(length){
    let max = length
    return Math.floor(Math.random() * max)
}

// CANVAS
function startMap() {
    playerPetObj = getObjPet()
    interval = setInterval(paintCanvas, 50)

    window.addEventListener("keydown", keyPressMovement)
    window.addEventListener("keyup", stopMovement)
}

function getObjPet() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].name === playerPet) {
            return mokepones[i]
        }
    }
}

function paintCanvas() {
    playerPetObj.x += playerPetObj.speedX
    playerPetObj.y += playerPetObj.speedY
    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(
        bakcgroundMap,
        0,
        0,
        map.width,
        map.height
    )
    playerPetObj.paintMokepon()
    rivalMokepones.forEach(rivalMokepon => {
        rivalMokepon.paintMokepon()
        if (playerPetObj.speedX !== 0 || playerPetObj.speedY !== 0) {
            reviewCollision(rivalMokepon)
            stopOnBorder()
        }
    })
}

function moveLeft() {
    playerPetObj.speedX = -10
}
function moveRight() {
    playerPetObj.speedX = 10
}
function moveUp() {
    playerPetObj.speedY = -10
}
function moveDown() {
    playerPetObj.speedY = 10
}
function keyPressMovement(event) {
    if (event.key == "ArrowLeft" || event.key == "a") {
        moveLeft()
    } else if (event.key == "ArrowRight" || event.key == "d") {
        moveRight()
    } else if (event.key == "ArrowUp" || event.key == "w") {
        moveUp()
    } else if (event.key == "ArrowDown" || event.key == "s") {
        moveDown()
    }
}
function stopMovement() {
    playerPetObj.speedX = 0
    playerPetObj.speedY = 0
}

function reviewCollision(rival) {
    const rivalUp = rival.y
    const rivalDown = rival.y + rival.height
    const rivalLeft = rival.x
    const rivalRight = rival.x + rival.width

    const petUp = playerPetObj.y + 12
    const petDown = playerPetObj.y + playerPetObj.height - 12
    const petLeft = playerPetObj.x + 12
    const petRight = playerPetObj.x + playerPetObj.width - 12

    if (
        petDown < rivalUp ||
        petUp > rivalDown ||
        petRight < rivalLeft ||
        petLeft > rivalRight
    ) {
        return
    } else {
        stopMovement()
        if (rival.name == "Random") {
            let boolCombatRandomRival = confirm("¡Combat a random enemy!")
            if (boolCombatRandomRival == true) {
                clearInterval(interval)
                sectionShowMap.style.display= "none"
                sectionSelectAttack.style.display = "flex"
                selectRandomRivalPet()
            }
        } else {
            let boolCombatRival = confirm("Combat vs " + rival.name)
            if (boolCombatRival == true) {
                clearInterval(interval)
                sectionShowMap.style.display= "none"
                sectionSelectAttack.style.display = "flex"
                selectRivalPet(rival)
            }
        }
    }
}

function stopOnBorder() {
    const mapUp = 0
    const mapDown = map.height - playerPetObj.height
    const mapRight = map.width
    const mapLeft = 0

    const playerUp = playerPetObj.y
    const playerRight = playerPetObj.x + playerPetObj.width
    const playerLeft = playerPetObj.x

    if (playerUp < mapUp) {
        playerPetObj.y = mapUp
    }
    if (playerUp > mapDown) {
        playerPetObj.y = mapDown
    }
    if (playerRight > mapRight) {
        playerPetObj.x = mapRight - playerPetObj.width
    }
    if (playerLeft < mapLeft) {
        playerPetObj.x = mapLeft
    }
}

window.addEventListener("load", startGame)
