/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {
      environment: "production"
    },
    pipeline: {
      // This setting runs the ember-cli-deploy activation hooks on every deploy
      // which is necessary in order to run ember-cli-deploy-cloudfront.
      // To disable CloudFront invalidation, remove this setting or change it to `false`.
      // To disable ember-cli-deploy-cloudfront for only a particular environment, add
      // `ENV.pipeline.activateOnDeploy = false` to an environment conditional below.
      activateOnDeploy: true
    },
    "revision-data": {
      "type": "version-commit"
    }
  };

  ENV.s3 = {};
  ENV["s3-index"] = {
    allowOverwrite: true
  };
  ENV.cloudfront = {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  };

  if (deployTarget === 'staging') {
    ENV.s3.accessKeyId = process.env.AWS_KEY;
    ENV.s3.secretAccessKey = process.env.AWS_SECRET;
    ENV.s3.bucket = process.env.ASSETS_STAGING_BUCKET;
    ENV.s3.region = process.env.AWS_REGION;
    ENV["s3-index"].accessKeyId = process.env.AWS_KEY;
    ENV["s3-index"].secretAccessKey = process.env.AWS_SECRET;
    ENV["s3-index"].bucket = process.env.INDEX_STAGING_BUCKET;
    ENV["s3-index"].region = process.env.AWS_REGION;
    ENV.cloudfront.distribution = process.env.CLOUDFRONT_DISTRIBUTION_ID_STAGING;
  }

  if (deployTarget === 'production') {
    ENV.s3.accessKeyId = process.env.AWS_KEY;
    ENV.s3.secretAccessKey = process.env.AWS_SECRET;
    ENV.s3.bucket = process.env.ASSETS_PRODUCTION_BUCKET;
    ENV.s3.region = process.env.AWS_REGION;
    ENV["s3-index"].accessKeyId = process.env.AWS_KEY;
    ENV["s3-index"].secretAccessKey = process.env.AWS_SECRET;
    ENV["s3-index"].bucket = process.env.INDEX_PRODUCTION_BUCKET;
    ENV["s3-index"].region = process.env.AWS_REGION;
    ENV.cloudfront.distribution = process.env.CLOUDFRONT_DISTRIBUTION_ID_PRODUCTION;
  }


  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
