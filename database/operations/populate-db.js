require("dotenv").config({ path: require("find-config")(".env") });
const { createEntity } = require("../queries/generic");

let path = "../mockData";
if (process.env.MOCK === "custom") {
  path = "../mockDataLocal";
}

const tunos = require(`${path}/tuno.json`);
const sounds = require(`${path}/sound.json`);
const sectionsIndex = require(`${path}/sectionsIndex.json`);

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
  const sectionJSON = require(`${path}/sections/${sectionMeta.section_name}.json`);
  createEntity("section", {
    section_name: sectionMeta.section_name,
    page_ref: sectionMeta.page_ref,
    config: sectionJSON,
  });
});
