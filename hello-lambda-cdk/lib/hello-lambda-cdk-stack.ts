import * as cdk from '@aws-cdk/core';
import {AssetCode, Function, Runtime} from "@aws-cdk/aws-lambda";
import {ManagedPolicy, Role, ServicePrincipal} from "@aws-cdk/aws-iam";
import * as events from '@aws-cdk/aws-events'
import * as eventsTarget from '@aws-cdk/aws-events-targets'

export class HelloLambdaCdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // create Lambda execution role(IAM)
        const executionLambdaRole = new Role(this, 'lambdaRole', {
            roleName: 'helloLambdaExecutionRole',
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
            ]
        })

        // create Lambda function
        const helloLambda = new Function(this, "hello-lambda", {
            functionName: "hello-lambda",
            runtime: Runtime.NODEJS_12_X,
            code: AssetCode.fromAsset('src'),
            handler: "hello-lambda.handler",
            timeout: cdk.Duration.seconds(300),
            role: executionLambdaRole
        });

        // schedule
        // schedule: events.Schedule.expression('cron(0 0 ? * ? *)'),
        new events.Rule(this, 'HelloLambdaSchedule', {
            schedule: events.Schedule.cron({
                minute: "*"
            }),
            targets: [new eventsTarget.LambdaFunction(helloLambda)]
        });
    }
}
