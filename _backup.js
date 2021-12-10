const { createCanvas, loadImage } = require('canvas');
const fs = require('fs')

const images = {
    body: ['coding-body', 'normal-body', 'rg-body', 'sg-body'],
    eyes: ['bd-eyes', 'hg-eyes', 'pg-eyes', 'rg-eyes', 'sg-eyes'],
    hair: ['bd-hair', 'hg-hair', 'pg-hair', 'rg-hair', 'sg-hair'],
    head: ['normal-head', 'pg-head', 'sg-head'],
    mounth: ['bd-mounth', 'normal-mounth', 'pg-mounth', 'rg-mounth', 'sg-mounth'],
}

const loadAllPartImages = (partName) => Promise.all(
    images[partName].map(image => new Promise(async (res, rej) => {
        const data = await loadImage(`./images/${partName}/${image}.png`)

        res({
            name: image,
            data
        })
    }))
);

const getPartsImages = (parts) => Promise.all(
    parts.map(partName => new Promise(async (res, rej) => {
        const children = await loadAllPartImages(partName)
        
        res({
            name: partName,
            children
        })
    }))
);

const generator = (() => {
    let images = {}

    const loadDependencies = async () => {
        const parts = ['body', 'eyes', 'hair', 'head', 'mounth']
        const partsImages = await getPartsImages(parts)

        images = partsImages.reduce((acc, {name, children}) => ({
            ...acc,
            [name]: children.reduce((cAcc, {name: imageName, data}) => ({
                ...cAcc,
                [imageName]: data
            }), {})
        }), {})
    }
    
    const generateImage = async (parts, dimension) => {
        const canvas = createCanvas(dimension, dimension)
        const ctx = canvas.getContext('2d')
        const {body, eyes, hair, head, mounth} = parts

        ctx.fillStyle = '#fff';
        ctx.strokeWidth = 0;
        ctx.beginPath();
        ctx.arc(dimension / 2, dimension / 2, dimension / 2, 0, 2 * Math.PI);
        ctx.fill();

        // Body
        const bodyImage =  images.body[body]
        const bodyWidth = dimension - Math.round(dimension * 0.278)
        const bodyHeight = dimension - Math.round(dimension * 0.378)

        ctx.drawImage(
            bodyImage, 
            (dimension / 2) - (bodyWidth / 2), 
            dimension - bodyHeight, 
            bodyWidth, 
            bodyHeight
        )

        // Head
        const headImage =  images.head[head]
        const headWidth = dimension - Math.round(dimension * 0.278)
        const headHeight = dimension - Math.round(dimension * 0.38)

        ctx.drawImage(
            headImage, 
            (dimension / 2) - (headWidth / 2), 
            (dimension / 2) - (headHeight / 2) + Math.round(dimension * 0.01), 
            headWidth, 
            headHeight
        )

        // Mounth
        const mounthImage =  images.mounth[mounth]
        const mounthWidth = dimension - Math.round(dimension * 0.509)
        const mounthHeight = dimension - Math.round(dimension * 0.78)

        ctx.drawImage(
            mounthImage, 
            (dimension / 2) - (mounthWidth / 2 + Math.round(dimension * 0.038)), 
            (dimension / 2) - (mounthHeight / 2) + Math.round(dimension * 0.09), 
            mounthWidth, 
            mounthHeight
        )

        // Eyes
        const eyesImage =  images.eyes[eyes]
        const eyesWidth = dimension - Math.round(dimension * 0.528)
        const eyesHeight = dimension - Math.round(dimension * 0.848)

        ctx.drawImage(
            eyesImage, 
            (dimension / 2) - (eyesWidth / 2 + Math.round(dimension * 0.018)), 
            (dimension / 2) - (eyesHeight / 2 + Math.round(dimension * 0.07)), 
            eyesWidth, 
            eyesHeight
        )

        // Hair
        const hairImage =  images.hair[hair]
        const hairWidth = dimension - Math.round(dimension * 0.126)
        const hairHeight = dimension - Math.round(dimension * 0.681)

        ctx.drawImage(
            hairImage, 
            Math.round(dimension * 0.038), 
            (dimension / 2) - (hairHeight / 2 + Math.round(dimension * 0.33)), 
            hairWidth, 
            hairHeight
        )

        // const buffer = canvas.toBuffer('image/png')
        // fs.writeFileSync('./generated-images/image.png', buffer)

        return canvas.toDataURL('image/png')
    }

    return {
        loadDependencies,
        generateImage
    }
})()

module.exports = generator
