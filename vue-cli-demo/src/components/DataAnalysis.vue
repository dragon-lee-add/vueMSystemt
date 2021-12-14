<template>
    <div id="content">
        <div class="boxHeader">
            <div class="date">{{ nowDate }}</div>
            <div class="title">用户满意度统计</div>
        </div>
        <diV id="box"></diV>
        <div id="box2"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name: 'DataAnalysis',
        data() {
            return {
                nowDate: "", // 当前日期
            }
        },
        created() {

        },

        mounted() {

            this.currentTime();
            this.drawLineOne();
            this.drawLineTwo();
        },
        //定时器销毁
        beforeDestroy() {
            if (this.formatDate) {
                clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
            }
        },
        methods: {
            currentTime() {
                setInterval(this.formatDate, 500);
            },
            formatDate() {
                let date = new Date();
                let year = date.getFullYear(); // 年
                let month = date.getMonth() + 1; // 月
                let day = date.getDate(); // 日
                let week = date.getDay(); // 星期
                let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                let hour = date.getHours(); // 时
                hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
                let minute = date.getMinutes(); // 分
                minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
                let second = date.getSeconds(); // 秒
                second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
                this.nowDate = `${year}/${month}/${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
            },
            drawLineOne() {
                // 基于准备好的dom，初始化echarts实例
                var chartDom = document.getElementById('box');
                var myChart = echarts.init(chartDom);
                var option;
                const gaugeData = [
                    {
                        value: 20,
                        name: 'Perfect',
                        title: {
                            offsetCenter: ['0%', '-35%']
                        },
                        detail: {
                            valueAnimation: true,
                            offsetCenter: ['0%', '-20%']
                        }
                    },
                    {
                        value: 40,
                        name: 'Good',
                        title: {
                            offsetCenter: ['0%', '0%']
                        },
                        detail: {
                            valueAnimation: true,
                            offsetCenter: ['0%', '15%']
                        }
                    },
                    {
                        value: 60,
                        name: 'Commonly',
                        title: {
                            offsetCenter: ['0%', '35%']
                        },
                        detail: {
                            valueAnimation: true,
                            offsetCenter: ['0%', '50%']
                        }
                    }
                ];
                option = {
                    series: [
                        {
                            type: 'gauge',
                            startAngle: 90,
                            endAngle: -270,
                            pointer: {
                                show: false
                            },
                            progress: {
                                show: true,
                                overlap: false,
                                roundCap: true,
                                clip: false,
                                itemStyle: {
                                    borderWidth: 1,
                                    borderColor: '#464646'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 40
                                }
                            },
                            splitLine: {
                                show: false,
                                distance: 0,
                                length: 10
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false,
                                distance: 50
                            },
                            data: gaugeData,
                            title: {
                                fontSize: 14
                            },
                            detail: {
                                width: 50,
                                height: 14,
                                fontSize: 14,
                                color: 'auto',
                                borderColor: 'auto',
                                borderRadius: 20,
                                borderWidth: 1,
                                formatter: '{value}%'
                            }
                        }
                    ]
                };
                setInterval(function () {
                    gaugeData[0].value = +(Math.random() * 100).toFixed(2);
                    gaugeData[1].value = +(Math.random() * 100).toFixed(2);
                    gaugeData[2].value = +(Math.random() * 100).toFixed(2);
                    myChart.setOption({
                        series: [
                            {
                                data: gaugeData,
                                pointer: {
                                    show: false
                                }
                            }
                        ]
                    });
                }, 2000);

                option && myChart.setOption(option);

            },
            drawLineTwo() {
                var chartDom = document.getElementById('box2');
                var myChart = echarts.init(chartDom);
                var option;
                option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: [150, 230, 224, 218, 135, 147, 260],
                            type: 'line'
                        }
                    ]
                };

                option && myChart.setOption(option);
            }
        }
    }
</script>

<style scoped>
    #box2{
        display: inline-block;
        width: 60%;
        height: 100%;
        margin-left: 60px;
    }

    #box {
        width: 30%;
        height: 100%;
        margin: 50px 10px 5px 10px;
        display: inline-block;
    }

    #content {
        width: 100%;
        height: 70%;
    }

    .boxHeader {
        margin-top: 10px;
    }

    .boxHeader .title {
        text-align: center;
        font-weight: bold;
        display: inline;
        font-size: 20px;
        position: absolute;
        top: 10;
        left: 50%;

    }

    .boxHeader .date {
        font-weight: bold;
        font-size: 20px;
        display: inline;
        margin: 10px;
    }
</style>