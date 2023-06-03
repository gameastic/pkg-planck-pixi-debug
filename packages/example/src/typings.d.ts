import { type Application } from 'pixi.js';

declare global {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Window {
        game: Application;
    }

    module '*.png' {
        const content: any;
        export default content;
    }
}
