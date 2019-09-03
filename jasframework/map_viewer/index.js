/**
 * 项目js
 *
 * Created by kc on 2017/9/15.
 */
var rootPath = getRootPath();
/**
 * @desc 获取系统根路径
 */
function getRootPath() {
	// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	var curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0, pos);
	// 获取带"/"的项目名，如：/uimcardprj
	var projectName = pathName.substring(0, pathName.substring(1).indexOf('/') + 1);
	return (localhostPaht + projectName + "/");
}
/**
 * 引入init.js之前，需要先定义dojoConfig对象，用于定义自定义扩展的dojo类的命名空间
 */
 var dojoConfig = {
    "parseOnLoad": true,
    "async": true,
    "baseUrl":"../common/lib/esri/3.18/dojo",
    "packages": [{
        "name":"extras",
        "location" : "../../../../js/mapjs/extras"
    }]
};

var mapApi = null;
//
var MapModuleLoader = {
    "loadedModules":[],
    "load":function(clazz){
        //
        clazz.startup();
    }
};

/**
 * 地图控件-坐标拾取
 * @param dom
 * @param mapApi
 * @constructor
 */
var CoorsPicker = function(dom,mapApi){
    var _self = this;
    _self.dom = dom;
    _self.baseClass = "map-widget-CoorsPicker";
    _self.api = mapApi;
    _self.currentSystemType = "地理坐标";
    _self.selector = null;
    _self.coorslabel = null;
    _self.config = {
        "inputname":"CoorsSystemType",
        "coorsystem":[
            {"value":"","text":"地理坐标" ,"x":"经度","y":"纬度"}
            //{"value":"","text":"投影坐标" ,"x":"x","y":"y"},
            //{"value":"","text":"3度带" ,"x":"x","y":"y"},
            //{"value":"","text":"6度带" ,"x":"x","y":"y"}
        ]
    };
    _self.startup = function(){
        _self.mapMouseMoveHander = _self.api.addMouseMoveEventListener(function(e){
            var str = " 经度:" + e.mapPoint.x.toFixed(6)  + " 纬度:" + e.mapPoint.y.toFixed(6) ;
            _self.coorslabel.innerText = str;
        });
        return this;
    };
    var onRadioChanged = function(e){
        _self.currentSystemType = e.target.value;
    };
    var domCreate = function(){
        for(var i = 0; i < _self.config.coorsystem.length; i++){
            var itemConfig = _self.config.coorsystem[i];
            /*
             var input = document.createElement("input");
             input.name = _self.config.inputname;
             input.type = "radio";
             input.value =  itemConfig.text;
             input.onchange = onRadioChanged;
             _self.dom.appendChild(input);
             */
            var span = document.createElement("span");
            span.innerHTML =  itemConfig.text;
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
        _self.dom.className += " " +_self.baseClass;
    };
    domCreate();
};

/**
 * 地图控件-图层控制器
 * @param dom
 * @param mapApi
 * @constructor
 */
var LayerListTree = function(dom,mapApi){
    var defaults = {

    };
    var _self = this;
    _self.unGroupedId = "unGroupedId";
    _self.baseClass = "map-widget-LayerList";
    _self.dom = dom;
    _self.state = "hide";//show
    _self.tree = null;
    _self.$tree = null;
    _self.api = mapApi;
    _self.template = "" +
        "<div id='mapLayerList' class='map-widget-LayerList panel'>" +
        "   <div class='panel-header' >" +
        "      <div class='panel-title'>图层控制</div>"+
        "   </div>"+
        "   <div class='panel-body' >" +
        "       <div class='tree'>" +
        "           <ul id='layerListTree'></ul>" +
        "       </div>" +
        "   </div>"+
        "</div>";
    //
    _self.startup = function(){
        _self.api.map.on("layer-add",onLayerAdded);
        _self.api.map.on("layer-remove",onLayerRemoved);
        _self.api.subscribe(_self.api.Events.OptionalLayersChangedEvent,onLayersConfigChanged);//
    };
    _self.onNodeCheckedChanged = function(node,checked){
        if(node.attributes.layerSet == false)
            _self.api.layerVisibleSwitch(node.id,checked);
        else{
            var ids = getChildNodeIds(node , $(this));
            for(var i = 0; i < ids.length ; i++){
                _self.api.layerVisibleSwitch(ids[i],checked);
            }
        }
    };
    _self.onNodeClick = function(node){
        var url = node.attributes.url;
        if(url){
            $.ajax({
                url:url + '/info/iteminfo?f=pjson',
                type:'get',
                dataType:"json",
                success:function(data){
                    var minCoor = data.extent[0];
                    var maxCoor = data.extent[1];
                    _self.api.zoomExtent(minCoor[0],minCoor[1],maxCoor[0],maxCoor[1]);
                },
                error:function(a,b,c){
                    console.info(a);
                }
            });
        }
    };
    _self.toggleShow = function(){
        if(_self.state==="hide") {
            _self.show();
        }else{
            _self.hide();
        }
    };
    _self.hide = function(){
        $(_self.dom).addClass("panel-hide");
        $(_self.dom).removeClass("panel-show");
        _self.state = "hide";
    };
    _self.show = function(){
        $(_self.dom).removeClass("panel-hide");
        $(_self.dom).addClass("panel-show");
        _self.state = "show";
    };
    var layerVisibleChanged = function(e){
        // 开发中。。
    };
    var onLayerAdded = function(e){
        var layerNode = _self.$tree.tree("find",e.layer.id);
        if(layerNode && e.layer.visible === true){
            _self.$tree.tree("check",layerNode.target);
        }else if( !layerNode ){
            var node = {
                "id": e.layer.id,
                "text": e.layer.label ? e.layer.label : e.layer.id,
                "checked":true
            };
            var unGrouped = _self.$tree.tree("find", _self.unGroupeId);
            if(unGrouped){
                var unGroupSet = {
                    "id":_self.unGroupedId,
                    "text":"未分组",
                    "checked":true,
                    "children":[ node ]
                };
                self.$tree.tree("append",{ data:[unGroupSet] });
            }else{
                //self.$tree.tree("append",{ parent:unGrouped,data:[node] });
            }
        }
    };
    var onLayerRemoved = function(e){
        var layerNode = _self.$tree.tree("find",e.layer.id);
        if(layerNode && layerNode.target)
            _self.$tree.tree("remove",layerNode.target);

    };
    var onLayersConfigChanged = function(newLayers,newConfig){
        _self.$tree.tree("loadData", []);
        _self.$tree.tree("loadData", processMapConfig(newConfig));

    };
    var getChildNodeIds = function(node,$tree){
        var result = [];
        if($tree.tree('isLeaf', node.target)){
        	result.push(node.id);
        }
        var children = $tree.tree("getChildren",node.target);
        if(children.length){
            for(var i = 0; i < children.length ; i++){
                var child = children[i];
                result = result.concat(getChildNodeIds(child ,$tree));
            }
        }
        return result;
    };
    var processMapConfig = function(optionallayers){
        //var conf = _self.api.apiConfig;
        //var optionallayers = conf.map.optionallayers;
        var treedata = [];
        var flag = _checkConfigs(null,optionallayers);
        if(!flag){
            console.error("配置存在错误，请检查！");
        }
        if(optionallayers && optionallayers.length > 0){//解析可选图层配置
            var mapFunc = null;//;
            var layerLength = optionallayers.length;//默认解析基础地理数据
            for(var i = 0 ; i < layerLength ; i++){
                var optionallayerNode = null;
                var optionallayer = optionallayers[i];
                optionallayerNode = _processOptionallayerConfig(optionallayer,mapFunc);
                if(optionallayerNode){
                    treedata.push(optionallayerNode);
                }
            }
        }
        return treedata;
    };

    var _checkConfigs = function(baseMap,optionallayers){
        //checkids
        var flag = true;
        var layerIds = [];
        _processBasemapLayersConfig(baseMap,function(node){
            if($.inArray(node.id, layerIds)!== -1){
                flag = false;
                console.error("基础地图图层配置basemaps存在重复id :" + node.id);
            }else{
                layerIds.push(node.id);
            }
        });
        for(var i=0 ; i < optionallayers.length ; i++){
            var optionallayer = optionallayers[i];
            _processOptionallayerConfig(optionallayer,function(node,parent){
                if($.inArray(node.id, layerIds)!== -1){
                    flag = false;
                    console.error("图层控制控件检测到配置optionallayers存在重复id :" + node.id);
                }else{
                    layerIds.push(node.id);
                }
            });
        }

        return flag;
    };
    var _createTreeNode = function(conf){
        return {
            "id":conf.id ? conf.id : new Date().getTime(),
            "text":conf.label ? conf.label : "未命名",
            "checked":false,
            "state":"open",
            "attributes":{
                "visible":conf.visible,
                "url":conf.url,
                "type":conf.type ? conf.type : "无",
                "layerSet":conf.layerSet ? true : false,
            }
        };
    };
    var _processBasemapLayersConfig = function(conf,mapFunction){
        if(!conf) return ;
        var basemapNode = _createTreeNode(conf);
        if(mapFunction && typeof mapFunction === "function"){
            mapFunction(basemapNode);
        }
        var childs = [];
        for(var i = 0; i < conf.baseMapLayers.length ; i++){
            var l = conf.baseMapLayers[i];
            if(mapFunction && typeof mapFunction === "function"){
                mapFunction(l);
            }
            childs.push({
                "id": l.id,
                "text": l.label,
                "attributes":l
            });
        }
        if(childs.length > 0)
            basemapNode.children = childs;
        return basemapNode;
    };
    //解析配置，创建tree
    var _processOptionallayerConfig = function(conf,mapFunction,parent){
        var result = _createTreeNode(conf);
        if(mapFunction && typeof mapFunction ==="function"){
            mapFunction(result,parent);
        }
        if(conf.layerSet && conf.layerSet.length > 0){
            result.children = [];
            var layerSet = conf.layerSet ;
            var children = [];
            for(var i = 0 ; i < layerSet.length ; i++){
                var c = layerSet[i];
                var layer = _processOptionallayerConfig( c , mapFunction ,conf);
                children.push(layer);
            }
            if(children.length > 0)
                result.children = children;
        }
        return result;
    };
    var domCreate = function(){
        $(_self.dom).append( _self.template);
        _self.tree = $("#layerListTree",_self.dom)[0];
        _self.$tree = $(_self.tree).tree({
            checkbox:true,
            data:[//{
                //"id": 1, "text":"正在加载数据,请稍等。"
                //}
            ],
            onCheck:_self.onNodeCheckedChanged,
            onClick:_self.onNodeClick
        });
    };
    domCreate();
    
};

/**
 * 地图控件-地图标绘
 *
 */
var DrawBox = function(dom,mapApi){
    var _self = this ;
    _self.dom = dom;
    _self.api = mapApi;
    _self.symbolEditTemplate = {
        "simpleMarketSymbol":"",
        "pictureMarketSymbol":"",
        "simpleLineSymbol":"",
        "simplePolylineSymbol":"",
        "simpleFillSymbol":"",
    };
    _self.startup = function(){
        $("img",_self.dom).click(function(e){
            var toolLabel = $(this).attr("data-tool");
            _self.api.startDrawAndEdit(toolLabel);
        });
        return _self;
    };
    _self.toggleShow = function(){
        if($(_self.dom).css("display")!=='none'){
            $(_self.dom).hide();
            //destroy !
        }else{
            $(_self.dom).show();
            //start draw
        }
    };
    var domCreate = function(){
        //
    };
    domCreate();
};

/**
 * 地图控件-底图切换
 ***/
var BaseMapsGallary = function(dom, mapApi, options){
    var defaults = {
        "imgWidth":60,/// 图标大小
        "imgHeight":35,
        "onBaseMapChanged":function(e){

        }
    };
    var params = $.extend({},defaults,options);
    var _self = this;

    _self.dom = dom;
    _self.api = mapApi;
    _self.baseClass = "map-widget-Basemap";
    _self.list = null;
    _self.showIndex = 0;
    _self.state = "hidden";

    var getBaseInfo = function(config){
        return {
            "id":config.id,
            "label":config.label,
            "url":config.url,
            "thumnail":config.icon
        }
    };
    var createListItem = function(dataObj){
        return "<div class='listItem' data-layerId='"+dataObj.id+"'>" +
            "<img src='"+dataObj.thumnail+"' title='"+dataObj.url+"'>" +
            "<br>" +
            "<span>"+dataObj.label+"</span>" +
            "</div>";
    };
    var parseBaseMapConfig = function(){
        var layers = [];
        try {
            var conf = _self.api.apiConfig.map.basemaps.baseMapLayers;//服务来自api的配置
            if (conf) {
                for(var i = 0 ; i < conf.length ; i++ ){
                    layers.push(getBaseInfo(conf[i]));
                }
            }
            return layers;
        }catch(e){
            console.error(e);
            console.error("解析配置出错");
        }
    };
    var toggleShow  = function(){
        if(_self.state === "hidden"){
            var showWidth = params.imgWidth *  $(".listItem",_self.dom).size() + 30;
            $('.container',_self.dom).width(showWidth);
            selectItem(_self.showIndex);
            toggleShowUnSelectedItems(true);
            _self.state = "open";
        }else{
            var showWidth = params.imgWidth  + 10;
            $('.container',_self.dom).width(showWidth);
            selectItem(-1);
            toggleShowUnSelectedItems(false);
            _self.state = "hidden";
        }
    };
    var toggleShowUnSelectedItems = function(flg){
        $("li",_self.list).each(function(index){
            if(index !== _self.showIndex){
                if(flg)
                    $(this).show();
                else
                    $(this).hide();
            }
        });
    };
    var selectItem = function(index){
        var list = $(".listItem",_self.dom);
        list.each(function(i){
            if(i===index){
                $(this).addClass("selected");
                _self.showIndex = index;
            }else{
                $(this).removeClass("selected");
            }
        });
    };
    var itemOnClick = function(){

    };
    var domCreate = function(){
        var imgWidth = params.imgWidth ? params.imgWidth : 100;
        var imgHeight = params.imgHeight ? params.imgHeight : 60;
        var containerWidth = imgWidth + 10;
        var containerHeight = imgHeight + 23;
        _self.template = "<div class='container'><ul></ul></div>" ;

        $(_self.dom).hide().append(_self.template);
        var $list = $("ul",_self.dom);
        var layers = parseBaseMapConfig();
        for(var i = 0 ; i < layers.length ; i++){
            var listItem = createListItem(layers[i]);
            $list .append("<li>" + listItem + "</li>");
        }
        $("img",$list).css({ "width":imgWidth,"height":imgHeight });
        $(".container",_self.dom).css({"width":containerWidth,"height":containerHeight});
        _self.list = $list[0];
        $(_self.dom).show();
        //selectItem(0);
    };
    _self.startup = function(){
        $(".container",_self.dom).bind({
            "mouseover":function(e){
                toggleShow();
            },
            "mouseout":function(e){
                toggleShow();
            }
        });
        $(".listItem",_self.dom).bind({
            "click":function(e){
                var index = $(this).parent().index();
                selectItem(index);
                var id = $(this).attr("data-layerId");
                _self.api.switchBaseMap(id);
                if(params.onBaseMapChanged && typeof params.onBaseMapChanged){
                    params.onBaseMapChanged(index);
                }
                console.info("底图已经切换，id="+id);
            }
        });
    };
    domCreate();
};


/** 弹出窗口-地理定位 */
var CoorsPositionDialog = function(dom, mapApi){
    var _self = this;
    _self.centerAtLevel = 5;
    _self.dom = dom;
    _self.api = mapApi;
    _self.title = "定位查询";
    _self.content = "" +
        "<table>" +
        "<tr><td colspan='2'><label>请输入地理坐标</label></td></tr>" +
        "<tr><td><span>经度：</span></td><td><input id='p_x' type='number' ><i>*</i></td></tr>" +
        "<tr><td><span>纬度：</span></td><td><input id='p_y' type='number'><i>*</i></td></tr>" +
        "<tr>" +
        "<td align='center' colspan='2'><input class='qbt' type='button' value='定位' ><input class='cbt' type='button' value='清空'></td>" +
        "</tr>" +
        "</table>";
    //
    _self.doClear = function(){
        $("#p_x",_self.dom).val('');
        $("#p_y",_self.dom).val('');
        _self.api.clearMapGraphics();
    };
    //
    _self.doPosition = function(){
        //这里的坐标一般是经纬度坐标，要转化成和底图坐标系的坐标值
        var x = parseFloat($("#p_x",_self.dom).val());
        var y = parseFloat($("#p_y",_self.dom).val());
        var coors = _self.api.coorsToXY(x,y);
        if( x !== '' && y !== ''){
            _self.api.clearMapGraphics();
            _self.api.centerAt(coors[0],coors[1]);
            _self.api.addPictureGraphic(coors[0],coors[1]);
        }
    };
    //
    _self.startup = function(){
        $('input.qbt',_self.dom).click(function(e){
            _self.doPosition();
        });
        $('input.cbt',_self.dom).click(function(e){
            _self.doClear();
        });
    };
    _self.open = function(){
        $(_self.dom).dialog('open');
    };
    var domCreate = function(){
        var options = {
            title : _self.title,
            width : 250,
            height : 150,
            closed : true,
            modal :false,
            onOpen:function(){
                _self.api.hideZoomSlider(true);
            },
            onClose:function(){
                _self.api.hideZoomSlider(false);
            }
        };
        $(_self.dom).append(_self.content).dialog(options);
    };
    domCreate();
};

/***
 * 项目回掉函数定义
 * 如果地图的事件需要回掉项目方法，在地图iframe加载完成的时候需要重新定义该对象内的回掉函数
 * @type {{apiLoaded: null, mapAppLoaded: null, drawCircle: null}}
 */
var MapCallBackFuncs = {
    //"apiLoaded":null,
    "mapAppLoaded":null
    //"quickLocateStart":null,
    //"drawCircleEnd":null,
    //"drawPolygonEnd":null
};
// var MapAppExtendEvents = {
//     "quickLocateStart":"quickLocateStart",
//     "drawCircleEnd":"drawCircleEnd",
//     "drawPolygonEnd":"drawPolygonEnd"
// };

 /**
  * api初始化回调函数
  */
// function mapApiLoaded(){
//     if(typeof JasMap === "function"){
//         mapApi = new JasMap();
//         mapApi.registerEventType(MapAppExtendEvents,MapAppExtendEvents);
//         mapApi.subscribe(mapApi.Events.MapLoadedEvent,mapLoadedFunc);
//         mapApi.subscribe(mapApi.Events.ErrorEvent,showErrorFunc);
//         mapApi.subscribe(mapApi.Events.OptionalLayerAddedEvent,cdcsLayerAdded);// 注册监听事件
//
//     }else{
//         console.error("mapApi没有加载成功！");
//     }
//}

 var mapLoadedFunc = function(e){

 };

var showErrorFunc = function(e){
//    alert(e.message);
};


var grpimsLayerAdded = function(e){
	console.log(e.layer.id);
	// config.json 配置的layer id 为 countryLayer
    if(e.layer.id === "DCS_MAP00"){
    	mapApi.addLayerClickEventListener(e.layer.id,baseMarkerDetectClicked);
    }
    if(e.layer.id === "DCS_MAP01"){
    	mapApi.addLayerClickEventListener(e.layer.id,baseInsulationJointClicked);
    }
    if(e.layer.id === "DCS_MAP02"){
    	mapApi.addLayerClickEventListener(e.layer.id,baseMarkerClicked);
    }
    if(e.layer.id === "DCS_MAP03"){
    	mapApi.addLayerClickEventListener(e.layer.id,baseValveClicked);
    }
    if(e.layer.id === "DCS_MAP04"){
        mapApi.addLayerClickEventListener(e.layer.id,bdmDefectinfoClicked);
    }
    if(e.layer.id === "DCS_MAP05"){
        mapApi.addLayerClickEventListener(e.layer.id,cpCathodicClicked);
    }
    if(e.layer.id === "DCS_MAP06"){
    	mapApi.addLayerClickEventListener(e.layer.id,cpCorrosionEnvironmentClicked);
    }
    if(e.layer.id === "DCS_MAP07"){
        mapApi.addLayerClickEventListener(e.layer.id,cpInsulationTestClicked);
    }
    if(e.layer.id === "DCS_MAP08"){
        mapApi.addLayerClickEventListener(e.layer.id,cpOutercoverRelancetBoClicked);
    }
    if(e.layer.id === "DCS_MAP09"){
    	mapApi.addLayerClickEventListener(e.layer.id,strayCurrentClicked);
    }
    if(e.layer.id === "DCS_MAP10"){
        mapApi.addLayerClickEventListener(e.layer.id,cpSuspectpointdetectRelanceClicked);
    }
    if(e.layer.id === "DCS_MAP11"){
        mapApi.addLayerClickEventListener(e.layer.id,dpSensitiveGeoDisasterClicked);
    }
    if(e.layer.id === "DCS_MAP12"){
        mapApi.addLayerClickEventListener(e.layer.id,mnDailyMaintClicked);
    }
    if(e.layer.id === "DCS_MAP13"){
        mapApi.addLayerClickEventListener(e.layer.id,mnValveStaticsealClicked);
    }
    if(e.layer.id === "DCS_MAP14"){
        mapApi.addLayerClickEventListener(e.layer.id,cpOutercoverDetectionClicked);
    }
    if(e.layer.id === "DCS_MAP15"){
    	mapApi.addLayerClickEventListener(e.layer.id,baseLineloopClicked);
    }
    if(e.layer.id === "DCS_MAP16"){
    	mapApi.addLayerClickEventListener(e.layer.id,hcaDiscernClicked);
    }
};

/**
 * 判断用户对该记录是否有查看的权限
 * @param dataId Oid
 * @param tableName 表名
 * @param getDlgURL 查看页面路径
 * @param viewName  查看页面名
 * @param topName   查看页面标题
 * @returns
 */
function queryTop(dataId,tableName,getDlgURL,viewName,topName){
	$.ajax({
		url : rootPath+"/consDcsCommon/canBrowse.do",
		data :{"oid" : dataId,"tableName" : tableName},
		type : 'POST',
		dataType:"json",
		async:true,
		success : function(data) {
			if(data.status==1){
				//top.getDlg(getDlgURL);
				top.getDlg(getDlgURL+dataId,viewName,topName,800,600,false,true,true);
			}else{
				top.showAlert('提示', '没有权限', 'info');
			}
		}
	})
}

var strayCurrentClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/cp/hpcp/environmonitor/cp_stray_current/view_cp_stray_current.html?oid="+dataId,"viewCpStrayCurrent","详细",800,600,false,true,true);
    // queryTop(dataId,"DCS_MAP09","../../gas/cp.hpcp/environment/cp_stray_current/view_cp_stray_current.html?oid=" + dataId,"viewCpStrayCurrent","杂散电流数据详细信息");
};

var cpCorrosionEnvironmentClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/cp/hpcp/environmonitor/cp_corrosion_environment/view_cp_corrosion_environment.html?oid="+dataId,"viewCpCorrosionEnvironment","详细",800,600,false,true,true);
};

var cpOutercoverDetectionClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/cp/hpcp/coatingmanage/cp_outercover_detection/view_cp_outercover_detection.html?oid="+dataId,"viewCpOutercoverDetection","详细",800,600,false,true,true);
};


var cpOutercoverRelancetBoClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/cp/hpcp/coatingmanage/cp_outercover_relancet/view_cp_outercover_relancet_bo.html?oid="+dataId,"viewCpOutercoverRelancetBo","详细",800,600,false,true,true);
};

var cpSuspectpointdetectRelanceClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/cp/hpcp/coatingmanage/cp_suspectpointdetect_relance/view_cp_suspectpointdetect_relance.html?oid="+dataId,"viewCpSuspectpointdetectRelance","详细",800,600,false,true,true);
};


var cpCathodicClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/cp/hpcp/cathodicprotect/cp_cathodic/view_cp_cathodic.html?oid="+dataId,"viewCpCathodic","详细",800,600,false,true,true);
};

var cpInsulationTestClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/cp/hpcp/cathodicprotect/attachedfacility/cp_insulation_test/view_cp_insulation_test.html?oid="+dataId,"viewCpInsulationTest","详细",800,600,false,true,true);
};


var bdmDefectinfoClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/bdm/bdm_defectinfo/view_bdm_defectinfo.html?oid="+dataId,"viewBdmDefectinfo","详细",800,600,false,true,true);
};

var dpSensitiveGeoDisasterClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/dp/dp_sensitive_geo_disaster/view_dp_sensitive_geo_disaster.html?oid="+dataId,"viewDpSensitiveGeoDisaster","详细",800,600,false,true,true);
};

var mnDailyMaintClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/mn/mn_daily_maint/view_mn_daily_maint.html?oid="+dataId,"viewMnDailyMaint","详细",800,600,false,true,true);
};

var mnValveStaticsealClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/mn/mn_valve_staticseal/view_mn_valve_staticseal.html?oid="+dataId,"viewMnValveStaticseal","详细",800,600,false,true,true);
};

var mnLightningStaticClicked = function(e) {
    var dataId = e.graphic.attributes.OID;
    console.info(e);
    top.getDlg("../../gas/mn/mn_lightning_static/view_mn_lightning_static.html?oid="+dataId,"viewMnLightningStatic","详细",800,600,false,true,true);
};

var baseLineloopClicked = function(e) {
	var dataId = e.graphic.attributes.OID;
	console.info(e);
	top.getDlg("../../gas/base/base_lineloop/view_base_lineloop.html?oid="+dataId,"viewBaseLineloop","详细",800,400,false,true,true);
};

