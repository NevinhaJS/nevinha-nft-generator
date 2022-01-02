const fs = require('fs')
const { loadImage, createCanvas } = require('canvas');
const { dimension, outputDir } = require('../../config')

const drawerFactory = () => {
    const canvas = createCanvas(dimension.width, dimension.height)
    const ctx = canvas.getContext('2d')

    const clear = () => {
        ctx.clearRect(0, 0, dimension, dimension)
    }

    const drawBackground = () => {
        clear()

        ctx.fillStyle = '#fff';
        ctx.strokeWidth = 0;
        ctx.beginPath();
        ctx.arc(dimension / 2, dimension / 2, dimension / 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    const drawLayer = async (dnaLayer) => {
        const image = await loadImage(`${dnaLayer.location}${dnaLayer.selectedElement.fileName}`)

        // ctx.drawImage(image, dnaLayer.position.x, dnaLayer.position.y, dnaLayer.width, dnaLayer.height)
        ctx.drawImage(image, 0, 0, dnaLayer.width, dnaLayer.height)
    }

    const getCanvas = () => canvas

    const saveCanvas = async (filename) => {
        const buffer = canvas.toBuffer('image/png')

        await fs.promises.mkdir(`${outputDir}/images`, { recursive: true }).catch(console.error);

        fs.writeFileSync(`${outputDir}/images/${filename}.png`, buffer)
    }

    return {
        clear,
        drawBackground,
        drawLayer,
        getCanvas,
        saveCanvas
    }
}

module.exports = drawerFactory