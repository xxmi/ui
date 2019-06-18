<template>
    <div id="app">
        <router-link to="/drag">拖动布局</router-link>
        <br>
        <router-link to="/date">日期</router-link>
        <hr>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: left;
        color: #2c3e50;
        padding: 50px;
    }
</style>
