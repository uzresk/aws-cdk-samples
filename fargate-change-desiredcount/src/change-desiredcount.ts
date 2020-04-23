import * as AWS from "aws-sdk"
import {Context} from "aws-lambda";

export function handler(event: Target[], context: Context, callback: any): void {

    const ecs = new AWS.ECS()
    event.map(target => {
        console.log("target:", target)
        const params = {
            cluster: target.cluster,
            service: target.service,
            desiredCount: target.desiredCount
        };
        ecs.updateService(params, (err, data) => {
            if (err) {
                console.log(err,err.stack);
                throw new Error("[ERROR]DesiredCount change failure.")
            } else {
                console.log(data);
            }
        });
    })

}

export interface Target {
    cluster: string,
    service: string,
    desiredCount: number
}
