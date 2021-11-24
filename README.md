# Denorea

DoreaDB Deno 连接包

> 本系统使用 DoreaDB-WebService 作为接入。

```
import { DoreaClient } from "../mod.ts";

const client = new DoreaClient(
    ["127.0.0.1", 3451],
    "DOREA@SERVICE"
);

if(await client.connect()) {
    const _ = await client.set("foo", "Hello World");
}
```

[Dorea DB](https://dorea.mrxzx.info/) 数据库系统