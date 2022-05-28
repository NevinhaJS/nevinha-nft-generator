const { useExtensors } = require('../../config/base');
const { METADATA_EXTENSOR_TYPES } = require('../../config/constants');
const cardsExtensor = require('./extensors/cardsExtensor');

const extensorsMap = {
    [METADATA_EXTENSOR_TYPES.CARD]: cardsExtensor
}

const metadataExtensor = async (attributes) => {
    if (!useExtensors.length) return attributes;

    const extensorsFns = useExtensors.reduce((acc, extensorName) => extensorsMap[extensorName] ? [...acc, extensorsMap[extensorName](attributes)] : acc, []);
    const extendedAttributes = await Promise.all(extensorsFns)

    return [...attributes, ...extendedAttributes]
}

module.exports = metadataExtensor