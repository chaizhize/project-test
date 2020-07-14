function ImgCorrect() {
    this.init = function(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d'); //canvas对象
        this.w = this.canvas.width; //画布的宽
        this.h = this.canvas.height; //画布的高
        this.touch = 'createTouch' in document; //判定是否为手持设备
        this.StartEvent = this.touch ? 'touchstart' : 'mousedown';
        this.MoveEvent = this.touch ? 'touchmove' : 'mousemove';
        this.EndEvent = this.touch ? 'touchend' : 'mouseup';
        this.MouseWheel = 'mousewheel';

        this.currentImage = ''; //存储当前图片
        this.lock = false; //鼠标是否在被拖动
        this.isDrawing = false;
        this.isPainting = false;
        this.outerParams = {
            rect: {
                color: '#000',
                radius: 0,
                lineWidth: 1
            },
            circle: {
                color: '#000',
                radius: 0,
                lineWidth: 1
            },
            line: {
                color: '#6FE1DC',
                radius: 0,
                lineWidth: 1
            },
            arrow: {
                color: '#6FE1DC',
                radius: 0,
                lineWidth: 1
            }
        };

        this.isCurrentCorrent = {
            isRect: false,
            isLine: false,
            isCircle: false,
            wave: false,
            isText: false
        };
        this.lineX = [];
        this.lineY = [];
        this.clickDrag = [];

        this.rect = {};
        this.line = {};
        this.circle = {};
        this.text = {};
        this.wave = {};

        this.restore = [];
        this.repeat = [];
        this.balls = [];
        this.switchArr = [];
        this.deletePaint = '';
        this.chooseCurrentCorrent();
    };
    //选择当前绘制徒刑
    this.chooseCurrentCorrent = function(isSele = 'isRect') {
        for (let i in this.isCurrentCorrent) {
            this.isCurrentCorrent[i] = false;

            this.isCurrentCorrent[isSele] = true;
        }
    };
    //上传图片
    this.chooseImage = function(url) {
        var that = this;
        that.restore = [];
        that.repeat = [];
        that.ctx.clearRect(0, 0, that.w, that.h);
        that.img = new Image();
        that.img.onload = function() {
            that.drawImageCorrect();
        };
        that.img.src = url + '?timeStamp=' + new Date();
        that.img.crossOrigin = 'anonymous';
    };
    (this.drawImageCorrect = function(img) {
        const that = this;
        this.ctx.drawImage(
            that.img,
            0,
            0, //开始剪切的 x 坐标位置
            that.img.width,
            that.img.height, //被剪切图像的高度
            0,
            0,
            that.w,
            that.h //要使用的图像的宽度、高度
        );
        that.currentImage = that.ctx.getImageData(0, 0, that.w, that.h);
        that.bind();
    }),
        //事件监听
        (this.bind = function() {
            var t = this;
            var isFocus = true;
            var textArr = [];
            document.onkeydown = function(e) {
                var oEvent = window.event;
                console.log(e);
                if (oEvent.keyCode == 8) {
                    // console.log(99999)
                    const x = e.clientX - t.canvas.getBoundingClientRect().left;
                    const y = e.clientY - t.canvas.getBoundingClientRect().top;
                    var arr = [];
                    console.log(t.deletePaint);
                    t.balls.forEach((item, index) => {
                        if (item.time == t.deletePaint.time) {
                            t.balls.splice(index, 1);
                            t.deletePaint = '';
                            t.clear();
                            t.redrawAll(true);
                        }
                    });
                }
            };
            this.canvas['on' + t.StartEvent] = function(e) {
                var touch = t.touch ? e.touches[0] : e;
                //记录点击的坐标点
                t.lock = true;
                // t.isDrawing = false;
                var _x = touch.offsetX;
                var _y = touch.offsetY;
                if (t.isCurrentCorrent.isRect) {
                    t.rect.x = _x;
                    t.rect.y = _y;
                } else if (t.isCurrentCorrent.isCircle) {
                    t.circle.x = _x;
                    t.circle.y = _y;
                } else if (t.isCurrentCorrent.isLine) {
                    t.movePoint(_x, _y);

                    t.line.realX = _x;
                    t.line.realY = _y;
                }
            };
            (this.canvas['on' + t.MouseWheel] = function(opt) {
                console.log('fffffffffff');
            }),
                (this.canvas['on' + t.MoveEvent] = function(e) {
                    console.log(t.isDrawing, 'lllllllloooooooo');
                    if (t.lock && !t.isDrawing) {
                        t.isPainting = false;
                        if (t.isCurrentCorrent.isRect) {
                            t.rect.width = Math.abs(t.rect.x - e.offsetX);
                            t.rect.height = Math.abs(t.rect.y - e.offsetY);
                            if (t.rect.x > e.offsetX) {
                                t.rect.realX = e.offsetX;
                            } else {
                                t.rect.realX = t.rect.x;
                            }
                            if (t.rect.y > e.offsetY) {
                                t.rect.realY = e.offsetY;
                            } else {
                                t.rect.realY = t.rect.y;
                            }
                            t.clear();
                            t.redrawAll();
                            t.drawRect(t.rect.realX, t.rect.realY, t.rect.width, t.rect.height, t.outerParams.rect.radius, t.outerParams.rect.color, t.outerParams.rect.lineWidth);
                        } else if (t.isCurrentCorrent.isCircle) {
                            var pointX, pointY;
                            if (t.circle.x > e.offsetX) {
                                pointX = t.circle.x - Math.abs(t.circle.x - e.offsetX) / 2;
                            } else {
                                pointX = Math.abs(t.circle.x - e.offsetX) / 2 + t.circle.x;
                            }
                            if (t.circle.y > e.offsetY) {
                                pointY = t.circle.y - Math.abs(t.circle.y - e.offsetY) / 2;
                            } else {
                                pointY = Math.abs(t.circle.y - e.offsetY) / 2 + t.circle.y;
                            }
                            console.log(pointX, pointY);
                            var lineX = Math.abs(t.circle.x - e.offsetX) / 2;
                            var lineY = Math.abs(t.circle.y - e.offsetY) / 2;
                            console.log(lineX, lineY, 'lll');
                            t.clear();
                            t.redrawAll();
                            t.drawEllipse(pointX, pointY, lineX, lineY, t.outerParams.circle.lineWidth, t.outerParams.circle.color);
                        } else if (t.isCurrentCorrent.isLine) {
                            t.movePoint(e.offsetX, e.offsetY, true);
                            // t.line.realX = e.offsetX;
                            // t.line.realY = e.offsetY;
                            t.drawPoint(t.line.realX, t.line.realY, e.offsetX, e.offsetY, t.clickDrag, t.lineWidth, t.outerParams.line.color);
                        }
                    } else {
                        t.choosePitch(e);
                    }
                });
            this.canvas['on' + t.EndEvent] = function(e) {
                var touch = t.touch ? e.touches[0] : e;
                //记录点击的坐标点
                var _x = touch.offsetX;
                var _y = touch.offsetY;
                t.lock = false;
                t.isDrawing = false;
                var time = +new Date();
                if (!t.isPainting) {
                    t.isPainting = false;
                    if (t.isCurrentCorrent.isRect) {
                        if (t.rect.width > 1 || t.rect.height > 1) {
                            var rect = {
                                x: t.rect.realX,
                                y: t.rect.realY,
                                width: t.rect.width,
                                height: t.rect.height,
                                radius: t.outerParams.rect.radius,
                                color: t.outerParams.rect.color,
                                lineWidth: t.outerParams.rect.lineWidth,
                                time: time,
                                type: 'rectArr'
                            };
                            t.balls.push(rect);
                            t.rect = {};
                        }
                    } else if (t.isCurrentCorrent.isCircle) {
                        var pointX, pointY;
                        if (t.circle.x > e.offsetX) {
                            pointX = t.circle.x - Math.abs(t.circle.x - e.offsetX) / 2;
                        } else {
                            pointX = Math.abs(t.circle.x - e.offsetX) / 2 + t.circle.x;
                        }
                        if (t.circle.y > e.offsetY) {
                            pointY = t.circle.y - Math.abs(t.circle.y - e.offsetY) / 2;
                        } else {
                            pointY = Math.abs(t.circle.y - e.offsetY) / 2 + t.circle.y;
                        }
                        var lineX = Math.abs(t.circle.x - e.offsetX) / 2;
                        var lineY = Math.abs(t.circle.y - e.offsetY) / 2;
                        // t.status.circleArr.push({ x: pointX, y: pointY, a: lineX, b: lineY, color: t.outerParams.circle.color, lineWidth: t.outerParams.circle.lineWidth});
                        var circle = {
                            x: pointX,
                            y: pointY,
                            width: lineX,
                            height: lineY,
                            lineWidth: t.outerParams.circle.lineWidth,
                            color: t.outerParams.circle.color,
                            time: time,
                            type: 'circleArr'
                        };
                        t.balls.push(circle);
                        t.circle = {};
                    } else if (t.isCurrentCorrent.isLine) {
                        var line = {
                            x: t.lineX,
                            y: t.lineY,
                            width: t.lineX,
                            height: t.outerParams.line.lineWidth,
                            clickDrag: t.clickDrag,
                            lineWidth: t.outerParams.line.lineWidth,
                            color: t.outerParams.line.color,
                            time,
                            type: 'lineArr'
                        };
                        t.balls.push(line);
                        t.lineX = [];
                        t.lineY = [];
                        t.line.realX = _x;
                        t.line.realY = _y;
                        t.line = {};
                        t.clickDrag = [];
                    }
                }
            };
        });
    this.movePoint = function(x, y) {
        this.lineX.push(x);
        this.lineY.push(y);
        this.clickDrag.push(y);
    };
    this.drawPoint = function(x, y, w, h, clickDrag, lineWidth, color) {
        var i = this.ctx;
        //  var s = {
        //      color: "#ff1e10",
        //      size: "2"
        //  }
        //波浪

        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#6FE1DC';
        this.ctx.moveTo(x, y);
        // if (x > w) {
        // } else {
        // }
        if (x > w) {
            for (var s = x; s >= w; s -= 1) {
                var c = 3 * Math.sin(s / 3) + y;
                console.log(c);
                this.ctx.lineTo(s, c);
            }
        } else {
            for (var z = x; z < w; z += 1) {
                var v = 3 * Math.sin(z / 3) + y;
                console.log(v);
                this.ctx.lineTo(z, v);
            }
        }

        //  var c = 3 * Math.sin(w / 3) + y
        //  console.log(c)
        //  this.ctx.lineTo(w, c)
        // this.ctx.closePath()
        this.ctx.stroke();

        // for (var i = 0; i < x.length; i++) //循环数组
        // {

        //     this.ctx.beginPath();
        //     if (clickDrag[i] && i) {
        //         // console.log(x,i,1)
        //         this.ctx.moveTo(x[i - 1], y[i - 1]);
        //     } else {
        //         // console.log(x,i,2)
        //         this.ctx.moveTo(x[i] - 1, y[i]);
        //     }
        //     this.ctx.lineWidth = lineWidth;
        //     this.ctx.strokeStyle = color;
        //     this.ctx.lineTo(x[i], y[i]);
        //     this.ctx.closePath();
        //     this.ctx.stroke();
        // }
        //  this.ctx.beginPath()
        //     this.ctx.lineWidth = 3
        //     this.ctx.strokeStyle = '#6FE1DC'
        //     this.ctx.moveTo(x, y)
        //     this.ctx.lineTo(mx, y)
        //     this.ctx.stroke()
        //     this.ctx.closePath()
        // console.log(x,y)

        //括号
        // var c = t
        //       , o = a
        //       , l = "red"
        //       , r = 3
        //       , h = 8;
        //     s && (l = s.color || "red",
        //     r = s.lineWidth || 3,
        //     h = s.radius || 8),
        //     n - o < 4 * h && (n = o + 4 * h);
        //     var g = (n - o - 4 * h) / 2;
        //     i.beginPath(),
        //     i.lineWidth = r,
        //     i.strokeStyle = l,
        //     i.arc(c, o + h, h, 1.5 * Math.PI, 2 * Math.PI),
        //     i.stroke(),
        //     i.strokeStyle = l,
        //     i.lineWidth = r,
        //     i.beginPath(),
        //     i.moveTo(c + h, o + h),
        //     i.lineTo(c + h, o + h + g),
        //     i.stroke(),
        //     i.beginPath(),
        //     i.lineWidth = r,
        //     i.strokeStyle = l,
        //     i.arc(c + 2 * h, o + g + h, h, .5 * Math.PI, 1 * Math.PI),
        //     i.stroke(),
        //     i.beginPath(),
        //     i.lineWidth = r,
        //     i.strokeStyle = l,
        //     i.arc(c + 2 * h, o + g + 3 * h, h, 1 * Math.PI, 1.5 * Math.PI),
        //     i.stroke(),
        //     i.strokeStyle = l,
        //     i.lineWidth = r,
        //     i.beginPath(),
        //     i.moveTo(c + h, o + g + 3 * h),
        //     i.lineTo(c + h, o + 2 * g + 3 * h),
        //     i.stroke(),
        //     i.beginPath(),
        //     i.lineWidth = r,
        //     i.strokeStyle = l,
        //     i.arc(c, o + 2 * g + 3 * h, h, 0 * Math.PI, .5 * Math.PI),
        //     i.stroke()
    };
    this.drawRect = function(realX, realY, width, height, radius, color, lineWidth, isDraw) {
        this.createRect(realX, realY, width, height, radius, color, 'stroke', lineWidth);
    };
    this.createRect = function(x, y, width, height, radius, color, type, lineWidth, isDraw) {
        //绘制方形
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + radius);
        this.ctx.lineTo(x, y + height - radius);
        this.ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        this.ctx.lineTo(x + width - radius, y + height);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        this.ctx.lineTo(x + width, y + radius);
        this.ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        this.ctx.lineTo(x + radius, y);
        this.ctx.quadraticCurveTo(x, y, x, y + radius);
        console.log(type, color, 'ccccc');
        this.ctx.lineWidth = lineWidth;
        this.ctx.fillStyle = 'rgba(0,1,0,0)';
        this.ctx[type + 'Style'] = color;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx[type]();
    };
    (this.drawEllipse = function(x, y, a, b, lineWidth, color) {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, a, b, 0, 0, 2 * Math.PI);
        this.ctx.lineWidth = lineWidth;
        this.ctx.fillStyle = 'rgba(0,0,0,0)';
        this.ctx.strokeStyle = color;
        this.ctx.fill();
        this.ctx.stroke();
    }),
        (this.choosePitch = function(e) {
            const x = e.clientX - this.canvas.getBoundingClientRect().left;
            const y = e.clientY - this.canvas.getBoundingClientRect().top;
            var arr = [];
            // console.log(x,y)
            var flag = this.balls.find((item, index) => item.x + item.width > x && x > item.x && y > item.y && item.y + item.height > y);
            if (flag) {
                this.deletePaint = flag;
                this.canvas.style.cursor = 'move';
                console.log(flag.x, e.offsetX, '900090909009');
                this.isDrawing = true;
                if (this.lock) {
                    this.isPainting = true;

                    if (flag.type == 'circel') {
                        var dis = Math.sqrt((x - flag.width) * (x - flag.width) + (y - flag.height) * (y - flag.height));
                        // if(dis <= 100){

                        //     flag.x = (Math.abs(flag.x - e.offsetX))
                        //     flag.y = (Math.abs(flag.y - e.offsetY))
                        // }
                        flag.x = e.offsetX - flag.width / 2;
                        flag.y = e.offsetY - flag.height / 2;
                    } else {
                        flag.x = e.offsetX - flag.width / 2;
                        flag.y = e.offsetY - flag.height / 2;
                        // var w =  (Math.abs(flag.x - e.offsetX))
                        // var h =  (Math.abs(flag.y - e.offsetY))
                        // console.log(w,h)
                        // flag.x = e.offsetX - w
                        // flag.y = e.offsetY - h
                        // flag-=w;
                        // flag-=h
                    }

                    this.clear();
                    this.redrawAll(true);
                } else {
                    this.isPainting = false;
                }
            } else {
                this.deletePaint = '';
                this.isDrawing = false;
                this.isPainting = false;
                this.canvas.style.cursor = 'default';
            }
        });

    this.redrawAll = function(isDraw) {
        var t = this;
        if (this.balls.length > 0) {
            console.log(this.balls);
            this.balls.forEach(val => {
                switch (val && val.type) {
                    case 'rectArr':
                        t.drawRect(val.x, val.y, val.width, val.height, val.radius, val.color, val.lineWidth, isDraw);
                        break;
                    case 'circleArr':
                        t.drawEllipse(val.x, val.y, val.width, val.height, val.lineWidth, val.color, isDraw);
                        break;
                    case 'textArr':
                        t.createText(val.lines, val.x, val.y, val.textArr);
                }
            });
        }
    };
    //清除画布
    this.clear = function() {
        this.ctx.putImageData(this.currentImage, 0, 0);
    };
    //撤销
    this.chooseBackout = function() {
        if (this.balls.length) {
            this.repeat[this.repeat.length] = this.balls[this.balls.length - 1];
            this.balls.length--;
            this.clear();
            this.redrawAll(true);
            console.log(this.balls);
        } else if (this.restore.length) {
            this.balls = JSON.parse(JSON.stringify(this.restore));
            this.restore = [];
            this.clear();
            this.redrawAll(true);
        }
    };
    //反撤销
    this.chooseUnBackout = function() {
        if (this.repeat.length) {
            this.balls[this.balls.length] = this.repeat[this.repeat.length - 1];
            this.repeat.length--;
            this.clear();
            this.redrawAll(true);
        }
    };
    //清空
    this.chooseEmpty = function() {
        if (this.balls.length) {
            this.restore = JSON.parse(JSON.stringify(this.balls));
            this.balls = [];
            this.repeat = [];
            this.clear();
        }
        this.switchArr = [];
    };
    //原图切换
    this.chooseSwitch = function() {
        if (this.balls.length) {
            this.switchArr = JSON.parse(JSON.stringify(this.balls));
            this.balls = [];
            this.clear();
        } else {
            this.balls = JSON.parse(JSON.stringify(this.switchArr));
            this.redrawAll(true);
        }
    };
    // }
    // window.ImageCorrect = function(canvas) {
    //     const ic = new ImgCorrect();
    //     ic.init(canvas);
    //     return ic;
    // };
}
export default function(canvas) {
    const ic = new ImgCorrect();
    console.log(ic, 'iiiiiiiiii');
    ic.init(canvas);
    return ic;
}
