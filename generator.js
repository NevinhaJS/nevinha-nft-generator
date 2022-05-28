const { layers } = require('./config');
const drawer = require('./core/drawer')()
const dnaFactory = require('./core/dna')()
const dnaManager = require('./core/dna/dnaManager')
const metadataBuilder = require('./core/metadata-builder')()
const args = process.argv.slice(2)
const edition = args.length ? parseInt(args[0]) : 1

if (!edition) throw "Please provide an edition number"

const generator = () => {
    const generateEdition = async (dnaLayers, currentEdition) => {
        drawer.drawBackground()

        for await (let dnaLayer of dnaLayers.layers) {
            await drawer.drawLayer(dnaLayer)
        }

        await drawer.saveCanvas(currentEdition)

        await metadataBuilder.createMetadataItem(dnaLayers, currentEdition)

        dnaManager.addDNA(dnaLayers.dna)

        console.log(`Generating edition ${currentEdition}`)
    }

    const execute = async (_edition) => {
        let currentEdition = 1;

        while (currentEdition <= _edition) {
            const currentDNA = dnaFactory.generateDNA()

            if (dnaManager.hasDNA(currentDNA)) {
                console.log('DNA already exists, genereting a new one...')
                continue
            }

            const dnaLayers = metadataBuilder.generateLayersFromDNA(layers, currentDNA)

            await generateEdition(dnaLayers, currentEdition)

            currentEdition++
        }

        console.log('\n\n------ Saving metadata -----\n\n')
        await metadataBuilder.save(metadataBuilder.getMetadata())

        console.log('------ Finished! ----- \n\n')
        console.log('Please check your new collection on the following path:')
        console.log(`${__dirname}/collection/`)
    }

    return {
        execute
    }
}

generator().execute(edition)