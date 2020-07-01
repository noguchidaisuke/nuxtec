const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "amazon-s3-v1",
    acl: 'public-read',
    cacheControl: 'max-age=31536000',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
      //fieldName: photo
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString())
      //key: time
    }
  })
})

module.exports = upload;