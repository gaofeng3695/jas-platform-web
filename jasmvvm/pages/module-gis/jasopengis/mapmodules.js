/**
 * Created by kc on 2018/1/19.
 * @description jasopengis webgis 地图控件
 * @version jasopengis-v-1.0.0
 * @lastUpdate 2018/06/04
 */
/****地图基本控件****/
var BaseMapModule = function () {
    var _self = this ;
    _self.mapApi = null; //
    _self.index = null; //
    _self.state = "closed"; //open/closed /hidden/ show
    _self.container = null; //容器dom
    _self.dom = null; //模块的dom节点
    _self.moduleClass = "base-map-module"; //模块类
    _self.template = null;
    _self.startup = function () {
        _self.mapApi.publish(_self.mapApi.Events.ModuleStartupEvent, {
            id: _self.id
        });

    };
    _self.domCreate = function () {
        $(_self.template).load(function (e) {
            _self.mapApi.publish(_self.mapApi.Events.ModuleInitEvent, {
                target: _self
            });
        });
    };
    _self.show = function (flg) {
        //true:show , false:hidden

    };
    _self.open = function (flg) {
        //true:open , false:close

    };
    this.destroy = function () {
        //销毁
        //document.removeChild(_class.dom);//

    }
};
/**
 * 地图控件-地图工具条
 * @param dom
 * @param data
 * @constructor
 */
var BaseMapToolsBar = function (options) {
    var _self = this;
    var defaults = {
        "position": [0, 0.5],
        "iconHeight": 30,
        "iconWidth": 30
    };
    var params = $.extend(defaults, options);
    var onModuleStateChanged = function (e) {
        var module = e.data.module;
        $("li.toggle", _self.dom).each(function (v, i) {
            var $icon = $("img", this);
            if ($icon.attr("dataaccess-target") === module.id) {
                _self.iconSelectedChanged($(this), module.state === "open" ? true : false);
            }
        });
    };
    var onMapResized = function (e) {
        _self.resetLayout(); //
    };
    _self.label = "地图工具条";
    _self.apiDefaults = {
        "zoomHome":{
            "label": "地图复位",
            "index": "",
            "icon": "stylepath:images/reset.png"
        },
        "startPanMode":{
            "label": "地图导航",
            "index": "",
            "icon": "stylepath:images/mapPan.png"
        },
        "zoomIn":{
            "label": "拖拽放大地图",
            "index": "",
            "icon": "stylepath:images/zoomIn.png"
        },
        "zoomOut":{
            "label": "拖拽缩小地图",
            "index": "",
            "icon": "stylepath:images/zoomOut.png"
        },
        "drawLineAndGetLength":{
            "label": "距离测量",
            "index": "",
            "icon": "stylepath:images/measureDistance.png",
            "toggle": true
        },
        "drawPolygonAndGetArea":{
            "label": "面积测量",
            "index": "",
            "icon": "stylepath:images/measureArea.png",
            "toggle": true
        },
        "clearAllGraphics":{
            "label": "清除标记",
            "index": "",
            "icon": "stylepath:images/clear.png"
        },
        "export":{
            "label":"导出图片",
            "index":"",
            "toggle":true,
            "icon":"stylepath:images/export.png"
        }
    };
    _self.BaseToolItem = function(){
        return {
            target: null, //moduleId,apiName
            type: "module", //api,module
            icon: "basepath:images/missing.png", //设置默认的图标
            label: null,
            index: 0,
            toggle: false // 默认false
        }
    };

    //
    _self.moduleClass = "map-module-basemaptoolsbar";
    _self.template =
        "<div class='" + _self.moduleClass + "' style='display:none;'>" +
        "<ul class='ToolsList'></ul>" +
        "</div>";
    _self.addToolItems = function () {
        var $list = $("ul", _self.dom);
        for (var i = 0; i < _self.moduleSet.length; i++) {
            var item = new _self.BaseToolItem();
            var m = _self.moduleSet[i];
            var it = null;
            if( m.type === "api" && _self.apiDefaults[m.target]){
                it = $.extend({},_self.apiDefaults[m.target],m);
            }else{
                it = $.extend({},item, m);
            }
            var $li = $("<li></li>");
            if (it.toggle) {
                $li.addClass("toggle");
            }
            if (it.type === "module") {
                var module = _self.mapApi.getModuleById(it.target);
                if (module === null) {
                    _self.mapApi.publish(_self.mapApi.Events.ErrorEvent, {
                        message: _self.mapApi.Strings.moduleNotFound + ",id=" + it.target,
                        type: "error"
                    });
                    continue;
                }
                it.label = module.label;
                it.icon = it.icon === "basepath:images/missing.png" && module.icon ?  module.icon:it.icon ;
            }
            if(it.icon){
                it.icon = _self.mapApi.commonUtil.getApiRootPath(it.icon);
            }
            var $icon = $("<img dataaccess-target='" + it.target + "' dataaccess-type='" + it.type + "' src='" + it.icon + "' title='" + it.label + "' />");
            $icon.css("height", params.iconHeight + "px");
            $icon.css("width", params.iconWidth + "px");
            $li.append($icon);
            $list.append($li[0]);
        }
    };
    _self.resetLayout = function () {
        // var containerWidth = $(_self.container).width();
        // var containerHeight = $(_self.container).height();
        var barWidth = $(_self.dom).width();
        var containerWidth = $(_self.container).width();
        // var topPersent = params.position[0];
        // var leftPersent = params.position[1];
        // var marginLeft = (containerWidth - barWidth) * leftPersent;
        // var marginTop = (containerHeight - barWidth) * leftPersent;
        $(_self.dom).css("margin-left", (containerWidth - barWidth) / 2);
    };
    _self.addToolsItemClickListener = function () {
        //click
        $("img", _self.dom).click(function (e) {
            var type = $(e.currentTarget).attr("dataaccess-type");
            var target = $(e.currentTarget).attr("dataaccess-target");
            var toggle = $(e.currentTarget).attr("dataaccess-toggle");
            if (type === "module") {
                var module = _self.mapApi.getModuleById(target);
                if (module) {
                    if (open !== "open") {
                        module.open(true);
                    } else {
                        module.open(false);
                    }
                }
            } else if (type === "api") {
                _self.mapApi[target]();
            }
        });
        //hover
        $("img", _self.dom).hover(function (e) {
            var target = $(e.currentTarget).attr("dataaccess-target");
            var toggle = $(e.currentTarget).attr("dataaccess-toggle");
            var src = $(e.currentTarget).attr("src");
            var lastDotIndex = src.lastIndexOf(".");
            var str1 = src.substring(0,lastDotIndex);
            var str2 = src.substring(lastDotIndex,src.length);
            src = str1 + "_h" + str2;
            $(e.currentTarget).attr("src",src);
        },function(e){
            var src = $(e.currentTarget).attr("src");
            src = src.replace("_h.",".");
            $(e.currentTarget).attr("src",src);
        });
    };
    _self.iconSelectedChanged = function ($dom, selected) {
        var flg = true;
        if ($dom.hasClass("toggle")) {
            if (selected !== undefined) {
                if (!selected)
                    $dom.removeClass("selected");
                else
                    $dom.addClass("selected");
            } else {
                if ($dom.hasClass("selected")) {
                    $dom.removeClass("selected");
                    flg = false;
                } else {
                    $dom.addClass("selected");
                    flg = true;
                }
            }
        }
        return flg;
    };
    _self.show = function (flg) {
        if (flg === true) {
            $(_self.dom).show();
        } else {
            $(_self.dom).hide();
        }
    };
    _self.startup = function () {
        _self.addToolsItemClickListener();
        _self.show(true);
        _self.mapApi.subscribe(_self.mapApi.Events.ModuleStateChanged, onModuleStateChanged);
        _self.mapApi.subscribe(_self.mapApi.Events.MapResizedEvent, onMapResized);
        _self.resetLayout(); //
        return this;
    };
    _self.domCreate = function () {
        //BaseMapToolsBar.prototype.domCreate.apply(this,arguments);
        $(_self.container).append(_self.template);
        _self.dom = $("." + _self.moduleClass, _self.container)[0];
        _self.addToolItems();
    };

};
/**
 * 地图控件-图层控制器
 * @param dom
 * @param mapApi
 * @constructor
 */
