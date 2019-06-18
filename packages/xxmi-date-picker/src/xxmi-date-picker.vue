<template>
    <div class="xxmi-date-picker">
        <div class="date-month-header">
            <div class="date-month-header-left">
                <i class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
                   @click="prevYear"/>
                <i class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left"
                   @click="prevMonth"/>
            </div>
            <div class="date-month-header-right">
                <i class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-right"
                   @click="nextMonth"/>
                <i class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-right"
                   @click="nextYear"/>
            </div>
            <div class="date-month">
                <span class="el-date-picker__header-label" @click="selectYear">{{year}}&nbsp;年</span>
                <span class="el-date-picker__header-label" @click="selectMonth">{{month+1}}&nbsp;月</span>
            </div>
        </div>
        <div class="week">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
        </div>
        <div class="date-list">
            <div v-for="date in  dateList"
                 :key="'date-list___'+date.date"
                 @click="selectedDate(date)"
                 @mouseenter="mouseenter(date)"
                 @mouseout="mouseout(date)">
                <span v-text="date.day" :class="dateClass(date)"/>
            </div>
        </div>
        <div v-show="visibleYear" class="year-box">
            <div class="date-month-header">
                <div class="date-month-header-left">
                    <i class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
                       @click="year = year-10"/>
                </div>
                <div class="date-month-header-right">
                    <i class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-right"
                       @click="year = year+10"/>
                </div>
                <div class="date-month">
                    <span class="el-date-picker__header-label" @click="selectYear">
                        {{yearList[0]}}&nbsp;年&nbsp;-&nbsp;{{yearList[9]}}&nbsp;年
                    </span>
                </div>
            </div>
            <div class="year-list">
                <span v-for="(item,index) in yearList"
                      :key="'year-list--'+index"
                      :class="currentYear === item ? 'highlight':''"
                      @click="selectedYear(item)"
                      v-text="item"/>
            </div>
        </div>

        <div v-show="visibleMonth" class="month-box">
            <div class="date-month-header">
                <div class="date-month-header-left">
                    <i class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left"
                       @click="year = year-1"/>
                </div>
                <div class="date-month-header-right">
                    <i class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-right"
                       @click="year = year+1"/>
                </div>
                <div class="date-month">
                    <span class="el-date-picker__header-label" @click="selectYear">
                        {{year}}&nbsp;年
                    </span>
                </div>
            </div>
            <div class="month-list">
                <span v-for="(item,index) in monthList"
                      :key="'month-list--'+index"
                      :class="month === item.value ? 'highlight':''"
                      @click="selectedMonth(item.value)"
                      v-text="item.text"/>
            </div>
        </div>
    </div>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';
  import { getStartDateOfMonth, nextDate } from './util';

  export default {
    name: 'XxmiDatePicker',
    props: {
      value: {
        type: [String, Array],
        default: '',
      },
    },
    data() {
      return {
        visibleYear: false, // 显示年选择框
        visibleMonth: false, // 显示月选择框
        currentDate: '', // 当前日期
        currentYear: 2018, // 当前年份
        currentMonth: 8, // 当前月份
        year: 2018,
        month: 8, // 注意：月份是从 0 - 11
        dateList: [], // 固定 42 个日期
        selectedDateList: [], // 选中的日期
        monthList: [
          { text: '一月', value: 0 },
          { text: '二月', value: 1 },
          { text: '三月', value: 2 },
          { text: '四月', value: 3 },
          { text: '五月', value: 4 },
          { text: '六月', value: 5 },
          { text: '七月', value: 6 },
          { text: '八月', value: 7 },
          { text: '九月', value: 8 },
          { text: '十月', value: 9 },
          { text: '十一月', value: 10 },
          { text: '十二月', value: 11 },
        ],
      };
    },
    computed: {
      yearList() {
        const startYear = Math.floor(this.year / 10) * 10;
        const yearList = [];
        for (let i = 0; i < 10; i++) {
          yearList.push(startYear + i);
        }
        return yearList;
      },
    },
    watch: {
      value() {
        this.init();
      },
    },
    created() {
      // 默认当前日期
      this.currentDate = moment().format('YYYY-MM-DD');
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.handler();
      this.init();
    },
    methods: {
      init() {
        this.selectedDateList = [];
        const { value } = this;
        let date = null;
        // 判断 value 是否为数组
        if (_.isArray(value) && value.length > 0) {
          const dateList = this.selectedDateList = this.value;
          // 取最后一条作为 year 和 month
          date = dateList[dateList.length - 1];
        } else if (!_.isArray(value) && value !== '') {
          // 字符串
          date = value;
          this.selectedDateList = [this.value];
        }
        if (date !== null) {
          const md = new Date(date);
          this.year = md.getFullYear();
          this.month = md.getMonth();
          this.handler();
        }
      },
      handler() {
        this.dateList = [];
        // 星期排列（日、一、二、三、四、五、六）
        // 1. 获取当前月的第一天所在星期的位置
        // const dayIndex = getFirstDayOfMonth(new Date());
        // 2. 获取当前月的最大天数
        // getDayCountOfMonth(2018, 8);
        let startDate = getStartDateOfMonth(this.year, this.month);
        let dataList = [];
        for (let i = 0; i < 42; i++) {
          const dateStr = moment(startDate).format('YYYY-MM-DD');
          dataList.push({ date: dateStr, day: moment(startDate).format('D') });
          startDate = nextDate(startDate);
        }
        this.dateList = dataList;
      },
      dateClass({ date }) {
        const { currentDate, year, month, selectedDateList } = this;
        const sw = `${year}-${(month + 1) < 10 ? '0' : ''}${(month + 1)}`;
        const clazz = [];
        if (!date.startsWith(sw)) {
          clazz.push('gray');
        }
        if (date === currentDate) {
          clazz.push('highlight');
        }
        if (selectedDateList.includes(date)) {
          clazz.push('active');
        }
        return clazz;
      },
      selectedDate({ date }) {
        const { value } = this;
        const { selectedDateList } = this;
        let selectVal;
        if (_.isArray(value)) {
          if (selectedDateList.includes(date)) {
            // 删除
            for (const [index, elem] of selectedDateList.entries()) {
              if (elem === date) {
                this.selectedDateList.splice(index, 1);
                break;
              }
            }
          } else {
            // 加入
            this.selectedDateList.push(date);
          }
          selectVal = this.selectedDateList;
        } else {
          this.selectedDateList = [date];
          selectVal = date;
        }
        this.$emit('update:value', selectVal);
        this.$emit('input', selectVal);
        this.$emit('change', selectVal);
      },
      prevYear() { // 上一年
        this.year = this.year - 1;
        this.handler();
      },
      nextYear() { // 下一年
        this.year = this.year + 1;
        this.handler();
      },
      prevMonth() { // 上一月
        const { month } = this;
        if (month === 0) {
          this.year = this.year - 1;
          this.month = 11;
        } else {
          this.month = this.month - 1;
        }
        this.handler();
      },
      nextMonth() { // 下一月
        const { month } = this;
        if (month === 11) {
          this.year = this.year + 1;
          this.month = 0;
        } else {
          this.month = this.month + 1;
        }
        this.handler();
      },
      selectYear() { // 显示年
        this.visibleMonth = false;
        this.visibleYear = true;
      },
      selectMonth() { // 显示月份
        this.visibleYear = false;
        this.visibleMonth = true;
      },
      selectedYear(year) { // 选中年份
        this.year = year;
        this.handler();
        this.selectMonth();
      },
      selectedMonth(month) { // 选中月份
        this.month = month;
        this.handler();
        this.visibleMonth = false;
      },
      mouseout({ date }) {
        this.$emit('mouseout', date);
      },
      mouseenter({ date }) {
        this.$emit('mouseenter', date);
      },
    },
  };
</script>

<style lang="less" src="./css/xxmi-date-picker.less"/>
