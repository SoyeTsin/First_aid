<template>
    <div class="middle-content">
        <MiddleLeft></MiddleLeft>
        <MiddleRight></MiddleRight>
    </div>
</template>

<script>
    import MiddleLeft from './MiddleLeft.vue'
    import MiddleRight from './MiddleRight.vue'

    export default {
        name: "BottomContent",
        components: {
            MiddleLeft, MiddleRight
        },
        data() {
            return {}
        },
        mounted() {
        },
    }
</script>

<style scoped lang="less">
    .middle-content {
        color: #fff;
        position: absolute;
        width: 920px;
        height: 620px;
        left: 50%;
        top: 101px;
        transform: translateX(-50%);
        padding: 13px 27px 50px 27px;

        .content {
            width: 920px;
            height: 620px;
            position: absolute;
            top: 20px;
        }
    }
</style>