var LayerListTree = function (options) {
    var defaults = {
        title: "图层控制",
        right: 30,
        top: 0,
        left: null,
        bottom: null,
        width: 250,
        height: 325,
        appendDrawLayers:true,
        drawLayerGroupName:"绘制图层",

    };
    var params = $.extend(defaults, options);
    var _self = this;
    _self.unGroupedId = "unGroupedId";
    _self.moduleClass = "map-module-layerlisttree";
    _self.state = "hide"; //show
    _self.$tree = null;
    _self.template = "" +
        "<div class='" + _self.moduleClass + " easyui-dialog'>" +
        "    <div class='tree'>" +
        "        <ul id='layerListTree'></ul>" +
        "    </div>" +
        "</div>";
    //
    _self.contextMenuTemplate = '<div id="mm" class="easyui-menu" style="width:120px;">' +
        //'<div data-options="iconCls:\'icon-add\'">Append</div> ' +
        '<div data-operator="reload" data-options="iconCls:\'icon-reload\'">刷新</div>' +
        '</div>';
    _self.onNodeCheckedChanged = function (node, checked) {
        if (node.attributes.layerSet == false)
            _self.mapApi.layerVisibleSwitch(node.id, checked);
        else {
            var ids = getChildNodeIds(node, $(this));
            for (var i = 0; i < ids.length; i++) {
                _self.mapApi.layerVisibleSwitch(ids[i], checked);
            }
        }
    };
    _self.onNodeClick = function (node) {
        var url = node.attributes.url;
        if (url) {
            $.ajax({
                url: url + '?f=pjson',
                type: 'get',
                dataType: "json",
                success: function (data) {
                    var extent = data.extent;
                    _self.mapApi.zoomExtent(extent.xmin, extent.ymin, extent.xmax, extent.ymax);
                },
                error: function (a, b, c) {
                    console.info(a);
                }
            });
        }
    };
    var onLayerVisibleChanged = function(e){
        var layerId = e.data.layerId;
        var visible = e.data.visible ;
        var layerNode = _self.$tree.tree("find", layerId);
        if(layerNode){ //remove
            if(visible){
                _self.$tree.tree("check", layerNode.target);
            }else{
                _self.$tree.tree("uncheck", layerNode.target);
            }
        }
    };
    var onLayerAdded = function (e) {
        var layerId = e.data.layerId;
        var layer = _self.mapApi.getLayerById(layerId);
        var layerVisible = _self.mapApi.getLayerVisible(layerId);
        var layerNode = _self.$tree.tree("find", layerId);
        if (layerNode && layerVisible) {
            _self.$tree.tree("check", layerNode.target);
            return
        }
        if (!layerNode ) {
            if(params.appendDrawLayers && layerId.toLowerCase().indexOf("drawlayer") >= 0){
                var node = {
                    "id": layerId,
                    "text":layer.get("label") ? layer.get("label") : "未命名图层",
                    "checked":true
                };
                var unGrouped = _self.$tree.tree("find", _self.unGroupedId);
                if(!unGrouped){
                    var unGroupSet = {
                        "id":_self.unGroupedId,
                        "text":params.drawLayerGroupName,
                        "checked":true,
                        "children":[ node ]
                    };
                    _self.$tree.tree("append",{ data:[unGroupSet] });
                }else{
                    _self.$tree.tree("append",{ parent:unGrouped.target,data:[node] });
                }
            }
        }
    };
    var onLayerRemoved = function(e){
        var layerId = e.data.layerId;
        var layerNode = _self.$tree.tree("find", layerId);
        if(layerNode){ //remove
            _self.$tree.tree("remove", layerNode.target);

        }
    };
    var onLayersConfigChanged = function (newLayers, newConfig) {
        _self.$tree.tree("loadData", []);
        _self.$tree.tree("loadData", processMapConfig(newConfig));

    };
    var parseLayerConfig = function () {
        var optionalLayers = _self.mapApi.apiConfig.map.optionallayers;
        _self.$tree.tree("loadData", processMapConfig(optionalLayers));
    };
    var getChildNodeIds = function (node, $tree) {
        var result = [];
        result.push(node.id);
        var children = $tree.tree("getChildren", node.target);
        if (children.length) {
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                result = result.concat(getChildNodeIds(child, $tree));
            }
        }
        return result;
    };
    var processMapConfig = function (optionallayers) {
        var treedata = [];
        var flag = _checkConfigs(null, optionallayers);
        if (!flag) {
            console.error("配置存在错误，请检查！");
        }
        if (optionallayers && optionallayers.length > 0) { //解析可选图层配置
            var mapFunc = null; //;
            var layerLength = optionallayers.length; //默认解析基础地理数据
            for (var i = 0; i < layerLength; i++) {
                var optionallayerNode = null;
                var optionallayer = optionallayers[i];
                optionallayerNode = _processOptionallayerConfig(optionallayer, mapFunc);
                if (optionallayerNode) {
                    treedata.push(optionallayerNode);
                }
            }
        }
        return treedata;
    };
    var _checkConfigs = function (baseMap, optionallayers) {
        //checkids
        var flag = true;
        var layerIds = [];
        _processBasemapLayersConfig(baseMap, function (node) {
            if ($.inArray(node.id,  layerIds) !== -1) {
                flag = false;
                console.error("基础地图图层配置basemaps存在重复id :" + node.id);
            } else {
                layerIds.push(node.id);
            }
        });
        for (var i = 0; i < optionallayers.length; i++) {
            var optionallayer = optionallayers[i];
            _processOptionallayerConfig(optionallayer, function (node, parent) {
                if ($.inArray(node.id,  layerIds) !== -1) {
                    flag = false;
                    console.error("图层控制控件检测到配置optionallayers存在重复id :" + node.id);
                } else {
                    layerIds.push(node.id);
                }
            });
        }
        return flag;
    };
    var _createTreeNode = function (conf) {
        return {
            "id": conf.id ? conf.id : new Date().getTime(),
            "text": conf.label ? conf.label : "未命名",
            "checked": false,
            "state": "open",
            "attributes": {
                "visible": conf.visible,
                "url": conf.url,
                "type": conf.type ? conf.type : "无",
                "layerSet": conf.layerSet ? true : false,
            }
        };
    };
    var _processBasemapLayersConfig = function (conf, mapFunction) {
        if (!conf) return;
        var basemapNode = _createTreeNode(conf);
        if (mapFunction && typeof mapFunction === "function") {
            mapFunction(basemapNode);
        }
        var childs = [];
        for (var i = 0; i < conf.baseMapLayers.length; i++) {
            var l = conf.baseMapLayers[i];
            if (mapFunction && typeof mapFunction === "function") {
                mapFunction(l);
            }
            childs.push({
                "id": l.id,
                "text": l.label,
                "attributes": l
            });
        }
        if (childs.length > 0)
            basemapNode.children = childs;
        return basemapNode;
    };
    var _processOptionallayerConfig = function (conf, mapFunction, parent) {
        var result = _createTreeNode(conf);
        if (mapFunction && typeof mapFunction === "function") {
            mapFunction(result, parent);
        }
        if (conf.layerSet && conf.layerSet.length > 0) {
            result.children = [];
            var layerSet = conf.layerSet;
            var children = [];
            for (var i = 0; i < layerSet.length; i++) {
                var c = layerSet[i];
                var layer = _processOptionallayerConfig(c, mapFunction, conf);
                children.push(layer);
            }
            if (children.length > 0)
                result.children = children;
        }
        return result;
    };
    var getContextMenu = function(){
        return _self.contextMenuTemplate;
    };
    var onMenuClick = function(e ,node){
        var operator = $(e.target).attr("data-operator")  ;
        var layerId = node.id ;
        switch (operator){
            case "reload":
                _self.mapApi.refreshLayerById(layerId);
                break;
            default:
        }
    };
    _self.open = function (flg) {
        if (flg === false) {
            $(_self.dom).dialog('closed');
        } else {
            $(_self.dom).dialog('open');
        }
    };
    _self.refreshState = function (state) {
        _self.state = state;
        _self.mapApi.publish(_self.mapApi.Events.ModuleStateChanged, {
            "module": _self
        });
    };
    _self.domCreate = function () {
        $(_self.container).append(_self.template);
        _self.dom = $("." + _self.moduleClass, _self.container)[0];
        _self.$tree = $("#layerListTree", _self.dom).tree({
            checkbox: true,
            data: [{
                "id": 1,
                "text": "正在加载数据,请稍等。"
            }],
            onCheck: _self.onNodeCheckedChanged,
            onClick: _self.onNodeClick,
            onContextMenu: function(e ,node){
                e.preventDefault();
                var menuTemplate = getContextMenu();
                var $menu = $(menuTemplate) ;
                $menu.menu({
                    onClick:function(evt){
                        onMenuClick(evt ,node);
                    }
                }).menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        });
        var options = {
            title: params.title,
            width: params.width,
            height: params.height,
            top: params.top,
            left: params.left,
            bottom: params.bottom,
            right: params.right,
            closed: true,
            resizable:true,
            collapsible:true,
            constrain:true,
            modal: false,
            onOpen: function () {
                _self.refreshState("open");
            },
            onClose: function () {
                _self.refreshState("closed");
            }
        };
        _self.mapApi.moduleDialog(options,$(_self.dom) ,_self.container);
    };
    _self.destroy = function () {
        $(_self.dom).parent().remove();
    };
    _self.startup = function () {
        parseLayerConfig();
        _self.mapApi.subscribe(_self.mapApi.Events.OptionalLayerAddedEvent, onLayerAdded);
        _self.mapApi.subscribe(_self.mapApi.Events.LayerRemovedEvent, onLayerRemoved);
        _self.mapApi.subscribe(_self.mapApi.Events.LayerVisibleChangedEvent, onLayerVisibleChanged);
    };
};
/**
 * 地图控件-坐标拾取
 * @param dom
 * @param mapApi
 * @constructor
 */
