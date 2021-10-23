# Denorea

DoreaDB Deno 连接包

```
import { DoreaClient } from "../mod.ts";

const client = new DoreaClient(
    ["127.0.0.1", 3451],
    "DOREA@TEST"
);

if(client.connect()) {
    const _ = await client.set("foo", "Hello World");
}
```

[Dorea DB](https://dorea.mrxzx.info/) 数据库系统