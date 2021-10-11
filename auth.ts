export class DoreaAuth {

    private url: string;
    private password: string;

    constructor(url: string, password: string) { this.url = url; this.password = password; }
    public async getToken(): Promise<any> {

        const response = await fetch(
            this.url + "/auth",
            {
                method: "POST",
                body: new URLSearchParams({ password: this.password })
            }
        )
        if (!response.ok) {
            return null;
        } else {
            try {
                const json = await response.json();
                return json["data"];
            } catch(_) {
                return null;
            }
        }
    }
}