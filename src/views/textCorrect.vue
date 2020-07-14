<template>
    <div>
        <div style="display:flex">
            <div>
                <div id="w-e-text" class="text" v-html="textContent"></div>

                <div v-if="isShow" :style="annotationSty" class="annotation-icon">
                    <ul class="mark__box">
                        <li v-for="(item, index) in markList" :key="index" @click="handleMarkClick(item, index)" data-type="1" class="mark-item">
                            <!-- <img src="/vue-front/image/mark_lightspot_icon.png" alt=""> -->
                            <span v-if="item.type != 0" v-html="item.name"></span>
                        </li>
                    </ul>
                    <div class="danmuclass">
                        颜色：
                        <el-color-picker v-model="color1"></el-color-picker>
                    </div>
                    <ul class="mark-item markTextCorrect">
                        <li @click="currentClass = item.value" :class="{ selectClass: currentClass === item.value }" v-for="(item, index) in classList" :key="index">
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <div class="work_tag-item-right isMarkboxRight" v-if="remarkList.length">
                    <ul class="mark__box mark__box-right">
                        <li v-for="(item, index) in markList" :key="index" @click.stop="handleMarkTagClick(item, index)" class="mark-item">
                            <span v-html="item.name"></span>
                        </li>
                    </ul>
                    <ul class="remarks">
                        <li @click.stop="handleResetClick(item, index)" v-for="(item, index) in remarkList" :key="index">
                            <div v-if="item.isShow">
                                <div style="margin-bottom: 5px;" :class="item.className" :style="{ color: item.color }" v-html="item.selectionText"></div>
                                <div @click.stop="handleDel(item, index)">删除</div>
                                <div v-html="item.value" v-if="item.type != 3"></div>
                                <div></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextCorrect from '@/utils/textCorrect.js';

