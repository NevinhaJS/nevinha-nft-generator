const fs = require('fs');
const path = require('path');
const dimension = {
    width: 2888,
    height: 2125
};

const rarity = [
    { key: "", val: "common" },
    { key: "_r", val: "rare" },
    { key: "_sr", val: "super rare" },
]

const clearName = (_str) => {
    let name = _str.slice(0, -4)

    rarity.forEach(r => {
        name = name.replace(r.key, '')
    })

    return name
}

const addRarity = (_str) => {
    let itemRarity;

    rarity.forEach(r => {
        if (_str.includes(r.key)) {
            itemRarity = r.val
        }
    })

    return itemRarity
}

const getElements = (path) => {
    return fs
        .readdirSync(path)
        .map((name, index) => ({
            id: index,
            name: clearName(name),
            fileName: name,
            rarity: addRarity(name),
        }))
}

const layers = [
    {
        location: `./images/background/`,
        elements: getElements(`./images/background`),
        name: 'background',
        width: dimension.width,
        height: dimension.height
    },
    {
        location: `./images/body/`,
        elements: getElements(`./images/body`),
        name: 'body',
        width: dimension.width,
        height: dimension.height
    },
    {
        location: `./images/cap/`,
        elements: getElements(`./images/cap`),
        name: 'cap',
        width: dimension.width,
        height: dimension.height
    },
    {
        location: `./images/eyes/`,
        elements: getElements(`./images/eyes`),
        name: 'eyes',
        width: dimension.width,
        height: dimension.height
    },
    {
        location: `./images/gravata/`,
        elements: getElements(`./images/gravata`),
        name: 'gravata',
        width: dimension.width,
        height: dimension.height
    },
    {
        location: `./images/nose/`,
        elements: getElements(`./images/nose`),
        name: 'nose',
        width: dimension.width,
        height: dimension.height
    }
]

module.exports = {
    layers,
    dimension,
    outputDir: path.resolve(__dirname, '../collection')
}