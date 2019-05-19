export default async function (filePath, fileName) {
  const bucketName = 'mood-er.appspot.com';
  // eslint-disable-next-line
  const { Storage } = require('@google-cloud/storage');

  const storage = new Storage({
    projectId: 'mood-er',
    keyFilename: 'RUTA DE LA KEY',
  });

  const stored = await storage.bucket(bucketName).upload(filePath, {
    destination: `fotos/${fileName}`,
    gzip: false,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  stored[0].makePublic();

  console.log(`- File ${fileName} URL: ${stored[1].selfLink}`);

  return stored[1].selfLink;
}
