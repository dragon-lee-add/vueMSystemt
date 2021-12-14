<template>
    <div class="box">
        <div id="main"></div>
        <div id="content"></div>
    </div>

</template>

<script>
    import * as echarts from 'echarts';
 
    export default {
        name: 'Echarts',
        data() {
            return {
                
            }
        },
        mounted() {
            this.drawLineOne();
            this.drawLineTwo();
        },
        methods: {
            drawLineOne() {
                // 基于准备好的dom，初始化echarts实例
                var chartDom = document.getElementById('main');
                var myChart = echarts.init(chartDom);
                var option;
                option = {
                    title: {
                        text: 'Referer of a Website',
                        subtext: 'Fake Data',
                        right: 'right'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                { value: 1048, name: 'Search Engine' },
                                { value: 735, name: 'Direct' },
                                { value: 580, name: 'Email' },
                                { value: 484, name: 'Union Ads' },
                                { value: 300, name: 'Video Ads' }
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                option && myChart.setOption(option);
            },
            drawLineTwo() {
                var chartDom = document.getElementById('content');
                var myChart = echarts.init(chartDom);
                var option;

                option = {
                    title: {
                        text: 'Stacked Line',
                        left: 'left'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
                        top: '20px'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'Email',
                            type: 'line',
                            stack: 'Total',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: 'Union Ads',
                            type: 'line',
                            stack: 'Total',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: 'Video Ads',
                            type: 'line',
                            stack: 'Total',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: 'Direct',
                            type: 'line',
                            stack: 'Total',
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: 'Search Engine',
                            type: 'line',
                            stack: 'Total',
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };

                option && myChart.setOption(option);
            }
        }
    }
</script>

<style scoped>
    /deep/ div{
        display: inline;
    }
    .box{
            margin-top: 10px;
    }
    #main {
        margin-left: 20px;
        width: 400px;
        height: 600px;
       
    }
    #content {
        width: 800px;
        height: 600px;
        margin-left: 480px;
    }
</style>