export default {
    data() {
        return {
            textContent:
                '内容简介：在2020年的春节来临之际，来自武汉的新型冠状病毒肺炎传遍全国各地，对于这一场突如其来的疫情，夺走了..' +
                '本文《赞美白衣天使作文800字》由小学生作文大全整理，仅供参考。如果觉得很不错，欢迎点评和分享～感谢你的阅读与支持！' +
                '在2020年的春节来临之际，来自武汉的新型冠状病毒肺炎传遍全国各地，对于这一场突如其来的疫情，夺走了我们全部的快乐；夺去我们亲友的相聚，使我们多了许多的牵挂和担心。也使一部分家庭尝到了失去亲人的痛苦。' +
                '新型冠状病毒肺炎发展犹如洪水猛兽，当武汉政府发通告关闭所有通往武汉的飞机、火车、汽车等交通工具时。全国的疫情联防联控全部开始，各村各社区停止互相往来，许多交通工具停运，大街上行人寥寥无几。当有人想着跑出武汉，离开疫情区时，来自全国各地的医务工作者，停止春节休假，离开亲人，背着医疗器械一批批的从祖国四面八方赶向武汉。他们奋不顾身一心为了武汉的疫情，深深感动了许多人的心。他们舍小家为大家，为了不让他人感染新型肺炎，他们毅然放弃了过年休假与家人团聚的机会。' +
                '为了防止疫情传播，为了治疗那些感染的人们，医护人员都要穿着厚重的防护服，戴着口罩和防护镜，连续工作四个小时以上他们累得一身汗，他们脸上、手上被防护口罩、手套勒出一道道的红血印，他们工作期间不得上厕所。但是医护人员“不忘初心，牢记使命”的精神，深深打着全国的人们，是她们给病人带来生的希望。几天前有一位记者问一个医护人员：‘‘你害怕不害怕？”那个医护人员说：“害怕。”那个记者又问：“你害怕为什么还要来？”那个医护人员说：“因为我们是医生，穿上白大褂我们就要扮演好自己的角色！当一位护士在回家过春节的高速路时，看到医院微信群中，护士长发缺少医护人员的消息时，她毫不犹豫地选择重新回医院，可是当时武汉已经封城，所有的交通工具停运，她千方百计想尽办法，恰好在高速收费站碰到检查的领导车辆，要求搭领导的车辆回医院工作。' +
                '对他们一个个不顾个人感染，奋斗在一线工作，后来我才明白：因为她们是医生，她们心中有信念，有爱！爱扎根在他们每个人的心中！' +
                '2003年的非典，2008年的汶川大地震，以及2020年的新型冠状病毒。都是许多医护人员和军人在一线，为了我们国家，为了群众的生命，为了许多家庭不失去亲人，他们往往一次次不顾个人生命危险，始终在一线顽强的工作。' +
                '我希望全国人民手拉手携手共抗此次危机，都好好在自家待好，不乱跑。武汉虽是疫情区，不要害怕，有祖国在，我们一定这次会度过危机，很多医护人员已放弃和家人团圆的机会奔赴疫场一线，我们更应该相信他们。',
            TextCorrect: null,
            isShow: false,
            annotationSty: '',
            color1: '#ff0000',
            markList: [
                {
                    name: '全部',
                    type: '0'
                },
                {
                    name: '亮点',
                    type: '1'
                },
                {
                    name: '建议',
                    type: '2'
                },
                {
                    name: '录音',
                    type: '3'
                }
            ],
            classList: [
                {
                    name: '加粗',
                    value: 'bold'
                },
                {
                    name: '下划线',
                    value: 'xiahuaxian'
                },
                {
                    name: '删除线',
                    value: 'shanchuxian'
                },
                {
                    name: '括号',
                    value: 'kuohao'
                }
            ],
            currentClass: '',
            remarkList: []
        };
    },
    mounted() {
        this.closeMask();
        this.TextCorrectInit();
    },
    methods: {
        closeMask() {
            document.getElementsByTagName('body')[0].addEventListener('click', e => {
                var event = e || window.event;
                var _con = document.querySelector('.annotation-icon');
                // event.stopPropagation();
                console.log(122222222222);

                // if (!_con.is(e.target) && _con.has(e.target).length === 0) {
                //     this.isShow = false;
                // }
            });
        },
        TextCorrectInit() {
            this.TextCorrect = new TextCorrect();
            this.TextCorrect.init('#w-e-text', '.annotation-icon');
            console.log(this.TextCorrect, 'uuuuuu');
            this.TextCorrect.state.pubSub.subscribe('selectText', ({ xy, isShow }) => {
                this.isShow = isShow;
                console.log(xy);
                this.annotationSty = xy;
            });
            this.TextCorrect.state.pubSub.subscribe('closeMask', () => {
                console.log('33333333');
                this.isShow = false;
            });
        },
        handleMarkClick(item, index) {
            // this.TextCorrect.selectCorrectType(item.type)

            if (Number(item.type) === 3) {
                console.log(111111);
            } else {
                this.isShow = false;
                this.characterCorrect(item, index);
            }
        },
        handleMarkTagClick({ type }) {
            this.remarkList.forEach(item => {
                if (item.type !== type && type != 0) {
                    item.isShow = false;
                } else {
                    item.isShow = true;
                }
            });
        },
        characterCorrect(item, index) {
            this.correct(item, index, 'add');
        },
        handleResetClick(item, index) {
            this.correct(item, index, 'reset');
        },
        handleDel(item, index) {
            console.log(item, index);
            this.TextCorrect.removeCorrectEl(item.id);
            console.log(this.remarkList, 'xxxxxxxxxx');
            this.remarkList.splice(index, 1);
        },
        correct({ type, color, ...item }, index, state) {
            this.$prompt('', state === 'add' ? '添加批注' : '编辑批注', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /[^\s*$]/,
                inputErrorMessage: '请输入批注文字',
                inputValue: state === 'add' ? '' : item.value
            })
                .then(({ value }) => {
                    // var classN = item.color
                    if (state === 'add') {
                        // var colors = this.currentClass + ' ' + this.color1;
                        // console.log(colors, 'ddddddd');
                        var { id, text, selectionText } = this.TextCorrect.markContent(this.currentClass, this.color1);
                        this.abc = text;
                        console.log(this.abc, 'aaaa');
                        const remark = {
                            id,
                            value,
                            type,
                            color: this.color1,
                            className: this.currentClass,
                            selectionText,
                            isShow: true
                        };
                        this.remarkList.push(remark);
                    } else {
                        console.log(item, 'iiiiiiiiiiiiiii');
                        console.log(value, 'iiiiiiiiiiiiiii');
                        this.remarkList[index].value = value;
                    }
                    this.currentClass = '';
                    console.log(this.remarkList, 'ccc');
                })
                .catch(() => {});
        }
    }
};
</script>

