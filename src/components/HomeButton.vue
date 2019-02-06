<template>
    <div class="home-button">
        <router-link to="/Panorama">
            <div class="button-into">
                <img :src="jijiu">
                <p>全省急救全景</p>
            </div>
        </router-link>
        <router-link to="/ResourceMap">
            <div class="button-into">
                <img :src="ziyuan">
                <p>资源地图</p>
            </div>
        </router-link>
    </div>
</template>

<script>
    import jijiu from '../assets/images/icon_急救.png'
    import ziyuan from '../assets/images/icon_资源地图.png'

    export default {
        name: "HomeButton",
        data() {
            return {
                jijiu,
                ziyuan
            }
        }
    }
</script>

<style scoped lang="less">
    .home-button {
        display: flex;
        justify-content: space-between;
        width: 1024px;
        position: absolute;
        top: 300px;
        left: 400PX;

        .button-into {
            width: 300px;
            height: 375px;
            background-color: rgba(0, 78, 255, 0.5);
            position: relative;
            border: solid 1px rgba(221, 221, 221, 0.59);
            box-shadow: 0 0 15px 10px rgba(0, 78, 255, 0.2);
            cursor: pointer;

            p {
                font-size: 32px;
                color: #FFFFFF;
                letter-spacing: 0;
                font-weight: 600;
                position: absolute;
                bottom: 84px;
                display: block;
                width: 100%;
                text-align: center;
            }

            img {
                position: absolute;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        .button-into:hover {
            background-color: rgba(0, 78, 255, 0.7);
        }

        .button-into:active {
            background-color: rgba(0, 78, 255, 0.5);
        }
    }
</style>