var CoorsPicker = function (options) {
    var _self = this;
    _self.dom = dom;
    _self.moduleClass = "map-module-coorspicker";
    _self.mapApi = mapApi;
    _self.currentSystemType = "地理坐标";
    _self.selector = null;
    _self.coorslabel = null;
    _self.config = {
        "inputname": "CoorsSystemType",
        "coorsystem": [{
            "value": "",
            "text": "地理坐标",
            "x": "经度",
            "y": "纬度"
        }
            //{"value":"","text":"投影坐标" ,"x":"x","y":"y"},
            //{"value":"","text":"3度带" ,"x":"x","y":"y"},
            //{"value":"","text":"6度带" ,"x":"x","y":"y"}
        ]
    };
    _self.startup = function () {
        _self.mapMouseMoveHander = _self.mapApi.addMouseMoveEventListener(function (e) {
            var str = " 经度:" + e.mapPoint.x.toFixed(6) + " 纬度:" + e.mapPoint.y.toFixed(6);
            _self.coorslabel.innerText = str;
        });
        return this;
    };
    var onRadioChanged = function (e) {
        _self.currentSystemType = e.target.value;
    };
    _self.domCreate = function () {
        for (var i = 0; i < _self.config.coorsystem.length; i++) {
            var itemConfig = _self.config.coorsystem[i];
            var span = document.createElement("span");
            span.innerHTML = itemConfig.text;
            _self.dom.appendChild(span);
        }
        //
        _self.dom.firstChild.checked = true;
        _self.currentSystemType = _self.dom.firstChild.value;
        //
        _self.coorslabel = document.createElement("span");
        _self.coorslabel.className = "coorsPairs";
        _self.dom.appendChild(_self.coorslabel);
        //
        _self.dom.className += " " + _self.moduleClass;
    };

};
/**
 * 地图控件-地图标绘
 *
 */
