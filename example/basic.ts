import { DoreaClient } from "../mod.ts";
import { Tuple,TypeToString } from "../mod.ts";

const client = new DoreaClient(
    ["127.0.0.1", 3451],
    "DOREA@TEST"
);

if (await client.connect()) {

    // const result = await client.get("foo");
    // console.log(result);


    // const _ = await client.set("hello", {
    //     "name": "string",
    //     "": new Tuple(3.14, "PI")
    // })
    console.log(await client.set("foo", {
        "string": "world",
        "tuple": Tuple.build("PI", 3.14),
        "dict": {"foo": "bar"},
        "list": [1,2,3,4,5,6,7,8,9,0],
        "number": 1314,
        "boolean": false
    }))
}