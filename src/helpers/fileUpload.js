import path from 'path';
import moment from 'moment';

export default async function (filePath, fileName) {
  const bucketName = 'mood-er.appspot.com';
  // eslint-disable-next-line
  const { Storage } = require('@google-cloud/storage');

  const storage = new Storage({
    projectId: 'mood-er',
    keyFilename: path.join(__dirname, 'mood-er-ab4f2353432c.json'),
  });

  const stored = await storage.bucket(bucketName).upload(filePath, {
    destination: `fotos/${fileName}-${moment().unix()}`,
    gzip: false,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  stored[0].makePublic();

  console.log(`- File ${fileName} URL: ${stored[1].selfLink}`);

  return stored[1].selfLink;
}
