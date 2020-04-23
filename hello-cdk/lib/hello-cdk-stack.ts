import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3'

export class HelloCdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new s3.Bucket(this, 'MyFirstBucket', {
            bucketName: 'tis-rwd-dev-20200417',
            versioned: true,
            encryption: s3.BucketEncryption.KMS_MANAGED
        });

        // The code that defines your stack goes here
    }
}
