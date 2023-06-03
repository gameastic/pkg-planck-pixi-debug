import { type Graphics } from 'pixi.js';
import { Chain, Circle, Edge, Polygon } from 'planck';
import { bodyColors, defaultOptions } from './constants';
import { type IStrictOptions, type ITestbedOptions, type IVec } from './types';
import { Utils, Vector } from './utils';

let LINE_WIDTH = 0;
let FILL_STYLE = 'rgba(255, 255, 255, 0.1)';
let STROKE_STYLE = 'rgba(255, 255, 255, 1)';
const JOINT_STYLE = 'rgba(255, 255, 255, 0.5)';

export class Testbed {
    private _world!: planck.World;
    private _graphics!: Graphics;
    private _options!: IStrictOptions;

    public init(world: planck.World, graphics: Graphics, options: ITestbedOptions): void {
        this._initWorld(world);
        this._initOptions(options);
        this._initGraphics(graphics);

        LINE_WIDTH = 1 / this._options.scale;
    }

    public draw(): void {
        this._graphics.clear();

        const world = this._world;
        const opts = this._options;
        const gr = this._graphics;

        /* Bodies */
        for (let b = world.getBodyList(); b; b = b.getNext()) {
            this._updateStyle(b, opts.style);

            const pos = b.getPosition();
            const angle = b.getAngle();

            for (let f = b.getFixtureList(); f; f = f.getNext()) {
                const fType = f.getType();
                switch (fType) {
                    case Circle.TYPE:
                        this._drawCircle(pos, angle, f, gr);
                        break;

                    case Edge.TYPE:
                        this._drawEdge(pos, angle, f, gr);
                        break;

                    case Polygon.TYPE:
                        this._drawPolygon(pos, angle, f, gr);
                        break;

                    case Chain.TYPE:
                        this._drawChain(pos, angle, f, gr);
                        break;
                }
            }
        }

        /* Joints */
        for (let j = world.getJointList(); j; j = j.getNext()) {
            this._drawJoint(j, gr);
        }

        this._drawOrigin(opts.origin, gr);
    }

    private _initWorld(world: planck.World): void {
        this._world = world;
    }

    private _initOptions(options: ITestbedOptions): void {
        this._options = Utils.mergeDeep(defaultOptions, options);
    }

    private _initGraphics(graphics: Graphics): void {
        const { scale, origin } = this._options;
        const { x, y } = origin.transform;

        this._graphics = graphics;
        this._graphics.scale.set(scale);
        this._graphics.position.set(x, y);
    }

    /**
     *
     * @param b - Body position
     * @param a - Body angle
     * @param f - Fixture
     */
    private _drawCircle(b: IVec, a: number, f: planck.Fixture, gr: Graphics): void {
        const shape = f.getShape() as planck.Circle;

        const r = shape.m_radius;
        const s = shape.m_p;

        const { x, y } = Vector.add(b, Vector.rotate(s, -a));

        /* shape center */
        gr.lineStyle({ color: STROKE_STYLE, width: LINE_WIDTH });
        gr.beginFill(FILL_STYLE);
        gr.drawCircle(x, -y, r);
        gr.endFill();

        /* shape angle */
        gr.moveTo(x, -y);
        gr.lineTo(x + r * Math.cos(a), -y - r * Math.sin(a));
    }

    /**
     *
     * @param b - Body position
     * @param a - Body angle
     * @param f - Fixture
     */
    private _drawEdge(b: IVec, a: number, f: planck.Fixture, gr: Graphics): void {
        const shape = f.getShape() as planck.Edge;

        const { x: bx, y: by } = b;
        const { x: x1, y: y1 } = shape.m_vertex1;
        const { x: x2, y: y2 } = shape.m_vertex2;

        gr.lineStyle({ color: STROKE_STYLE, width: LINE_WIDTH });
        gr.moveTo(bx + x1, -(by + y1));
        gr.lineTo(bx + x2, -(by + y2));

        const aaa: number = 4;
        const bbb: number = 4;

        const fn = (a: number, b: number): number => {
            return a + b;
        };

        fn(aaa, bbb);
    }

    /**
     *
     * @param b - Body position
     * @param a - Body angle
     * @param f - Fixture
     */
    private _drawChain(b: IVec, a: number, f: planck.Fixture, gr: Graphics): void {
        const shape = f.getShape() as planck.Chain;

        const vertices = shape.m_vertices;
        this._drawSegment(vertices, b, a, shape.isLoop(), gr);
    }

    /**
     *
     * @param b - Body position
     * @param a - Body angle
     * @param f - Fixture
     */
    private _drawPolygon(b: IVec, a: number, f: planck.Fixture, gr: Graphics): void {
        const shape = f.getShape() as planck.Polygon;

        const vertices = shape.m_vertices;
        this._drawSegment(vertices, b, a, vertices.length > 2, gr);
    }

    /**
     *
     * @param vertices - Vertices
     * @param b - Offset
     * @param a - Angle
     */
    private _drawSegment(vertices: IVec[], b: IVec, a: number, closePath: boolean, gr: Graphics): void {
        if (!vertices.length) {
            return;
        }

        gr.lineStyle({ color: STROKE_STYLE, width: LINE_WIDTH });
        gr.beginFill(FILL_STYLE);

        const { x: x0, y: y0 } = Vector.add(b, Vector.rotate(vertices[0], -a));
        gr.moveTo(+x0, -y0);

        for (let i = 0; i < vertices.length; ++i) {
            const { x: xi, y: yi } = Vector.add(b, Vector.rotate(vertices[i], -a));
            gr.lineTo(+xi, -yi);
        }

        closePath && gr.closePath();

        gr.endFill();
    }

    /**
     *
     * @param j - Joint
     */
    private _drawJoint(j: planck.Joint, gr: Graphics): void {
        const { x: x1, y: y1 } = j.getAnchorA();
        const { x: x2, y: y2 } = j.getAnchorB();

        gr.lineStyle({ color: JOINT_STYLE, width: LINE_WIDTH });
        gr.moveTo(x1, -y1);
        gr.lineTo(x2, -y2);
    }

    private _drawOrigin(origin: IStrictOptions['origin'], gr: Graphics): void {
        if (!origin.enabled) {
            return;
        }

        const { colors, transform } = origin;
        const l = transform.length;

        const axisXX = l * Math.cos(Math.PI * 0.5);
        const axisXY = l * Math.sin(-Math.PI * 0.5);
        const axisYX = l * Math.cos(Math.PI * 0);
        const axisYY = l * Math.sin(-Math.PI * 0);

        /* axis X line */
        gr.moveTo(0, 0);
        gr.lineStyle(LINE_WIDTH, colors.axisX);
        gr.lineTo(axisXX, axisXY);

        /* axis Y line */
        gr.moveTo(0, 0);
        gr.lineStyle(LINE_WIDTH, colors.axisY);
        gr.lineTo(axisYX, axisYY);

        /* center rect */
        gr.lineStyle(LINE_WIDTH, 0xadadad);
        gr.drawRect(-0.1, -0.1, 0.2, 0.2);
    }

    // REFACTOR
    private _updateStyle(b: planck.Body, style: IStrictOptions['style']): void {
        // @ts-expect-error => no type definition for planck.Body['m_type]
        const { 0: strokeStyle, 1: fillStyle } = bodyColors[style][b.m_type](b.isActive(), b.isAwake());

        STROKE_STYLE = strokeStyle;
        FILL_STYLE = fillStyle;
    }
}
