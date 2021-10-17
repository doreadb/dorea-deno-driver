import { DoreaClient } from "../mod.ts"

const client = new DoreaClient(
    ["127.0.0.1", 3451],
    "DOREA@TEST"
);

if (await client.connect()) {
    const result = await client.get("foo");
    console.log(result);
}