<template>
    <section class="date">
        当前选择日期：{{selectDateString}}
        <hr>
        <xxmi-date-picker v-model="selectDate" :change-enable="false" @click="clickDate"/>
    </section>
</template>

<script>
  export default {
    name: 'date',
    data() {
      return {
        selectDate: ['2019-05-11', '2019-05-13', '2019-05-20'],
      };
    },
    computed: {
      selectDateString() {
        return this.selectDate.join(',');
      },
    },
    methods: {
      clickDate(dataList, date, include) {
        console.log(dataList, date, include);
      },
    },
  };
</script>

<style scoped>

</style>
