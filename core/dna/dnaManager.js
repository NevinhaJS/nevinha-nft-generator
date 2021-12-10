const dnaManager = (() => {
    const dnas = new Map()

    const hasDNA = (dna) => Boolean(dnas.get(dna))
    const addDNA = (dna) => dnas.set(dna, true)

    return {
        addDNA,
        hasDNA
    }
})()

module.exports = dnaManager