import { DoreaClient } from "./client.ts";

const client = new DoreaClient(
    ["127.0.0.1", 3451],
    "DOREA@TEST"
);

if (await client.connect()) {
    console.log("连接成功！");
    console.log(await client.execute("get foo"));
}