export default function CustomPaletteProvider(palette, create, elementFactory, spaceTool, lassoTool, handTool, globalConnect) {
    this._palette = palette;
    this._create = create;
    this._elementFactory = elementFactory;
    this._spaceTool = spaceTool;
    this._lassoTool = lassoTool;
    this._handTool = handTool;
    this._globalConnect = globalConnect;
  
    palette.registerProvider(this);
  }
  
  CustomPaletteProvider.$inject = [
    'palette',
    'create',
    'elementFactory',
    'spaceTool',
    'lassoTool',
    'handTool',
    'globalConnect'
  ];
  
  CustomPaletteProvider.prototype.getPaletteEntries = function(element) {
    var create = this._create;
    var elementFactory = this._elementFactory;
    var spaceTool = this._spaceTool;
    var lassoTool = this._lassoTool;
    var handTool = this._handTool;
    var globalConnect = this._globalConnect;
  
    function createTask() {
      return function(event) {
        var shape = elementFactory.createShape({ type: 'bpmn:Task' });
        create.start(event, shape);
      }
    }
  
    function createGateway() {
      return function(event) {
        var shape = elementFactory.createShape({ type: 'bpmn:ExclusiveGateway' });
        create.start(event, shape);
      }
    }
  
    // 返回左侧编辑工具的配置
    return {
      'create.task': {
        group: 'activity',
        className: 'bpmn-icon-task',
        title: '创建任务',
        action: {
          dragstart: createTask(),
          click: createTask()
        }
      },
  
      'hand-tool': {
        group: 'tools',
        className: 'bpmn-icon-hand-tool',
        title: '手动选择',
        action: {
          click: function(event) {
            handTool.activateHand(event);
          }
        }
      },
      'space-tool': {
        group: 'tools',
        className: 'bpmn-icon-space-tool',
        title: '空间工具',
        action: {
          click: function(event) {
            spaceTool.activateSelection(event);
          }
        }
      },
      'lasso-tool': {
        group: 'tools',
        className: 'bpmn-icon-lasso-tool',
        title: '套索工具',
        action: {
          click: function(event) {
            lassoTool.activateSelection(event);
          }
        }
      },
      'global-connect-tool': {
        group: 'tools',
        className: 'bpmn-icon-connection-multi',
        title: '连接',
        action: {
          click: function(event) {
            globalConnect.toggle(event);
          }
        }
      }
    };
  };