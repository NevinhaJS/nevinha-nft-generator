# Nevinha-NFT Generator

This is a NFT generator which takes a set of layers and combines in a single NFT image **with metadata files that follows [opensea](https://opensea.io/) specifications**. 

## How to use it

#### Add your images on images folder

Inside images folder, you will find some images as demonstration. You can remove these images and add yours. Please notice the images has `_r` and `_sr`, these abbreviations are used to specify the rarity level of the image.

#### Run the script

Just run `node generator` and you will find your generated images inside `collection/images` and the metadata files inside `collection/metadata`. Don't worry about the **{{IPFS_URL}}** which you will find in your JSON files. You can replace then by running our utility script.

> Please do not run node generator before replacing the IPFS metadata urls. You need to update first your images to ipfs or any other ipfs gatway in order to get your ipfs hash. An easy gateway to quick upload your images is [Pinata](https://www.pinata.cloud/)

#### Replace the metadata IPFS urls

Notice the JSON files will have {{IPFS_URL}}. Please go to `config/base.js` and paste your [ipfs](https://ipfs.io/) hash on the `YOUR_IPFS_HASH` value.

You can just replace them by running `node ./utils/index url-updater`.

After that you are done! Congratulations, you have your NFTs with metadata that follows [opensea](https://opensea.io/) specifications

