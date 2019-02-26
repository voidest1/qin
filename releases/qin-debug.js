/**
 * Qin 0.0.1 built on 2019-02-26.
 * Copyright (c) 2019 Leon Liu <voidest@hotmail.com>
 *
 * https://github.com/voidest1/qin
 */class CanvasContext{
    static get WIDTH() {
        return 600;
    }
    static get HEIGHT() {
        return 400;
    }

    constructor(context) {
        // Use a name that is unlikely to clash with a canvas context
        // property
        this.canvasContext = context;
        if (!context.canvas) {
            this.canvas = {
                width: CanvasContext.WIDTH,
                height: CanvasContext.HEIGHT,
            };
        } else {
            this.canvas = context.canvas;
        }
    }

    clear() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Containers not implemented
    openGroup() {}
    closeGroup() {}
    add() {}

    setFont(family, size, weight) {
        this.canvasContext.font = (weight || '') + ' ' + size + 'pt ' + family;
        return this;
    }

    setRawFont(font) {
        this.canvasContext.font = font;
        return this;
    }

    setFillStyle(style) {
        this.canvasContext.fillStyle = style;
        return this;
    }

    setBackgroundFillStyle(style) {
        this.background_fillStyle = style;
        return this;
    }

    setStrokeStyle(style) {
        this.canvasContext.strokeStyle = style;
        return this;
    }

    setShadowColor(style) {
        this.canvasContext.shadowColor = style;
        return this;
    }

    setShadowBlur(blur) {
        this.canvasContext.shadowBlur = blur;
        return this;
    }

    setLineWidth(width) {
        this.canvasContext.lineWidth = width;
        return this;
    }

    setLineCap(cap_type) {
        this.canvasContext.lineCap = cap_type;
        return this;
    }

    // setLineDash: is the one native method in a canvas context
    // that begins with set, therefore we don't bolster the method
    // if it already exists (see renderer.bolsterCanvasContext).
    // If it doesn't exist, we bolster it and assume it's looking for
    // a ctx.lineDash method, as previous versions of Qin
    // expected.
    setLineDash(dash) {
        this.canvasContext.lineDash = dash;
        return this;
    }

    scale(x, y) {
        return this.canvasContext.scale(parseFloat(x), parseFloat(y));
    }

    resize(width, height) {
        return this.canvasContext.resize(parseInt(width, 10), parseInt(height, 10));
    }

    rect(x, y, width, height) {
        return this.canvasContext.rect(x, y, width, height);
    }

    fillRect(x, y, width, height) {
        return this.canvasContext.fillRect(x, y, width, height);
    }

    clearRect(x, y, width, height) {
        return this.canvasContext.clearRect(x, y, width, height);
    }

    beginPath() {
        return this.canvasContext.beginPath();
    }

    moveTo(x, y) {
        return this.canvasContext.moveTo(x, y);
    }

    lineTo(x, y) {
        return this.canvasContext.lineTo(x, y);
    }

    bezierCurveTo(x1, y1, x2, y2, x, y) {
        return this.canvasContext.bezierCurveTo(x1, y1, x2, y2, x, y);
    }

    quadraticCurveTo(x1, y1, x, y) {
        return this.canvasContext.quadraticCurveTo(x1, y1, x, y);
    }

    // This is an attempt (hack) to simulate the HTML5 canvas
    // arc method.
    arc(x, y, radius, startAngle, endAngle, antiClockwise) {
        return this.canvasContext.arc(x, y, radius, startAngle, endAngle, antiClockwise);
    }

    // Adapted from the source for Raphael's Element.glow
    glow() {
        return this.canvasContext.glow();
    }

    fill() {
        return this.canvasContext.fill();
    }

    stroke() {
        return this.canvasContext.stroke();
    }

    closePath() {
        return this.canvasContext.closePath();
    }

    measureText(text) {
        return this.canvasContext.measureText(text);
    }

    fillText(text, x, y) {
        return this.canvasContext.fillText(text, x, y);
    }

    save() {
        return this.canvasContext.save();
    }

    restore() {
        return this.canvasContext.restore();
    }
};const Qin = () => {};

