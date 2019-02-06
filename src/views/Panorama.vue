<template>
    <div class="pan-body">
        <div class="content">
            <LeftContent></LeftContent>
            <RightContent></RightContent>
            <BottomContent></BottomContent>
            <MiddleContent></MiddleContent>
            <Top></Top>
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
        height: 100vh;
        margin: auto;
        .content {
            position: relative;
            min-width: @bodyWidth;
            min-height: @bodyHeight;
            height: 100%;
            overflow: hidden;
        }
    }

</style>