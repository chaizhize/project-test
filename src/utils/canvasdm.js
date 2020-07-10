function danmu() {
    this.init = function(canvas, { w, h }) {
        this.canvas = document.querySelector(canvas);
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d');
        this.width = document.querySelector(canvas).clientWidth;
        this.height = document.querySelector(canvas).clientHeight;
        this.dmWrap = []; //弹幕容器
        this.dmView = []; //当前画布里面存在的弹幕对象
        this.hasPos = []; //通道占用状态数组
        this.possibleArr = []; //用来进行随机选择通道的数组
        this.MAX_Channel = 8; //通道数量
        this.timer = null; //获取弹幕定时器
        this.tms = null; //弹幕移动速度定时器
        this.danmuObj = {
            val: '',
            popSpeed: 100, //获取弹幕时间
            moveSpeed: 10, //弹幕移动速度时间
            moveLength: 2, //弹幕移动速度
            dmSize: 30, //弹幕大小
            dnColor: '#000', //弹幕颜色
            dmHeight: 60 //弹幕高度
        };
        this.possibleArr = [];
        this.start();
    };
    this.resize = function(w, h) {
        console.log(w, h);
        this.canvas.width = w;
        this.canvas.height = h;
    };
    this.sendDanmu = function({ val = '', popSpeed = 10, moveLength = 2, moveSpeed = 10, dmSize = 30, dnColor = 'red' }) {
        console.log(val);
        this.danmuObj = { val, popSpeed, moveLength, moveSpeed, dmSize, dnColor, dmHeight: dmSize };
        this.dmWrap.push(this.danmuObj);
        console.log(this.dmWrap);
        if (this.dmWrap.length > 10) {
            this.getDanmu();
        }
    };
    this.start = function() {
        var _this = this;
        for (var i = 0; i < this.MAX_Channel; i++) {
            this.hasPos[i] = true;
        }

        this.getDanmu();
    };
    this.getDanmu = function() {
        var _this = this;
        this.timer = setInterval(() => {
            if (this.dmWrap.length > 0 && this.getChannel() != -1) {
                var dammo = this.dmWrap.shift();
                var channel = this.getChannel();
                console.log(dammo, 'channelchannelchannel');
                this.hasPos[channel] = false;

                var obj = new _this.createDanmo(_this, dammo, channel);
                // console.log(obj,'xxx')
                obj.draw(this);

                obj.channel = channel;

                this.dmView.push(obj);

                setTimeout(() => {
                    this.hasPos[channel] = true;
                }, dammo.val.length * 60 + 1000);

                this.dammoMove(dammo, channel);
            }
        }, (this.dmWrap.length && this.dmWrap[this.dmWrap.length - 1].popSpeed) || 100);
    };
    //用来生成弹幕对象
    this.createDanmo = function(_this, dammo, channel) {
        this.x = _this.width;
        // console.log(this.draw(this),'lll')
        //绘制弹幕
        this.move = function() {
            this.x -= dammo.moveLength;
            this.draw(_this);
        };
        this.draw = function() {
            // console.log(_this,'_this_this_this')
            _this.ctx.beginPath();
            _this.ctx.font = `${dammo.dmSize}px Arial`;
            _this.ctx.fillStyle = dammo.dnColor;
            _this.ctx.fillText(dammo.val, this.x, dammo.dmHeight * channel + dammo.dmSize);

            _this.ctx.closePath();
        };
    };
    //检测轨道情况，并在空闲轨道中随机选取一条，没有则返回-1
    this.getChannel = function() {
        this.possibleArr = [];
        for (var i = 0; i < this.MAX_Channel; i++) {
            if (this.hasPos[i]) {
                this.possibleArr.push(i);
            }
        }
        if (this.possibleArr.length > 0) {
            var len = this.possibleArr.length;
            if (len == 1) {
                return this.possibleArr[len - 1];
            } else {
                var t = Math.floor(Math.random() * len);
                return this.possibleArr[t];
            }
        } else {
            return -1;
        }
    };
    this.dammoMove = function(dammo) {
        if (this.tms) {
            clearInterval(this.tms);
            this.tms = null;
        }
        this.tms = setInterval(() => {
            if (this.dmView.length < 1) {
                clearInterval(this.tms);
                this.tms = null;
                return;
            }
            this.ctx.clearRect(0, 0, this.width, this.height);
            for (var i = 0; i < this.dmView.length; i++) {
                this.dmView[i].move(this);
                //弹幕以及完全移出可视区，删除此弹幕对象
                if (this.dmView[i].x < -this.width) {
                    this.dmView.splice(i, 1);
                }
            }
        }, dammo.moveSpeed);
    };
}
const Danmu = function(canvas, wh) {
    const dm = new danmu();
    dm.init(canvas, wh);
    return dm;
};
export default Danmu;
