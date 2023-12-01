<template>
  <div id="app">
    <div class="tabs">
      <div class="tab" @click="active = 1">dome1</div>
      <div class="tab" @click="active = 2">dome2</div>
      <div class="tab" @click="active = 3">dome3</div>
      <div class="tab" @click="active = 4">dome4</div>
    </div>
    <BpmnModeler v-if="active == 1" ref="modeler" v-model="modeler" :diagramXML="propXmlData" propertiesPanel></BpmnModeler>
    <BpmnViewer v-else :xmlData="getXmlData" :taskData="(active == 2 || active == 3) ? propTaskList : elementList" :procTaskList="approvalLogList"></BpmnViewer>

    <!-- <BpmnViewer :xmlData="diagram" v-else-if="active == 3" :taskData="propTaskList"></BpmnViewer> -->
    <!-- <BpmnViewer :xmlData="dome2" v-else-if="active == 4" :taskData="elementList" :procTaskList="approvalLogList"></BpmnViewer> -->

    <button @click="addTask" class="button" v-if="$refs.modeler">add task</button>

    <span download="sospp.svg" class="download" title="Download as BPMN 2.0 file" ref="saveDiagram" @click="saveDiagram">
      下载
    </span>
    <span class="download1" title="Download as BPMN 2.0 file" ref="saveDiagram" @click="saveFile">
      下载文件
    </span>
  </div>
</template>
<script>
import demo from "./demo.bpmn";
import view from "./view.bpmn";
import diagram from "./diagram.bpmn";
import dome2 from "./demo2.bpmn";

