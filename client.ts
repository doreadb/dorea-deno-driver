// deno-lint-ignore-file

import { DoreaAuth } from "./auth.ts";

export class DoreaClient {
    
    private serviceUrl: string;
    private servicePassword: string;
    private available: boolean;
    private token: any;
    private groupName: string;

    constructor(
        addr: [string, number],
        password: string,
        https?:boolean,
        defaultGroup?: string
    ) {
        
        if (https) {
            this.serviceUrl = "https://" + addr[0] + ":" + addr[1];
        } else {
            this.serviceUrl = "http://" + addr[0] + ":" + addr[1];
        }

        // 获取基本信息
        this.servicePassword = password;
        this.available = false;
        this.token = null;

        // 默认组信息
        if(defaultGroup) {
            this.groupName = defaultGroup;
        } else {
            this.groupName = "default";
        }
    }

    /**
     * 尝试连接目标数据库（Web Service）
     */
    public async connect() {
        
        const auth = new DoreaAuth(this.serviceUrl, this.servicePassword);
        const token = await auth.getToken()

        if (token == null) {
            this.available = false;
            return false;
        }

        this.available = true;
        this.token = token;
        return true;
    }

    public select(db: string) {
        this.groupName = db;
    }

    /**
     * 执行某条原生 `DoreaDB` 命令
     * @param command 
     * @returns result
     */
    public async execute(command: string): Promise<null | string> {
        
        if (!this.available) { throw new Error("Client connection failed"); }

        const url = this.serviceUrl + "/@" + this.groupName + "/execute";

        const headers = new Headers({
            Authorization: "Bearer " + this.token["token"]
        });

        const response = await fetch(
            url,
            {
                method: "POST",
                headers: headers,
                body: new URLSearchParams({
                    "query": command,
                    "style": "json"
                })
            }
        );

        // 过期自动尝试重新获取
        if (response.status == 401) {
            const auth = new DoreaAuth(this.serviceUrl, this.servicePassword);
            const newToken = await auth.getToken();
            if (newToken != null) {
                this.token = newToken;
                return this.execute(command);
            }
            return null;
        }

        if (!response.ok) {
            return null;
        } else {
            try {
                const json = await response.json();
                if (json["alpha"] != "OK") {
                    return null;
                }
                return json["data"]["reply"];
            } catch(_) {
                return null;
            }
        }
    }
}