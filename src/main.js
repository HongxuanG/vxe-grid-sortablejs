import { createApp } from "vue";
import App from "./App.vue";
import "vxe-table/lib/style.css";
import "xe-utils";
import VXETable from "vxe-table";

const useTable = (app) => {
  VXETable.setup({
    size: "mini"
  });
  app.use(VXETable);
  // 给 vue 实例挂载内部对象，例如：
  // app.config.globalProperties.$XModal = VXETable.modal
  // app.config.globalProperties.$XPrint = VXETable.print
  // app.config.globalProperties.$XSaveFile = VXETable.saveFile
  // app.config.globalProperties.$XReadFile = VXETable.readFile
};
const app = createApp(App);
useTable(app);
app.mount("#app");
