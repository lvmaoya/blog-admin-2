<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
    <div class="container">
        <div class="header">
            <div class="left">
                <div class="title">
                    Goods morning,Lumoyoo
                </div>
                <div class="subtitle">
                    Rise and shine! Have a great day.
                </div>
            </div>
            <div class="middle">
                <ul>
                    <li v-for="(item, index) in canlendar" :class="{ active: item.active }"
                        @click="handleDateRangeClick(index)">{{ item.label
                        }}</li>
                    <li>
                        <img src="@/assets/icon/calendar.svg" alt="">
                    </li>
                </ul>
            </div>
            <div class="right">
                <img src="@/assets/icon/dark.svg" alt="">
                <img src="@/assets/icon/message.svg" alt="">
                <img src="http://lvmaoya.cn:8520/assets/cartoon.d6562f6b.jpg" alt="">
            </div>
        </div>
        <div class="body">
            <div class="left">
                <div class="top">
                    <ul>
                        <li v-for="item in data">
                            <img src="@/assets/icon/brawse.svg" alt="">
                            <div>
                                <div class="title">
                                    <span>{{ item.title }}</span>
                                    <span>{{ item.unit }}</span>
                                </div>
                                <div class="desc">
                                    <span :style="{ color: item.color }">
                                        {{ item.rate }}
                                    </span>
                                    <div class="chart">
                                        <MiniLineChart :data="item.data" :lineColor="item.color"></MiniLineChart>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="middle main-card">
                    <LineChart :option="chartOption" />
                </div>
                <div class="bottom main-card">
                    <div class="main-title">
                        Portfolio
                    </div>
                </div>
            </div>
            <div class="middle">
                <div class="top main-card">
                    <div class="main-title">
                        Analysis
                    </div>
                </div>
                <div class="bottom main-card">
                    <div class="main-title">
                        Projections
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="top main-card">
                    <div class="main-title">
                        Analysis
                    </div>
                </div>
                <div class="bottom main-card">
                    <div class="main-title">
                        Projections
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import MiniLineChart from "@/components/miniLineChart/index.vue";
import LineChart from '@/components/lineChart/index.vue';

import { color } from "echarts";
import { ref } from "vue";
const miniLineData = ref([[0, 10], [100, 8], [200, 12], [300, 15], [400, 10]])
const data = ref([
    {
        "title": 87234,
        "unit": "ETH",
        "rate": "+42.31",
        "color": "purple",
        "data": [[0, 15], [100, 8], [200, 12], [300, 19], [400, 5]]
    },
    {
        "title": 23451,
        "unit": "XRP",
        "rate": "-12.78",
        "color": "blue",
        "data": [[0, 11], [100, 3], [200, 17], [300, 9], [400, 14]]
    },
    {
        "title": 56789,
        "unit": "BTC",
        "rate": "+33.56",
        "color": "red",
        "data": [[0, 7], [100, 16], [200, 2], [300, 13], [400, 10]]
    },
    {
        "title": 12345,
        "unit": "USDT",
        "rate": "-25.12",
        "color": "green",
        "data": [[0, 18], [100, 5], [200, 10], [300, 12], [400, 8]]
    }
])
const canlendar = ref([
    {
        label: 'Day',
        active: true
    },
    {
        label: 'Week',
        active: false
    },
    {
        label: 'Month',
        active: false
    },
    {
        label: 'Year',
        active: false
    }
])
function getRandomData() {
    return Math.floor(Math.random() * 10);
}
const handleDateRangeClick = (index) => {
    canlendar.value.forEach(item => item.active = false)
    canlendar.value[index].active = true
}
const dataset = {
    source: [
        ['day', 'Costs', 'Exps', 'Odds'],
        ['Mon', getRandomData(), getRandomData(), getRandomData()],
        ['Tue', getRandomData(), getRandomData(), getRandomData()],
        ['Wed', getRandomData(), getRandomData(), getRandomData()],
        ['Thu', getRandomData(), getRandomData(), getRandomData()],
        ['Fri', getRandomData(), getRandomData(), getRandomData()],
        ['Sat', getRandomData(), getRandomData(), getRandomData()],
        ['Sun', getRandomData(), getRandomData(), getRandomData()]
    ]
};
const chartOption = ref({
    title: {
        text: 'Costs', // 标题文本
        textStyle: {
            fontSize: '16px', // 字体大小
            fontWeight: 600, // 字体粗细
            fontFamily: 'josefin-sans' // 字体
        }
    },
    dataset: dataset,
    legend: {
        show: true,
        data: ['Costs', 'Exps', 'Odds'], // 显示图例，并指定图例的数据
        right: 40,
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 16
    },
    xAxis: {
        type: 'category',
        axisTick: {
            show: false // 不显示 x 轴上的刻度线
        },
        boundaryGap: false
    },
    yAxis: {
        type: 'value'
    },
    grid: {
        left: 30,
        right: 30,
        top: 40,
        bottom: 30 // 距离底部的距离为 0
    },
    series: [
        {
            name: 'Costs',
            type: 'line',
            smooth: true,
            symbol: 'none', // 不显示拐点
            encode: {
                x: 'day',
                y: 'Costs'
            }
        },
        {
            name: 'Exps',
            type: 'line',
            smooth: true,
            symbol: 'none', // 不显示拐点
            encode: {
                x: 'day',
                y: 'Exps'
            }
        },
        {
            name: 'Odds',
            type: 'line',
            smooth: true,
            symbol: 'none', // 不显示拐点
            encode: {
                x: 'day',
                y: 'Odds'
            }
        }
    ]
});
</script>

