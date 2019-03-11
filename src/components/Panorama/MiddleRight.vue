<template>
    <div class="left_one">
        <div class="top">
            <p class="title">全省站点动态</p>
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
                mychart: {},
                manData: [
                    {value: 30, name: '正常'},
                    {value: 0, name: '预警'},
                    {value: 0, name: '繁忙'},
                ]
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            let dom = this.$refs.mychart;
            this.myChart = this.$echarts.init(dom, 'light')
            this.manData[2].value = 30 - this.manData[0].value - this.manData[1].value
            this.drawLine();
            setInterval(() => {
                this.manData = [
                    {value: 30, name: '正常'},
                    {value: 0, name: '预警'},
                    {value: 0, name: '繁忙'},
                ]
                this.manData[2].value = 30 - this.manData[0].value - this.manData[1].value
                this.drawLine()
            }, 10000)
        },
        methods: {
            drawLine() {
                let myChart = this.myChart
                var manData = this.manData;
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: manData[0].value + manData[1].value + manData[2].value,
                        x: '130',
                        y: '102',
                        textAlign: 'center',
                        textStyle: {
                            fontWeight: '600',
                            color: '#ffffff',
                            fontSize: 36,
                            fontFamily: 'DIN-Bold'
                        }
                    },
                    color: ['#59B626', '#FFD73C', '#EB3838'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll', selectedMode: false,//取消图例上的点击事件
                        orient: 'vertical',
                        top: 270,
                        icon: 'circle',
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
                            rich: {
                                a: {
                                    fontSize: 16,
                                    fontFamily: 'DIN-Bold'
                                },
                                b: {
                                    fontSize: 16,
                                    align: 'right',
                                    fontFamily: 'DIN-Bold'
                                }
                            }
                        }
                    },

                    series: [
                        {
                            name: '全省站点动态',
                            type: 'pie',
                            radius: ['40%', '60%'],
                            center: ['50%', '30%'],
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
        position: absolute;
        top: 120px;
        right: 0;
        z-index: 5;

        .content {
            width: 270px;
            height: 420px;
        }

        .top {
            display: flex;
            justify-content: flex-start;

            .left_icon {
                height: 20px;
                width: 20px;
                margin: 7px 6px 0 0;
            }

            .left_line {
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
                text-align: center;
                text-indent: 6px;
                margin: auto;
            }
        }

    }
</style>
