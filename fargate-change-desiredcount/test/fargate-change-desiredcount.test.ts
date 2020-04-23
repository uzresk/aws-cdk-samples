import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import FargateChangeDesiredcount = require('../lib/fargate-change-desiredcount-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new FargateChangeDesiredcount.FargateChangeDesiredcountStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