var DrawBox = function (options) {
    var _self = this;
    var defaults = {
        defaultDrawType: "Point",
        title: "地图标绘",
        top:110,
        right:30,
        enableAttrPanel:false,
        left:null,
        bottom:null,
        width: 330,
        height: 560,
        types: [
            {
                "text": "删除",
                "value": "Delete",
                "icon": "basepath:styles/lightblue/images/delete.png"
            },
            {
                "text": "点",
                "value": "Point",
                "icon": "basepath:styles/lightblue/images/point.png"
            },
            {
                "text": "图标",
                "value": "Picture",
                "icon": "basepath:styles/lightblue/images/bitmap.png"
            },
            {
                "text": "圆",
                "value": "Circle",
                "icon": "basepath:styles/lightblue/images/circle.png"
            },
            {
                "text": "线",
                "value": "LineString",
                "icon": "basepath:styles/lightblue/images/polyline.png"
            },
            {
                "text": "矩形",
                "value": "Box",
                "icon": "basepath:styles/lightblue/images/rect.png"
            },
            {
                "text": "面",
                "value": "Polygon",
                "icon": "basepath:styles/lightblue/images/polygon.png"
            }
        ],
        pictureData: [
            {
                "label": "政府大楼",
                "icon": "stylepath:images/pic_government.png"
            },
            {
                "label": "学校",
                "icon": "stylepath:images/pic_school.png"
            },
            {
                "label": "汽车",
                "icon": "stylepath:images/pic_vehicle.gif"
            }
        ]
    };
    var params = $.extend(defaults, options);
    var templates = {};
    templates.point = "<div class='style point'>" +
        "<table>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>点半径：</label></td>" +
        "<td><input name='radius' class='style_input ' type='number' min='0' value='5' step='1'></td>" +
        "<td><label>像素</label></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>线宽度：</label></td>" +
        "<td><input name='border_width' class='style_input' type='number' min='0' value='2' step='1'></td>" +
        "<td><label>像素</label></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title '><label class='style_title'>线颜色：</label></td>" +
        "<td><input name='border_color' class='style_input color' type='color' value='#000000' ></td>" +
        "<td></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>线透明度：</label></td>" +
        "<td colspan='2'><input name='border_opacity' class='progressbar1 style_input' type='range' min='0' value='1' max='1' step='0.1'></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title '><label class='style_title'>填充颜色：</label></td>" +
        "<td><input name='fill_color' class=' color' type='color' value='#ff0000' ></td>" +
        "<td></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>填充透明度：</label></td>" +
        "<td colspan='2'><input name='fill_opacity' class='progressbar1 style_input' type='range' min='0' value='1' max='1' step='0.1'></td>" +
        "</tr>" +
        "</table>" +
        "</div>";
    templates.picture = "<div class='style picture'>" +
        "<table>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>图标：</label></td>" +
        "<td>" +
        "<select class='selector' >" +
        "<option value=''>无</option>" +
        "</select>" +
        "<input class='picUrl' name='picture' class='style_input' type='hidden'>" +
        "</td>" +
        "<td>" +
        "<img src=''>" +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>高度：</label></td>" +
        "<td><input name='height' class='style_input ' type='number' min='1' value='16' step='1'></td>" +
        "<td><label>像素</label></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>宽度：</label></td>" +
        "<td><input name='width' class='style_input ' type='number' min='1' value='16' step='1'></td>" +
        "<td><label>像素</label></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>X偏移：</label></td>" +
        "<td><input name='offset_x' class='style_input ' type='number' min='0' value='0' step='1'></td>" +
        "<td><label>像素</label></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>Y偏移：</label></td>" +
        "<td><input name='offset_y' class='style_input ' type='number' min='0' value='0' step='1'></td>" +
        "<td><label>像素</label></td>" +
        "</tr>" +
        "</table>" +
        "</div>";
    templates.circle = "<div class='style circle'>" +
        "<table>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>线宽度：</label></td>" +
        "<td><input name='border_width' class='style_input ' type='number' min='0' value='2' step='1'></td>" +
        "<td><label>像素</label></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>线颜色：</label></td>" +
        "<td><input name='border_color' class='color ' type='color'  ></td>" +
        "<td></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>线透明度：</label></td>" +
        "<td  colspan='2'> <input name='border_opacity' class='progressbar1 style_input' type='range' min='0' value='1' max='1' step='0.1'></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>填充颜色：</label></td>" +
        "<td><input name='fill_color' class='color ' type='color'  value='#ff0000' ></td>" +
        "<td></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>填充透明度：</label></td>" +
        "<td  colspan='2'><input name='fill_opacity' class='progressbar1 style_input' type='range' min='0' value='0.8' max='1' step='0.1'></td>" +
        "</tr>" +
        "</table>" +
        "</div>";
    templates.linestring = "<div class='style linestring'>" +
        "<table>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>线宽度：</label></td>" +
        "<td><input name='border_width' class='style_input ' type='number' min='0' value='2' step='1'></td>" +
        "<td><label>像素</label></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>线颜色：</label></td>" +
        "<td><input name='border_color' class='color ' type='color' value='#ff0000' ></td>" +
        "<td></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>线透明度：</label></td>" +
        "<td colspan='2'><input name='border_opacity' class='progressbar1 style_input' type='range' min='0' value='1' max='1' step='0.1'></td>" +
        "</tr>" +
        "</table>" +
        "</div>";
    templates.polygon = "<div class='style polygon'>" +
        "<table>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>线宽度：</label></td>" +
        "<td><input name='border_width' class='style_input ' type='number' min='0' value='2' step='1'></td>" +
        "<td><label>像素</label></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>线颜色：</label></td>" +
        "<td><input name='border_color' class='color ' type='color' ></td>" +
        "<td></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>线透明度：</label></td>" +
        "<td colspan='2'><input name='border_opacity' class='progressbar1 style_input' type='range' min='0' value='1' max='1' step='0.1'></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>填充颜色：</label></td>" +
        "<td><input name='fill_color' class='color ' type='color' value='#ff0000'  ></td>" +
        "<td></td>" +
        "</tr>" +
        "<tr>" +
        "<td  class='tr_title'><label class='style_title'>填充透明度：</label></td>" +
        "<td colspan='2'><input name='fill_opacity' class='progressbar1 style_input' type='range' min='0' value='0.8' max='1' step='0.1'></td>" +
        "</tr>" +
        "</table>" +
        "</div>";
    templates.box = "<div class='style box'>" +
        "<table>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>线宽度：</label></td>" +
        "<td><input name='border_width' class='style_input ' type='number' min='0' value='2' step='1'></td>" +
        "<td><label>像素</label></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>线颜色：</label></td>" +
        "<td><input name='border_color' class='color ' type='color' ></td>" +
        "<td></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>线透明度：</label></td>" +
        "<td colspan='2'><input name='border_opacity' class='progressbar1 style_input' id='line_num' type='range' min='0' value='1' max='1' step='0.1'></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>填充颜色：</label></td>" +
        "<td><input name='fill_color' class='color ' type='color' value='#ff0000'  ></td>" +
        "<td></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='tr_title'><label class='style_title'>填充透明度：</label></td>" +
        "<td colspan='2'><input name='fill_opacity' class='progressbar1 style_input ' type='range' min='0' value='0.8' max='1' step='0.1'></td>" +
        "</tr>" +
        "</table>" +
        "</div>";

    var createToolItems = function () {
        var $tools = $(".tools", _self.dom);
        for (var i = 0; i < params.types.length; i++) {
            var item = params.types[i];
            var src = _self.mapApi.commonUtil.getApiRootPath(item.icon);
            $tools.append("<img class='tool' src='" + src + "' title='" + item.text + "' dataaccess-tool='" + item.value + "' >");
        }
    };
    var addToolListener = function () {
        $("img.tool", _self.dom).click(function (e) {
            _self.currentDrawType = $(this).attr("dataaccess-tool");
            activeDrawStyle();
            activeDrawTool();
        });
        $(".buttons input", _self.dom).click(function (e) {
            var cls = $(this).attr("dataaccess-class");
            doAction(cls);
        });
    };
    var addAttrTableListener = function () {
        $(".delete", _self.$attrTable).last().click(function (e) {
            e.preventDefault();
            doAttrDel(this);
        });
        $(".add", _self.$attrTable).last().click(function (e) {
            e.preventDefault();
            doAttrAdd();
        });
    };
    var initPictureControlls = function ($tab) {
        var $firstTR = $tab.find("table tr").eq(0);
        if (params.pictureData.length > 0) {
            var $selector = $firstTR.find("select");
            $selector.empty();
            for (var i = 0; i < params.pictureData.length; i++) {
                var obj = params.pictureData[i];
                var url = _self.mapApi.commonUtil.getApiRootPath(obj.icon);
                $selector.append("<option value='" + url + "'>" + obj.label + "</option>");
            }
            $selector.change(function (e) {
                var url = $(this).val();
                $(".picUrl",$firstTR).val(url);
                $("td", $firstTR).last().find("img").attr("src", url);
                activeDrawTool("Picture");
            });
            var $firstOption = $selector.find("option").first();
            $firstOption.attr("selected", true);
            $("td", $firstTR).last().find("img").attr("src", $firstOption.attr("value"));

        }
    };
    var activeDrawStyle = function () {
        var type = _self.currentDrawType.toLowerCase();
        var $tools = $(".tools", _self.dom);
        $("img.tool[dataaccess-tool='" + _self.currentDrawType + "']", $tools).addClass("selected").siblings().removeClass("selected");
        if (!templates[type]) {
            return; //没有模板就返回
        }
        var $styles = $(".styles", _self.dom);
        var tab = $("." + type, $styles);
        if (!tab[0]) {
            var temp = templates[type];
            $styles.append(temp);
            //添加后要监听相关事件
            if (type === "picture") {
                tab = $("." + type, $styles);
                initPictureControlls(tab);
            }
        }
        var timeout = setTimeout(function (e) {
            $styles.children("div.style").not("." + type).hide();
            $styles.find("." + type).show();
            clearTimeout(timeout);
        }, 10);
    };
    var activeDrawTool = function (t) {
        var type = (t === undefined ? _self.currentDrawType : t);
        _self.currentDrawSymbol = getDrawSymbol(type);
        _self.currentDrawAttributes = getDrawAttributes(type);
        //添加图形点击回调，设置属性表
        _self.mapApi.drawGraphic(type, {
            attributes: _self.currentDrawAttributes,
            style: _self.currentDrawSymbol
        });
    };
    var getDrawSymbol = function (t) {
        var type = t.toLowerCase();
        var $styles = $(".styles", _self.dom);

        var $tab = $("." + type, $styles);
        var inputs = $(".style_input", $tab);
        var symbolParam = {};
        for (var i = 0; i < inputs.size(); i++) {
            var name = $(inputs[i]).attr("name");
            var value = $(inputs[i]).val();
            symbolParam[name] = value;
        }
        var colors = $(".color", $tab);
        for ( i = 0; i < colors.size(); i++) {
            var name = $(colors[i]).attr("name");
            var value = $(colors[i]).val();
            symbolParam[name] = value;
        }
        var hiddenInputs = $("input:hidden", $tab);
        for (var i = 0; i < hiddenInputs.size(); i++) {
            var name = $(hiddenInputs[i]).attr("name");
            var value = $(hiddenInputs[i]).val();
            symbolParam[name] = value;
        }
        return symbolParam;
    };
    var getDrawAttributes = function (t) {
        var $attrs = $(".attributes", _self.dom);
        return {}
    };
    var doAction = function (type) {
        var result = null;
        switch (type) {
            case 'save':
                result = doSave();
                break;
            case 'cancel':
                result = doCancel();
                break;
            case 'apply':
                result = doApply();
                break;
            default:
        }
        //set button state
        var btns = $('.buttons', _self.dom);
        if (result === true) {
            //设置按钮状态。。。

        }
    };
    var doSave = function (e) {

    };
    var doCancel = function () {
        _self.open(false);
    };
    //应用样式和属性值
    var doApply = function () {
        activeDrawTool();
    };
    var doAttrAdd = function () {
        ++_self.attributeIndex;
        var tr = "<tr>" +
            "<td><label>" + _self.attributeIndex + "</label></td>" +
            "<td><input value=''></td>" +
            "<td><input value=''></td>" +
            "<td><a class='delete' href='#'></a>&nbsp;<a class='add' href='#' ></a></td>" +
            "</tr>";
        $("tbody", _self.$attrTable).append(tr);
        addAttrTableListener();
    };
    var doAttrDel = function (_this) {
        if (_self.attributeIndex === 1) {
            var $lastTr = $("tbody tr", _self.$attrTable).last();
            $lastTr.find("input").val("");
            $lastTr.find("label").text(_self.attributeIndex);
        } else {
            --_self.attributeIndex;
            $(_this).parent().parent().remove();
        }
    };
    var scroll =function(){
        if($(".mCustomScrollbar").mCustomScrollbar){
            $(".mCustomScrollbar").mCustomScrollbar({
                advanced: {
                    updateOnContentResize: true
                }
            });
        }
    };
    _self.currentDrawSymbol = null;
    _self.attributeIndex = 1;
    _self.currentDrawAttributes = null;
    _self.currentDrawType = params.defaultDrawType;
    _self.moduleClass = "map-module-drawbox";
    _self.dom = null;
    _self.$attrTable = null;
    _self.state = "closed";
    _self.template = "<div class='" + _self.moduleClass + "'>" +
        "<div class='title'><strong>类型</strong></div>" +
        "<div class='tools'></div>" +
        "<div class='title'><strong>样式</strong></div>" +
        "<div class='styles'></div>" +
        "<div class='title' style='display: none'><strong>属性</strong></div>" +
        "<div class='attributes mCustomScrollbar' style='display: none'>" +
        "<table>" +
        "<thead>" +
        "<tr>" +
        "<td><label>序号</label></td>" +
        "<td><label>字段名称</label></td>" +
        "<td><label>字段值</label></td>" +
        "<td><label>操作</label></td>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "<tr>" +
        "<td><label>" + _self.attributeIndex + "</label></td>" +
        "<td><input value=''></td>" +
        "<td><input value=''></td>" +
        "<td><a class='delete' href='#'></a>&nbsp;<a class='add' href='#' ></a></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</div>" +
        "<div class='buttons'>" +

        //"<input dataaccess-class='save' value='保存' type='button' >" +
        "<input class='style_canel' dataaccess-class='cancel' value='取消' type='button' >" +
        "<input class='style_apply' dataaccess-class='apply' value='应用' type='button' >" +
        "</div>" +
        "</div>";
    //
    _self.startup = function () {
        if (!_self.dom) return;
        _self.$attrTable = $(".attributes", _self.dom);
        addToolListener();
        addAttrTableListener();
        scroll();//firefox 滚动条样式兼容
        return _self;
    };
    _self.refreshState = function (state) {
        _self.state = state;
        _self.mapApi.publish(_self.mapApi.Events.ModuleStateChanged, {
            "module": _self
        });
    };
    _self.open = function (flg) {
        if (flg === false) {
            $(_self.dom).dialog('close');
        } else {
            $(_self.dom).dialog('open');
        }
    };
    _self.domCreate = function () {
        $(_self.container).append(_self.template);
        _self.dom = $("." + _self.moduleClass, _self.container)[0];
        createToolItems();
        var options = {
            title: params.title,
            width: params.width,
            height: params.height,
            top: params.top,
            left: params.left,
            right: params.right,
            bottom: params.bottom,
            resizable:true,
            collapsible:true,
            closed: true,
            modal: false,
            onOpen: function () {
                _self.refreshState("open");
                activeDrawTool(_self.currentDrawType);
                activeDrawStyle(_self.currentDrawType);
            },
            onClose: function () {
                _self.refreshState("closed");
                _self.mapApi.startPanMode();
            }
        };
        _self.mapApi.moduleDialog(options,$(_self.dom) ,_self.container);
        activeDrawStyle(_self.currentDrawType);

    };
};
/**
 * 地图控件-底图切换
 ***/
