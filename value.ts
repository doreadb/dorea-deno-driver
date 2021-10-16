/**
 * DoreaDB -> Typescript
 * 类型转换包
 * @author mrxiaozhuox<mrxzx.info@gmail.com>
 */

// deno-lint-ignore no-explicit-any ban-types
export function ObjectToType(value: object): any {
    for (const key in value) {
        if(key == "String") {
            return ;
        }
    }
}