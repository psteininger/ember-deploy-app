# Example Ember App for Deployment Automation (CI+CD)

This is a bare-bones Ember application, with only a handful of addons:
```shell
ember install ember-cli-deploy
ember install ember-cli-deploy-s3-pack
ember install ember-cli-deploy-cloudfront
``` 

This app is used as a reference by the Terraform project: https://github.com/psteininger/ember-deploy-aws

## Configuration 
There is one key difference from a vanilla Ember app with the 3 addons installed. the `config/deploy.js` has been altered 
and largely simplified. It can be simplified more, but that would make the setup a bit too rigid. Here is the configuration 

```ecmascript 6
module.exports = function(deployTarget) {
  var ENV = {
    //...
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
  //...
};
```
## Buildspec file
The root directory contains a `buildspec.yml` to be used by AWS CodeBuild. This file can be modified and enhanced, but 
for brevity, it includes only a deployment script.

```yaml
version: 0.2

phases:
  install:
    commands:
      - printenv
      - npm install -g ember-cli@3.3.0
      - npm install
  build:
    commands:
      - ember deploy $EMBER_CLI_DEPLOY_TARGET
```


##Resources
* Blog
	* https://medium.com/@piotr.steininger/
* Terraform Repo
	* https://github.com/psteininger/ember-deploy-aws
* Example App
	* https://github.com/psteininger/ember-deploy-app
* Terraform Docs
	* https://www.terraform.io/docs/index.html
* AWS Docs
	* https://aws.amazon.com/documentation/
* AWS Help in Berlin
	* Renato Losio - http://arsenio.it

##License
The code in this repo is distributed under MIT License
