const fs = require('fs')
const { outputDir } = require('../../config')

const metadataBuilder = () => {
    const metadata = [];

    const generateLayersFromDNA = (layers, dna) => {
        const dnaSegment = dna.toString().match(/.{1,2}/g);

        const formatedLayers = layers.map(({ name, position, height, width, elements, location }, index) => ({
            location,
            name,
            selectedElement: elements[dnaSegment[index] % elements.length],
            width,
            height,
            position,
        }))

        return { dna, layers: formatedLayers }
    }

    const createAttributes = (dnaLayers, dna) => {
        const attributes = dnaLayers.map(({ name, selectedElement: { rarity } }) => ({
            trait_type: name,
            value: rarity,
        }));

        const dnaAttr = {
            trait_type: "dna",
            value: `${dna}`
        }

        const birthday = {
            "display_type": "date",
            "trait_type": "birthday",
            "value": Date.now(),
        }

        return [...attributes, birthday, dnaAttr];
    }

    const createMetadataItem = ({ dna, layers }, edition) => {
        metadata.push({
            "description": "Here I can put some description later",
            //TODO: put the right link
            "image": `ipfs://{{IPFS_URL}}/${edition}.png`,
            "name": `Nevinhatar #${dna}`,
            edition,
            attributes: createAttributes(layers, dna),
        })
    }

    const getMetadata = () => metadata;

    const save = async (_metadata) => {
        await fs.promises.mkdir(`${outputDir}/json`, { recursive: true }).catch(console.error);

        fs.writeFileSync(`${outputDir}/json/metadata.json`, JSON.stringify(_metadata));

        _metadata.forEach((item, index) => {
            fs.writeFileSync(`${outputDir}/json/${index + 1}.json`, JSON.stringify(item));
        });
    }

    return {
        generateLayersFromDNA,
        createMetadataItem,
        getMetadata,
        save
    }
}

module.exports = metadataBuilder