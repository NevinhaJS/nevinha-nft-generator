const urlUpdater = require('./urlUpdater')
const args = process.argv.slice(2)

const utilitiesMapper = {
    'url-updater': urlUpdater
}

const main = async () => {
    if (!args.length) throw new Error('No arguments provided')

    const utilityFn = args[0]

    if (!utilitiesMapper[utilityFn]) return console.log(`No utility found for ${utilityFn}`)

    await utilitiesMapper[utilityFn]()
}

main()
