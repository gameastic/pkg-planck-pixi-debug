export type BodyType = 'dynamic' | 'static' | 'kinematic';

type DeepRequired<T> = {
    [P in keyof T]-?: T extends object ? DeepRequired<T[P]> : Required<T[P]>;
};

export interface ITestbedOptions {
    scale: number;
    style?: {
        theme: 'simple' | 'fancy';
        lineWidth: number;
    };
    origin?: {
        enabled?: boolean;
        transform?: { x?: number; y?: number; length?: number };
        colors?: {
            axisX?: string; // 'rgba(128, 128, 128, 0.5)'
            axisY?: string;
        };
    };
}

export type IStrictOptions = DeepRequired<ITestbedOptions>;

export interface IVec {
    x: number;
    y: number;
}
