<template>
    <div class="pan-body">
        <Top></Top>
        <div class="content">
            <LeftContent></LeftContent>
            <RightContent></RightContent>
            <BottomContent></BottomContent>
            <MiddleContent></MiddleContent>
        </div>
    </div>
</template>

<script>
    import Top from '../components/Top.vue';
    import LeftContent from '../components/Panorama/LeftContent.vue';
    import RightContent from '../components/Panorama/RightContent.vue';
    import BottomContent from '../components/Panorama/BottomContent.vue';
    import MiddleContent from '../components/Panorama/MiddleContent.vue';

    export default {
        name: "Panorama",
        components: {
            Top,
            LeftContent,
            RightContent,
            BottomContent,
            MiddleContent
        },
        data() {
            return {
                time: ''
            }
        }
    }
</script>

<style scoped lang="less">
    @bodyHeight: 1080px;
    @bodyWidth: 1920px;
    .pan-body {
        background-color: #0a0f25;
        min-width: @bodyWidth;
        min-height: @bodyHeight;
        position: absolute;
        width: 100%;
        height: 100%;
        margin: auto;

        .content {
            position: absolute;
            min-width: @bodyWidth;
            min-height: @bodyHeight;
            width: 100%;
            height: 100%;
            text-align: center;
            margin: auto;
            background-repeat: no-repeat;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
        }
    }

</style>