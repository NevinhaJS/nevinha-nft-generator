const RARITY_WEIGHT = {
    "common": 10,
    "rare": 30,
    "super rare": 100
}

const cardsExtensor = async (attributes) => {
    let attack = Math.floor(Math.random() * (400 - 100) + 100);

    attack += attributes.reduce((acc, { value }) => RARITY_WEIGHT[value] ? acc += RARITY_WEIGHT[value] : acc, 0)

    return {
        attack
    }
}

module.exports = cardsExtensor;