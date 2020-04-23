# Hello CDK

https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html

 ## Usage
 
 `npm install -g aws-cdk`
 
 create credentials
 
 ```
[default]
aws_access_key_id=
aws_secret_access_key=
region=ap-northeast-1
```

first

`cdk init --language typescript`

build(create .js)

`npm run build`

list cdk stack

`cdk ls`

synthesizing cf template

`cdk synth`

deploy stack

`cdk deploy`

diff

`cdk diff`

destroy stack

` cdk destroy`

