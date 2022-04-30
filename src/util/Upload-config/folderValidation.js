const { existsSync } = require('fs');
const { exec } = require('child_process');

exports.folderStoreValidation = (storePath, callBack) => {
  if (!existsSync(storePath)) {
    exec(`mkdir ${path.join(storePath)}`, (err, stdout, stderr) => {
      if (err) {
        console.log(`err: ${err}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      callBack(storePath);
    })
  } else {
    callBack(storePath);
  }
}