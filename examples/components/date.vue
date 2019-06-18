<template>
    <section class="date">
        当前选择日期：{{selectDate}}
        <hr>
        <xxmi-date-picker v-model="selectDate"/>
    </section>
</template>

<script>
  export default {
    name: 'date',
    data() {
      return {
        selectDate: null,
      };
    },
  };
</script>

<style scoped>

</style>