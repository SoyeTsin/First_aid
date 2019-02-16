<template>
    <div class="map-con">
        <div class="map" ref="map" id="map">
        </div>
        <div id="myPageTop" class="myPageTop">
            <input id="tipinput" v-model="searchText"/>
            <img :src="searchText.length>0?searchIconActive:searchIcon" title="点击下拉选项选择正确的地址" @click="placeSearchFun"/>
        </div>
        <div id="panel"></div>
    </div>
</template>

<script>
    import mark from '../../assets/panorama/mark.png'
    import cat from '../../assets/panorama/pic_救护车.png'
    import searchIcon from '../../assets/panorama/icon_搜索.png'
    import searchIconActive from '../../assets/panorama/icon_搜索_active.png'
    // require('echarts');
    // require('../../lib/extension/bmap');
    // import L7 from '@antv/l7';
    // 初始化 场景


    export default {
        name: "BottomContent",
        props: ['catMessage'],
        components: {},
        data() {
            return {
                mark,
                searchIcon,
                searchIconActive,
                cat,
                searchText: '',
                catList: [],
                placeSearch: {},
            }
        },
        watch: {
            searchText(curVal, oldVal) {
                this.placeSearchFun()
            }
        },
        mounted() {
            this.map()
            this.trail([[120.225432, 30.30716],
                [120.225024, 30.308133],
                [120.224332, 30.308175],
                [120.223613, 30.308568],
                [120.223613, 30.308568],
                [120.220582, 30.308434],
                [120.217712, 30.312],
                [120.217455, 30.31206],
                [120.217873, 30.313009],
                [120.218442, 30.31282],], 0);
            this.trail([
                [120.120428, 30.284888],
                [120.123823, 30.285111],
                [120.123823, 30.285111],
                [120.129005, 30.288001],
                [120.12929, 30.284615],
                [120.130556, 30.284643],
            ], 1);

            this.trail([
                [120.107998, 30.322287],
                [120.127825, 30.331104],
                [120.127825, 30.331104],
                [120.127825, 30.331104],
                [120.12929, 30.284615],
                [120.127825, 30.331104],
            ], 2);
            this.trail([
                [120.148081, 30.307135],
                [120.148081, 30.307135],
                [120.170848, 30.273024],
            ], 3);
            this.trail([
                [120.136473, 30.2711],
                [120.207626, 30.277326],
                [120.232345, 30.287184],
            ], 4);

        },
        methods: {
            map() {
                let map = new AMap.Map('map', {
                    zoom: 13,
                    animateEnable: true,
                    center: [120.228837, 30.299517],
                    mapStyle: 'amap://styles/whitesmoke', // 样式URL
                });
                this.map = map;


                //虚拟数据
                const addArr = [
                    {name: '急救中心', num: Math.floor(Math.random() * 20), position: [120.225716, 30.307716]},
                    {name: '半山急救点', num: Math.floor(Math.random() * 20), position: [120.185922, 30.351844]},
                    {name: '城北急救站', num: Math.floor(Math.random() * 20), position: [120.14109, 30.32196]},
                    {name: '96120急救中心', num: Math.floor(Math.random() * 20), position: [120.119918, 30.284189]},
                    {name: '中山医院急救点', num: Math.floor(Math.random() * 20), position: [120.151477, 30.27734]},
                    {name: '城中急救站', num: Math.floor(Math.random() * 20), position: [120.166123, 30.257386]},
                    {name: '城东急救站', num: Math.floor(Math.random() * 20), position: [120.187638, 30.265274]},
                ]
                let addArrIndex = 0;
                const that = this
                addMark()

                //开始添加地图绿色标记
                function addMark() {
                    if (addArrIndex >= addArr.length) {
                        return
                    }
                    //自定义标签
                    let content = '<div class="marker-route marker-marker-bus-from"  ><img src="' + that.mark + '"><div class="num">' + addArr[addArrIndex].num + '</div><div class="des">可用</div></div>';

                    // 创建一个 Marker 实例：
                    let marker = new AMap.Marker({
                        content: content,  // 自定义点标记覆盖物内容
                        position: addArr[addArrIndex].position,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: addArr[addArrIndex].name,
                        offset: new AMap.Pixel(-40, -90) // 相对于基点的偏移位置
                    });
                    //点标注的点击事件
                    let obj = addArr[addArrIndex]
                    marker.on('click', function (e) {
                        that.intoMark(obj, e)
                        that.getNavg()
                    });
                    // 将创建的点标记添加到已有的地图实例：
                    map.add(marker);

                    addArrIndex++;

                    addMark()


                }

                that.pathSearch()
            },
            intoMark(obj, e) {
                this.map.setZoomAndCenter(15, [e.lnglat.P + 0.01, e.lnglat.O - 0.004]);
            },
            pathSearch() {
                const that = this
                const map = that.map
                AMap.service(["AMap.PlaceSearch"], function () {
                    //构造地点查询类
                    that.placeSearch = new AMap.PlaceSearch({
                        pageSize: 5, // 单页显示结果条数
                        pageIndex: 1, // 页码
                        map: map, // 展现结果的地图实例
                        panel: "panel", // 结果列表将在此容器中进行展示。
                        autoFitView: false
                    });
                    //关键字查询
                });
                // var autoOptions = {
                //     input: "tipinput",
                // };
                // var auto = new AMap.Autocomplete(autoOptions);
                // AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
                // function select(e) {
                //     that.placeSearch.setCity(e.poi.adcode);
                //     that.placeSearch.search(e.poi.name, function () {
                //         let center = map.getCenter()
                //         map.setZoomAndCenter(15, [center.P + 0.009, center.O]);
                //     });  //关键字查询查询
                // }
            },
            placeSearchFun() {
                const that = this
                const map = that.map
                that.placeSearch.search(that.searchText, function () {
                    let center = map.getCenter()
                    // map.setCenter(center);
                });

            },
            trail(lineArr, id) {
                const that = this;
                const map = that.map;
                //添加点标记，cat

                let marker = new AMap.Marker({
                    map: map,
                    position: [120.225432, 30.30716],
                    icon: cat,
                    offset: new AMap.Pixel(-45, -48),
                    autoRotation: false,
                });

                // 绘制路线轨迹
                var polyline = new AMap.Polyline({
                    map: map,
                    path: lineArr,
                    showDir: false,
                    strokeColor: "#28F",  //线颜色
                    strokeOpacity: 0,     //线透明度
                    strokeWeight: 6,      //线宽
                    lineWidth: 0,
                    // strokeStyle: "solid"  //线样式
                });
                //行驶过后的轨迹
                var passedPolyline = new AMap.Polyline({
                    map: map,
                    strokeColor: "#FF5A2B",  //线颜色
                    strokeWeight: 6,      //线宽
                    strokeOpacity: 0,     //线透明度
                });
                marker.on('moving', function (e) {
                    passedPolyline.setPath(e.passedPath);
                });
                // map.setFitView();//调整视角到自适应覆盖物级别
                marker.moveAlong(lineArr, 60);//设置开始移动的数据，和速度
                //车辆标记和轨迹加入集合中便于操作
                that.catList.push({id: that.catList.length, marker, polyline, passedPolyline});
                //设置车辆的事件
                marker.on('click', () => {//点击鼠标出现标记
                    for (let i in that.catList) {
                        if (parseInt(i) !== id) {
                            that.catList[i].marker.setLabel(null)
                        }
                    }
                    if (!marker.getLabel(marker, id)) {
                        that.getLabal(marker, id)
                    } else {
                        marker.setLabel(null)
                    }
                })
            },
            getLabal(marker, id) {
                //自定义标签
                let content = '<div class="navgtr-view"  >' +
                    '<div class="navgtr-top"><div>车辆编号：1234' + id + '</div><div>所属单位：' + (id === 0 ? '市急救中心' : '96120急救中心') + '</div></div>' +
                    '<div class="navgtr-content">' +
                    '<div class="navgtr-title">任务中&nbsp;待接收患者</div>' +
                    '<div class="navgtr-text">车牌号：浙A A1234' + id + '</div>' +
                    '<div class="navgtr-text">目的地：' + (id === 0 ? '杭州秋涛路242-2号秋涛发展大厦' : '杭州学院路行知小学') + '</div>' +
                    '<div class="navgtr-text">医&nbsp;&nbsp;&nbsp;生：' + (id === 0 ? '张三' : '李四') + '</div>' +
                    '<div class="navgtr-text">护&nbsp;&nbsp;&nbsp;士：' + (id === 0 ? '马冬梅' : '李秋菊') + '</div>' +
                    '<div class="navgtr-text">驾驶员：' + (id === 0 ? '王五' : '赵六') + '</div>' +
                    '</div></div>';
                marker.setLabel({
                    content,
                    offset: new AMap.Pixel(-140, -370)
                })
            },
            searchCat(data) {
                //搜索固定
                const that = this;
                data = data < 5 ? data : 0
                let position = that.catList[data].marker.getPosition()
                let map = that.map;
                map.setZoom(15)
                map.setCenter([position.P + 0.01, position.O])
            }
        }
    }

</script>

<style scoped lang="less">
    @map_height: 1080px;
    @font-face {
        font-family: DIN-Bold; //重命名字体名
        src: url('../../common/font/DIN-Bold.otf'); //引入字体
        font-weight: normal;
        font-style: normal;
    }

    #panel {
        position: absolute;
        background-color: white;
        max-height: 90%;
        overflow-y: auto;
        top: 180px;
        left: 31px;
        width: 328px;
        z-index: 99;
    }

    .myPageTop {
        position: absolute;
        top: 131px;
        left: 31px;
        z-index: 999;
        height: 48px;
        width: 328px;
        box-shadow: 0 0 3px 1px #a8a8a8;

        input {
            height: 48px;
            width: 328px;
            position: absolute;
            top: 0;
            left: 0;
            text-indent: 20px;
            -webkit-user-select: auto; /*webkit浏览器*/
            user-select: auto;
            -o-user-select: auto;
            -ms-user-select: auto;
        }

        img {
            position: absolute;
            top: 12px;
            right: 12px;
        }
    }

    .map-con {
        min-width: 1920px;
        min-height: @map_height;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .map {
        position: absolute;
        top: 0;
        min-width: 1920px;
        min-height: @map_height+50px;
        background-color: #e5e5e5;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }


</style>