import https from 'https';

export async function getLatestPackageVersion(packageName: string): Promise<string> {
  const options = {
    hostname: 'registry.npmjs.org',
    port: 443,
    path: `/${packageName}`,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      res.setEncoding('utf8');
      let rawData = '';
      
      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData['dist-tags'].latest);
        } catch (error) {
          reject((error as Error).message);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}