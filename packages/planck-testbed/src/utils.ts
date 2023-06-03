import { type IVec } from './types';

const isObject = (item: any): boolean => {
    return item && typeof item === 'object' && !Array.isArray(item);
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Utils {
    export const mergeDeep = (target: any, ...sources: any[]): any => {
        if (!sources.length) {
            return target;
        }
        const source = sources.shift();

        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, { [key]: {} });
                    }
                    mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return mergeDeep(target, ...sources);
    };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Vector {
    export const add = (v1: IVec, v2: IVec): IVec => {
        const x = v1.x + v2.x;
        const y = v1.y + v2.y;

        return { x, y };
    };

    export const rotate = (v: IVec, rad: number): IVec => {
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const x = cos * v.x + sin * v.y;
        const y = cos * v.y - sin * v.x;

        return { x, y };
    };

    // export const rotateAround = (v1: IVec, v2: IVec, rad: number): IVec => {
    //     const cos = Math.cos(rad);
    //     const sin = Math.sin(rad);
    //     const x = cos * (v2.y - v1.x) + sin * (v2.y - v1.y) + v1.x;
    //     const y = cos * (v2.y - v1.y) - sin * (v2.y - v1.x) + v1.y;

    //     return { x, y };
    // };

    // export const from = (v: { x: number; y: number }, multiplier: number): IVec => {
    //     const x = v.x * multiplier;
    //     const y = v.y * multiplier;

    //     return { x, y };
    // };
}
