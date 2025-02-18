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
                    Article Center
                </div>
                <div class="subtitle">
                    View all of your Client information.
                </div>
            </div>

            <div class="right">
                <img src="@/assets/icon/dark.svg" alt="">
                <img src="@/assets/icon/message.svg" alt="">
                <img src="http://lvmaoya.cn:8520/assets/cartoon.d6562f6b.jpg" alt="">
            </div>
        </div>
        <div class="body">
            <div class="top">
                <div class="left">
                    <ul>
                        <li v-for="(item, index) in articleCategory" :key="index" :class="{ active: item.active }"
                            @click="setActive(index)">
                            <span>
                                {{ item.name }}
                            </span>
                            <span>
                                {{ item.count }}
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <ul>
                        <li>
                            <span>Export</span>
                        </li>
                        <li>
                            <span>+</span>
                            <span>Add New</span>
                            <span>+</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="middle">
                <div class="left">
                    <input type="text" placeholder="Search for Articles">
                </div>
                <div class="right">
                    <ul>
                        <li>
                            <span>+</span>
                            <span>Jan 6,2022 - Jan 13,2023</span>
                        </li>
                        <li>
                            <span>+</span>
                            <span>Add New</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <div class="table-header">
                    <ul>
                        <li><input type="checkbox"></li>
                        <li>ID</li>
                        <li>Title</li>
                        <li>Author</li>
                        <li>Publish At</li>
                        <li>Views</li>
                        <li>Likes</li>
                        <li>Comments</li>
                    </ul>
                </div>
                <ul class="table-body"  v-loading="tableDataLoading">
                    <li v-for="item in articleList">
                        <ul>
                            <li><input type="checkbox"></li>
                            <li>
                                {{ item.id }}
                            </li>
                            <li>
                                {{ item.title }}
                            </li>
                            <li>
                                {{ item.description }}
                            </li>
                            <li>
                                {{ item.publishedTime }}
                            </li>
                            <li>
                                {{ item.pageView }}
                            </li>
                            <li>
                                {{ item.preferNum }}
                            </li>
                            <li>
                                {{ item.status }}
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="table-footer">
                    <div class="left">
                        <span>+</span>
                        <span>Previous</span>
                    </div>
                    <div class="middle">
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>...</li>
                            <li>8</li>
                            <li>9</li>
                            <li>10</li>
                        </ul>
                    </div>
                    <div class="right">
                        <span>Next</span>
                        <span>+</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { articleListData } from "@/service/article";
const articleCategory = ref([
    {
        "name": "All Articles",
        "count": 90,
        "active": true,
        "index": 0
    },
    {
        "name": "Projects Keys",
        "count": 20,
        "active": false,
        "index": 1
    },
    {
        "name": "Study Outputs",
        "count": 40,
        "active": false,
        "index": 2
    },
    {
        "name": "Daily Notes",
        "count": 10,
        "active": false,
        "index": 3
    },
])
const articleList = ref([]);
const setActive = (index) => {
    let activeIndex = articleCategory.value.find(item => item.active)?.index
    if (activeIndex != index) {
        articleCategory.value.forEach(item => item.active = false)
        articleCategory.value[index].active = true
    }
}
const getArticleList = async () => {
    tableDataLoading.value = true
    let res = await articleListData({ page: 1, size: 20 });    
    articleList.value = res.records
    tableDataLoading.value = false
}
const tableDataLoading = ref(false)
onMounted(()=>{
    getArticleList()
})
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
        flex-direction: column;
        gap: 12px;
        padding: 0 12px 12px 12px;
        flex: 1;
        overflow: hidden;

        &>.top {
            height: 40px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            // background-color: red;
            .left {
                ul {
                    display: flex;
                    gap: 24px;

                    li {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                        font-weight: 500;
                        color: #545454;
                        border-bottom: 2px solid transparent;
                        cursor: pointer;
                        user-select: none;

                        span {
                            &:last-child {
                                display: block;
                                padding: 4px;
                                background-color: #f2f2f2;
                                border-radius: 4px;
                            }
                        }

                        &.active {
                            color: #6b25e6;
                            border-bottom: 2px solid #6b25e6;
                        }
                    }
                }
            }

            .right {
                display: flex;
                align-items: center;
                gap: 12px;

                ul {
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    li {
                        padding: 4px 16px;
                        background-color: white;
                        border-radius: 8px;

                        &:first-child {
                            // border: 2px solid #dddddd;
                        }

                        &:last-child {
                            background-color: #6b25e6;
                            color: white;
                            display: flex;
                            align-items: center;
                            gap: 4px;
                        }
                    }
                }
            }
        }

        &>.middle {
            height: 40px;
            width: 100%;
            // background-color: red;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
                flex: 1;

                input {
                    height: 30px;
                    width: 30%;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding-left: 30px;

                    &:focus {
                        outline: none;
                    }
                }
            }

            .right {
                ul {
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    li {
                        padding: 4px 16px;
                        background-color: white;
                        border-radius: 8px;

                        &:last-child {
                            display: flex;
                            align-items: center;
                            gap: 4px;
                        }
                    }
                }
            }
        }

        &>.bottom {
            flex: 1;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background-color: white;

            .table-header {
                background-color: #f9f8fa;
                height: 35px;
                line-height: 35px;

                ul {
                    display: flex;

                    li {
                        width: 12.5%;
                        text-align: center;
                    }
                }
            }

            .table-body {
                display: flex;
                flex-direction: column;
                gap: 4px;
                flex: 1;
                overflow-y: scroll;
                position: relative;
                li {
                    ul {
                        display: flex;
                        li {
                            width:12.5%;
                            height: 40px;
                            padding: 0 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }

            .table-footer {
                height: 40px;
                width: 100%;
                border-top: 1px solid #ddd;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 12px;
                // background-color: white;
                border-radius: 0 0 8px 8px;

                .left {
                    display: flex;
                    gap: 4px;
                    border: 1px solid #ddd;
                    height: 25px;
                    line-height: 25px;
                    padding: 0 10px;
                    border-radius: 4px;
                }

                .right {
                    display: flex;
                    gap: 4px;
                    border: 1px solid #ddd;
                    height: 25px;
                    line-height: 25px;
                    padding: 0 10px;
                    border-radius: 4px;
                }

                ul {
                    display: flex;

                    li {
                        height: 30px;
                        width: 30px;
                        line-height: 30px;
                    }
                }
            }

        }
    }
}
</style>
