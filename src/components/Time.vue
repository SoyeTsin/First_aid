<template>
    <div class="home-time">
        <div>{{yyyy}}</div>
        <div class="white">年</div>
        <div>{{MM}}</div>
        <div class="white">月</div>
        <div>{{dd}}</div>
        <div class="white">日</div>
        <div class="time">{{time}}</div>
    </div>
</template>

<script>
    export default {
        name: "Time",
        data() {
            return {
                yyyy: '',
                MM: '',
                dd: '',
                time: ''
            }
        },
        mounted() {
            this.xsTime()
            setInterval(() => {
                this.xsTime()
            }, 1000)
        },
        methods: {
            xsTime() {
                let newTime = new Date();
                let mon = parseInt(newTime.getMonth()) + 1;
                let date = newTime.getUTCDate();
                let h = newTime.getHours();
                if (h < 10) {
                    h = "0" + h
                }
                let m = newTime.getMinutes();
                if (m < 10) {
                    m = "0" + m
                }
                let s = newTime.getSeconds();
                let y = newTime.getYear() + 1900;
                if (s < 10) {
                    s = "0" + s
                }
                let o = 0;
                let kj_time = h + ":" + m + ":" + s;
                this.yyyy = y
                this.MM = mon
                this.dd = date
                this.time = kj_time
            }
        }
    }
</script>

<style scoped lang="less">
    @font-face {
        font-family: DS-DIGIB; //重命名字体名
        src: url('../common/font/DS-DIGIB.TTF'); //引入字体
        font-weight: normal;
        font-style: normal;
    }

    .home-time {
        font-size: 28px;
        color: #8CBFF8;

        display: flex;
        justify-content: flex-start;

        > div {
            font-family: DS-DIGIB;
            font-size: 32px;
        }

        .white {
            color: #ffffff;
            font-size: 24px;
        }

        .time {
            margin-left: 20px;
        }
    }
</style>