var BaseMapsGallary = function (options) {
    var defaults = {
        "imgWidth": 60, /// 图标大小
        "imgHeight": 35,
        "folded":false,
        "onBaseMapChanged": function (e) {

        }
    };
    var params = $.extend({}, defaults, options);
    var _self = this;

    _self.moduleClass = "map-module-basemapsgallary";
    _self.template = "<div class='" + _self.moduleClass + "'><ul></ul></div>";

    _self.showIndex = 0;
    _self.state = params.folded === true ? "open":"folded";

    var imgWidth = params.imgWidth ? params.imgWidth : 100;
    var imgHeight = params.imgHeight ? params.imgHeight : 60;
    var containerWidth = imgWidth + 10;
    var containerHeight = imgHeight + 25;

    var getBaseInfo = function (config) {
        return {
            "id": config.id,
            "label": config.label,
            "url": config.url,
            "icon": config.icon,
            "visible":config.visible
        }
    };
    var getInitShowedBaseLayerIndex = function(layers){
        for(var i = 0 ; i < layers.length ; i ++){
            if(layers[i].visible === true){
                return i;
            }
        }
        return 0;
    };
    var createListItem = function (dataObj) {
        return "<div class='listItem' dataaccess-layerId='" + dataObj.id + "'>" +
            "<img src='" + dataObj.icon + "' title='" + (dataObj.url ? dataObj.url :"") + "'>" +
            "<br>" +
            "<span>" + dataObj.label + "</span>" +
            "</div>";
    };
    var parseBaseMapConfig = function () {
        var layers = [];
        try {
            var conf = _self.mapApi.apiConfig.map.basemaps.baseMapLayers; //服务来自api的配置
            if (conf) {
                for (var i = 0; i < conf.length; i++) {
                    layers.push(getBaseInfo(conf[i]));
                }
            }
            return layers;
        } catch (e) {
            console.error(e);
            console.error("解析配置出错");
        }
    };
    var toggleShow = function () {
        var size = $(".listItem", _self.dom).size();
        var $item_li = $(".listItem", _self.dom).parent();

        var margin_right = parseInt($item_li.css("margin-right").replace("px",""));
        var margin_left = parseInt($item_li.css("margin-left").replace("px",""));
        var padding_left = parseInt($item_li.css("padding-left").replace("px",""));
        var padding_right = parseInt($item_li.css("padding-right").replace("px",""));
        var itemWidth = $item_li.width() + margin_right + margin_left + padding_left + padding_right;

        var showWidth = 4;// 选中样式padding:2px;
        var flg = _self.state === "folded";
        if (flg) {
            showWidth += itemWidth * size;
            $( _self.dom).width(showWidth );
            _self.state = "open";
        } else {
            showWidth +=  itemWidth;
            $(_self.dom).width(showWidth);
            _self.state = "folded";
        }
        toggleShowUnSelectedItems(flg);
    };
    /**
     * 设置控件折叠后，隐藏或显示未选中的底图图标
     * @param flg
     */
    var toggleShowUnSelectedItems = function (flg) {
        $("li", _self.list).each(function (index) {
            if (index !== _self.showIndex) {
                if (flg)
                    $(this).show();
                else
                    $(this).hide();
            }
        });
    };
    var selectItem = function (index) {
        var list = $(".listItem", _self.dom);
        list.each(function (i) {
            if (i === index) {
                $(this).addClass("selected");
                _self.showIndex = index;
            } else {
                $(this).removeClass("selected");
            }
        });
    };
    var itemOnClick = function () {

    };
    _self.domCreate = function () {
        $(_self.container).append(_self.template);
        _self.dom = $("." + _self.moduleClass, _self.container)[0];
        var $list = $("ul", _self.dom);
        var layers = parseBaseMapConfig();
        var showIndex = getInitShowedBaseLayerIndex(layers);
        for (var i = 0; i < layers.length; i++) {
            var listItem = createListItem(layers[i]);
            $list.append("<li>" + listItem + "</li>");
        }
        $("img", $list).css({
            "width": imgWidth,
            "height": imgHeight
        });
        $( _self.dom).css({
            "width": containerWidth,
            "height": containerHeight
        });
        _self.list = $list[0];
        $(_self.dom).show();

        selectItem(showIndex);
    };
    _self.startup = function () {
        if(params.folded == true){
            $(_self.dom).bind({
                "mouseover": function (e) {
                    toggleShow();
                    toggleShowUnSelectedItems(true)
                },
                "mouseout": function (e) {
                    toggleShow();
                    toggleShowUnSelectedItems(false);
                }
            });
        }
        $(".listItem", _self.dom).bind({
            "click": function (e) {
                var index = $(this).parent().index();
                selectItem(index);
                var id = $(this).attr("dataaccess-layerId");
                _self.mapApi.switchBaseMap(id);
                if (params.onBaseMapChanged && typeof params.onBaseMapChanged) {
                    params.onBaseMapChanged(index);
                }
                console.info("底图已经切换，id=" + id);
            }
        });
        setTimeout(toggleShow,30);
    };
};
/**
 * 地图控件-坐标定位
 ***/
var CoorsPosition = function (options) {
    var _self = this;
    var defaults = {
        "centerAtLevel": 5,
        "defaultX": 116.39,
        "defaultY": 39.91,
        "title": "坐标定位",
        "width": 250,
        "height": 300,
        "top": 60,
        "left": 30,
        "precision": 8,
        "overlayEnabled":true
    };
    var params = $.extend(defaults, options);
    _self.moduleClass = "map-module-coorsposition";
    _self.template =
        "<div class='" + _self.moduleClass + "'>" +
        "<table>" +
        "<tr><td colspan='2' class='title'><label>当前位置：</label></td></tr>" +
        "<tr><td colspan='2' class='location'><label id='currentPosition' >0,0</label></td></tr>" +
        "<tr><td colspan='2'><label class='title' title='单击鼠标左键获取当前位置'>坐标拾取：</label></td></tr>" +
        "<tr><td class='tr_title'><span class='style_title'>经度：</span></td><td><input id='p_x' class='loaction_input' type='number' value=''><i>*</i></td></tr>" +
        "<tr><td class='tr_title'><span class='style_title'>纬度：</span></td><td><input id='p_y' class='loaction_input' type='number' value=''><i>*</i></td></tr>" +
        "</table>" +
        "<div class='buttons'  align='center'>" +
        "<input class='btn qbt' type='button' value='定位' >" +
        //"<input class='btn reset' type='button' value='重置'>" +
        "<input class='btn cbt' type='button' value='清空'>" +
        "</div>" +
        "</div>";
    _self.$currentCoordinate = null;
    _self.control = null;
    _self.doClear = function () {
        $("#p_x", _self.dom).val('');
        $("#p_y", _self.dom).val('');
        _self.mapApi.clearMapGraphics();
    };
    // _self.doReset = function () {
    //     $("#p_x", _self.dom).val(params.defaultX);
    //     $("#p_y", _self.dom).val(params.defaultY);
    //     _self.mapApi.clearMapGraphics();
    // };
    _self.setPosition = function (x, y) {
        $("#p_x", _self.dom).val(x.toFixed(params.precision));
        $("#p_y", _self.dom).val(y.toFixed(params.precision));
    };
    _self.getPosition = function () {
        var x = parseFloat($("#p_x", _self.dom).val());
        var y = parseFloat($("#p_y", _self.dom).val());
        return [x, y];
    };
    _self.doPosition = function () {
        //这里的坐标一般是经纬度坐标，要转化成和底图坐标系的坐标值
        var coors = _self.getPosition();
        var x = coors[0];
        var y = coors[1];
        if (x !== '' && y !== '') {
            var id = new Date().getTime() + "";
            //_self.mapApi.clearMapGraphics();
            //_self.mapApi.centerAt(x,y);
            _self.mapApi.addPictureGraphic(x, y, {
                center: true,
                attributes: {
                    id: id
                }
            });
            //_self.mapApi.flashGraphic(id);
        }
    };
    _self.pointMoveListener = null;
    _self.pointClickListener = null;
    _self.overlayHtml = null;
    _self.refreshCurrentCoors = function (x, y) {
        var fixedX = x.toFixed(params.precision);
        var fixedY = y.toFixed(params.precision);
        var coors = fixedX + "," + fixedY;
        if(_self.$currentCoordinate)
            _self.$currentCoordinate.text(coors);
        // if(_self.overlayHtml)
        //     _self.overlayHtml.innerHTML = coors;
    };
    _self.destroy = function () {
        _self.mapApi.removeEventListener(_self.pointMoveListener);
        _self.mapApi.removeEventListener(_self.pointClickListener);
        //

    };
    _self.startup = function () {
        $('input.qbt', _self.dom).click(function (e) {
            _self.doPosition();
        });
        $('input.cbt', _self.dom).click(function (e) {
            _self.doClear();
        });
        // $('input.reset', _self.dom).click(function (e) {
        //     _self.doReset();
        // });
        _self.$currentCoordinate = $("#currentPosition", _self.dom);
        //鼠标监听
        _self.pointMoveListener = _self.mapApi.addMouseMoveEventListener(function (e) {
            if (e.coordinate && e.coordinate[0] && e.coordinate[1]) {
                _self.refreshCurrentCoors(e.coordinate[0], e.coordinate[1]);
            }
        });
        _self.pointClickListener = _self.mapApi.addMouseClickEventListener(function (e) {
            if(e.coordinate  && e.coordinate[0] && e.coordinate[1] )
                _self.setPosition(e.coordinate[0], e.coordinate[1]);
        });
        //_self.doReset();

        _self.resize();
    };
    //打开或关闭module
    _self.open = function (flg) {
        if (flg === false) {
            _self.mapApi.hideZoomSlider(true);
            $(_self.dom).dialog('closed');
        } else {
            _self.mapApi.hideZoomSlider(false);
            $(_self.dom).dialog('open');
        }
        //_self.refreshState();
    };
    _self.refreshState = function (state) {
        _self.state = state;
        _self.mapApi.publish(_self.mapApi.Events.ModuleStateChanged, {
            "module": _self
        });
    };
    _self.resize = function(){
        if(_self.control){
            var barWidth = $(_self.dom).width();
            var containerWidth = $(_self.container).width();
            $(_self.overlayHtml ).css("left", (containerWidth - barWidth) / 2);
        }

    };
    _self.domCreate = function () {
        $(_self.container).append(_self.template);
        _self.dom = $("." + _self.moduleClass, _self.container)[0];
        var options = {
            title: params.title,
            width: params.width,
            height: params.height,
            top: params.top,
            left: params.left,
            bottom: params.bottom,
            right: params.right,
            resizable:true,
            collapsible:true,
            closed: true,
            modal: false,
            onOpen: function () {
                _self.refreshState("open");
            },
            onClose: function () {
                _self.refreshState("closed");
            }
        };
        _self.mapApi.moduleDialog(options,$(_self.dom) ,_self.container);

        if(params.overlayEnabled === true){
            var cls =  _self.moduleClass +  "-overlay";
            _self.overlayHtml = document.createElement('div');
            _self.overlayHtml .className = cls;

            _self.container.appendChild( _self.overlayHtml );
            _self.control = new ol.control.MousePosition({
                coordinateFormat: ol.coordinate.createStringXY(8),
                target:  _self.overlayHtml ,
                undefinedHTML: '&nbsp;'
            });
            _self.mapApi.map.addControl(_self.control);

        }
    };
};
/**
 * 地图控件-鹰眼
 ***/
