<template>
    <div class="top">
        <div class="time">
            <Time></Time>
        </div>
        <div class="title">
            <p>浙江省急救中心-杭州市</p>
        </div>
        <div class="nav" @click="intoIndex">
            返回全省地图
        </div>
    </div>
</template>

<script>
    import Time from '../../components/Time.vue'

    export default {
        name: "Top",
        components: {
            Time,
        },
        methods: {
            intoIndex() {
                this.$router.push({  //核心语句
                    path: '/',   //跳转的路径
                    query: {           //路由传参时push和query搭配使用 ，作用时传递参数
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .top {
        height: 100px;
        width: 100%;
        background: rgba(5, 10, 35, 0.9);
        /*border-bottom: 1px solid rgba(255, 255, 255, 0.50);*/
        position: absolute;
        top: 0;
        left: 0;
        z-index: 50;
        min-width: 1920px;

        .time {
            width: 246px;
            height: 33px;
            position: absolute;
            top: 30px;
            left: 30px;
        }

        .title {
            font-size: 36px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            line-height: 100px;
        }

        .nav {
            font-size: 24px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: right;
            width: 200px;
            position: absolute;
            z-index: 50;
            right: 42px;
            top: 40px;
            cursor: pointer;
        }

        .nav:before {
            display: block;;
            content: '';
            idth: 0;
            height: 0;
            border-width: 10px 20px 10px 0;
            border-style: solid;
            border-color: transparent #fff transparent transparent; /*透明 灰 透明 透明 */
            position: absolute;
            float: left;
            top: 8px;
            left: 20px;
        }
    }
</style>