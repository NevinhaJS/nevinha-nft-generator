const fs = require('fs');
const path = require('path');
const basePath = './images/';
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

const layers = fs.readdirSync(basePath).reduce((acc, path) => {
    // TODO: add a blacklist for folders
    if (path === '.DS_Store') return acc;

    const location = basePath + path + '/';

    return [...acc, {
        location,
        name: path,
        elements: getElements(location),
        width: dimension.width,
        height: dimension.height,
    }]
}, [])


module.exports = {
    layers,
    dimension,
    outputDir: path.resolve(__dirname, '../collection')
}