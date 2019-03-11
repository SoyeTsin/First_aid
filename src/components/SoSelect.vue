<template>
    <div class="so-select">
        <div class="select" @click="ifShowOption()">
            <div>{{title}}</div>
            <div class="icon"></div>
        </div>
        <div class="option-top" v-if="ifShow">
            <div :class="animActive?'active option-box':'option-box unActive'">
                <div class="option">
                    <div class="item" v-for="item in data" v-bind:key="item.id" @click="selectOption(item)"
                         :title="item">{{item}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SoSelect",
        data() {
            return {
                data: [],
                ifShowLock: true,
                ifShow: false,
                animActive: false,
                title: '请选择'
            }
        },
        props: ['dataArr'],
        mounted() {
            this.data = this.dataArr
            this.title=this.dataArr[0]||'请选择'
        },
        methods: {
            selectOption(e) {
                this.title = e
                this.ifShowOption()
            },
            ifShowOption() {
                if (!this.ifShowLock) {
                    return
                }
                this.ifShowLock = false
                setTimeout(() => {
                    this.ifShowLock = true
                }, 500)
                if (!this.ifShow) {
                    this.ifShow = !this.ifShow
                    this.animActive = !this.animActive
                } else {
                    this.animActive = !this.animActive
                    setTimeout(() => {
                        this.ifShow = !this.ifShow
                    }, 500)
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .so-select {
        position: relative;

        .select {
            height: 50px;
            position: relative;
            line-height: 50px;
            border-bottom: solid 1px #414141;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            white-space: nowrap;

            > div {
                font-size: 18px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-indent: 10%;
            }

            > div.icon {
                width: 0;
                height: 0;
                padding: 0;
                border-width: 6px 6px 0;
                border-style: solid;
                border-color: #D8D8D8 transparent transparent; /*灰 透明 透明 */
                position: relative;
                top: 20px;
            }
        }

        .option-top {
            width: 100%;
            height: 200px;
            position: absolute;
            top: 51px;
            z-index: 999;
            overflow: hidden;
        }

        .option-box {
            width: 100%;
            max-height: 200px;
            overflow-y: scroll;
            position: absolute;
            top: 0;
            z-index: 999;
        }

        .option-box.active {
            animation: myAnim 500ms infinite;
            animation-iteration-count: 1;
        }

        .option-box.unActive {
            animation: unAnim 500ms infinite;
            animation-iteration-count: 1;
            top: -100%
        }

        .option {
            width: 100%;
            background-color: #e5e5e5;

            > div {
                cursor: pointer;
                line-height: 50px;
                height: 50px;
                text-indent: 10%;
                position: relative;
                overflow: hidden;
            }

            > div:nth-child(2n+1) {
                background-color: #eeeeee;
            }

            > div:last-child:before {
                display: none;
            }

            :after {
                display: block;
                clear: both;
                content: '';
            }

            > div:hover {
                background-color: #FFFFFF;
            }
        }
    }

    @keyframes myAnim {
        0% {
            top: -100%;
        }
        100% {
            top: 0
        }
    }

    @keyframes unAnim {
        0% {
            top: 0
        }
        100% {
            top: -100%;
        }
    }
</style>