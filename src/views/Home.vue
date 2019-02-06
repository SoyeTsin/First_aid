<template>
    <div id="home" ref="mian" :style="home_bg">
        <div class="time">
            <Time></Time>
        </div>
        <div class="title">
            浙江急救大数据平台
        </div>
        <HomeButton></HomeButton>
    </div>
</template>

<script>
    console.log(process.env.VUE_APP_API)
    import HomeButton from '../components/HomeButton.vue'
    import Time from '../components/Time.vue'

    export default {
        name: 'home',
        components: {
            HomeButton,
            Time,
        },
        data() {
            return {
                home_bg: {
                    backgroundImage: "url(" + require("@/assets/images/home_bg.png") + ")",
                    backgroundRepeat: "no-repeat",
                }
            }
        },
        mounted() {
        },
    };
</script>
<style scoped lang="less">
    @bodyHeight: 1080px;
    @bodyWidth: 1110px;
    #home {
        min-width: 1920px;
        min-height: @bodyHeight;
        height: 100%;
        background-repeat: no-repeat;
        position: relative;
        background-size: 100%;

        .time {
            width: 246px;
            height: 33px;
            position: absolute;
            top: 40px;
            left: 52px;
        }

        .title {
            font-family: MicrosoftYaHei;
            font-size: 54px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: right;
            text-shadow: 0 0 36px rgba(255, 255, 255, 0.50);
            position: absolute;
            top: 64px;
            right: 124px;
        }
    }
</style>
