<template>
    <div class="map-right">
        <div class="row">
            <div class="select-box">
                <div class="select-1">
                    <SoSelect :dataArr="city"></SoSelect>
                </div>
                <div class="select-2">
                    <SoSelect :dataArr="branch"></SoSelect>
                </div>
            </div>
        </div>
        <div class="row">
            <input placeholder="输入车辆编号或车牌号">
        </div>
        <div class="row">
            <input placeholder="输入医生、护士或驾驶员姓名">
        </div>
        <div class="row">
            <div class="button" @click="searchCat">查询车辆</div>
        </div>
        <div class="row" v-show="list.length>0">
            <div class="table-head">
                <div>查询到&nbsp;<span>{{list.length}}</span>&nbsp;条结果：</div>
                <div @click="clearList" style="color: #C5E0FF">清空</div>
            </div>
        </div>
        <div class="row" v-show="list.length>0">
            <div class="table-content table-hr">
                <div>车辆</div>
                <div>状态</div>
                <div>操作</div>
            </div>
            <div class="table-content" v-for="item in list" v-bind:key="item.id">
                <div>浙A A1234{{item}}</div>
                <div>任务中</div>
                <div @click="searchCat(item)" style="color: #C5E0FF"><img :src="icon"/>定位</div>
            </div>
        </div>
        <div class="row">
            <div class="box">
                <div class="head">
                    <div>今日待处理预警</div>
                    <div class="num">{{num}}</div>
                    <div class="icon-box">
                        <div class="icon" v-show="num==0"></div>
                        <div class="icon icon-down" v-show="num>0"></div>
                    </div>
                </div>
                <div class="content">
                    <div class="swiper-container" v-show="num>0">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="i in warningList">
                                <div class="content-item">
                                    <div class="left"><span>预警编号：</span>No. 37892</div>
                                </div>
                                <div class="content-item">
                                    <div class="left"><span>预警时间：</span>2018-12-13 14：34：23</div>
                                </div>
                                <div class="suojin content-item">
                                    <div class="left"><span>处理地点：</span><img :src="icon"/> 杭州上城区秋涛路242-2号秋涛发展大厦</div>
                                </div>
                                <div class="content-item">
                                    <div class="left"><span>关联事件：</span>事件1、2、3</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SoSelect from '../SoSelect'
    import icon from '../../assets/panorama/icon_定位.png'
    import Swiper from 'swiper';

    export default {
        name: "MapRight",
        components: {
            SoSelect,
        },
        data() {
            return {
                icon,
                list: [0, 1, 2, 3, 4],
                warningList: [0, 1, 2, 3, 4],
                num: 6,
                catMessage: '浙A A12340',
                city: ['杭州市', '宁波市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'],
                branch: ['急救中心', '半山急救点', '城北急救站', '96120急救中心', '中山医院急救点', '城中急救站', '城东急救站',]
            }
        },
        mounted() {
            new Swiper('.swiper-container', {
                loop: true,
                autoplay: true
            })
            setInterval(() => {
                this.num = Math.floor(Math.random() * 10) + 1
            }, 3000)
        },
        methods: {
            searchCat(index) {
                this.list = [0, 1, 2, 3, 4]
                this.$emit("parentEvent", {functionName: 'searchCat', parameter: index})
            },
            clearList() {
                this.list = []
            }
        }
    }
</script>

<style scoped lang="less">
    @font-face {
        font-family: DIN-Regular; //重命名字体名
        src: url('../../common/font/DIN-RegularAlternate.otf'); //引入字体
        font-weight: normal;
        font-style: normal;
    }

    .map-right {
        position: absolute;
        top: 100px;
        right: 0;
        width: 480px;
        background: rgba(5, 10, 35, 0.9);
        padding: 0 36px;
        z-index: 50;
        min-height: 200%;
    }

    .row {
        margin-bottom: 13px;
        font-family: DIN-Regular;

        .select-box {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            font-family: DIN-Regular;

            .select-1 {
                width: 120px;
                font-family: DIN-Regular;
            }

            .select-2 {
                width: 270px;
                margin-left: 16px;
                font-family: DIN-Regular;
            }
        }

        > input {
            width: 100%;
            height: 50px;
            border-bottom: solid 1px #414141;
            border-left: none;
            border-top: none;
            border-right: none;
            text-indent: 15px;
            font-size: 18px;
            background-color: transparent;
            color: #FFFFFF;
            -webkit-user-select: auto; /*webkit浏览器*/
            user-select: auto;
            -o-user-select: auto;
            -ms-user-select: auto;
            font-family: DIN-Regular;
        }

        > input::placeholder {
            color: #9B9B9B;
            font-family: DIN-Regular;
        }

        .button {
            height: 48px;
            width: 100%;
            background-color: #006AFF;
            color: #FFFFFF;
            line-height: 48px;
            text-align: center;
            cursor: pointer;
            font-family: DIN-Regular;
        }

        .table-head {
            display: flex;
            justify-content: space-between;
            width: 100%;
            font-family: DIN-Regular;

            > div {
                color: #FFFFFF;
                height: 48px;
                line-height: 48px;
                font-family: DIN-Regular;

                span {
                    font-family: DIN-Regular;
                    font-size: 24px;
                    color: #006AFF;
                    letter-spacing: 0;
                    line-height: 24px;
                }
            }
        }

        .table-content {
            width: 100%;
            display: flex;
            justify-content: space-between;

            > div {
                color: #FFFFFF;
                font-size: 16px;
                letter-spacing: 0;
                line-height: 46px;
                height: 46px;
                width: 33%;
                text-align: center;

                > img {
                    height: 20px;
                    position: relative;
                    top: 5px;
                    margin-right: 8px;
                }
            }


            > div:last-child {
                cursor: pointer;
            }

        }

        .table-content:hover {
            background-color: rgba(39, 103, 239, 0.4);
        }

        .table-hr {
            > div {
                font-weight: 600;
                text-align: center;
            }

        }

        .box {
            border: solid 1px #4A4A4A;
            color: #FFFFFF;
            padding: 32px;
            min-height: 300px;
            margin-top: 25px;


            .content {
                > div {
                    width: 100%;

                    .content-item {
                        display: flex;
                        justify-content: flex-start;
                        min-height: 38px;
                        min-width: 85px;
                        line-height: 24px;
                        padding: 8px 0;

                        img {
                            height: 20px;
                            width: 15px;
                            position: relative;
                            top: 5px;
                            display: inline-block;
                        }
                    }

                    .suojin {
                        text-indent: -80px;
                        margin-left: 80px;
                    }
                }
            }

            > .head {
                font-family: MicrosoftYaHei;
                font-size: 24px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: right;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.50);


                > div {
                    margin-bottom: 42px;
                    display: block;
                    text-align: left;
                    float: left;
                }

                > .icon-box {
                    float: right;

                    .icon {
                        width: 0;
                        height: 0;
                        padding: 0;
                        border-width: 6px 6px 0;
                        border-style: solid;
                        border-color: #D8D8D8 transparent transparent; /*灰 透明 透明 */
                        position: relative;
                        top: 13px;
                        float: right;
                        transform: rotate(180deg);
                    }

                    .icon.icon-down {
                        transform: rotate(0deg);
                    }
                }

                > .num {
                    font-family: DIN-Bold;
                    font-size: 30px;
                    color: #8CBFF8;
                    letter-spacing: 0;
                    text-align: right;
                    margin-left: 25px;
                }
            }
        }
    }
</style>