<template>
  <div class="containers">
    <div ref="canvas" class="canvas"></div>
    <!-- <div ref="canvas1" class="canvas"></div> -->
  </div>
</template>

<script>
import BpmnViewer from "bpmn-js/lib/NavigatedViewer";
export default {
  name: "BpmnViewer",
  props: {
    xmlData: {
      type: String,
      default: "",
    },
    taskData: {
      type: Array,
      default: () => [],
    },
    procTaskList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      taskList: [],
      bpmnViewer: null,
    };
  },
  mounted() {
    this.initData();
  },
  watch: {
    xmlData(newValue, oldValue) {
      if (newValue != oldValue) {
        // debugger;
        this.initData();
      }
    },
  },
  methods: {
    async initData() {
      this.bpmnViewer = null;
      this.taskList = this.taskData;
      if (document.querySelector(".bjs-container")) {
        document.querySelector(".canvas").removeChild(document.querySelector(".bjs-container"));
      }

      this.bpmnViewer = new BpmnViewer({
        container: this.$refs["canvas"],
        bpmnRenderer: {
          // defaultFillColor: "rgba(30,30,30,1)",
          // defaultStrokeColor: "red"
        },
      });
      // bpmnViewer.on('import.parse.start', (re) => {
      //   console.log(11111, re)
      // })
      // console.log('bpmnViewer', bpmnViewer)
      try {
        // let xmlData = this.xmlData.replace('xmlns:camunda', 'xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" xmlns:camunda')
        // console.log('xmlData', xmlData)

        const { warning } = await this.bpmnViewer.importXML(this.xmlData);
        // console.log('rendered', bpmnViewer);
        let canvas = this.bpmnViewer.get("canvas");

        var overlays = this.bpmnViewer.get("overlays");
        let addId = "";
        this.bpmnViewer.on("element.hover", (result) => {
          // console.log(result, "===开始===");
          if (result.element.type == "bpmn:Process") {
            return;
          }
          let htmlContent = "";
          if (this.procTaskList.length > 0) {
            this.procTaskList.forEach((res) => {
              htmlContent += "<p>" + res.procActName + "</p>";
              htmlContent += "<p>" + res.assigneeName + "</p>";
              htmlContent += "<p>" + res.assigneeDeptName + "</p>";
              htmlContent += "<p>" + res.approvalAction + "</p>";
            });
            addId = overlays.add(result.element, {
              position: {
                bottom: 0,
                right: 0,
                width: "500px",
              },

              html: htmlContent,
            });
          }
          // if (result.element.businessObject.extensionElements && result.element.businessObject.extensionElements.values.length > 0) {
          //   result.element.businessObject.extensionElements.values[0].$children.forEach((res) => {
          //     htmlContent += "<p>" + res.label + "</p>";
          //   });
          //   addId = overlays.add(result.element, {
          //     position: {
          //       bottom: 0,
          //       right: 0,
          //       width: "500px",
          //     },
          //     style: {
          //       width: "500px",
          //     },

          //     html: htmlContent,
          //   });
          // }
        });
        this.bpmnViewer.on("element.out", (result) => {
          overlays.remove(addId);
        });

        // console.log(overlays,'over')

        // canvas.zoom('fit-viewport')
        if (this.taskList && this.taskList.length > 0) {
          // let overlays = bpmnViewer.get('overlays');
          // let overlayHtml = document.createElement('div');
          // overlays.add('StartEvent_1', {
          //   position: {
          //     top: 0,
          //     right: 0,
          //   },
          //   html: overlayHtml
          // });
          // 判断开始节点或结束节点完成
          // const modeling = bpmnViewer.get('modeling')
          // modeling.setColor({ fill: 'red', stroke: 'red' })
          // console.log('bpmnViewer', bpmnViewer)
          // console.log('canvas', canvas)
          // bpmnViewer.getDefinitions().$attrs['xmlns:bioc'] = 'http://bpmn.io/schema/bpmn/biocolor/1.0'
          // bpmnViewer.getDefinitions().rootElements[0].di.planeElement.forEach(n => {
          //   // console.log(n)
          //   n['bioc:stroke'] = 'red'
          //   n['bioc:fill'] = "#E1BEE7"
          //   // console.log(n)
          // })
          // bpmnViewer.getDefinitions().diagrams[0].plane.planeElement.forEach(n => {
          //   // console.log(n)
          //   n['bioc:stroke'] = 'red'
          //   n['bioc:fill'] = "#E1BEE7"
          //   n.di = {'bioc:stroke': 'red'}
          //   // console.log(n)
          // })
          // console.log('bpmnViewer2', bpmnViewer.getDefinitions())
          // const result = await bpmnViewer._moddle.toXML(bpmnViewer.getDefinitions(), {});
          // console.log(result)
          // result.xml = result.xml.replace(/\n/g, '');
          // result.xml = result.xml.replace('xmlns:camunda', 'xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" xmlns:camunda')
          // result.xml = result.xml.replace('bpmnElement="EndEvent_1xgys24"', 'bpmnElement="EndEvent_1xgys24" bioc:stroke="#3399aa"')
          // let bpmnViewer1 = new BpmnViewer({
          //   container: this.$refs["canvas1"],
          //   bpmnRenderer: {
          //       // defaultFillColor: "rgba(30,30,30,1)",
          //       // defaultStrokeColor: "red"
          //   }
          // });
          // const { warning } = await bpmnViewer1.importXML(result.xml);
          // console.log('bpmnViewer', bpmnViewer1)
          // console.log(bpmnViewer.getDefinitions().rootElements[0].flowElements);
          this.bpmnViewer.getDefinitions().rootElements[0].flowElements.forEach((n) => {
            // console.log(n);
            if (n.$type === "bpmn:UserTask") {
              // debugger
              let completeTask = this.taskList.find((m) => m.modelActId === n.id);
              console.log(completeTask, 22222222222222222);
              let todoTask = this.taskList.find((m) => !m.completed);
              let endTask = this.taskList[this.taskList.length - 1];
              if (completeTask) {
                canvas.addMarker(n.id, completeTask.completed ? "highlight" : "highlight-todo");
                n.outgoing.forEach((nn) => {
                  console.log("outgoing", nn);
                  let targetTask = this.taskList.find((m) => m.modelActId === nn.id);
                  console.log("myTargetTask", targetTask, nn);
                  if (targetTask) {
                    canvas.addMarker(nn.id, targetTask.completed ? "highlight" : "highlight-todo");
                  } else if (nn.targetRef.$type === "bpmn:ExclusiveGateway") {
                    canvas.addMarker(nn.id, completeTask.completed ? "highlight" : "highlight-todo");
                    canvas.addMarker(nn.targetRef.id, completeTask.completed ? "highlight" : "highlight-todo");
                  } else if (nn.$type == "bpmn:SequenceFlow") {
                    canvas.addMarker(nn.id, completeTask.completed ? "highlight" : "highlight-todo");
                    // debugger;
                    if (nn.targetRef.$type === "bpmn:EndEvent") {
                      if (!todoTask && endTask.key === n.id) {
                        canvas.addMarker(nn.id, "highlight");
                        canvas.addMarker(nn.targetRef.id, "highlight");
                      }
                      if (!completeTask.completed) {
                        canvas.addMarker(nn.id, "highlight-todo");
                        canvas.addMarker(nn.targetRef.id, "highlight-todo");
                      }
                    }
                  } else if (nn.targetRef.$type === "bpmn:EndEvent") {
                    if (!todoTask && endTask.key === n.id) {
                      canvas.addMarker(nn.id, "highlight");
                      canvas.addMarker(nn.targetRef.id, "highlight");
                    }
                    if (!completeTask.completed) {
                      canvas.addMarker(nn.id, "highlight-todo");
                      canvas.addMarker(nn.targetRef.id, "highlight-todo");
                    }
                  }
                });
              }
            } else if (n.$type === "bpmn:ExclusiveGateway") {
              n.outgoing &&
                n.outgoing.forEach((nn) => {
                  let targetTask = this.taskList.find((m) => m.key === nn.targetRef.id);
                  if (targetTask) {
                    canvas.addMarker(nn.id, targetTask.completed ? "highlight" : "highlight-todo");
                  }
                });
            }
            if (n.$type === "bpmn:StartEvent") {
              let completeTask = this.taskList.find((m) => m.actName == "start");
              console.log(completeTask);
              if (completeTask && completeTask.completed) {
                canvas.addMarker(n.id, "highlight");
                canvas.addMarker("SequenceFlow_0hlm0mh", "highlight");
              }
              // debugger
              n.outgoing.forEach((nn) => {
                console.log(completeTask, "3333");
                if (completeTask) {
                  canvas.addMarker(n.id, "highlight");
                  canvas.addMarker(nn.id, "highlight");
                  return;
                }
              });
            }
          });
        }
      } catch (err) {
        console.log("error rendering", err);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.containers {
  position: absolute;
  background-color: #ffffff;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.canvas {
  width: 100%;
  height: 100%;
}
/deep/.highlight.djs-shape .djs-visual > :nth-child(1) {
  fill: green !important;
  stroke: green !important;
  fill-opacity: 0.2 !important;
}
/deep/.highlight.djs-shape .djs-visual > :nth-child(2) {
  fill: green !important;
}
/deep/.highlight.djs-shape .djs-visual > path {
  fill: green !important;
  fill-opacity: 0.2 !important;
  stroke: green !important;
}
/deep/.highlight.djs-connection > .djs-visual > path {
  stroke: green !important;
}
/deep/.highlight-todo.djs-connection > .djs-visual > path {
  stroke: orange !important;
  stroke-dasharray: 4px !important;
  fill-opacity: 0.2 !important;
  marker-end: url(#sequenceflow-end-_E7DFDF-_E7DFDF-803g1kf6zwzmcig1y2ulm5egr);
}
/deep/.highlight-todo.djs-shape .djs-visual > :nth-child(1) {
  fill: orange !important;
  stroke: orange !important;
  stroke-dasharray: 4px !important;
  fill-opacity: 0.2 !important;
}
/deep/.overlays-div {
  font-size: 10px;
  color: red;
  width: 100px;
  top: -20px !important;
}

/deep/.djs-overlay {
  background-color: rgba(66, 180, 21, 0.7);
  color: White;
  border-radius: 5px;
  font-family: Arial;
  font-size: 12px;
  padding: 5px;
  min-height: 16px;
  min-width: 100px;
  text-align: center;
}
</style>