<style lang="scss">
.text {
    width: 400px;
    margin: 0 30px;
    white-space: pre-wrap;
    white-space: pre-line;
    line-height: 25px;
}
.mark__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 10px;
}
.w-e-text {
    position: relative;
    white-space: pre-wrap;
    white-space: pre-line;
}
.markTextCorrect {
    display: flex;
    padding: 10px;
    li {
        margin-right: 5px;
    }
}
.mark-item {
    padding: 10px 0;
}
ul,
li {
    padding: 0;
    margin: 0;
    list-style: none;
}
.annotation-icon {
    position: absolute;
    z-index: 99;
    // display: flex;
    background-color: #f3f3f3;
    background-color: #b5b3e4;

    padding: 10;
}

.mark__box li {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
}

.mark__box img {
    width: 20px;
}

.mark__box span {
    color: #ffffff;
    padding: 0 10px;
    white-space: nowrap;
}
.postil {
    cursor: pointer;
    font-weight: bold;
    background: transparent;
    // color: #ffffff;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
}
.xiahuaxian {
    text-decoration: underline;
}
.shanchuxian {
    text-decoration: line-through;
}
.bold {
    font-weight: bold;
}
.kuohao {
    &::before {
        content: '{';
        color: red;
        font-weight: bold;
        margin-right: 3px;
    }
    &::after {
        content: '}';
        color: red;
        font-weight: bold;
        margin-left: 3px;
    }
}
.postil-type-1 {
    background: #fff !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    position: relative;
    color: red;
    text-decoration: underline;
    text-decoration: line-through;
    &::before {
        content: '{';
        // position: absolute;
        // left: -8px;
        // top: -2px;
        color: red;
    }
    &::after {
        content: '}';
        // position: absolute;
        // right: 0px;
        // top: -2px;
        color: red;
    }
}

.postil-type-1 div,
.postil-type-1 p,
.postil-type-1 span {
    background: #db0101;
}
.postil-type-2 {
    background: #3458dc !important;
}

.postil-type-2 div,
.postil-type-2 p,
.postil-type-2 span {
    background: #db0101;
}
.selectClass {
    background: cornflowerblue;
}

.postil-type-3 {
    background: #00a5a8 !important;
}

.postil-type-3 div,
.postil-type-3 p,
.postil-type-3 span {
    background: #00a5a8;
}

.remarks {
    padding: 10px;
    box-sizing: border-box;
    width: 318px;
    /*min-width: 318px;*/
    height: 680px;
    overflow-y: auto;
    text-align: left;
}
.remarks li {
    margin-bottom: 5px 0 5px 10px;
    border-bottom: 1px solid #000;
}
.remarks li div div {
    padding: 10px;
}
.remark_item {
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    width: 285px;
}

.remark_type_1 {
    border: 2px solid #db0101;
}

.remark_type_2 {
    border: 2px solid #3458dc;
}

.remark_type_3 {
    border: 2px solid #00a5a8;
}

.remark_title {
    font-size: 12px;
    color: rgb(102, 102, 102);
    font-weight: 400;
}

.remark_content {
    font-size: 14px;
    margin-top: 5px;
    color: #101010;
    font-weight: 400;
    overflow-wrap: break-word;
    user-select: text !important;
}
</style>
