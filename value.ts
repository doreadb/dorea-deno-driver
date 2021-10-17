/**
 * DoreaDB -> Typescript
 * 类型转换包
 * @author mrxiaozhuox<mrxzx.info@gmail.com>
 */

// deno-lint-ignore no-explicit-any
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
        }
    }
}