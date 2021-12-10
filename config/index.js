const fs = require('fs');
const path = require('path');
const dimension = 1080;

const eyesWidth = dimension - Math.round(dimension * 0.528)
const eyesHeight = dimension - Math.round(dimension * 0.848)
const bodyWidth = dimension - Math.round(dimension * 0.278)
const bodyHeight = dimension - Math.round(dimension * 0.378)
const headWidth = dimension - Math.round(dimension * 0.278)
const headHeight = dimension - Math.round(dimension * 0.38)
const mounthWidth = dimension - Math.round(dimension * 0.509)
const mounthHeight = dimension - Math.round(dimension * 0.78)
const hairWidth = dimension - Math.round(dimension * 0.126)
const hairHeight = dimension - Math.round(dimension * 0.681)

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
        //for the NFT-GENERATOR we will not need to set this generic
        //we just need to require the images to be the same width and height
        width: dimension - Math.round(dimension * 0.278),
        height: dimension - Math.round(dimension * 0.378),
        position: {
            x: (dimension / 2) - (bodyWidth / 2),
            y: dimension - bodyHeight
        }
    },
    {
        location: `./images/head/`,
        elements: getElements(`./images/head`),
        name: 'head',
        width: headWidth,
        height: headHeight,
        position: {
            x: (dimension / 2) - (headWidth / 2),
            y: (dimension / 2) - (headHeight / 2) + Math.round(dimension * 0.01),
        }
    },
    {
        location: `./images/mounth/`,
        elements: getElements(`./images/mounth`),
        name: 'mounth',
        width: mounthWidth,
        height: mounthHeight,
        position: {
            x: (dimension / 2) - (mounthWidth / 2 + Math.round(dimension * 0.038)),
            y: (dimension / 2) - (mounthHeight / 2) + Math.round(dimension * 0.09),
        }
    },
    {
        location: `./images/eyes/`,
        elements: getElements(`./images/eyes`),
        name: 'eyes',
        width: eyesWidth,
        height: eyesHeight,
        position: {
            x: (dimension / 2) - (eyesWidth / 2 + Math.round(dimension * 0.018)),
            y: (dimension / 2) - (eyesHeight / 2 + Math.round(dimension * 0.07)),
        }
    },
    {
        location: `./images/hair/`,
        elements: getElements(`./images/hair`),
        name: 'hair',
        width: hairWidth,
        height: hairHeight,
        position: {
            x: Math.round(dimension * 0.038),
            y: (dimension / 2) - (hairHeight / 2 + Math.round(dimension * 0.33)),
        }
    }
]

module.exports = {
    layers,
    dimension,
    outputDir: path.resolve(__dirname, '../collection')
}