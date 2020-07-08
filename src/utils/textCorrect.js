import $ from 'jquery';
class TextCorrect {
    constructor() {
        this.state = {
            textColor: '#ff0000',
            isMouseDown: false, // 判断是否  选中作业文本框
            el: {
                textEl: null,
                popEl: null
            },
            selection: '',
            selectionText: '',
            pubSub: {
                list: {},
                // 订阅
                subscribe: (key, fn) => {
                    if (!this.state.pubSub.list[key]) this.state.pubSub.list[key] = [];
                    this.state.pubSub.list[key].push(fn);
                },
                //取消订阅
                unsubscribe: (key, fn) => {
                    let fnList = this.state.pubSub.list[key];
                    if (!fnList) return false;
                    if (!fn) {
                        // 不传入指定的方法，清空所用 key 下的订阅
                        fnList && (fnList.length = 0);
                    } else {
                        fnList.forEach((item, index) => {
                            item === fn && fnList.splice(index, 1);
                        });
                    }
                },
                // 发布
                publish: (key, ...args) => {
                    for (let fn of this.state.pubSub.list[key]) fn.call(this, ...args);
                }
            }
        };
    }
    init(textEl, popEl, isShow) {
        if (textEl && popEl) {
            this.state.el.textEl = textEl;
            this.state.el.popEl = popEl;
            this.state.el.isShow = isShow;
            this.onbind();
        } else {
            return new Error('请传入批改元素...');
        }
    }
    /*
            监听鼠标按下，抬起，处理选中文本
        */
    onbind() {
        const { textEl } = this.state.el;
        $(textEl).mousedown(this.onMouseDown.bind(this));
        $(textEl).mouseup(this.onMouseup.bind(this));
    }
    onMouseDown(event) {
        var e = event || window.event;
        e.stopPropagation(); //  阻止事件冒泡
        const { textEl } = this.state.el;
        $(textEl).css('cssText', 'user-select:text');
        $('body').css('cssText', 'user-select:none');
        this.state.isMouseDown = false;
    }
    onMouseup(event) {
        var e = event || window.event;
        e.stopPropagation(); //  阻止事件冒泡
        const {
            el: { popEl },
            isMouseDown
        } = this.state;
        if (isMouseDown) return;
        this.state.selection = window.getSelection().getRangeAt(0);
        this.state.selectionText = this.state.selection.toString();
        $('body').css('cssText', 'user-select:text');

        const data = {};
        if (this.state.selectionText) {
            let xy = this.getMousePos(e);
            console.log(xy);
            data['xy'] = { left: xy.x - 20 + 'px', top: xy.y - 140 + 'px' };
            data['isShow'] = true;
            this.state.pubSub.publish('selectText', data);
            this.state.isMouseDown = false;
        } else {
            data['isShow'] = false;
            this.state.pubSub.publish('selectText', data);
            this.state.isMouseDown = false;
            return false;
        }
    }
    /*
            获取鼠标位置
        */
    getMousePos(event) {
        let e = event || window.event;
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        let x = e.pageX || e.clientX + scrollX;
        let y = e.pageY || e.clientY + scrollY;
        return { x: x, y: y };
    }
    removeCorrectEl(id) {
        console.log(id, 'iiiiiiiiiiiiiiiiddddddddddddddddddd');
        $('#' + id).each(function() {
            var el = $(this).html();
            $(this).replaceWith(el);
        });
    }

    selectCorrectType(type = 1) {
        let popup;
        if (Number(type) === 2) {
            console.log(11111);
        } else {
            this.characterCorrect();
        }
    }
    markContent(classN) {
        const {
            el: { textEl },
            selectionText
        } = this.state;
        let selectedText = this.state.selection.extractContents();
        let span = document.createElement('span');
        let id = this.guid();
        span.setAttribute('id', id);
        span.className += classN + ' ' + 'postil';
        span.appendChild(selectedText);
        this.state.selection.insertNode(span);
        return {
            id,
            text: $(textEl).html(),
            selectionText
        };
    }
    // 批注生成唯一ID
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
export default TextCorrect;
