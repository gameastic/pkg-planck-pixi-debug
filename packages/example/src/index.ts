import { Testbed } from '@gameastic/planck-testbed';

import { Application, Assets } from 'pixi.js';
import { Stage } from './view';

void Testbed;

window.addEventListener('load', () => {
    class Game extends Application {
        public constructor() {
            super({ resizeTo: window, backgroundColor: 0x000, hello: true });

            void Assets.load(['duck', 'parrot', 'pixel']).then(() => {
                this.stage = new Stage();
            });
        }
    }

    window.game = new Game();
    // @ts-expect-error
    document.body.appendChild(window.game.view);
});
