<template>
  <vxe-grid
    ref="grid"
    v-bind="gridOptions"
    :columns="columns"
    :loading="loading"
    :column-config="{
      useKey: true,
    }"
    :key="tableKey"
    :scroll-y="{ enabled: false }"
  ></vxe-grid>

  <button @click="handleBackgroundMove">开始background向后交换位置</button>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  unref,
  onMounted,
  watch,
  nextTick,
  onUnmounted,
} from "vue";
import { VxeGridProps, VxeGridInstance, VXETable } from "vxe-table";
import Sortable from "sortablejs";
const loading = ref(false);
const grid = ref({} as VxeGridInstance);
const tableKey = ref(0);
let sortable: any = null;
let fixedLeftSortable: any = null;
let fixedRightSortable: any = null;
// 列
const columns = ref<VxeGridProps['columns']>([
  { type: "checkbox", width: 50, fixed: "left" },
  { type: "seq", width: 60, fixed: "left" },
  { field: "name", width: 100, fixed: "left", title: "Name", sortable: true },
  { field: "sex", width: 100, title: "sex", sortable: true },
  { field: "nickname", width: 100, title: "Nickname", sortable: true },
  { field: "funny", width: 100, title: "funny", sortable: true },
  { field: "background", width: 120, title: "background", sortable: true },
  { field: "role", width: 100, title: "Role", sortable: true },
  {
    field: "address",
    title: "Address",
    width: 130,
    showOverflow: true,
    sortable: true,
  },
  { field: "age", title: "age", width: 100, fixed: "right", sortable: true },
  {
    field: "hobby",
    title: "hobby",
    width: 100,
    fixed: "right",
    sortable: true,
  },
]);
const gridOptions = reactive<VxeGridProps>({
  border: true,
  height: 400,
  columnConfig: {
    resizable: true,
  },
  pagerConfig: {
    pageSize: 10,
  },
  proxyConfig: {
    seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
    props: {
      result: "result",
      total: "page.total",
    },
    ajax: {
      // 接收 Promise
      query: ({ page }) => {
        return new Promise((resolve) => {
          loading.value = true;
          setTimeout(() => {
            const list = [
              {
                id: 10001,
                name: "Test1",
                nickname: "T1",
                role: "Develop",
                sex: "Man",
                age: 28,
                address: "Shenzhen",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 10002,
                name: "Test2",
                nickname: "T2",
                role: "Test",
                sex: "Women",
                age: 22,
                address: "Guangzhou",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 10003,
                name: "Test3",
                nickname: "T3",
                role: "PM",
                sex: "Man",
                age: 32,
                address: "Shanghai",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 10004,
                name: "Test4",
                nickname: "T4",
                role: "Designer",
                sex: "Women",
                age: 23,
                address: "test abc",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 10005,
                name: "Test5",
                nickname: "T5",
                role: "Develop",
                sex: "Women",
                age: 30,
                address: "Shanghai",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 10006,
                name: "Test6",
                nickname: "T6",
                role: "Designer",
                sex: "Women",
                age: 21,
                address: "Shenzhen",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 10007,
                name: "Test7",
                nickname: "T7",
                role: "Test",
                sex: "Man",
                age: 29,
                address: "Shenzhen",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 10008,
                name: "Test8",
                nickname: "T8",
                role: "Develop",
                sex: "Man",
                age: 35,
                address: "test abc",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 10009,
                name: "Test9",
                nickname: "T9",
                role: "Develop",
                sex: "Man",
                age: 35,
                address: "Shenzhen",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 100010,
                name: "Test10",
                nickname: "T10",
                role: "Develop",
                sex: "Man",
                age: 35,
                address: "Guangzhou",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 100011,
                name: "Test10",
                nickname: "T10",
                role: "Develop",
                sex: "Man",
                age: 35,
                address: "Guangzhou",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 100012,
                name: "Test10",
                nickname: "T10",
                role: "Develop",
                sex: "Man",
                age: 35,
                address: "Guangzhou",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 100013,
                name: "Test10",
                nickname: "T10",
                role: "Develop",
                sex: "Man",
                age: 35,
                address: "Guangzhou",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 100014,
                name: "Test10",
                nickname: "T10",
                role: "Develop",
                sex: "Man",
                age: 35,
                address: "Guangzhou",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 100015,
                name: "Test10",
                nickname: "T10",
                role: "Develop",
                sex: "Man",
                age: 35,
                address: "Guangzhou",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
              {
                id: 100016,
                name: "Test10",
                nickname: "T10",
                role: "Develop",
                sex: "Man",
                age: 35,
                address: "Guangzhou",
                background: "梅西儿子",
                funny: "aaa",
                hobby: "Shenzhenasdfadsfasdf",
              },
            ];
            loading.value = false;
            resolve({
              page: {
                total: list.length,
              },
              result: list.slice(
                (page.currentPage - 1) * page.pageSize,
                page.currentPage * page.pageSize
              ),
            });
          }, 1000);
        });
      },
    },
  },
});

// background 字段 交换位置
const handleBackgroundMove = () => {
  const originColumns = unref(columns.value!);
  const temp = [...originColumns];
  const index = originColumns.findIndex((col) => col.field === "background");
  const target = originColumns.find((col) => col.field === "background")!;
  console.log("before delete originColumns", temp, index);
  originColumns.splice(index, 2, originColumns[index + 1], target);
  console.log("after delete originColumns", originColumns, index);
  // originColumns[index + 1] = target;
  columns.value = originColumns;
  grid.value.loadColumn(originColumns);
};

// const showTooltipMethod = () => {
//   return "";
// };
// const El = ref({} as HTMLElement)
// const handleColumnDrop = () => {
//   nextTick(() => {
//     console.log("grid", grid.value.$el);
//     const xGrid = grid.value;
//     sortable = Sortable.create(
//       xGrid.$el.querySelector(
//         ".body--wrapper>.vxe-table--header .vxe-header--row"
//       ),
//       {
//         onEnd: ({ oldIndex, newIndex }) => {
//           const originColumns = unref(columns.value);
//           const currentCol = originColumns.splice(oldIndex, 1)[0];
//           originColumns.splice(newIndex, 0, currentCol);
//           columns.value = originColumns;
//           console.log("on end event obj", oldIndex, newIndex);
//           xGrid.reloadColumn(originColumns);
//           // tableKey.value++;
//         },
//       }
//     );
//   });
// };
// watch(
//   tableKey,
//   () => {
//     if (sortable) {
//       sortable.destroy();
//     }
//     handleColumnDrop();
//   },
//   {
//     immediate: true,
//   }
// );
// 鼠标点击表单头
// const handleHeaderCellClick = ({ column }) => {
//   console.log("handleHeaderCellClick", column);
//   const xGrid = grid.value;
//   switch (column.fixed) {
//     case 'left':
//       El.value = xGrid.$el.querySelector(
//         ".fixed-left--wrapper>.vxe-table--header .vxe-header--row"
//       )
//       break
//     case 'right':
//       El.value = xGrid.$el.querySelector(
//         ".fixed-right--wrapper>.vxe-table--header .vxe-header--row"
//       )
//       break
//     default:
//       El.value = xGrid.$el.querySelector(
//         ".body--wrapper>.vxe-table--header .vxe-header--row"
//       )
//       break
//   }
// };
const onDragEnd = ({ oldIndex, newIndex, item, to, from, oldDraggableIndex, newDraggableIndex }) => {
  console.log('item', item)
  console.log('to', to)
  console.log('from', from)
  console.log('oldDraggableIndex', oldDraggableIndex)
  console.log('newDraggableIndex', newDraggableIndex)
  const xGrid = grid.value;
  const originColumns = unref(columns.value!);
  const { fullColumn } = xGrid.getTableColumn();
  console.log("fullColumn", fullColumn);
  const newColumn = fullColumn[newIndex];
  const currentCol = originColumns.splice(oldIndex, 1)[0];
  currentCol.fixed = newColumn.fixed;
  originColumns.splice(newIndex, 0, currentCol);
  columns.value = originColumns;
  console.log("on end event obj", oldIndex, newIndex, originColumns);
  xGrid.loadColumn(originColumns);
}
const initMainSortable = () => {
  const xGrid = grid.value;
  console.log('getScroll',xGrid.getScroll())
  console.log('main',xGrid.$el);
  sortable = Sortable.create(
    xGrid.$el.querySelector(
      ".body--wrapper>.vxe-table--header .vxe-header--row"
    ),
    {
      group: 'shared',
      onEnd: onDragEnd,
    }
  );
}
const initFixedLeftSortable = () => {
  const xGrid = grid.value;
  console.log('left',xGrid.$el);
  const fixedLeftElementWrapper = xGrid.$el.querySelector(
    ".fixed-left--wrapper>.vxe-table--header .vxe-header--row"
  ) as HTMLElement
  if(fixedLeftElementWrapper){
    fixedLeftSortable = Sortable.create(fixedLeftElementWrapper, {
      group: 'shared',
      onEnd: onDragEnd,
    })
  }
}
const initFixedRightSortable = () => {
  const xGrid = grid.value;
  const fixedRightElementWrapper = xGrid.$el.querySelector(
    ".fixed-right--wrapper>.vxe-table--header .vxe-header--row"
  ) as HTMLElement
  if(fixedRightElementWrapper){
    fixedRightSortable = Sortable.create(fixedRightElementWrapper, {
      group: 'shared',
      onEnd: onDragEnd,
    })
  }
}
let initTime: number
let _first = true
nextTick(() => {
  // 加载完成之后在绑定拖动事件
  initTime = setTimeout(() => {
    initMainSortable()
    initFixedLeftSortable()
    initFixedRightSortable()
    _first = false
  }, 500)
})
// 监听表格大小变化
const resizeObserver = new ResizeObserver(() => {
  if(!_first) {
    initMainSortable()
    initFixedLeftSortable()
    initFixedRightSortable()
    console.log('Size changed');
  }
});
onMounted(() => {
  resizeObserver.observe(grid.value.$el);
});
onUnmounted(() => {
  clearTimeout(initTime)
  sortable?.destroy();
  fixedLeftSortable?.destroy();
  fixedRightSortable?.destroy();
});

</script>

<style>
</style>
