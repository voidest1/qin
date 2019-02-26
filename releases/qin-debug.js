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
}