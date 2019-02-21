<template>
    <div class="middle-left">
        <div class="content" ref="mychart">
        </div>
    </div>
</template>

<script>
    import rightIcon from '@/assets/panorama/icon_急救分类.png'
    import line_2 from '@/assets/panorama/线02.png'
    import geoJson from '@/assets/panorama/zj.json'


    export default {
        name: "BottomContent",
        components: {},
        data() {
            return {
                rightIcon,
                line_2,
                geoJson,
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
            this.drawLine();
        },
        methods: {
            drawLine() {
                const that = this;
                let myChart = that.myChart
                // 绘制图表
                this.$echarts.registerMap("浙江", geoJson); //注册地图
                var geoCoordMap = {//定位信息
                    '三界村': [120.02, 30.26],
                    '清河镇': [118.82, 29.61],
                    '白马乡': [119.52, 29.76],
                    "杭州市": [119.47, 29.90],
                    "宁波市": [121.539029, 29.736103],
                    "温州市": [120.61, 27.85],
                    "绍兴市": [120.701386, 29.74081],
                    "湖州市": [119.92, 30.70],
                    "嘉兴市": [120.78, 30.58],
                    "金华市": [119.94, 29.10],
                    "衢州市": [118.80, 28.84],
                    "舟山市": [122.10, 30.07],
                    "台州市": [121.08, 28.78],
                    "丽水市": [119.50, 28.07]
                };
                let getData = (e) => {
                    let E = e || 100;
                    let arr = [parseInt(Math.floor(Math.random() * E) + E), parseInt(Math.floor(Math.random() * E) + E), parseInt(Math.floor(Math.random() * E) + E)]
                    return arr
                }
                var cityData = [
                    {
                        name: "三界村",
                        value: getData(20)
                    },
                    {
                        name: "清河镇",
                        value: getData(30)
                    },
                    {
                        name: "白马乡",
                        value: getData(40)
                    },
                    {
                        name: "杭州市",
                        value: getData()
                    },
                    {
                        name: "宁波市",
                        value: getData()
                    },
                    {
                        name: "温州市",
                        value: getData()
                    },
                    {
                        name: "绍兴市",
                        value: getData()
                    },
                    {
                        name: "湖州市",
                        value: getData()
                    },
                    {
                        name: "嘉兴市",
                        value: getData()
                    },
                    {
                        name: "金华市",
                        value: getData()
                    },
                    {
                        name: "衢州市",
                        value: getData()
                    },
                    {
                        name: "舟山市",
                        value: getData()
                    },
                    {
                        name: "台州市",
                        value: getData()
                    },
                    {
                        name: "丽水市",
                        value: getData()
                    }
                ]
                var manData = [
                    {value: 12 + Math.floor(Math.random() * 10), name: '已处理'},
                    {value: 8 + Math.floor(Math.random() * 10), name: '待处理'},
                ];

                var levelColorMap = {
                    '0': '#EB3838',
                    '1': '#59B626',
                    '2': '#FFD73C',
                };
                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({value: geoCoord.concat(data[i].value), name: data[i].name});
                        }
                    }
                    return res;
                };
                let zjMapOption = {
                    tooltip: {
                        padding: 15,
                        textStyle: {
                            color: '#fff',
                            fontSize: 18,
                        },
                        trigger: 'item',
                        formatter: function (params) {//, ticket, callback
                            var datasCssStyle = '<div style="text-align:center;float:right;">';
                            // var initCssStyle = '<div style="text-align:center;float:right;">';
                            var lineName = '<h3>' + params.name + '</h3>' + '救治人数' + ':' + datasCssStyle + params.value[2] + '</div>' + '<br>' +
                                '事件数' + ':' + datasCssStyle + params.value[3] + '</div>' + '<br>' +
                                '出车数' + ':' + datasCssStyle + params.value[4] + '</div>' + '<br>';
                            return lineName;
                        },
                        //showDelay:1000,                                  //浮层显示的延迟，单位为 ms
                        //hideDelay:100,                                //浮层隐藏的延迟，单位为 ms
                        //enterable:true,                             //鼠标是否可进入提示框浮层中
                        //confine:false,                               //是否将 tooltip 框限制在图表的区域内
                        //transitionDuration:10,                      //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
                        //虚化悬浮窗
                        extraCssText: 'pointer-events:none;width:274px;height:150px;background: rgba(0,39,93,0.90);\n' +
                            'border: 1px solid #053C88;\n' +
                            'border-radius: 4px;color:#fff;line-height:30px;font-size:1.04vw;',

                    },
                    visualMap: {
                        type: 'continuous',
                        calculable: true,
                        show: false,
                        realtime: false,
                        inRange: {
                            // color: 'rgb(12,12,12)',//城市点颜色
                            borderColor: "white", //边框颜色
                            borderWidth: 10
                        }
                    },
                    geo: {
                        map: '浙江',
                        zoom: 1.2,   //这里是关键，一定要放在 series中
                        label: {
                            normal: {
                                show: true,
                                color: '#fff'
                            },
                            emphasis: {
                                show: true,
                                color: '#fff'
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: 'rgb(12,12,12)',
                                borderColor: 'white',
                                borderWidth: 1
                            },
                            emphasis: { //地图选中（地图鼠标悬浮）
                                label: {
                                    show: true
                                },
                                areaColor: 'rgb(37,37,37)'
                            }
                        },
                        top: 50,
                    },
                    series: [{
                        name: '省市数据',
                        mapType: '浙江', // 自定义扩展图表类型
                        type: 'effectScatter',//使用辐射圈圈
                        coordinateSystem: 'geo',
                        symbol: "circle",
                        data: convertData(cityData),
                        symbolSize: (val, params) => {
                            return Math.ceil(params.value[3] / 10);
                        },
                        color: function (params) {
                            return levelColorMap[params.dataIndex % 3];
                        },
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        rippleEffect: {
                            color: function (params) {
                                return levelColorMap[params.dataIndex % 3];
                            },
                            period: 15,
                            scale: 2,
                            brushType: 'fill'

                        },
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return levelColorMap[params.dataIndex % 3];
                                },
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                    }]
                }
                myChart.setOption(zjMapOption, true);
                myChart.on('click', function (params) {
                    if (params.value) {

                    } else {
                        // alert("单击了" + params.name + "x轴标签");
                    }
                    that.intoIndex(params.name)
                });

            },
            intoIndex(city) {
                if (city !== '杭州市') {
                    return
                }
                this.$router.push({  //核心语句
                    path: '/ResourceMap',   //跳转的路径
                    query: {           //路由传参时push和query搭配使用 ，作用时传递参数
                        city
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .middle-left {
        color: #fff;
        position: absolute;
        height: 620px;
        z-index: 4;
        width: 650px;
        top: 50px;

        .content {
            width: 650px;
            height: 620px;
            position: absolute;
        }
    }
</style>
