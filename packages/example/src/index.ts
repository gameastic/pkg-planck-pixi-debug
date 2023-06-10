import { Application, Assets } from 'pixi.js';
import { Stage } from './stage';

window.addEventListener('load', () => {
    class Game extends Application {
        public declare stage: Stage;

        public constructor() {
            super({ resizeTo: window, backgroundColor: 0x000, hello: true });

            void this.init().then(() => {
                this.stage = new Stage();
                this.ticker.add(() => {
                    this.stage.update();
                });
            });
        }

        public async init(): Promise<void> {
            await Assets.init({ basePath: 'assets' });
            await Assets.load(['pixel.png']);
        }
    }

    window.game = new Game();

    // @ts-expect-error game.view is canvas type
    document.body.appendChild(window.game.view);
});
