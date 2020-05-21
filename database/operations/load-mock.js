const fs = require("fs");

const fsPromises = fs.promises;
const path = "../mockData";

const { allEntity } = require("../queries/generic");

// TODO: Use async await (have a transpiler to be able to use it in node)

// IMPLEMENT

console.info(`Printing 'tuno.json'...`);
allEntity("tuno").then(({ tunos }) => {
  const finalPath = `${path}/tuno.json`;
  const jsonContent = JSON.stringify(tunos, null, 2);
  print(finalPath, jsonContent);
});

console.info(`Printing 'sound.json'...`);
allEntity("sound").then(({ sounds }) => {
  const finalPath = `${path}/sound.json`;
  const jsonContent = JSON.stringify(sounds, null, 2);
  print(finalPath, jsonContent);
});

console.info(`Printing 'sections.json' and 'sectionsIndex.json'...`);
allEntity("section").then(({ sections }) => {
  sections.forEach((section) => {
    const jsonContent = JSON.stringify(JSON.parse(section.config), null, 2);
    const finalPath = `${path}/sections/${section.section_name}.json`;
    print(finalPath, jsonContent);
  });

  // Sections' index
  const sectionIndex = sections.map((section) => ({
    section_name: section.section_name,
    page_ref: section.page_ref,
  }));
  const jsonContent = JSON.stringify(sectionIndex, null, 2);
  const finalPath = `${path}/sectionsIndex.json`;
  fsPromises.writeFile(finalPath, jsonContent);
});

// INTERNALS

function print(finalPath, jsonContent) {
  fsPromises.writeFile(finalPath, jsonContent);
}
