import * as cdk from '@aws-cdk/core';
import {ManagedPolicy, Role, ServicePrincipal} from "@aws-cdk/aws-iam";
import {AssetCode, Function, Runtime} from "@aws-cdk/aws-lambda";
import * as events from '@aws-cdk/aws-events'
import * as eventsTarget from '@aws-cdk/aws-events-targets'
import * as fs from "fs";

export class FargateChangeDesiredcountStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // create Lambda execution role(IAM)
        const executionLambdaRole = new Role(this, 'lambdaRole', {
            roleName: 'helloLambdaExecutionRole',
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerServiceFullAccess')
            ]
        })

        // create Lambda function
        const changeDesiredCountFunction = new Function(this, "changeDesiredCount", {
            functionName: "fargateChangeDesiredCountFuncion",
            runtime: Runtime.NODEJS_12_X,
            code: AssetCode.fromAsset('src'),
            handler: "change-desiredcount.handler",
            timeout: cdk.Duration.seconds(300),
            role: executionLambdaRole
        });

        const config: Config[] = JSON.parse(fs.readFileSync('config.json', {encoding: 'utf-8'}))

        config.map(v => {
            const expression = v.event
            const targets: Target[] = v.targets;
            const rule = new events.Rule(this, 'schedule-' + v.name, {
                description: v.description,
                schedule: events.Schedule.expression(`cron(${expression})`)
            });

            rule.addTarget(new eventsTarget.LambdaFunction(changeDesiredCountFunction, {
                event: events.RuleTargetInput.fromObject(targets)
            }));
        })
    }
}

export interface Config {
    name: string,
    description: string,
    targets: Target[]
    event: string
}

export interface Target {
    cluster: string,
    service: string,
    desiredCount: number
}