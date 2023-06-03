import { Testbed } from '@gameastic/planck-testbed';
import { Container, Graphics } from 'pixi.js';
import {
    Body,
    Box,
    Chain,
    Circle,
    DistanceJoint,
    Edge,
    GearJoint,
    Polygon,
    PrismaticJoint,
    RevoluteJoint,
    Vec2,
    World,
} from 'planck';

export class Stage extends Container {
    public constructor() {
        super();

        const { screen } = window.game;

        const graphics = new Graphics();
        this.addChild(graphics);

        const world = new World({
            gravity: new Vec2(0.0, -10.0),
            velocityIterations: 4.0, // default => 8
            positionIterations: 2.0, // default => 3
            warmStarting: false,
            allowSleep: true,
        });

        // Debugger
        const testbed = new Testbed();
        testbed.init(world, graphics, {
            scale: 22, // 16
            style: {
                theme: 'fancy', // 'simple',
                lineWidth: 2, // 1
            },
            origin: {
                enabled: true, // true
                transform: { x: screen.width * 0.5, y: screen.height * 0.5, length: 2 }, // x: 0, y: 0, length: 3
            },
        });

        window.game.ticker.add(() => {
            world.step(1 / 60, 8, 3);
            testbed.draw();
        });

        // Ground
        const groundBody = world.createBody({
            position: new Vec2(0.0, -5.0),
            type: Body.STATIC,
            awake: false,
        });

        groundBody.createFixture({
            shape: new Edge(new Vec2(-15.0, 0.0), new Vec2(15.0, 0.0)),
        });

        // Box
        const boxBody = world.createBody({
            position: new Vec2(0.0, 7.0),
            angle: 0.4,
            type: Body.KINEMATIC,
            awake: false,
        });

        boxBody.createFixture({
            shape: new Box(2.0, 2.0, new Vec2(0.0, 0.0), 0.0),
        });

        // Polygon
        const polygonBody = world.createBody({
            position: new Vec2(-11.2, 1.0),
            angle: -0.2,
            awake: false,
            type: Body.STATIC,
        });

        polygonBody.createFixture({
            shape: new Polygon([
                //
                new Vec2(0.0, 0.0),
                new Vec2(2.0, -2.0),
                new Vec2(4.0, -1.0),
                new Vec2(5.0, 2.0),
                new Vec2(3.0, 4.0),
                new Vec2(0.0, 3.0),
            ]),
        });

        // Chain
        const chainBody = world.createBody({
            position: new Vec2(-15, -5.0),
            type: Body.STATIC,
            awake: false,
            angle: 0.1,
        });
        chainBody.createFixture({
            shape: new Chain(
                [
                    //
                    new Vec2(4.0, 1.0),
                    new Vec2(8.0, 3.0),
                    new Vec2(12.0, 2.0),
                    new Vec2(16.0, 6.0),
                    new Vec2(20.0, 4.0),
                    new Vec2(28.0, 0.0),
                ],
                true
            ),
        });

        // Circles
        const circleBody = world.createBody({
            position: new Vec2(-1.0, 15.0),
            type: Body.DYNAMIC,
            angularVelocity: -3,
            linearVelocity: Vec2(0.0, -0.0),
            gravityScale: 2,
            angle: 1,
        });

        circleBody.createFixture({
            shape: new Circle(new Vec2(1.0, 1.0), 1.0),
            friction: 0.1,
            density: 1,
        });
        circleBody.createFixture({
            shape: new Circle(new Vec2(-1.0, -1.0), 1.0),
            friction: 0.1,
            density: 1,
        });

        // Joints
        /* revolute */
        let prevBody = groundBody;
        const count = 12;

        for (let i = 0; i < count; ++i) {
            const body = world.createDynamicBody({
                position: Vec2(-13.5 + 1.0 * i, -7.0),
            });
            body.createFixture({
                shape: new Box(0.5, 0.125),
                density: 10.0,
                friction: 1.1,
            });

            const anchor = Vec2(-14.0 + 1.0 * i, -7.0);
            world.createJoint(new RevoluteJoint({}, prevBody, body, anchor));

            prevBody = body;
        }

        const anchor = Vec2(-14.0 + 1.0 * count, -7.0);
        world.createJoint(new RevoluteJoint({}, prevBody, groundBody, anchor));

        /* gear */
        const radius1 = 0.75;
        const radius2 = 1.5;

        const gearB1 = world.createDynamicBody(Vec2(8.0, -8.5));
        gearB1.createFixture(new Circle(radius1), 5.0);

        const jointB1 = world.createJoint(new RevoluteJoint({}, groundBody, gearB1, gearB1.getPosition()));

        const gearB2 = world.createDynamicBody(Vec2(10.25, -8.5));
        gearB2.createFixture(new Circle(radius2), 5.0);

        const jointB2 = world.createJoint(new RevoluteJoint({}, groundBody, gearB2, gearB2.getPosition()));

        const plankB1 = world.createDynamicBody(Vec2(12, -8.5));
        plankB1.createFixture(new Box(0.25, 3.0), 5.0);

        const jointB3 = world.createJoint(
            new PrismaticJoint(
                {
                    lowerTranslation: -3,
                    upperTranslation: 3,
                    enableLimit: true,
                },
                groundBody,
                plankB1,
                plankB1.getPosition(),
                Vec2(0.0, 1.0)
            )
        );

        const jointB4 = world.createJoint(new GearJoint({}, gearB1, gearB2, jointB1!, jointB2!, radius2 / radius1));
        const jointB5 = world.createJoint(new GearJoint({}, gearB2, plankB1, jointB2!, jointB3!, -1.0 / radius2));

        void jointB4;
        void jointB5;

        /* distance */
        const box = new Box(0.2, 0.2);

        const body1 = world.createDynamicBody(Vec2(1.5, -7.0));
        body1.createFixture(box, 10.0);

        const body2 = world.createDynamicBody(Vec2(4.5, -7.0));
        body2.createFixture(box, 10.0);

        const body3 = world.createDynamicBody(Vec2(4.5, -10.0));
        body3.createFixture(box, 10.0);

        const body4 = world.createDynamicBody(Vec2(1.5, -10.0));
        body4.createFixture(box, 10.0);

        world.createJoint(
            new DistanceJoint({
                bodyA: groundBody,
                bodyB: body1,
                localAnchorA: Vec2(-0.0, -0.0),
                localAnchorB: Vec2(-0.0, -0.0),
            })
        );

        world.createJoint(
            new DistanceJoint({
                bodyA: groundBody,
                bodyB: body2,
                localAnchorA: Vec2(6.0, 0.0),
                localAnchorB: Vec2(0.0, -0.0),
            })
        );

        world.createJoint(
            new DistanceJoint({
                bodyA: groundBody,
                bodyB: body3,
                localAnchorA: Vec2(6.0, -7.0),
                localAnchorB: Vec2(0.0, 0.0),
            })
        );

        world.createJoint(
            new DistanceJoint({
                bodyA: groundBody,
                bodyB: body4,
                localAnchorA: Vec2(-0.0, -7.0),
                localAnchorB: Vec2(-0.0, 0.0),
            })
        );

        world.createJoint(
            new DistanceJoint({
                bodyA: body1,
                bodyB: body2,
                localAnchorA: Vec2(0.0, 0.0),
                localAnchorB: Vec2(-0.0, 0.0),
            })
        );

        world.createJoint(
            new DistanceJoint({
                bodyA: body2,
                bodyB: body3,
                localAnchorA: Vec2(0.0, 0.0),
                localAnchorB: Vec2(0.0, -0.0),
            })
        );

        world.createJoint(
            new DistanceJoint({
                bodyA: body3,
                bodyB: body4,
                localAnchorA: Vec2(-0.0, 0.0),
                localAnchorB: Vec2(0.0, 0.0),
            })
        );

        world.createJoint(
            new DistanceJoint({
                bodyA: body4,
                bodyB: body1,
                localAnchorA: Vec2(0.0, -0.0),
                localAnchorB: Vec2(0.0, 0.0),
            })
        );
    }
}