var OverViewMap = function (options) {
    var _self = this;
    var defaults = {
        opened: false,
        url: ""
    };
    var params = $.extend(defaults, options);
    _self.domCreate = function () {

    };
    _self.startup = function () {
        var view = new ol.View({
            projection: _self.mapApi.map.getView().getProjection()
        });
        var overviewMapControl = new ol.control.OverviewMap({
            className: 'ol-overviewmap ol-custom-overviewmap',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.TileArcGISRest({
                        url: params.url
                    })
                })
                // new ol.layer.Tile({
                //     source: new ol.source.OSM()
                // })
            ],
            view: view,
            collapseLabel: '\u00BB',
            label: '\u00AB',
            collapsed: !params.opened
        });
        _self.mapApi.map.addControl(overviewMapControl);
    };
    _self.open = function (flg) {

    };
    _self.show = function (flg) {

    };
    _self.destroy = function () {

    };
};
/**
 * 地图控件-多边形查询
 ***/
var QueryByGeometry = function () {
    var _self = this;
    _self.domCreate = function () {

    };
    _self.startup = function () {

    };
    _self.open = function (flg) {

    };
};
/**
 * 地图控件-导出
 ***/
var MapExport = function () {
    var _self = this;
    //
    var loadImage = function () {
        var imageData = mapCanvas.toDataURL("image/png");
        var blob = dataURLtoBlob(imageData);
        //使用ajax发送
        var fd = new FormData();
        fd.append("image", blob, "image.png");
        var request = {
            "url": "",
            "data": fd,
            "onSuccess": function (e) {

            }
        };
        _self.mapApi.commonUtil.simpleAjaxLoader(request);
    };
    _self.domCreate = function () {

    };
    _self.startup = function () {

    };
    _self.open = function (flg) {
        loadImage();
    };
};
/**
 * 地图控件-打印
 ***/
var MapPrint = function () {
    var _self = this;
    _self.domCreate = function () {

    };
    _self.startup = function () {

    };
    _self.open = function (flg) {

    };
};
/**
 *
 * @param options
 * @constructor
 */
var CircleQuery = function (options) {
    var _self = this;
    var defaults = {
        "centerAtLevel": 5,
        "title": "圆查询",
        "showResultPanel": false,
        "width": 450,
        "height": 500,
        "top": 110,
        "left": 30,
        "indexEnable": true,
        "positionEnable": true,
        "columns":null,
        "query": null
    };
    var params = $.extend(defaults, options);

    _self.moduleClass = "map-module-circlequery";
    _self.icon = "stylepath:images/queryByCircle.png";
    _self.label = "圆查询";
    _self.QueryCompleteEvent = "CircleQueryCompleteEvent";

    _self.lastWkt = null;
    _self.srsnames = null;
    _self.$table = null;
    _self.$srsnames = null;
    _self.$qbtBtn = null;
    _self.$drawBtn = null;
    _self.$cbtBtn = null;
    _self.template =
        "<div class='" + _self.moduleClass + "'>" +
        "<table style='height: 100%;width:100%;'>" +
        "<tr style='height: 90%'>" +
        "<td><table id='result' style='width: 100%;height:100%;'></table></td>" +
        "</tr>" +
        "<tr style='height: 10%'>" +
        "<td align='center'>" +
        "<input class='cbt module-form-btn' type='button' value='重置'>" +
        "<input class='drawbt module-form-btn' type='button' value='标绘'>" +
        "<input class='qbt module-form-btn' type='button' value='查询' >" +
        "</td>" +
        "</tr>" +
        "</table>" +
        "</div>";

    //
    var parseQueryParam = function(){
        return params.query ? params.query :{} ;
    };
    var getFieldNameParam = function(sourceName,name){
        var query = params.query ;
        var result = null;
        for(var i = 0 ; i < query.length ; i++ ){
            var item = query[i];
            if(item.source === sourceName){
                result = item[name];
                break;
            }
        }
        return result;
    };
    _self.doQuery = function () {
        var layerDefinitions = [];
        var geom = _self.lastWkt;
        for (var i = 0; i < _self.srsnames.length; i++) {
            var srsname = _self.srsnames[i].source;
            var outFields = getFieldNameParam(srsname,"outFields");
            layerDefinitions.push({
                "srsname": srsname,
                "outFields": outFields
            });
        }
        var params = {
            "buffer": 0,
            "bufferUnit": "m",
            "geometryType": "POLYGON",
            "maxCount": -1,
            "geometry": geom,
            "returnCountOnly": false,
            "layerDefinitions": layerDefinitions
        };
        $.ajax({
            url: _self.mapApi.commonUtil.getDefaultMapQueryUrl(),
            type: "post",
            data: JSON.stringify(params),
            dataType: "json",
            contentType: "application/json",
            success: function (e) {
                _self.showResult(e);
            },
            error: function (a, b, c) {
                _self.mapApi.publishError("圆查询出现错误，请检查参数！", a)
            }
        });
    };
    _self.doDraw = function () {
        _self.mapApi.drawGraphic('Circle', {
            onDrawEnd: function (e) {
                var geom = e.feature.getGeometry();
                setTimeout(function () {
                    _self.mapApi.startPanMode();
                    var flatCoors = geom.flatCoordinates;
                    var centerX = flatCoors[0];
                    var centerY = flatCoors[1];
                    var radius = Math.abs(flatCoors[2] - flatCoors[0]);
                    _self.lastWkt = _self.mapApi.commonUtil.buildCircleGeometry(centerX, centerY, radius);
                    _self.doQuery();
                }, 100);
            },
            style: _self.mapApi.Keys.defaultPolygonQueryStyleName
        });
    };
    /**
     * 创建表格
     * @param option
     */
    _self.createDatagrid = function(){
        var $dom = $("#result", _self.dom);
        var columns = params.columns ? params.columns:[];
        if(columns.length > 0){
            if(params.indexEnable){
                var index = {
                    "field":"index-column","title":"序号","align":'center'
                };
                columns = [ index ].concat(columns);
            }
            columns.push({
                "field":"type-column","title":"资源类别","width":50,"align":'center'
            }) ;
            columns.push({
                "field":"id","title":"ID","hidden":true
            }) ;
            columns.push({
                "field":"layerId","title":"LayerId","hidden":true
            }) ;
            if(params.positionEnable){
                var position = {
                    "field":"tools-column","title":"操作","align":'center'
                };
                columns.push(position) ;
            }
        }
        _self.$table = $dom.datagrid({
            fitColumns:true,
            pagination:false,
            singleSelect:true,
            onClickRow : function(index, row){
                var id = row.id ;
                var layerId = row.layerId ;
                if(id && layerId){
                    _self.mapApi.flashGraphic(id,layerId);
                }
            },
            columns: [ columns ]
        });
    };
    _self.doClear = function () {
        _self.$table.datagrid({
            data:[]
        });
    };

    var parseColumnFieldValue = function( data,pro , source){
        var outFields =   getFieldNameParam(source ,"outFields");
        var columnFields =   getFieldNameParam(source ,"columnFields");
        var columns = columnFields.split(",");
        var fields = outFields.split(",");
        for(var i = 0 ; i < columns .length ; i++){
            var name = columns[i];
            var field = ( fields.length > i ? fields[i]:"");
            var value = pro[field];
            data[name] = value;
        }
        return data;
    };
    var parseGeoJsonData = function(geojson){
        var result = [] ;
        var index = 1 ;
        for(var key in geojson){
            var sourceName = getFieldNameParam(key ,"sourceLabel");
            var itemData = null;
            var features = geojson[key].features;
            if(features ){
                for(var i = 0 ; i < features.length ; i++){
                    var feature = features[i];
                    var properties = feature.properties;
                    var ids = feature.id.split(".");
                    var id = ids[1];
                    var layerId = ids[0];
                    itemData = {
                        "id":id,
                        "layerId":layerId,
                        "index-column":index++ ,
                        "type-column":sourceName,
                        "tools-column":"<a>定位</a>"
                    };
                    itemData = parseColumnFieldValue(itemData ,properties ,key);
                    result.push(itemData);
                }
            }else{
                itemData = {
                    "index-column":index++ ,
                    "type-column":sourceName,
                    "tools-column":"<a>定位</a>"
                };
                result.push(itemData);
            }

        }
        return result;
    };
    _self.showResult = function (data) {
        if (params.showResultPanel) {
            var gridData = parseGeoJsonData(data);
            _self.$table.datagrid({
                data:gridData
            });
        }
        _self.mapApi.publish(_self.QueryCompleteEvent, {
            data: data
        }, 10);
    };
    _self.startup = function () {
        _self.mapApi.registerEventType(_self.QueryCompleteEvent, _self.QueryCompleteEvent);
        _self.$qbtBtn = $('input.qbt', _self.dom).click(function (e) {
            _self.doQuery();
        });
        _self.$cbtBtn = $('input.cbt', _self.dom).click(function (e) {
            _self.doClear();
        });
        _self.$drawBtn = $('input.drawbt', _self.dom).click(function (e) {
            _self.doDraw();
        });
        _self.srsnames = parseQueryParam();

        _self.createDatagrid();

        _self.doClear();
    };

    _self.open = function (flg) {
        if (flg === false) {
            _self.mapApi.hideZoomSlider(true);
            $(_self.dom).dialog('closed');
        } else if (params.showResultPanel) {
            _self.mapApi.hideZoomSlider(false);
            $(_self.dom).dialog('open');
        }
        _self.doDraw();
    };
    _self.refreshState = function (state) {
        _self.state = state;
        _self.mapApi.publish(_self.mapApi.Events.ModuleStateChanged, {
            "module": _self
        });
    };
    _self.domCreate = function () {
        $(_self.container).append(_self.template);
        _self.dom = $("." + _self.moduleClass, _self.container)[0];
        var options = {
            title: params.title,
            width: params.width,
            height: params.height,
            top: params.top,
            left: params.left,
            right: params.right,
            bottom: params.bottom,
            closed: true,
            constrain: true,
            modal: false,
            onOpen: function () {
                _self.refreshState("open");
            },
            onClose: function () {
                _self.refreshState("closed");
            }
        };
        _self.mapApi.moduleDialog(options, $(_self.dom) ,_self.container);


    }

};
/**
 *
 * @param options
 * @constructor
 */