// Default log function sends all arguments to console.
Qin.L = (block, args) => {
    if (!args) return;
    const line = Array.prototype.slice.call(args).join(' ');
    window.console.log(block + ': ' + line);
};

Qin.MakeException = (name) => {
    const exception = class extends Error {
        constructor(message, data) {
            super(message);
            this.name = name;
            this.message = message;
            this.data = data;
        }
    };

    return exception;
};

// Default runtime exception.
class RuntimeError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    toString() {
        return '[RuntimeError] ' + this.code + ':' + this.message;
    }
}

// Shortcut method for `RuntimeError`.
Qin.RuntimeError = RuntimeError;
Qin.RERR = Qin.RuntimeError;

// Merge `destination` hash with `source` hash, overwriting like keys
// in `source` if necessary.
Qin.Merge = (destination, source) => {
    for (const property in source) { // eslint-disable-line guard-for-in
        destination[property] = source[property];
    }
    return destination;
};

// DEPRECATED. Use `Math.*`.
Qin.Min = Math.min;
Qin.Max = Math.max;
Qin.forEach = (a, fn) => {
    for (let i = 0; i < a.length; i++) {
        fn(a[i], i);
    }
};

// Round number to nearest fractional value (`.5`, `.25`, etc.)
Qin.RoundN = (x, n) =>
    (x % n) >= (n / 2)
        ? parseInt(x / n, 10) * n + n
        : parseInt(x / n, 10) * n;

// Locate the mid point between stave lines. Returns a fractional line if a space.
Qin.MidLine = (a, b) => {
    let mid_line = b + (a - b) / 2;
    if (mid_line % 2 > 0) {
        mid_line = Qin.RoundN(mid_line * 10, 5) / 10;
    }
    return mid_line;
};

// Take `arr` and return a new list consisting of the sorted, unique,
// contents of arr. Does not modify `arr`.
Qin.SortAndUnique = (arr, cmp, eq) => {
    if (arr.length > 1) {
        const newArr = [];
        let last;
        arr.sort(cmp);

        for (let i = 0; i < arr.length; ++i) {
            if (i === 0 || !eq(arr[i], last)) {
                newArr.push(arr[i]);
            }
            last = arr[i];
        }

        return newArr;
    } else {
        return arr;
    }
};

// Check if array `a` contains `obj`.
Qin.Contains = (a, obj) => {
    let i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
};

// Get the 2D Canvas context from DOM element `canvas_sel`.
Qin.getCanvasContext = canvas_sel => {
    if (!canvas_sel) {
        throw new Qin.RERR('BadArgument', 'Invalid canvas selector: ' + canvas_sel);
    }

    const canvas = document.getElementById(canvas_sel);
    if (!(canvas && canvas.getContext)) {
        throw new Qin.RERR(
            'UnsupportedBrowserError', 'This browser does not support HTML5 Canvas'
        );
    }

    return canvas.getContext('2d');
};

// Draw a tiny dot marker on the specified canvas. A great debugging aid.
//
// `ctx`: Canvas context.
// `x`, `y`: Dot coordinates.
Qin.drawDot = (ctx, x, y, color = '#55') => {
    ctx.save();
    ctx.setFillStyle(color);

    // draw a circle
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

// Benchmark. Run function `f` once and report time elapsed shifted by `s` milliseconds.
Qin.BM = (s, f) => {
    const start_time = new Date().getTime();
    f();
    const elapsed = new Date().getTime() - start_time;
    Qin.L(s + elapsed + 'ms');
};

// Get stack trace.
Qin.StackTrace = () => {
    const err = new Error();
    return err.stack;
};

// Dump warning to console.
Qin.W = (...args) => {
    const line = args.join(' ');
    window.console.log('Warning: ', line, Qin.StackTrace());
};

// Used by various classes (e.g., SVGContext) to provide a
// unique prefix to element names (or other keys in shared namespaces).
Qin.Prefix = text => Qin.Prefix.prefix + text;
Qin.Prefix.prefix = 'qin-';