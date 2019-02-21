<template>
    <div class="right_content" :style="bgRight">
        <RightOne></RightOne>
        <RightTwo></RightTwo>
        <RightThree></RightThree>
    </div>
</template>

<script>
    import RightOne from './RightOne.vue';
    import RightTwo from './RightTwo.vue';
    import RightThree from './RightThree.vue';

    export default {
        name: "RightContent",
        components: {
            RightOne,
            RightTwo,
            RightThree,
        },
        data() {
            return {
                bgRight: {
                    backgroundImage: "url(" + require("@/assets/panorama/bg_right.png") + ")",
                    backgroundRepeat: "no-repeat",
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .right_content {
        width: 510px;
        position: absolute;
        right: 0;
        top: 101px;
        z-index: 5;
        background-size: 550px 980px;
        background-position: -35px 0;
        height: 100%;
        box-sizing: border-box;
        padding-left: 50px;
    }
</style>
