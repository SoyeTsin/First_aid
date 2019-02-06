<template>
    <div class="bottom-content">
        <div class="top">
            <p class="title">24小时接警/事件趋势图</p>
        </div>
        <div class="content" ref="mychart">
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    import rightIcon from '@/assets/panorama/icon_急救分类.png'
    import line_2 from '@/assets/panorama/线02.png'


    export default {
        name: "BottomContent",
        components: {},
        data() {
            return {
                rightIcon,
                line_2,
                mychart: {},
                labelData: [],
                mData: {
                    a: [], b: []
                }
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            let dom = this.$refs.mychart;
            this.myChart = this.$echarts.init(dom, 'light')
            let newTime = (new Date()).getHours();
            for (let i = 0; i < 24; i++) {
                this.labelData.push((i < 10 ? ('0' + i) : i) + ':00');
                if (i < newTime * 1) {
                    this.mData.a.push(500 + Math.floor(Math.random() * 500))
                    this.mData.b.push(500 + Math.floor(Math.random() * 500))
                }
            }
            this.getData(() => {
                this.drawLine();
            })
            setInterval(() => {
                this.getData(() => {
                    this.drawLine()
                })
            }, 10000)
        },
        methods: {
            getData(cb) {
                let newTime = (new Date()).getHours();
                for (let i = 0; i < 24; i++) {
                    if (i === newTime * 1 && this.mData.a.length <= i) {
                        this.mData.a.push(500 + Math.floor(Math.random() * 500))
                        this.mData.b.push(500 + Math.floor(Math.random() * 500))
                    }
                }
                cb()
            },
            drawLine() {
                const that = this
                let labelData = JSON.parse(JSON.stringify(this.labelData))
                let mData = JSON.parse(JSON.stringify(this.mData))

                let myChart = this.myChart
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params, ticket, callback) {
                            console.log(params);
                            let index = params.dataIndex
                            let showHtm = '接警：' + mData.a[index] + '<br>事件：' + mData.b[index]
                            return showHtm;
                        },
                        backgroundColor: "#050A23",            //标题背景色
                        borderColor: "#053C88",                        //边框颜色
                        borderWidth: 1,                              //边框线宽
                        padding: [10, 37],                                  //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
                    },
                    legend: {
                        top: 0,
                        selectedMode: false,//取消图例上的点击事件
                        orient: 'horizontal', // 'vertical'
                        x: 'right', // 'center' | 'left' | {number},
                        y: 'top', // 'center' | 'bottom' | {number}
                        data: [
                            {
                                name: '接警',
                                textStyle: {
                                    fontWeight: 'bolder',
                                    padding: [10, 10, 10, 10],
                                    color: '#fff'
                                },
                            },
                            {
                                name: '事件',
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 'bolder',
                                    padding: [10, 50, 10, 10],
                                    color: '#fff'
                                },
                            }
                        ]

                    },
                    grid: {
                        left: '0',
                        right: '50',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: labelData,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: ['#BBDBFF']
                                    , fontFamily: 'DIN-Bold'
                                }
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: ['#BBDBFF'],
                                    fontFamily: 'DIN-Bold'
                                }
                            },
                            splitArea: {
                                show: true,
                                areaStyle: {
                                    color: ['rgba(7,12,35,0)', 'rgba(27,97,204,0.1)']
                                },

                            },
                            splitLine: {
                                lineStyle: {
                                    show: true,
                                    // 使用深浅的间隔色
                                    color: 'rgba(187,219,255,0.2)'
                                }
                            }

                        }
                    ],
                    series: [
                        {
                            name: '接警',
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',     //设定为实心点
                            symbolSize: 9,   //设定实心点的大小
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: 'rgba(25,80,196,0.7)'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#1950C4', //改变折线点的颜色
                                    lineStyle: {
                                        color: '#1950C4', //改变折线颜色
                                        symbolSize: 9
                                    }
                                },
                            },
                            data: mData.a
                        }, {
                            name: '事件',
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',     //设定为实心点
                            symbolSize: 9,   //设定实心点的大小
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top'
                                }
                            },
                            areaStyle: {
                                normal: {color: 'rgba(255,90,43,0.7)'}
                            },
                            itemStyle: {
                                normal: {
                                    color: '#FF5A2B', //改变折线点的颜色
                                    lineStyle: {
                                        color: '#FF5A2B' //改变折线颜色
                                    }
                                },
                            },
                            data: mData.b
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped lang="less">
    @conWidth: 920px;
    @font-face {
        font-family: DIN-Bold; //重命名字体名
        src: url('../../common/font/DIN-Bold.otf'); //引入字体
        font-weight: normal;
        font-style: normal;
    }

    .bottom-content {
        color: #fff;
        position: absolute;
        z-index: 5;
        width: @conWidth;
        height: 330px;
        left: 50%;
        top: 735px;
        transform: translateX(-50%);
        padding: 13px 27px 50px 27px;

        .content {
            width: @conWidth;
            height: 290px;
            position: absolute;
            top: 20px;
        }

        .top {
            display: flex;
            justify-content: flex-start;

            .right_icon {
                height: 20px;
                width: 20px;
                margin: 7px 6px 0 0;
            }

            .right_line {
                height: 25px;
                width: 420px;
                position: absolute;
                left: 0;
                top: 65px;
            }

            .title {
                font-size: 24px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-shadow: 0 0 24px rgba(255, 255, 255, 0.50);
                display: block;
                text-align: left;
                text-indent: 6px;
            }
        }

    }
</style>