var PolygonQuery = function (options) {
    var _self = this;
    var defaults = {
        "centerAtLevel": 5,
        "title": "面查询",
        "showResultPanel": false,
        "width": 450,
        "height": 500,
        "top": 160,
        "left": 30,
        "right": null,
        "bottom": null,
        "indexEnable": true,
        "positionEnable": true,
        "columns":null,
        "query": null
    };
    var params = $.extend(defaults, options);
    //
    _self.QueryCompleteEvent = "PolygonQueryCompleteEvent";
    _self.icon = "stylepath:images/queryByPolygon.png";
    _self.label = "面查询";
    _self.moduleClass = "map-module-polygonquery";

    _self.lastWkt = null;
    _self.srsnames = null;
    _self.$table = null;
    _self.$srsnames = null;
    _self.$qbtBtn = null;
    _self.$drawBtn = null;
    _self.$cbtBtn = null;
    _self.template =
        "<div class='" + _self.moduleClass + "'>" +
        "<table style='height: 100%;width:100%;'>" +
        "<tr style='height: 90%'>" +
        "<td>" +
        "<table =id'result' style='width: 100%;height:100%;'></table>" +
        "</td>" +
        "</tr>" +
        "<tr style='height: 10%'>" +
        "<td align='center'>" +
        "<input class='cbt module-form-btn' type='button' value='重置'>" +
        "<input class='drawbt module-form-btn' type='button' value='标绘'>" +
        "<input class='qbt module-form-btn' type='button' value='查询' >" +
        "</td>" +
        "</tr>" +
        "</table>" +
        "</div>";

    var parseQueryParam = function(){
        return params.query ? params.query :{} ;
    };
    var getFieldNameParam = function(sourceName,name){
        var query = params.query ;
        var result = null;
        for(var i = 0 ; i < query.length ; i++ ){
            var item = query[i];
            if(item.source === sourceName){
                result = item[name];
                break;
            }
        }
        return result;
    };
    /**
     * 创建表格
     * @param option
     */
    _self.createDatagrid = function(){
        var $dom = $("#result", _self.dom) ;
        var columns = params.columns ? params.columns:[];
        if(columns.length > 0){
            if(params.indexEnable){
                var index = {
                    "field":"index-column","title":"序号","align":'center'
                };
                columns = [ index ].concat(columns);
            }
            columns.push({
                "field":"type-column","title":"资源类别","width":50,"align":'center'
            }) ;
            columns.push({
                "field":"id","title":"ID","hidden":true
            }) ;
            columns.push({
                "field":"layerId","title":"LayerId","hidden":true
            }) ;
            if(params.positionEnable){
                var position = {
                    "field":"tools-column","title":"操作","align":'center'
                };
                columns.push(position) ;
            }
        }
        _self.$table = $dom.datagrid({
            fitColumns:true,
            pagination:false,
            singleSelect:true,
            onClickRow : function(index, row){
                var id = row.id ;
                var layerId = row.layerId ;
                if(id && layerId){
                    _self.mapApi.flashGraphic(id,layerId);
                }
            },
            columns: [ columns ]
        });
    };
    _self.doClear = function () {
        _self.$table.datagrid({
            data:[]
        });
    };
    _self.doQuery = function () {
        var layerDefinitions = [];
        var geom = _self.lastWkt;
        for (var i = 0; i < _self.srsnames.length; i++) {
            var srsname = _self.srsnames[i].source;
            var outFields = getFieldNameParam(srsname,"outFields");
            layerDefinitions.push({
                "srsname": srsname,
                "outFields": outFields
            });
        }
        var params = {
            "buffer": 0,
            "bufferUnit": "m",
            "geometryType": "POLYGON",
            "maxCount": -1,
            "geometry": geom,
            "returnCountOnly": false,
            "layerDefinitions": layerDefinitions
        };
        $.ajax({
            url: _self.mapApi.commonUtil.getDefaultMapQueryUrl(),
            type: "post",
            data: JSON.stringify(params),
            dataType: "json",
            contentType: "application/json",
            success: function (e) {
                _self.showResult(e);
            },
            error: function (a, b, c) {
                _self.mapApi.publishError("面查询出现错误，请检查参数！", a)
            }
        });
    };
    _self.doDraw = function () {
        _self.mapApi.drawGraphic('Polygon', {
            onDrawEnd: function (e) {
                var geom = e.feature.getGeometry();
                setTimeout(function () {
                    _self.mapApi.startPanMode();
                    _self.lastWkt = new ol.format.WKT().writeGeometry(geom);
                    _self.doQuery();
                }, 100);
            },
            style: _self.mapApi.Keys.defaultPolygonQueryStyleName
        });
    };

    var parseColumnFieldValue = function( data,pro , source){
        var outFields =   getFieldNameParam(source ,"outFields");
        var columnFields =   getFieldNameParam(source ,"columnFields");
        var columns = columnFields.split(",");
        var fields = outFields.split(",");
        for(var i = 0 ; i < columns .length ; i++){
            var name = columns[i];
            var field = ( fields.length > i ? fields[i]:"");
            var value = pro[field];
            data[name] = value;
        }
        return data;
    };
    var parseGeoJsonData = function(geojson){
        var result = [] ;
        var index = 1 ;
        for(var key in geojson){
            var sourceName = getFieldNameParam(key ,"sourceLabel");
            var itemData = null;
            var features = geojson[key].features;
            if(features ){
                for(var i = 0 ; i < features.length ; i++){
                    var feature = features[i];
                    var properties = feature.properties;
                    var ids = feature.id.split(".");
                    var id = ids[1];
                    var layerId = ids[0];
                    itemData = {
                        "id":id,
                        "layerId":layerId,
                        "index-column":index++ ,
                        "type-column":sourceName,
                        "tools-column":"<a>定位</a>"
                    };
                    itemData = parseColumnFieldValue(itemData ,properties ,key);
                    result.push(itemData);
                }
            }else{
                itemData = {
                    "index-column":index++ ,
                    "type-column":sourceName,
                    "tools-column":"<a>定位</a>"
                };
                result.push(itemData);
            }

        }
        return result;
    };
    _self.showResult = function (data) {
        if (params.showResultPanel) {
            var gridData = parseGeoJsonData(data);
            _self.$table.datagrid({
                data:gridData
            });
        }
        _self.mapApi.publish(_self.QueryCompleteEvent, {
            data: data
        }, 10);
    };
    _self.startup = function () {
        _self.mapApi.registerEventType(_self.QueryCompleteEvent, _self.QueryCompleteEvent);
        _self.$qbtBtn = $('input.qbt', _self.dom).click(function (e) {
            _self.doQuery();
        });
        _self.$cbtBtn = $('input.cbt', _self.dom).click(function (e) {
            _self.doClear();
        });
        _self.$drawBtn = $('input.drawbt', _self.dom).click(function (e) {
            _self.doDraw();
        });
        _self.srsnames = parseQueryParam();

        _self.createDatagrid();

        _self.doClear();
    };

    _self.open = function (flg) {
        if (flg === false) {
            _self.mapApi.hideZoomSlider(true);
            $(_self.dom).dialog('closed');
        } else if (params.showResultPanel) {
            _self.mapApi.hideZoomSlider(false);
            $(_self.dom).dialog('open');
        }
        _self.doDraw();
    };
    _self.refreshState = function (state) {
        _self.state = state;
        _self.mapApi.publish(_self.mapApi.Events.ModuleStateChanged, {
            "module": _self
        });
    };
    _self.domCreate = function () {
        $(_self.container).append(_self.template);
        _self.dom = $("." + _self.moduleClass, _self.container)[0];
        var options = {
            title: params.title,
            width: params.width,
            height: params.height,
            top: params.top,
            left: params.left,
            right: params.right,
            bottom: params.bottom,
            closed: true,
            constrain:true,
            modal: false,
            onOpen: function () {
                _self.refreshState("open");
            },
            onClose: function () {
                _self.refreshState("closed");
            }
        };
        _self.mapApi.moduleDialog(options,$(_self.dom) ,_self.container);
    };

};
/**
 * 图例控件
 * @param options
 * @constructor
 */
