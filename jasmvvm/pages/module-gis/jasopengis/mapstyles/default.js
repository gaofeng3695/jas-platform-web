/**
 * 样式模板，需要openlayers.js依赖
 */
JasMap.require(function(){
    var styleManager = this;
    var jasMap = styleManager.api;
    var mapStyleTemplates = {};
    var getBasePath = jasMap.commonUtil.getApiRootPath;
    /**
     *中线桩
     * @type {ol.style.Style}
     */
    mapStyleTemplates.centerlinestake = new ol.style.Style({
        image: new ol.style.Icon({
            src:getBasePath("basepath:images/renderer/centerlinestake.png"),
            anchor: [0.5, 0.5]
        })
    });
    /**
     *阀室
     * @type {ol.style.Style}
     */
    mapStyleTemplates.valveroom = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            src: getBasePath('basepath:images/renderer/valveroom.png')
        })
    });
    /**
     *站场
     * @type {ol.style.Style}
     */
    mapStyleTemplates.station = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            src:getBasePath('basepath: images/renderer/station.png')
        })
    });
    /**
     *站场平面图
     * @type {ol.style.Style}
     */
    mapStyleTemplates.stationarea = new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#48ddff'
        }),
        stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1
        })
    });
    /**
     *线路段
     * @type {ol.style.Style}
     */
    mapStyleTemplates.pipesegment = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#ff0000',
            width: 6
        }),
        fill: new ol.style.Fill({
            color: 'rgba(225, 0, 255, 1)'
        })
    });
    /**
     *
     * @type {ol.style.Style}
     */
    mapStyleTemplates.country = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1
        })
    });
    //--------------默认的标注样式---------------
    /**
     *
     * @type {ol.style.Style}
     */
    mapStyleTemplates.firstLevelPointLabelStyle = new ol.style.Style({
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            offsetX:-20,
            offsetY:10,
            overflow: true,
            textAlign:"right",
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
            })
        })
    });
    /**
     *
     * @type {ol.style.Style}
     */
    mapStyleTemplates.secondLevelPointLabelStyle = new ol.style.Style({
        text: new ol.style.Text({
            font: '10px Calibri,sans-serif',
            offsetX:15,
            offsetY:5,
            overflow: true,
            textAlign:"left",
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
            })
        })
    });
    /**
     *
     * @type {ol.style.Style}
     */
    mapStyleTemplates.lineLabelStyle = new ol.style.Style({
        text: new ol.style.Text({
            font: '13px Calibri,sans-serif',
            placement:'line',
            overflow: true,
            textBaseline:"bottom",
            //offsetY:10,
            //offsetX:10,
            fill: new ol.style.Fill({
                color: '#fff'
            }),
            stroke: new ol.style.Stroke({
                color: '#580087',
                width: 2
            })
        })
    });
    /**
     *
     * @type {ol.style.Style}
     */
    mapStyleTemplates.polygonLabelStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1
        }),
        geometry: function(feature) {
            var geometry = feature.getGeometry();
            if (geometry.getType() === 'MultiPolygon') {
                var polygons = geometry.getPolygons();
                var widest = 0;
                for (var i = 0, ii = polygons.length; i < ii; ++i) {
                    var polygon = polygons[i];
                    var width = ol.extent.getWidth(polygon.getExtent());
                    if (width > widest) {
                        widest = width;
                        geometry = polygon;
                    }
                }
            }
            return geometry;
        },
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            placement:'polygon',
            overflow: true,
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
            })
        })
    });
    //---------------默认的拖拽样式--------------//
    mapStyleTemplates[jasMap.Keys.defaultDragStyleName] = {
        'Point': new  ol.style.Style({
            image: new  ol.style.Circle({
                fill: new  ol.style.Fill({
                    color: 'rgba(255,255,0,0.5)'
                }),
                radius: 5,
                stroke: new  ol.style.Stroke({
                    color: '#ff0',
                    width: 1
                })
            })
        }),
        'LineString': new  ol.style.Style({
            stroke: new  ol.style.Stroke({
                color: '#f00',
                width: 3
            })
        }),
        'Polygon': new  ol.style.Style({
            fill: new  ol.style.Fill({
                color: 'rgba(0,255,255,0.5)'
            }),
            stroke: new  ol.style.Stroke({
                color: '#0ff',
                width: 1
            })
        }),
        'MultiPoint': new  ol.style.Style({
            image: new  ol.style.Circle({
                fill: new  ol.style.Fill({
                    color: 'rgba(255,0,255,0.5)'
                }),
                radius: 5,
                stroke: new  ol.style.Stroke({
                    color: '#f0f',
                    width: 1
                })
            })
        }),
        'MultiLineString': new ol.style.Style({
            stroke: new  ol.style.Stroke({
                color: '#0f0',
                width: 3
            })
        }),
        'MultiPolygon': new  ol.style.Style({
            fill: new  ol.style.Fill({
                color: 'rgba(0,0,255,0.5)'
            }),
            stroke: new  ol.style.Stroke({
                color: '#00f',
                width: 1
            })
        })
    };
    //---------------默认的面查询、圆查询样式------------//
    mapStyleTemplates[jasMap.Keys.defaultPolygonQueryStyleName] = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(44,184,255,0.7)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(185,12,211,1)',
            width: 2
        })
    });
    mapStyleTemplates[jasMap.Keys.defaultCircleQueryStyleName] = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(44,184,255,0.7)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(185,12,211,1)',
            width: 2
        })
    });
    //---------------默认的标绘样式--------------//
    mapStyleTemplates[jasMap.Keys.defaultDrawStyleName] = {
        'Point': new  ol.style.Style({
            image: new  ol.style.Circle({
                fill: new  ol.style.Fill({
                    color: 'rgba(255,255,0,0.5)'
                }),
                radius: 5,
                stroke: new  ol.style.Stroke({
                    color: '#ff0',
                    width: 1
                })
            })
        }),
        'LineString': new  ol.style.Style({
            stroke: new  ol.style.Stroke({
                color: '#f00',
                width: 3
            })
        }),
        'Polygon': new  ol.style.Style({
            fill: new  ol.style.Fill({
                color: 'rgba(0,255,255,0.5)'
            }),
            stroke: new  ol.style.Stroke({
                color: '#0ff',
                width: 1
            })
        }),
        'MultiPoint': new  ol.style.Style({
            image: new  ol.style.Circle({
                fill: new  ol.style.Fill({
                    color: 'rgba(255,0,255,0.5)'
                }),
                radius: 5,
                stroke: new  ol.style.Stroke({
                    color: '#f0f',
                    width: 1
                })
            })
        }),
        'MultiLineString': new ol.style.Style({
            stroke: new  ol.style.Stroke({
                color: '#0f0',
                width: 3
            })
        }),
        'MultiPolygon': new  ol.style.Style({
            fill: new  ol.style.Fill({
                color: 'rgba(0,0,255,0.5)'
            }),
            stroke: new  ol.style.Stroke({
                color: '#00f',
                width: 1
            })
        })
    };
    //---------------默认的量测样式--------------//
    mapStyleTemplates[jasMap.Keys.defaultMeasureStyleName] = {
        'Point': new  ol.style.Style({
            image: new  ol.style.Circle({
                fill: new  ol.style.Fill({
                    color: 'rgba(255,255,0,0.5)'
                }),
                radius: 5,
                stroke: new  ol.style.Stroke({
                    color: '#ff0',
                    width: 1
                })
            })
        }),
        'LineString': new  ol.style.Style({
            stroke: new  ol.style.Stroke({
                color: '#f00',
                width: 3
            })
        }),
        'Polygon': new  ol.style.Style({
            fill: new  ol.style.Fill({
                color: 'rgba(0,255,255,0.5)'
            }),
            stroke: new  ol.style.Stroke({
                color: '#0ff',
                width: 1
            })
        }),
        'MultiPoint': new  ol.style.Style({
            image: new  ol.style.Circle({
                fill: new  ol.style.Fill({
                    color: 'rgba(255,0,255,0.5)'
                }),
                radius: 5,
                stroke: new  ol.style.Stroke({
                    color: '#f0f',
                    width: 1
                })
            })
        }),
        'MultiLineString': new ol.style.Style({
            stroke: new  ol.style.Stroke({
                color: '#0f0',
                width: 3
            })
        }),
        'MultiPolygon': new  ol.style.Style({
            fill: new  ol.style.Fill({
                color: 'rgba(0,0,255,0.5)'
            }),
            stroke: new  ol.style.Stroke({
                color: '#00f',
                width: 1
            })
        })
    };
    //
    mapStyleTemplates[jasMap.Keys.defaultHighlightStyleName] = new  ol.style.Style({
        image: new  ol.style.Circle({
            fill: new  ol.style.Fill({
                color: 'rgba(255,0,255,0.5)'
            }),
            radius: 5,
            stroke: new  ol.style.Stroke({
                color: '#f0f',
                width: 1
            })
        }),
        stroke: new  ol.style.Stroke({
            color: '#f0f',
            width: 3
        }),
        fill: new  ol.style.Fill({
            color: 'rgba(255,0,255,0.5)'
        })
    });
    //
    mapStyleTemplates[jasMap.Keys.defaultBufferAreaStyleName] = new ol.style.Style({
        stroke: new  ol.style.Stroke({
            color: '#f00',
            width: 2
        }),
        fill: new  ol.style.Fill({
            color: 'rgba(255,0,0,0.5)'
        })
    });
    return mapStyleTemplates;
});




