const dnaFactory = () => {
    let dna = null;

    const generateDNA = (baseNumber) => {
        dna = Math.floor(
            Number(`1e${baseNumber}`) * Math.random() + Number(`9e${baseNumber}`)
        )

        return dna
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