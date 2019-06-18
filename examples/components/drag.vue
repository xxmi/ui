<template>
    <section class="drag">
        <section class="drag__left">
            <draggable
                    class="list-group"
                    tag="ul"
                    v-model="leftList"
                    v-bind="dragOptions"
                    @start="isDragging = true"
                    @end="isDragging = false"
            >
                <li class="list-group-item"
                    v-for="(element,index) in leftList"
                    :key="'g'+index">
                    {{ element.componenName }}
                    {{element.sortId}}
                </li>
            </draggable>
        </section>
        <section class="drag__right">
            <draggable
                    class="list-group"
                    tag="ul"
                    v-model="rightList"
                    v-bind="dragOptions"
                    @start="isDragging = true"
                    @end="isDragging = false"
            >
                <li class="list-group-item"
                    v-for="(element,index) in rightList"
                    :key="'g'+index">
                    {{ element.componenName }}
                    {{element.sortId}}
                </li>
            </draggable>
        </section>
    </section>
</template>

<script>
  import draggable from 'vuedraggable';

  const modules = [
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 2,
      'componentId': 'compQwEcharts',
      'componenCategory': '实用化统计',
      'componenName': '全网实用化指标',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 3,
      'componentId': 'compYwzpqk',
      'componenCategory': '实用化统计',
      'componenName': '业务自评情况',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 4,
      'componentId': 'compDeptPracticalGrade',
      'componenCategory': '实用化统计',
      'componenName': '部门实用化指标分数',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-3',
      'sortId': 1,
      'componentId': 'compUserInfo',
      'componenCategory': '公共',
      'componenName': '用户信息',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-3',
      'sortId': 3,
      'componentId': 'compOftenUseMenu',
      'componenCategory': '公共',
      'componenName': '常用菜单',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 5,
      'componentId': 'compUserActivityRate',
      'componenCategory': '实用化统计',
      'componenName': '部门用户活跃率情况',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-3',
      'sortId': 2,
      'componentId': 'compNotice',
      'componenCategory': '公共',
      'componenName': '通知公告',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 6,
      'componentId': 'compDeptScoresRate',
      'componenCategory': '实用化统计',
      'componenName': '部门得分情况',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 7,
      'componentId': 'compBusinessStandard',
      'componenCategory': '实用化统计',
      'componenName': '业务本月达标情况',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 8,
      'componentId': 'compYwlczpcx',
      'componenCategory': '实用化统计',
      'componenName': '业务流程自评查询',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 1,
      'componentId': 'compDbTable',
      'componenCategory': '公共',
      'componenName': '待办',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 9,
      'componentId': 'compQsEcharts',
      'componenCategory': '实用化统计',
      'componenName': '全省实用化指标',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 10,
      'componentId': 'compBmdflpm',
      'componenCategory': '实用化统计',
      'componenName': '部门得分率排名',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 11,
      'componentId': 'compGrsx',
      'componenCategory': '公共',
      'componenName': '工作历',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 12,
      'componentId': 'compZdhjxDzxTable',
      'componenCategory': '自动化专用',
      'componenName': '执行中任务',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 13,
      'componentId': 'compZdhjxDshTable',
      'componenCategory': '自动化专用',
      'componenName': '待审核任务',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-3',
      'sortId': 4,
      'componentId': 'compZdhNotice',
      'componenCategory': '自动化专用',
      'componenName': '值班公告备忘录',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-3',
      'sortId': 5,
      'componentId': 'compZsczjlTable',
      'componenCategory': '自动化专用',
      'componenName': '置数操作记录',
    },
    {
      'showStatus': 1,
      'expandStatus': 1,
      'compType': 'col-lg-9',
      'sortId': 14,
      'componentId': 'compZdhjxDksTable',
      'componenCategory': '自动化专用',
      'componenName': '待开始执行任务',
    },
  ];
  export default {
    name: 'drag',
    components: {
      draggable,
    },
    data() {
      return {
        leftList: modules.filter(item => item.compType === 'col-lg-3').sort((a, b) => a.sortId - b.sortId),
        rightList: modules.filter(item => item.compType === 'col-lg-9').sort((a, b) => a.sortId - b.sortId),
      };
    },
    computed: {
      dragOptions() {
        return {
          animation: 300,
          disabled: false,
          ghostClass: 'ghost',
        };
      },
    },
  };
</script>

<style>
    ul, li {
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: left;
    }

    .drag__left {
        display: inline-block;
        width: 30%;
        padding: 50px;
        vertical-align: top;
        box-sizing: border-box;
    }

    .drag__right {
        display: inline-block;
        width: 70%;
        padding: 50px;
        box-sizing: border-box;
    }

    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }

    .list-group {
        border: 1px solid blue;
        min-height: 20px;
    }

    .list-group-item {
        list-style: none;
        cursor: move;
        height: 100px;
        line-height: 40px;
        border-bottom: 1px solid blue;
        background-color: #F2F2F2;
    }

    .list-group-item:last-child {
        border: none;
    }

    .list-group-item i {
        cursor: pointer;
    }
</style>