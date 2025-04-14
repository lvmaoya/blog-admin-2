<template>
    <Card class="col-span-2 h-full overflow-hidden flex flex-col">
        <CardHeader class="flex flex-row justify-between items-center">
            <div class="flex flex-col gap-y-1.5">
                <CardTitle>Status</CardTitle>
                <CardDescription>
                    121 contributions in 2025.
                </CardDescription>
            </div>
            <div>
                <Button>
                    Sign In Today
                </Button>
            </div>
        </CardHeader>
        <CardContent class="flex-1 overflow-y-scroll">
            <ul class="flex flex-wrap gap-1">
                <li v-for="item in dateArray">
                    <TooltipProvider delayDuration="0">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <div class="w-4 h-4 bg-[#ebedf0] border-[rgba(27, 31, 35, 0.06)] border rounded-[4px]"
                                    :class="item.value == 1 ? 'bg-[#9be9a8]' : item.value == 2 ? 'bg-[#30a14e]' : ''">
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{{ item.value }} {{ item.value > 1 ? 'contributions' : 'contribution' }} on {{
                                    item.formattedDate }}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </li>
            </ul>
        </CardContent>
    </Card>
</template>

<script setup>
import dayjs from "dayjs";
import { computed, ref } from "vue";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

// 获取当前年份
const currentYear = dayjs().year();

// 存储生成的日期数组对象
const dateArray = ref([]);

// 遍历每个月
for (let month = 1; month <= 12; month++) {
    // 获取该月的天数
    const daysInMonth = dayjs(`${currentYear}-${month}-01`).daysInMonth();
    // 遍历该月的每一天
    for (let day = 1; day <= daysInMonth; day++) {
        const date = dayjs(`${currentYear}-${month}-${day}`);
        const ordinalSuffix = (num) => {
            const j = num % 10;
            const k = num % 100;
            if (j === 1 && k !== 11) {
                return 'st';
            }
            if (j === 2 && k !== 12) {
                return 'nd';
            }
            if (j === 3 && k !== 13) {
                return 'rd';
            }
            return 'th';
        };

        const item = {
            id: date.format('YYYY-MM-DD'),
            value: Math.floor(Math.random() * 3), // 生成 0 到 2 之间的随机数
            year: currentYear,
            month: date.format('MMMM'), // 获取英文月份全称
            day: day,
            formattedDate: `${date.format('MMMM')} ${day}${ordinalSuffix(day)}.`
        };
        dateArray.value.push(item);
    }
}

</script>

<style scoped></style>