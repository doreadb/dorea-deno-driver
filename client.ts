// import ky from 'https://unpkg.com/ky/index.js';

export class DoreaClient {
    
    private serviceUrl: string;
    private servicePassword: string;

    constructor(
        addr: [string, number],
        password: string,
    ) {
        
        // 获取基本信息
        this.serviceUrl = "http://" + addr[0] + ":" + addr[1];
        this.servicePassword = password;

        // 尝试连接

    }

}