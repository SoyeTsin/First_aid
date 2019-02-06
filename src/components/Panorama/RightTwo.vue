<template>
    <div class="left_one">
        <div class="top">
            <img :src="rightIcon" class="right_icon">
            <p class="title">调度接警数</p>
            <img :src="line_2" class="right_line">
        </div>
        <div class="content" ref="mychart">
        </div>
        <div class="top5">Top5</div>
    </div>
</template>

<script>
    import rightIcon from '@/assets/panorama/icon_调度接警数.png'
    import line_2 from '@/assets/panorama/线02.png'

    export default {
        name: "LeftTwo",
        components: {},
        data() {
            return {
                rightIcon,
                line_2,
                mychart: {},
                manData: [
                    {value: 20 + Math.floor(Math.random() * 10), name: '杭州'},
                    {value: 20 + Math.floor(Math.random() * 10), name: '绍兴'},
                    {value: 20 + Math.floor(Math.random() * 10), name: '温州'},
                    {value: 20 + Math.floor(Math.random() * 10), name: '嘉兴'},
                    {value: 20 + Math.floor(Math.random() * 10), name: '舟山'},
                ]
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            let dom = this.$refs.mychart;
            this.myChart = this.$echarts.init(dom, 'light')
            this.drawLine();
            setInterval(() => {
                for (let i in this.manData) {
                    this.manData[i].value += Math.floor(Math.random() * 2)
                }
                this.drawLine()
            }, 3000)
        },
        methods: {
            drawLine() {
                let myChart = this.myChart
                var labelData = []
                var manData =this.manData;
                manData.sort((b, a) => {
                    if (a.value > b.value) {
                        return 1;
                    } else if (a.value < b.value) {
                        return -1
                    } else {
                        return 0;
                    }
                })
                for (let i in manData) {
                    labelData.push(manData[i].name)
                }
                let count = 0;
                for (let i in manData) {
                    count += manData[i].value;
                }
                // 绘制图表
                myChart.setOption({
                    title: {
                        show: true,
                        text: count,
                        subtext: '总计',
                        top: 100, left: 60,
                        textAlign: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 36,
                            align: 'center', fontFamily: 'DIN-Bold'
                        },
                        subtextStyle: {
                            color: '#9B9B9B',
                            fontSize: 18,
                            align: 'center'
                        }
                    },
                    tooltip: {
                        trigger: 'axis', show: false,
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        selectedMode: false,//取消图例上的点击事件
                    },
                    grid: {
                        left: '40%',
                        right: '50',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisTick: {show: false},
                        axisLabel: {
                            color: '#ffffff',
                            show: false
                        },
                        axisLine: {// Y轴轴线样式
                            show: false,
                            color: '#ffffff'
                        },
                    },
                    yAxis: {
                        type: 'category',
                        inverse: true,
                        data: labelData,
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            color: '#ffffff',
                        },
                        axisLine: {// Y轴轴线样式
                            show: false,
                        },
                    },
                    series: [{
                        label: {
                            normal: {
                                show: true,
                                fontFamily: 'DIN-Bold',
                                color: '#cccccc',
                                position: ['190', '0']
                            }
                        },
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#3D45FF' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#006AFF' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                borderColor: '#333',
                            }
                        },
                        data: manData,
                        type: 'bar'
                    }]
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .left_one {
        color: #fff;
        padding: 48px 0 0 0;
        position: relative;

        .content {
            width: 430px;
            height: 220px;
        }

        .top {
            display: flex;
            justify-content: flex-start;

            .right_icon {
                height: 20px;
                /*width: 20px;*/
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
                width: 150px;
                text-align: left;
                text-indent: 6px;
            }
        }
        .top5 {
            position: absolute;
            top: 100px;
            left: 170px;
            font-family: 'DIN-Regular';
            font-size: 20px;
        }
    }
</style>