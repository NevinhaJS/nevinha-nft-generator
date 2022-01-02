const { layers } = require("../../config");

const dnaFactory = () => {
    let dna = null;

    const generateDNA = () => {

        const nextDNA = layers.map((layer) => {
            return Math.round(Math.random() * (layer.elements.length - 1))
        }).join('-')

        setDNA(nextDNA)

        return nextDNA
    }

    const setDNA = (nextDNA) => dna = nextDNA
    const getDNA = () => dna

    return {
        generateDNA,
        setDNA,
        getDNA
    }
}

module.exports = dnaFactory