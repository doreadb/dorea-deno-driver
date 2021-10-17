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
            const result = new Map();
            for (const sub in parent) {
                result.set(sub, ObjectToType(parent[sub]));
            }
            return result;
        }
    }
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

}