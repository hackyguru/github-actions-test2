const lighthouse = require('@lighthouse-web3/sdk');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

async function main() {
  const apiKey = "7802fed8.6577b4f40c74435493704c05b06be2b1";

  // Create a zip archive of the repository contents
  const archive = archiver('zip', { zlib: { level: 9 } });
  const output = fs.createWriteStream('repository.zip');

  archive.pipe(output);
  archive.directory('./', false);
  await archive.finalize();

  // Upload the zip archive to Lighthouse
  const uploadResponse = await lighthouse.upload('./repository.zip', apiKey);

  const cid = uploadResponse.data.Hash;
  console.log(`Uploaded to IPFS : ${cid}`);
  process.stdout.write(`::set-output name=cid::${cid}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