var LegendBox = function(options){
    var _self = this;
    var defaults = {
        right: 30,
        top: 60,
        left: null,
        bottom: null,
        folded:true,
        iconDivWidth: 30,
        iconDivHeight: 20
    };
    var params = $.extend({} , defaults ,options);
    _self.moduleClass = "map-module-legendbox";
    _self.dom = null;
    _self.icon = "stylepath:images/queryByPolygon.png";
    _self.label = "图例";
    _self.folded = "true" ;
    _self.template = [
        "<div class='"+ _self.moduleClass +"'>" ,
        "<div class='icon'>L</div>" ,
        "<div class='panel'>aaa</div>" ,
        "</div>"
    ].join("");
    _self.startup = function(){

    };
    _self.domCreate = function(){
        $(_self.container).append(_self.template);
        _self.dom = $("." + _self.moduleClass, _self.container)[0];


    };
    var createPolygonLegend = function(polygonSybol){
        var colorDiv = document.createElement("div");
        if(polygonSybol.fill){
            var color = parseColor(polygonSybol.fillColor, polygonSybol.fillOpacity);
            colorDiv.style.background = color;
        }
        if(polygonSybol.stroke){
            var dashStyle = polygonSybol.strokeDashstyle;
            var color = parseColor(polygonSybol.strokeColor, polygonSybol.strokeOpacity);
            var width = polygonSybol.strokeWidth + "px";
            colorDiv.style.border = width + " " + dashStyle + " " + color;
        }
        colorDiv.style.height = params.iconDivHeight + "px";
        colorDiv.style.width = params.iconDivWidth + "px";
        return colorDiv;
    };
    /*
     * <svg><polyline points="20,27,34,21" fill="none" stroke="#550000" stroke-opacity="1" stroke-width="3"
     * stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none"></polyline></svg>
     * */
    var createLineLegend = function(lineSybol){
        var colorDiv = document.createElement("div");
        colorDiv.style.height = params.iconDivHeight + "px";
        colorDiv.style.width = params.iconDivWidth + "px";

        var lineHtml = '<svg width="100%" height="100%">';
        lineHtml += '<polyline points="2,2,28,18" fill="none" stroke="' + lineSybol.stroke.color
            + '" stroke-opacity="'+ lineSybol.strokeOpacity +'" stroke-width="'+ lineSybol.strokeWidth + '"';
        lineHtml += ' stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none"></polyline></svg>';
        colorDiv.innerHTML = lineHtml;

        return colorDiv;
    };
    var createPointLegend = function(svgId, label){
        var trDiv = document.createElement("tr");
        var svgEle = document.getElementById(svgId);
        if(!svgEle){
            return trDiv;
        }
        var colorTd = document.createElement("td");
        trDiv.appendChild(colorTd);

        var labelTd = document.createElement("td");
        trDiv.appendChild(labelTd);
        var itemLabel = document.createElement("label");
        itemLabel.style = "margin-left:5px;position:relative;top:3px;";
        itemLabel.innerHTML = label;
        labelTd.appendChild(itemLabel);

        var colorDiv = document.createElement("div");
        colorTd.appendChild(colorDiv);
        var divHeight = params.iconDivHeight;
        var divWidth = params.iconDivWidth;

        var cln = svgEle.cloneNode(true);
        if(cln.nodeName.toLowerCase() != "svg"){    //circle,image
            var rVal = cln.getAttribute("r");
            if(cln.hasAttribute("x") && cln.hasAttribute("y")){
                cln.setAttribute("x", rVal);
                cln.setAttribute("y", rVal);
            }
            if(cln.hasAttribute("cx") && cln.hasAttribute("cy")){
                cln.setAttribute("cx", rVal);
                cln.setAttribute("cy", rVal);
            }
            if(cln.hasAttribute("transform")){
                var transform = cln.getAttribute("transform");
                if(transform.indexOf('rotate(') >= 0){
                    var transValues = transform.split('rotate(');
                    var kk = null;
                    if(transValues.length == 1){
                        kk = 0;
                    }
                    else if(transValues.length > 1){
                        kk = 1;
                    }
                    if(kk != null){
                        var str = transValues[kk];
                        var sp = str.indexOf(')');
                        var rotString = str.substring(0, sp);

                        var ww = parseFloat(cln.getAttribute('width'));
                        var hh = parseFloat(cln.getAttribute('height'));
                        if(ww >= divWidth)
                            divWidth = ww + 2;
                        if(hh >= divWidth)
                            divHeight = hh + 2;

                        var rotValues = rotString.split(' ');
                        rotValues[1] = ww / 2;
                        rotValues[2] = hh / 2;

                        transValues[kk] = rotValues.join(' ') + str.substring(sp);
                        cln.setAttribute('transform',transValues.join('rotate('));
                    }
                }
            }
            //innerHTML
            colorDiv.innerHTML = '<svg width="100%" height="100%"></svg>';
            var svgNode = colorDiv.firstChild;
            svgNode.appendChild(cln);
            colorDiv.appendChild(svgNode);
        }
        else{
            //change viewBox --from(0,0)
            var viewBox = cln.getAttribute('viewBox');    // Grab the object representing the SVG element's viewBox attribute.
            var viewBoxValues = viewBox.split(' ');                // Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).

            /* The array is filled with strings, convert the first two viewBox values to floats: */
            viewBoxValues[0] = parseFloat(viewBoxValues[0]);    // Represent the x-coordinate on the viewBox attribute.
            viewBoxValues[1] = parseFloat(viewBoxValues[1]);    // Represent the y coordinate on the viewBox attribute.
            viewBoxValues[2] = parseFloat(viewBoxValues[2]);    // Represent the y coordinate on the viewBox attribute.

            if(viewBoxValues[2] > 300){    //star
                viewBoxValues[0] = 250;
                viewBoxValues[1] = 75;
            }
            else{
                viewBoxValues[0] = 0;
                viewBoxValues[1] = 0;
            }
            cln.setAttribute('viewBox', viewBoxValues.join(' '));
            colorDiv.appendChild(cln);
        }
        colorDiv.style.height = divHeight + "px";
        colorDiv.style.width = divWidth + "px";
        return trDiv;
    };
    var parseColor = function(value, opacity){
        if(value.length === 7){
            var str = value.substr(1,6);
            var rgb1 = parseInt(str.substr(0, 2), 16);
            var rgb2 = parseInt(str.substr(2, 2), 16);
            var rgb3 = parseInt(str.substr(4, 2), 16);
            return "rgba("+rgb1+","+rgb2+","+rgb3+","+opacity+")";
        }
        else{
            return value;
        }
    };
};