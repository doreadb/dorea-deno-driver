import { DoreaClient } from "../mod.ts";
import { Tuple } from "../mod.ts";

const client = new DoreaClient(
    ["127.0.0.1", 3451],
    "DOREA@TEST"
);

if (await client.connect()) {

    client.select("denorea");

    // 使用 SET 函数插入数据（可以直接传递原生 ES6 类型进行插入）
    const status = await client.set("foo", {
        "string": "world",
        "tuple": Tuple.build("PI", 3.14),
        "dict": {"foo": "bar"},
        "list": [1,2,3,4,5,6,7,8,9,0],
        "number": 1314,
        "boolean": false
    });
    status == true;

    // 使用 GET 函数读取内容（内容会被自动转换为 ES6 原生数据类型）
    const result = await client.get("foo");
    result == {
        "string": "world",
        "tuple": Tuple.build("PI", 3.14),
        "dict": {"foo": "bar"},
        "list": [1,2,3,4,5,6,7,8,9,0],
        "number": 1314,
        "boolean": false
    };
}