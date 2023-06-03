import { type BodyType, type IStrictOptions } from './types';

export const bodyColors: Record<
    IStrictOptions['style'],
    Record<BodyType, (active: boolean, awake: boolean) => [string, string]>
> = {
    simple: {
        dynamic: (_active: boolean, _awake: boolean) => {
            return ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.1)'];
        },
        static: (_active: boolean, _awake: boolean) => {
            return ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.1)'];
        },
        kinematic: (_active: boolean, _awake: boolean) => {
            return ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.1)'];
        },
    },

    fancy: {
        dynamic: (active: boolean, awake: boolean) => {
            return !active
                ? [
                      //
                      'rgba(140, 70, 70, 0.8)',
                      'rgba(0, 0, 0, 0)',
                  ]
                : !awake
                ? [
                      //
                      'rgba(0, 255, 0, 0.35)',
                      'rgba(0, 255, 0, 0.05)',
                  ]
                : [
                      //
                      'rgba(0, 255, 0, 0.7)',
                      'rgba(0, 255, 0, 0.1)',
                  ];
        },
        static: (active: boolean, awake: boolean) => {
            return !active
                ? [
                      //
                      'rgba(140, 70, 70, 0.8)',
                      'rgba(0, 0, 0, 0)',
                  ]
                : !awake
                ? [
                      //
                      'rgba(255, 255, 255, 0.35)',
                      'rgba(255, 255, 255, 0.05)',
                  ]
                : [
                      //
                      'rgba(255, 255, 255, 0.7)',
                      'rgba(255, 255, 255, 0.1)',
                  ];
        },
        kinematic: (active: boolean, awake: boolean) => {
            return !active
                ? [
                      //
                      'rgba(140, 70, 70, 0.8)',
                      'rgba(0, 0, 0, 0)',
                  ]
                : !awake
                ? [
                      //
                      'rgba(255, 255, 255, 0.35)',
                      'rgba(255, 255, 255, 0.05)',
                  ]
                : [
                      //
                      'rgba(255, 255, 255, 0.7)',
                      'rgba(255, 255, 255, 0.1)',
                  ];
        },
    },
};

export const defaultOptions: IStrictOptions = {
    scale: 16,
    origin: {
        enabled: true,
        transform: { x: 0, y: 0, length: 3 },
        colors: {
            axisX: 'rgba(255, 0, 0, 0.5)',
            axisY: 'rgba(0, 255, 255, 0.5)',
        },
    },
    style: 'fancy',
};
