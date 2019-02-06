<template>
    <div class="left_one">
        <div class="top">
            <img :src="leftIcon" class="left_icon">
            <p class="title">实时急救资源</p>
            <img :src="line_1" class="left_line">
        </div>
        <div class="content" ref="mychart">
        </div>
    </div>
</template>

<script>
    import leftIcon from '@/assets/panorama/icon_实时急救资源.png'
    import line_1 from '@/assets/panorama/线01 .png'

    export default {
        name: "LeftOne",
        components: {},
        data() {
            return {
                leftIcon,
                line_1,
                mychart: {}
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            let dom = this.$refs.mychart;
            this.myChart = this.$echarts.init(dom, 'light')
            this.drawLine();
            setInterval(() => {
                this.drawLine()
            }, 10000)
        },
        methods: {
            drawLine() {
                let myChart = this.myChart
                var labelData = ['医生', '护士', '司机', '车辆'];
                var manData = [240 + Math.floor(Math.random() * 100), 269 + Math.floor(Math.random() * 100), 360 + Math.floor(Math.random() * 100), 183 + Math.floor(Math.random() * 100)];
                var womanData = [-186 - Math.floor(Math.random() * 100), -248 - Math.floor(Math.random() * 100), -106 - Math.floor(Math.random() * 100), -30 - Math.floor(Math.random() * 100)];
                // 绘制图表
                myChart.setOption({
                    // backgroundColor: '#fff',
                    legend: {
                        top: 20,
                        selectedMode: false,//取消图例上的点击事件
                        orient: 'horizontal', // 'vertical'
                        x: '5%', // 'center' | 'left' | {number},
                        y: 'top', // 'center' | 'bottom' | {number}
                        itemWidth: 0,
                        itemHeight: 0,
                        data: [
                            {
                                name: '可用',
                                textStyle: {
                                    fontSize: 18,
                                    padding: [0, 0, 0, 0],
                                    color: '#9B9B9B',
                                    fontFamily: 'DIN-Regular'
                                },

                            },
                            {
                                name: '当班',
                                textStyle: {
                                    fontSize: 18,
                                    padding: [0, 0, 0, 264],
                                    color: '#9B9B9B',
                                    fontFamily: 'DIN-Regular'
                                },
                            }
                        ]

                    },
                    // tooltip（提示框组件）
                    tooltip: {
                        //trigger(触发类型)，可选'item','axis','none'
                        trigger: 'axis',
                        show: false,
                        axisPointer: {
                            //指示器类型,可选'line','shadow','cross'
                            type: 'shadow'
                        },
                        formatter: (params) => {
                            return '可用:' + params[0].data
                        }
                    },
                    xAxis: [{
                        type: 'value',
                        // min: -100,
                        max: 0,
                        gridIndex: 0,
                        axisTick: {show: false, inside: false},
                        axisLabel: {show: false},
                        axisLine: {// Y轴轴线样式
                            show: false,
                        },
                        splitLine: {
                            show: false
                        },
                    }, {
                        type: 'value',
                        gridIndex: 1, min: 0,
                        nameTextStyle: {
                            fontSize: 14
                        },
                        axisTick: {
                            show: false,
                        }, //是否显示刻度
                        axisLine: {// Y轴轴线样式
                            show: false, // 是否显示X轴
                        },
                        axisLabel: {
                            show: false //是否显示X轴内容
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    yAxis: [{
                        type: 'category',
                        gridIndex: 0,
                        inverse: true,
                        nameTextStyle: {color: '#fff', fontSize: 26},
                        data: labelData,
                        axisTick: {show: false},
                        axisLabel: {
                            show: false
                        },
                        axisLine: {// Y轴轴线样式
                            show: false,
                        },
                    }, {
                        type: 'category',
                        gridIndex: 1,
                        inverse: true,
                        nameTextStyle: {color: '#fff', fontSize: 26},
                        data: labelData,
                        axisTick: {show: false},
                        axisLabel: {
                            show: true,
                            "textStyle": {
                                "color": "#fff",
                                fontFamily: 'DIN-Regular'
                            }
                        },
                        axisLine: {
                            show: false //是否显示轴线
                        },
                    }
                    ],
                    grid: [{
                        top: 50,
                        width: '25%',
                        bottom: 0,
                        left: 80,
                        gridIndex: 0,
                    }, {
                        top: 50,
                        bottom: 0,
                        left: '53%',
                        width: '25%',
                        gridIndex: 1,
                    }],
                    series: [
                        {
                            name: '可用',
                            type: 'bar',
                            barWidth: '10',
                            gridIndex: 0,
                            center: [50, 50],
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: '#00E5EF',
                                    borderWidth: 0,
                                    borderColor: '#333',

                                }
                            },
                            label: {
                                show: true, position: 'insideRight',
                                distance: 120,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 18,
                                    fontFamily: 'DIN-Bold'
                                },
                                formatter: function (v) {
                                    return (v.value * -1);
                                }
                            },
                            data: womanData
                        },
                        {
                            name: '当班',
                            type: 'bar',
                            barWidth: '10',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: '#3D45FF',
                                    borderWidth: 0,
                                    borderColor: '#333',

                                }
                            },
                            label: {
                                show: true,
                                position: 'insideLeft',
                                distance: 120,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 18,
                                    fontFamily: 'DIN-Bold'
                                },
                                formatter: function (v) {
                                    return v.value;
                                }
                            },
                            data: manData
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped lang="less">
    @font-face {
        font-family: DIN-Bold; //重命名字体名
        src: url('../../common/font/DIN-Bold.otf'); //引入字体
        font-weight: normal;
        font-style: normal;
    }

    .left_one {
        color: #fff;
        padding: 48px 0 0 34px;

        .content {
            width: 430px;
            height: 220px;
        }

        .top {
            display: flex;
            justify-content: flex-start;

            .left_icon {
                height: 20px;
                /*width: 20px;*/
                margin: 7px 6px 0 0;
            }

            .left_line {
                height: 30px;
                width: 250px;
                margin-left: 6px;
                position: relative;
                top: 15px;
            }

            .title {
                font-family: MicrosoftYaHei;
                font-size: 24px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
                text-shadow: 0 0 24px rgba(255, 255, 255, 0.50);
                display: block;
                width: 150px;
            }
        }

    }
</style>