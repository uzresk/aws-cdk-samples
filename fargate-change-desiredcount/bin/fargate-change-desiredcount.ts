#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FargateChangeDesiredcountStack } from '../lib/fargate-change-desiredcount-stack';

const app = new cdk.App();
new FargateChangeDesiredcountStack(app, 'FargateChangeDesiredcountStack');
