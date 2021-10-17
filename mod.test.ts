import { DoreaClient, ObjectToType } from "./mod.ts"

const client = new DoreaClient(
    ["127.0.0.1", 3451],
    "DOREA@TEST"
);

if (await client.connect()) {
    let result = await client.execute("get foo");
    if (result == null) {
        result = "";
    }
    // console.log(result);
}

console.log(ObjectToType({
    "Number": 3.14
}));