const fs = require('fs')
const { ipfsURL } = require('../config/base');

const jsonPath = './collection/json'

const updateSingleFiles = (fileContent) => ({
    ...fileContent,
    image: fileContent.image.replace("{{IPFS_URL}}", ipfsURL)
})

const urlUpdater = async (url) => {
    const files = fs.readdirSync(jsonPath)


    for (const file of files) {
        console.log(`Updating image url for ${file}...`)

        const fileContent = JSON.parse(fs.readFileSync(`${jsonPath}/${file}`, 'utf8'))
        let content;

        if (file === 'metadata.json') {
            content = fileContent.map(updateSingleFiles)
        } else {
            content = updateSingleFiles(fileContent)
        }

        fs.writeFileSync(`${jsonPath}/${file}`, JSON.stringify(content))

        console.log(`Image url for ${file} is now updated. \n`)
    }

}

module.exports = urlUpdater;