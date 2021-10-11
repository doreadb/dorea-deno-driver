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
        default_group?: string
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
        if(default_group) {
            this.groupName = default_group;
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

    public async execute(command: string) {
        
        if (!this.available) { return null; }

        const url = this.serviceUrl + "/@" + this.groupName + "/execute";

        const headers = new Headers();
        headers.append("Authorization", "bearer " + this.token["token"]);

        await fetch(
            url,
            {
                method: "POST",
                headers: headers,
                body: new URLSearchParams({
                    "query": command
                })
            }
        );
    }

}