var baseMarkerClicked = function(e) {
	var dataId = e.graphic.attributes.OID;
	console.info(e);
	top.getDlg("../../gas/base/base_marker/view_base_marker.html?oid="+dataId,"viewBaseMarker","详细",800,400,false,true,false);
};

var baseMarkerDetectClicked = function(e) {
	var dataId = e.graphic.attributes.OID;
	console.info(e);
	top.getDlg("../../gas/base/base_detect_marker/view_base_detect_marker.html?oid="+dataId,"viewBaseDetectMarker","详细",800,300,false,true,false);
};

var baseValveClicked = function(e) {
	var dataId = e.graphic.attributes.OID;
	console.info(e);
	top.getDlg("../../gas/base/base_valve/view_base_valve.html?oid="+dataId,"viewBaseValve","详细",800,600,false,true,true);
};

var baseInsulationJointClicked = function(e) {
	var dataId = e.graphic.attributes.OID;
	console.info(e);
	top.getDlg("../../gas/base/base_insulation_joint/view_base_insulation_joint.html?oid="+dataId,"viewBaseInsulationJoint","详细",800,600,false,true,true);
};

var hcaDiscernClicked = function(e) {
	var dataId = e.graphic.attributes.OID;
	console.info(e);
	top.getDlg("../../gas/hca/hca_discern/view_hca_discern.html?oid="+dataId,"viewHcaDiscern","详细",800,600,false,true,true);
}


