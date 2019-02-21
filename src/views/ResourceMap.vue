<template>
    <div class="map-body">
        <div class="top">
            <conTop></conTop>
        </div>
        <div class="map">
            <Map ref="map"></Map>
        </div>
        <MapRight @parentEvent="funEvent"></MapRight>
    </div>
</template>

<script>
    import conTop from '../components/Resource/Top.vue';
    import Map from '../components/Resource/Map.vue';
    import MapRight from '../components/Resource/MapRight.vue';

    export default {
        name: "ResourceMap",
        components: {
            conTop,
            Map,
            MapRight
        },
        data() {
            return {
                msg: '123'
            }
        },
        methods: {
            funEvent(data) {
                //根据子组件想要调用的方法名判断调用的方法
                if (data.functionName === 'searchCat') {
                    this.searchCat(data.parameter)
                }
            },
            searchCat(data) {
                this.$refs.map.searchCat(data);
            }

        }
    }
</script>

<style scoped lang="less">
    .map-body {
        min-width: 1920px;
        min-height: 1080px;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

</style>
