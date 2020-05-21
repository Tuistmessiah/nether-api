require("dotenv").config({ path: require("find-config")(".env") });
const { createEntity } = require("../queries/generic");

let path = "../mockData";
if (process.env.MOCK === "custom") {
  path = "../mockDataLocal";
}

const tunos = require(`${path}/tuno.json`);
const sounds = require(`${path}/sound.json`);
// const sectionsIndex = require(`${path}/sectionsIndex.json`);

console.info("Populating 'tunos'...");
tunos.forEach((tuno) => {
  createEntity("tuno", tuno);
});

console.info("Populating 'sounds'...");
sounds.forEach((sound) => {
  createEntity("sound", sound);
});

console.info("Populating 'sections'...");
sectionsIndex.forEach((sectionMeta) => {
  const section = require(`${path}/sections/${sectionMeta.section_name}.json`);
  createEntity("section", section);
});
