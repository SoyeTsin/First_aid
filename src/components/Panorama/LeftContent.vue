<template>
    <div class="left_content">
        <LeftOne></LeftOne>
        <LeftTwo></LeftTwo>
        <LeftThree></LeftThree>
    </div>
</template>

<script>
    import LeftOne from './LeftOne.vue';
    import LeftTwo from './LeftTwo.vue';
    import LeftThree from './LeftThree.vue';

    export default {
        name: "LeftContent",
        components: {
            LeftOne,
            LeftTwo,
            LeftThree
        }
    }
</script>

<style scoped>
    @font-face {
        font-family: DIN-Regular; //重命名字体名
        src: url('../../common/font/DIN-RegularAlternate.otf'); //引入字体
        font-weight: normal;
        font-style: normal;
    }
    .left_content {
        width: 460px;
        position: absolute;
        left: 0;
        top: 101px;
        z-index: 5;
    }
</style>