var cdcsPipeWeldClicked = function(e){
	var dataId = e.graphic.attributes.OID;
	console.info(e);
	$.ajax({
		url : rootPath+"/consDcsCommon/canBrowsePipeWeld.do",
		data :{"oid" : dataId,"tableName" : "CONS_DCS_PIPEINFO_WELD"},
		type : 'POST',
		dataType:"json",
		async:true,
		success : function(data) {
			if(data.status==1){
				var pipeno=data.data.steelpipenum;
				var projectcode=data.data.projectcode;
				var steelpipetype= data.data.steelpipetype;
				if(steelpipetype ==1){
				top.getDlg("../construction/cdcs/material/m_pipe/view_m_pipe.html?pipeno="+pipeno+"&projectcode="+projectcode,"viewMpipe"+pipeno,"钢管详细信息",800,600,false,true,true);
				}else if(steelpipetype ==2){
					top.getDlg("../construction/cdcs/material/m_hotbend/view_m_hotbend.html?pipeno="+pipeno,"viewMhotbend","热弯详细信息",800,600,false,true,true);	
				}else if(steelpipetype ==3){
					top.getDlg("../construction/cdcs/material/cons_dcs_coldbendingpipe/view_cons_dcs_coldbendingpipe.html?coldbendingpipenum="+pipeno,"viewConsDcsColdbendingpipe","冷弯详细信息",800,600,false,true,true);	
				}
			}else{
				top.showAlert('提示', '没有权限', 'info');
			}
		}
	})
};

