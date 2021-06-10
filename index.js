"use strict";

const fetch = require("node-fetch");
const download = require("image-downloader");
const wallpaper = require("wallpaper");
const schedule = require("node-schedule");
const fs = require("fs");

const imageDirectory = "./images";
const imageDirectoryCapacity = 10;
const imageResolution = "1920x1080";
const imageCategories = "nature,cats";

schedule.scheduleJob("0 * * * *", async () => {
    await ensureImagesFolder(imageDirectory);
    await cleanupImages(imageDirectory, imageDirectoryCapacity);
    await updateBackground(imageResolution, imageCategories, imageDirectory);
});

async function updateBackground(imageResolution, imageCategories, imageDirectory) {
    console.log("Starting wallpaper change procedure ...");

    try {
        const imageResponse = await fetch(`https://source.unsplash.com/featured/${imageResolution}?${imageCategories}`);
        const image = await download.image({ url: imageResponse.url, dest: imageDirectory });
        await wallpaper.set(image.filename);

        console.log("Wallpaper changed successfully!");
    } catch (e) {
        console.error("Failed to fetch an image and set it as a background!", e);
    }
}

async function cleanupImages(imageDirectory, imageDirectoryCapacity) {
    const images = fs.readdirSync(imageDirectory);
    if (images.length >= imageDirectoryCapacity) {
        console.log("Cleaning up space ...");

        fs.unlinkSync(imageDirectory + "/" + images.pop());
    }
}

async function ensureImagesFolder(imageDirectory) {
    if (!fs.existsSync(imageDirectory)) {
        console.log("Creating folder for image storage ...");

        fs.mkdirSync(imageDirectory);
    }
}
