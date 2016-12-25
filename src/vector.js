/**
 * 基础方法封装
 */
var Vector = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Vector.prototype = {
    add: function (vector) {
        return new Vector(
            this.x + vector.x,
            this.y + vector.y
        );
    },
    subtract: function (vector) {
        return new Vector(
            this.x - vector.x,
            this.y - vector.y
        );
    },
    // 点乘
    dotProduct: function (vector) {
        return this.x * vector.x + this.y * vector.y;
    },
    divide: function (num) {
        if (num === 0) {
            return false;
        }
        return new Vector(
            this.x / num,
            this.y / num
        );
    },
    measure: function () {
        return Math.sqrt(
            Math.pow(this.x, 2) +
            Math.pow(this.y, 2)
        );
    },
    // 垂直向量
    perpendicular: function () {
        return new Vector(
            this.y,
            -this.x
        );
    },
    // 单位化
    normalize: function () {
        var m = this.measure();
        var vector = new Vector();
        if (m !== 0) {
            vector.x = this.x / m;
            vector.y = this.y / m
        }
        return vector;
    },
    // 法向量
    normal: function () {
        return this.normalize().perpendicular();
    },
    // 边缘向量
    edge: function (vector) {
        return this.subtract(vector);
    }
};

module.exports = Vector;
