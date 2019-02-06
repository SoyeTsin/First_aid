<template>
    <div class="left_one">
        <div class="top">
            <img :src="leftIcon" class="left_icon">
            <p class="title">今日预警</p>
            <img :src="line_1" class="left_line">
        </div>
        <div class="content" ref="mychart">
        </div>
    </div>
</template>

<script>
    import leftIcon from '@/assets/panorama/icon_今日预警.png'
    import line_1 from '@/assets/panorama/线01 .png'

    export default {
        name: "LeftThree",
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
                var manData = [
                    {value: 12 + Math.floor(Math.random() * 10), name: '已处理'},
                    {value: 8 + Math.floor(Math.random() * 10), name: '待处理'},
                ];
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: manData[0].value + manData[1].value,
                        x: '60',
                        y: 'center',
                        textStyle: {
                            fontWeight: '600',
                            color: '#ffffff',
                            fontSize: 36,
                            fontFamily: 'DIN-Bold'
                        }
                    },
                    color: ['#98EFFF', '#006AFF'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        selectedMode: false,//取消图例上的点击事件
                        orient: 'vertical',
                        right: 85,
                        top: 50,
                        bottom: 20,
                        icon: 'rect ',
                        itemWidth: 8,
                        itemHeight: 8,
                        formatter: function (name) {
                            var total = 0;
                            var target;
                            for (var i = 0, l = manData.length; i < l; i++) {
                                total += manData[i].value;
                                if (manData[i].name == name) {
                                    target = manData[i].value;
                                }
                            }
                            var arr = [
                                '{a|' + name + '}',
                                '{b|' + target + '}',
                            ]
                            return arr.join('   ')
                        },
                        textStyle: {
                            color: '#ffffff',
                            fontFamily: 'DIN-Bold',
                            rich: {
                                a: {
                                    fontSize: 16,
                                    fontFamily: 'DIN-Bold',
                                    position: [0, 0, 0, 10],
                                    lineHeight: 40
                                },
                                b: {
                                    fontSize: 16,
                                    fontFamily: 'DIN-Bold',
                                    align: 'right',
                                    position: [0, 50, 0, 50],
                                    lineHeight: 40
                                }
                            }
                        }
                    },
                    series: [
                        {
                            name: '今日预警',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['20%', '50%'],
                            data: manData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: {
                                normal: {
                                    position: 'inner',
                                    show: false
                                }
                            },
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped lang="less">
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

    }
</style>