<style scoped lang="scss">
.main-title {
    font-weight: 600;
    font-size: 16px;
}

.main-card {
    background-color: white;
    border-radius: 20px;
    padding: 16px;
}

.container {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: #eceff7;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        padding: 12px 12px 0 12px;
        height: 10%;
        max-height: 90px;

        .left {
            display: flex;
            flex-direction: column;
            row-gap: 2px;

            .title {
                font-size: 24px;
            }

            .subtitle {
                color: #545454;
            }
        }

        .middle {
            ul {
                display: flex;
                gap: 8px;

                li {
                    padding: 0 12px;
                    height: 28px;
                    border-radius: 8px;
                    color: #545454;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    user-select: none;

                    &.active {
                        background-color: #68d0fd;
                        color: white;
                        font-weight: 500;
                    }

                    img {
                        height: 70%;
                    }
                }

            }
        }

        .right {
            display: flex;
            align-items: center;
            column-gap: 20px;

            img {
                width: 16px;
                height: 16px;


                &:last-child {
                    width: 40px;
                    height: 40px;
                    margin-bottom: 8px;
                    border-radius: 50%;
                }
            }
        }
    }

    .body {
        display: flex;
        gap: 12px;
        padding: 0 12px 12px 12px;
        flex: 1;
        .left {
            width: 56%;
            display: flex;
            flex-direction: column;
            gap: 12px;

            .top {
                height: 12%;
                width: 100%;

                ul {
                    display: flex;
                    gap: 12px;
                    height: 100%;
                    width: 100%;

                    li {
                        display: flex;
                        padding: 10px;
                        align-items: center;
                        gap: 8px;
                        background-color: white;
                        border-radius: 12px;
                        flex: 1;

                        img {
                            width: 40px;
                        }

                        &>div {
                            display: flex;
                            flex-direction: column;
                            gap: 4px;

                            .title {
                                font-weight: bold;
                                font-size: 16px;

                                span:last-child {
                                    font-size: 10px;
                                    color: #545454;
                                    margin-left: 5px;
                                }
                            }

                            .desc {
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                font-size: 10px;
                                color: red;

                                .chart {
                                    width: 60px;
                                    height: 12px;
                                }
                            }
                        }
                    }
                }
            }

            .middle {
                flex: 1;
            }

            .bottom {
                flex: 1;
            }
        }

        &>.middle {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 12px;

            .top,
            .bottom {
                flex: 1;
            }
        }

        &>.right {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 12px;

            .top {
                height: 70%;
            }

            .bottom {
                flex: 1;
            }
        }
    }
}
</style>