export default {
  data() {
    return {
      active: 1,
      propXmlData: "",
      viewData: view,
      diagram: diagram,
      dome2: dome2,
      propTaskList: [
        {
          key: "Task_1hcentk",
          completed: true,
        },
        {
          key: "Activity_1pjph9d",
          completed: true,
        },
        {
          key: "Activity_0z1zkk2",
          completed: false,
        },
        {
          key: "UserTask_06zjapk",
          completed: true,
        },
        {
          key: "UserTask_07cj5cp",
          completed: true,
        },
        {
          key: "UserTask_0hkfnx2",
          completed: true,
        },
        {
          key: "UserTask_1pvvtgn",
          completed: true,
        },
        {
          //Task_0vtq55b
          key: "Task_02tadrd",
          completed: false,
        },
      ],

      elementList: [
        { completed: true, current: false, actId: "8885740e0188bcfc39498ae49eb329f2", modelActId: "S73ef765e2484cb6b829590bb943c5b7", actInstId: null, actName: "start", actEnName: null, procActType: 0, actInstStatus: null, activateAction: null, beforeSequenceFlow: false, afterSequenceFlow: false, actSubInstInfoList: null, actRecycleInstList: null, actInitiateList: null, actRecycleList: null },
        { completed: false, current: false, actId: "8885740e0188bcfc39498ae49eb329f3", modelActId: "Ec4bc946f9951c15bea1169a024b6f01", actInstId: null, actName: "end", actEnName: null, procActType: 9, actInstStatus: null, activateAction: null, beforeSequenceFlow: false, afterSequenceFlow: false, actSubInstInfoList: null, actRecycleInstList: null, actInitiateList: null, actRecycleList: null },
        { completed: true, current: false, actId: "8885740e0188bcfc39498ae49eb329f4", modelActId: "Ue7be4c211089709915541bae0e6b5b7", actInstId: "8b76c575018b8330d20e8ae49eb2071f", actName: "提出申请", actEnName: "null", procActType: 1, actInstStatus: 1, activateAction: 0, beforeSequenceFlow: true, afterSequenceFlow: true, actSubInstInfoList: null, actRecycleInstList: null, actInitiateList: null, actRecycleList: null },
        { completed: false, current: true, actId: "8885740e0188bcfc39498ae49eb329f5", modelActId: "U6e2482b2c20967c90192cd10edd5eef", actInstId: "8b76c575018b8330d2178ae49eb20720", actName: "项目经理审核(手动选择)", actEnName: "null", procActType: 1, actInstStatus: 0, activateAction: 0, beforeSequenceFlow: true, afterSequenceFlow: false, actSubInstInfoList: null, actRecycleInstList: null, actInitiateList: null, actRecycleList: null },
        { completed: false, current: false, actId: "8885740e0188bcfc39498ae49eb329f6", modelActId: "U9ab47d32cf02d359a7f3d8ca073ffc9", actInstId: null, actName: "开发团队负责人确认(手动选择)", actEnName: "null", procActType: 1, actInstStatus: null, activateAction: null, beforeSequenceFlow: false, afterSequenceFlow: false, actSubInstInfoList: null, actRecycleInstList: null, actInitiateList: null, actRecycleList: null },
      ],
      approvalLogList: [
        {
          appDefCode: "PDCM",
          id: "8b76c575018b8330d21b8ae49eb20722",
          procInstId: "8b76c575018b8330cc828ae49eb2071d",
          procActId: "8885740e0188bcfc39498ae49eb329f4",
          procActName: "提出申请",
          procActEnName: "null",
          procActInstId: "8b76c575018b8330d20e8ae49eb2071f",
          procTaskId: "8b76c575018b8330d21b8ae49eb20721",
          assigneeId: "P631573",
          cosignItemCode: null,
          cosignItemName: null,
          assigneeName: "李主快",
          assigneeDeptId: "50543124",
          assigneeDeptName: "数据技术",
          assigneeDeptPath: "00888888\\50426670\\50539131\\50539193\\50543124",
          approvalAction: "发起流程",
          approvalActionEn: null,
          approvalComment: null,
          targetActList: '[{"actEnName":"null","actID":"8885740e0188bcfc39498ae49eb329f5","actName":"项目经理审核(手动选择)","actTaskType":0,"allTaskDone":0,"alone":0,"approvalMode":1,"approvalRule":0,"assigneeList":[{"userID":"P623258","userName":"易磊"}],"automatic":0}]',
          assignTime: "2023-10-31 08:44:57",
          completedTime: "2023-10-31 08:44:57",
          duration: 0,
          status: 0,
          creatorName: "李主快",
        },
      ],
      procTaskList: [{ appDefCode: "PDCM", id: "8b76c575018b8330d2378ae49eb20723", procInstId: "8b76c575018b8330cc828ae49eb2071d", procActId: "8885740e0188bcfc39498ae49eb329f5", procActName: "项目经理审核(手动选择)", procActEnName: "null", procActInstId: "8b76c575018b8330d2178ae49eb20720", assigneeId: "P623258", assigneeName: "易磊", assigneeDeptId: null, assigneeDeptName: null, assigneeDeptPath: null, cosignItemCode: null, cosignItemName: null, assignTime: 1698713097000, openTime: null, completedTime: null, approvalComment: null, status: 0, creatorId: "P631573", creatorName: "李主快", createTime: 1698713097000, updaterId: null, updaterName: null, updateTime: null, tenantId: "tenCode", timeStamp: 1698713097000, isShareTask: null, shareType: null, taskType: "0", parentTaskId: null }],
      sharkTaskList: null,
      procTaskHistList: null,
      modeler: {
        xmlData: "",
        svgImage: "",
      },
    };
  },
  watch: {
    modeler(val) {
      console.log(val);
    },
  },
  methods: {
    saveFile() {
      const encodedData = encodeURIComponent(this.modeler.xmlData);
      const link = document.createElement("a");
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字，data可用于调用接口保存修改
      let xmlFile = new File([this.modeler.xmlData], "test.bpmn");
      console.log(xmlFile);
      if (this.modeler.xmlData) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = Date.now() + ".bpmn";
        link.click();
      }
    },
    saveDiagram(done) {
      const encodedData = encodeURIComponent(this.modeler.svgImage);
      const link = document.createElement("a");
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字，data可用于调用接口保存修改
      let xmlFile = new File([this.modeler.svgImage], "test.bpmn");
      console.log(xmlFile);
      if (this.modeler.svgImage) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = Date.now() + ".svg";
        link.click();
      }
    },
    down() {
      console.log(333333);
    },
    test(list) {
      console.log(list);
    },
    addTask() {
      let taskList = [];
      if (Math.round(Math.random()) === 0) {
        taskList = [
          {
            label: "test task1",
          },
          {
            label: "通用节点",
          },
        ];
      } else {
        taskList = [
          // {
          //   label: 'test task1'
          // }
        ];
      }
      let addOrReplace = {
        replaceActivity: "UserTask_0hkfnx2",
        taskList: taskList,
      };
      this.$refs.modeler.replace(addOrReplace).then((data) => {
        // new task list
        console.log(data);
      });
    },
  },
  computed:{
    getXmlData(){
      let xml=""
      xml=this.active == 2 ? this.viewData : (this.active == 3 ? this.diagram : this.dome2)
      console.log(xml)
      return xml
    }
  }
};
</script>
<style lang="less">
.tabs {
  position: absolute;
  z-index: 500;
  left: 50%;
  // transform: translateX(-50%);
  height: 50px;
  width: 100vw;
  .tab {
    float: left;
    width: 100px;
    height: 100%;
    line-height: 50px;
    background: greenyellow;
    color: #333;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: orange;
      color: #fff;
    }
  }
}
.download1 {
  width: 50px;
  height: 60px;
  background: pink;
  position: absolute;
  left: 2px;
  top: 60px;
}
.download {
  width: 50px;
  height: 60px;
  background: pink;
  position: absolute;
  left: 2px;
  top: 6px;
}
.button {
  position: absolute;
  right: 15px;
  bottom: 100px;
  height: 40px;
  width: 80px;
  z-index: 100;
  color: green;
  background: rgba(0, 128, 0, 0.2);
  border: 1px solid rgb(0, 128, 0);
  border-radius: 4px;
}
</style>
