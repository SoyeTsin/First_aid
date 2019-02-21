<template>
    <div class="left_one">
        <div class="top">
            <img :src="leftIcon" class="left_icon">
            <p class="title">急救分类</p>
            <img :src="line_1" class="left_line">
        </div>
        <div class="content" ref="mychart">
        </div>
    </div>
</template>

<script>
    import leftIcon from '@/assets/panorama/icon_急救分类.png'
    import line_1 from '@/assets/panorama/线01 .png'

    export default {
        name: "LeftTwo",
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
            getData(cb) {
                let parameter = {}
                this.$fetch('/get_by_stats_type/accepted_type', parameter).then((response) => {
                    cb(response)
                })
            },
            drawLine() {
                let myChart = this.myChart
                var labelData = [];
                var manData = [
                    // {value: 335 + Math.floor(Math.random() * 100), name: '救治'},
                    // {value: 310 + Math.floor(Math.random() * 100), name: '下转上'},
                    // {value: 234 + Math.floor(Math.random() * 100), name: '转运'},
                    // {value: 135 + Math.floor(Math.random() * 100), name: '分类4'},
                    // {value: 135 + Math.floor(Math.random() * 100), name: '分类5'},
                    // {value: 135 + Math.floor(Math.random() * 100), name: '分类6'},
                ];
                this.getData((res) => {
                    labelData = []
                    res.sort((a, b) => {
                        if (a.value > b.value) {
                            return -1
                        } else if (a.value < b.value) {
                            return 1
                        } else {
                            return 0
                        }
                    })
                    for (let i in res) {
                        res[i].name = res[i].name ? res[i].name : '未知'
                        labelData.push(res[i].name)
                    }
                    manData = res

                    // 绘制图表
                    myChart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            type: 'scroll',
                            selectedMode: false,//取消图例上的点击事件
                            orient: 'vertical',
                            right: 50,
                            top: 20,
                            bottom: 20,
                            icon: 'rect ',
                            itemWidth: 8,
                            itemHeight: 8,
                            textStyle: {
                                color: '#fff',
                                fontFamily: 'DIN-Bold'
                            },
                            formatter: function (name) {
                                var total = 0;
                                var target;
                                for (var i = 0, l = manData.length; i < l; i++) {
                                    total += parseInt(manData[i].value);
                                    if (labelData[i] == name) {
                                        target = manData[i].value;
                                    }
                                }
                                var arr = [
                                    '{a|' + name + '}',
                                    '{b|' + ((target / total) * 100).toFixed(2) + '%}',
                                ]
                                return arr.join('   ')
                            },
                            textStyle: {
                                color: '#ffffff',
                                fontFamily: 'DIN-Bold',
                                rich: {
                                    a: {
                                        fontSize: 16, fontFamily: 'DIN-Bold',
                                        position: [0, 0, 0, 10],
                                        lineHeight: 20
                                    },
                                    b: {
                                        fontSize: 16,
                                        align: 'right', fontFamily: 'DIN-Bold',
                                        position: [0, 50, 0, 50]
                                        , lineHeight: 20
                                    }
                                }
                            }
                        },
                        color: ['#006AFF ', '#009ADB', '#00C7DB', '#98EFFF', '#B4C5FF', '#443FC4'],
                        series: [
                            {
                                name: '急救分类',
                                type: 'pie',
                                radius: ['40%', '70%'],
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
                                    },
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 18,
                                        fontFamily: 'DIN-Bold'
                                    },
                                },
                            }
                        ]
                    });
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
