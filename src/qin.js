const Qin = () => {};

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