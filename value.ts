// deno-lint-ignore-file no-explicit-any

/**
 * DoreaDB -> Typescript
 * 类型转换包
 * @author mrxiaozhuox<mrxzx.info@gmail.com>
 */

export function ObjectToType(value: any): any {
    for (const key in value) {
        if(key == "String") {
            return String(value[key]);
        } else if (key == "Number") {
            return Number(value[key]);
        } else if (key == "Boolean") {
            if(typeof value[key] == "boolean") {
                return value[key];
            } else if (typeof value[key] == "string") {
                const temp: string = value[key];
                if (temp.toUpperCase() == "TRUE") {
                    return true;
                }
                return false;
            }
            return null;
        } else if (key == "List") {
            const parent = value[key];
            const result = [];
            for (const sub in parent) {
                result.push(ObjectToType(parent[sub]));
            }
            return result;
        } else if (key == "Tuple") {
            
            const parent = value[key];

            return new Tuple(
                ObjectToType(parent[0]),
                ObjectToType(parent[1]),
            );


        } else if (key == "Dict") {

            const parent = value[key];
            const result: {[key: string]: string} = {};
            for (const sub in parent) {
                result[sub] = ObjectToType(parent[sub]);
            }
            return result;
        
        } else if (key == "Binary") {
            return new Binary(value[key]["data"]);
        }
    }
}

export function TypeToString(value: any): string {
    if (typeof value == "string") {
        return "\"" + value + "\"";
    } else if (typeof value == "number") {
        return String(value);
    } else if (typeof value == "boolean") {
        if (value) {
            return "true";
        }
        return "false";
    } else if (typeof value == "object") {
        if (value instanceof Array) {

            let result = "[";
            for (const key in value) {
                const temp = TypeToString(value[key]);
                result += temp + ",";
            }
            result = result.substr(0, result.length - 1);
            result += "]";
            return result;

        } else if (value instanceof Tuple) {

            const t = value.toArray();

            let result = "(";
            for (const key in t) {
                const temp = TypeToString(t[key]);
                result += temp + ",";
            }
            result = result.substr(0, result.length - 1);
            result += ")";
            return result;
            
        } else if (value instanceof Binary) {

            return value.stringify();

        } else {

            let result = "{";
            for (const key in value) {
                const temp = TypeToString(value[key]);
                result += "\"" + key.toString() + "\":" + temp + ",";
            }
            result = result.substr(0, result.length - 1);
            result += "}";
            return result;

        }

    }
    return "";
}

export class Tuple {

    private items: any[];
    
    constructor(f: any,s: any) {
        this.items = [f, s]
    }

    public first(to?: any): any {
        if (to == null) {
            return this.items[0];
        }
        this.items[0] = to;
    }

    public second(to?: any): any {
        if (to == null) {
            return this.items[1];
        }
        this.items[1] = to;
    }

    public toArray(): any {
        return this.items;
    }

    public toString(): string {
        return "(" + this.first() + ", " + this.second() + ")";
    }

    static build(f: any, s: any): Tuple {
        return new Tuple(f, s);
    }

}

export class Binary {

    private inner: Uint8Array;

    constructor (data: Uint8Array) {
        this.inner = data;
    }

    public stringify() {
        return "binary!(" + btoa(
            this.inner.reduce((data, byte) => data + String.fromCharCode(byte), '')
        ) + ")";
    }

    public static base64(value: string): Binary {
        return new Binary(
            Uint8Array.from(atob(value), c => c.charCodeAt(0))
        );
    }

}