var consdcsweldcollpostionClicked = function(e){
	var dataId = e.graphic.attributes.OID;
	$.ajax({
		url : rootPath+"/consDcsCommon/canBrowseWeldCollPostion.do",
		data :{"oid" : dataId},
		type : 'POST',
		dataType:"json",
		async:true,
		success : function(data) {
			if(data.status==1){
				var oid=data.data.oid;
			    queryTop(oid,"CONS_DCS_WELDINFO","../construction/cdcs/pipeweld/cons_dcs_weldinfo/view_cons_dcs_weldinfo.html?oid=","viewConsDcsWeldinfo"+oid,"焊口详细信息");
			}else{
				top.showAlert('提示', '没有权限', 'info');
			}
		}
	})
};

var consdcscheckStatisticsClicked = function(e){
	var dataId = e.graphic.attributes["JASFRAMEWORK_DEV.CONS_DCS_WELDINFO.OID"];
	var weldnum = e.graphic.attributes["JASFRAMEWORK_DEV.CONS_DCS_WELDINFO.WELDNUM"];
    console.info(e);
    queryWeldCheckTop(dataId,weldnum,"CONS_DCS_WELDINFO","../construction/cdcs/datacheck/cons_dcs_checkmsg/view_cons_dcs_weldinfo_checkmsg.html?checkdata_objecttype=1&flag=1&weldnum=","viewConsDcsWeldinfoCheckmsg","校验结果");
};
//焊口数据校验结果
function queryWeldCheckTop(dataId,weldnum,tableName,getDlgURL,viewName,topName){
	$.ajax({
		url : rootPath+"/consDcsCommon/canBrowse.do",
		data :{"oid" : dataId,"tableName" : tableName},
		type : 'POST',
		dataType:"json",
		async:true,
		success : function(data) {
			if(data.status==1){
				//top.getDlg(getDlgURL);
				top.getDlg(getDlgURL+weldnum,viewName,topName,800,630,false,true,true);
			}else{
				top.showAlert('提示', '没有权限', 'info');
			}
		}
	})
}
/*var scoCrossClicked = function(e){
	var dataId = e.graphic.attributes.OID;
	console.info(e);
	$.ajax({
		url : rootPath+"/consDcsCommon/canBrowsePipeWeld.do",
		data :{"oid" : dataId,"tableName" : "SCO_BASE_CROSS"},
		type : 'POST',
		dataType:"json",
		async:true,
		success : function(data) {
			if(data.status==1){
				var crossway=data.data.crossway;
				if(crossway == 1){
						top.getDlg("../construction/cdcs/crossing/cons_dcs_excavation/view_cons_dcs_excavation.html?oid="+data.data.oid,"viewConsDcsExcavation","开挖穿越详细信息",800,600,false,true,true);
					}else if(crossway==2){
						top.getDlg("../construction/cdcs/crossing/cons_dcs_pipejacking/view_cons_dcs_pipejacking.html?oid="+data.data.oid,"viewConsDcsPipejacking","顶管穿越详细信息",800,600,false,true,true);
					}else if(crossway==3){
						top.getDlg("../construction/cdcs/crossing/cons_dcs_drilling/view_cons_dcs_drilling.html?oid="+data.data.oid,"viewConsDcsDrilling","定向钻穿越详细信息",800,600,false,true,true);
					}else if(crossway==4){
						top.getDlg("../construction/cdcs/crossing/cons_dcs_drilling_blasting/view_cons_dcs_drilling_blasting.html?oid="+data.data.oid,"viewConsDcsDrillingblasting","钻爆隧道穿越详细信息",800,600,false,true,true);
					}else if(crossway==5){
						top.getDlg("../construction/cdcs/crossing/cons_dcs_crossover/view_cons_dcs_crossover.html?oid="+data.data.oid,"viewConsDcsCrossover","跨越详细信息",800,600,false,true,true);
					}else if(crossway==6){
						top.getDlg("../construction/cdcs/crossing/cons_dcs_shield/view_cons_dcs_shield.html?oid="+data.data.oid,"viewConsDcsShield","盾构穿越详细信息",800,600,false,true,true);
					}else if(crossway==7){
						top.getDlg("../construction/cdcs/crossing/cons_dcs_boxculvert/view_cons_dcs_boxculvert.html?oid="+data.data.oid,"viewConsDcsBoxculvert","箱涵穿越详细信息",800,600,false,true,true);
					}
			}else{
				top.showAlert('提示', '没有权限', 'info');
			}
		}
	})
};*/

