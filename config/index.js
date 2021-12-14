const fs = require('fs');
const path = require('path');
const dimension = 1080;

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
        location: `./images/body/`,
        elements: getElements(`./images/body`),
        name: 'body',
        width: dimension,
        height: dimension
    },
    {
        location: `./images/head/`,
        elements: getElements(`./images/head`),
        name: 'head',
        width: dimension,
        height: dimension
    },
    {
        location: `./images/mounth/`,
        elements: getElements(`./images/mounth`),
        name: 'mounth',
        width: dimension,
        height: dimension
    },
    {
        location: `./images/eyes/`,
        elements: getElements(`./images/eyes`),
        name: 'eyes',
        width: dimension,
        height: dimension
    },
    {
        location: `./images/hair/`,
        elements: getElements(`./images/hair`),
        name: 'hair',
        width: dimension,
        height: dimension
    }
]

module.exports = {
    layers,
    dimension,
    outputDir: path.resolve(__dirname, '../collection')
}