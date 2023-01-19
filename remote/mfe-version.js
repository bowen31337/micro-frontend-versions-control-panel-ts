const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const version = require('./package.json').version;

const MAX_LENGTH_VERSIONS = 5;

const staticFolder = resolveApp('./build/static');
const publicFolder = resolveApp('./public');
const remoteEntryFile = resolveApp('./build/remoteEntry.js');
const remoteEntryFileSource = resolveApp('./build/remoteEntry.js.map');
const jsonFile = resolveApp(`${publicFolder}/remoteEntries/index.json`);


const { exec } = require('child_process');

const moveMFEAsset = (version) => {
  fs.cpSync(staticFolder, `${publicFolder}/remoteEntries/${version}`, { recursive: true })

  fs.cpSync(remoteEntryFile, `${publicFolder}/remoteEntries/${version}/remoteEntry.js`);

  fs.cpSync(remoteEntryFileSource, `${publicFolder}/remoteEntries/${version}/remoteEntry.js.map`);
};

const updateVersion = (version) => {
  try {
    const jsonString = fs.readFileSync(jsonFile);
    const versions = JSON.parse(jsonString);
    rotateVersions(version, versions);
  } catch (err) {
    console.log('init json file');
    const jsonString = JSON.stringify([version]);
    fs.writeFileSync(jsonFile, jsonString);
  }
};

const rotateVersions = (newVersion, versions) => {
  const nextVersions = new Set([newVersion, ...versions]);
  const rotatedNextVersions = [...nextVersions];

  if (rotatedNextVersions.length > MAX_LENGTH_VERSIONS) {
    const removedVersion = rotatedNextVersions.pop();

    fs.writeFile(jsonFile, JSON.stringify(rotatedNextVersions), (err) => {
      if (err) console.log('Error writing file:', err);
    });

    exec(`rm -rf ${publicFolder}/remoteEntries/${removedVersion}`);
    return;
  }

  fs.writeFile(jsonFile, JSON.stringify(rotatedNextVersions), (err) => {
    if (err) console.log('Error writing file:', err);
  });
};

const main = () => {
  moveMFEAsset(version);
  updateVersion(version);
};

main();
