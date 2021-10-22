import { DoreaClient } from "../mod.ts";
import { Tuple, Binary } from "../mod.ts";

const client = new DoreaClient(
    ["127.0.0.1", 3451],
    "DOREA@TEST"
);

// 检测是否连接成功（未经过本步骤将无法使用后续函数）
// 本步骤会自动获取并储存 JWT 加密数据
if (await client.connect()) {

    // 选择操作数据库
    // client.select("denorea");

    // 使用 SET 函数插入数据（可以直接传递原生 ES6 类型进行插入）
    const status = await client.set("foo", {
        "string": "world",
        "tuple": Tuple.build("PI", 3.14),
        "dict": {"foo": "bar"},
        "list": [1,2,3,4,5,6,7,8,9,0],
        "number": 1314,
        "boolean": false,
        "binary": new Binary(await Deno.readFile("./LICENSE"))
    });
    status == true;

    // 使用 GET 函数读取内容（内容会被自动转换为 ES6 原生数据类型）
    const result = await client.get("foo");
    console.log(result);
    result == {
        "string": "world",
        "tuple": Tuple.build("PI", 3.14),
        "dict": {"foo": "bar"},
        "list": [1,2,3,4,5,6,7,8,9,0],
        "number": 1314,
        "boolean": false
    };

}