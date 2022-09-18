/* eslint-disable */

const { program } = require('commander');
const AWS = require('aws-sdk');

const path = require('path');
const fs = require('fs');
const { readdir } = require('fs').promises;

const buildPath = path.join(__dirname, '/../build');

program
  .option('--bucket -b <char>')
  .option('--region -r <char>')
  .option('--access-key -a <char>')
  .option('--secret-key -s <char>');

program.parse(process.argv);
const options = program.opts();

const { B, R, A, S } = options;

const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: A,
  secretAccessKey: S,
  region: R ?? 'ap-northeast-2',
});

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );
  return Array.prototype.concat(...files);
}

function getObjects(Bucket) {
  return new Promise((resolve, reject) => {
    S3.listObjects({ Bucket }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

function removeObject(param) {
  return new Promise((resolve, reject) => {
    S3.deleteObject(param, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

async function removeObjects(params) {
  return await Promise.all(params.map((param) => removeObject(param)));
}

function uploadObject(param) {
  return new Promise((resolve, reject) => {
    if (param.Key.includes('.html')) {
      param.ContentType = 'text/html';
    }
    if (param.Key.includes('.css')) {
      param.ContentType = 'text/css';
    }
    if (param.Key.includes('.js')) {
      param.ContentType = 'application/javascript';
    }

    S3.upload(param, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

async function uploadObjects(params) {
  return await Promise.all(
    params.map((param) => {
      return uploadObject(param);
    }),
  );
}

function copyObject(param) {
  return new Promise((resolve, reject) => {
    S3.copyObject(param, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

getFiles(buildPath).then(async (files) => {
  const objects = await getObjects(B).then((res) => res.Contents);
  if (Array.isArray(objects)) {
    await removeObjects(objects.map((content) => ({ Bucket: B, Key: content.Key })));
  }
  console.log(`remove all files in s3`);

  await uploadObjects(
    files.map((file) => {
      const dest = file.replace(buildPath, '');
      return {
        Bucket: B,
        Key: dest.slice(1, dest.length),
        Body: fs.createReadStream(file),
      };
    }),
  );
  console.log(`upload all files in s3`);

  const uploadedObjects = await getObjects(B).then((res) => res.Contents);
  for await (const uploadedObject of uploadedObjects) {
    const Key = uploadedObject.Key;
    if (Key !== 'index.html' && Key !== '404.html' && Key.includes('.html')) {
      await copyObject({
        Bucket: B,
        Key: Key.replace('.html', ''),
        CopySource: `${B}/${Key}`,
        ContentType: 'text/html',
      });
      await removeObject({
        Bucket: B,
        Key,
      });
    }
  }
  console.log(`rename *.html -> 8 in s3`);
});
