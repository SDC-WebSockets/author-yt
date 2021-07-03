const request = require('request');
const fs = require('fs');

async function download(url, dest) {

    const file = fs.createWriteStream(dest);

    await new Promise((resolve, reject) => {
      request({
        uri: url,
        gzip: true,
      })
          .pipe(file)
          .on('finish', async () => {
            // console.log(`The file is finished downloading.`);
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
    })
        .catch((error) => {
          console.log(`Something happened: ${error}`);
        });
}

(async () => {
    for (let i=1; i<=10000000; i++) {
        const data = await download('https://thispersondoesnotexist.com/image', `../../images/${i}.jpg`);
    }
  	// console.log(data); // The file is finished downloading.
})();

/* var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
  console.log('done');
}); */