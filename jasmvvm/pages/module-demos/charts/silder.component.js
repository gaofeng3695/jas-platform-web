  Vue.component('pipe-slider', {
    props: {
      minVal: {
        default: 0
      },
      maxVal: {
        default: 3250
      },
      line: {},
      beginVal: {},
      finishVal: {},
      minSpaceVal: {},
      // tiplineVal: {},

    },
    data: function () {
      return {
        min: 0,
        max: 0,
        begin: 0,
        finish: 0,
        beginset: 0,
        finishset: 0,
        minSpace: 0,
        beginLeft: 0,
        finishLeft: 0,
        tiplineLeft: 0,
        sites: [],
        popvisiable: false,
      }
    },
    template: [
      '<div @contextmenu.prevent="">',
      '<div style="margin: 0 40px 10px 45px;text-align: right;">',
      '  <span style="float:left;">当前管线： {{line}} {{ "（" + to3(this.min) + "km - "+ to3(this.max)  +"km）"}}</span>',

      '<slot></slot>',

      '  <el-popover placement="bottom" width="173" v-model="popvisiable">',
      '    <div><span>起始：</span><el-input-number  v-model="beginset" :min="min" :max="finishset-minSpace" type="number" size="mini" placeholder="请输入内容"></el-input-number></div>',
      '    <div style="margin:8px 0 ;" ><span>终止：</span><el-input-number  v-model="finishset" :min="beginset+minSpace" :max="max" type="number" size="mini" placeholder="请输入内容"></el-input-number></div>',
      '    <div style="text-align: right; margin: 0">',
      '      <el-button size="mini" type="text" @click="popvisiable = false">取消</el-button>',
      '      <el-button type="primary" size="mini" @click="popvisiable = false;setRangeVal()">确定</el-button>',
      '    </div>',
      '    <el-button slot="reference" type="primary" size="mini" plain>范围</el-button>',
      '  </el-popover>      ',


      '  <el-button-group>',
      '    <el-button @click="goLastPart" type="primary" size="mini" plain icon="el-icon-arrow-left"></el-button>',
      '    <el-button @click="goNextPart" type="primary" size="mini" plain icon="el-icon-arrow-right"></el-button>',
      '  </el-button-group>',
      '</div>',

      '<div ref="pipe" style="position: relative;margin:0 40px;">',
      '  <div id="mainpipe" @contextmenu.prevent="" style="height: 60px;background-color: #A8B4C0;background-image: linear-gradient(0deg,#A8B4C0 0%,#FFFFFF 50%,#A8B4C0 100%);"></div>',

      // 场站图标
      '  <el-tooltip v-for=" n,index in sites" :key="n.mileage" effect="light"  placement="bottom">',
      '    <div slot="content">名称：场站{{index+1}}<br/>里程：{{n.mileage}} m</div>',
      '    <div :style="{\'left\':n.left + \'px\'}" style="height:20px;width:20px;background:#f90;position:absolute;top:20px;border:1px solid #000;"><div style="width:10px;height:10px;margin:5px;background:#333;border-radius:50%;"></div></div>',
      '  </el-tooltip>',

      // 管道封头
      '  <div style="position: absolute;height: 70px;top:-5px;left:-8px;width: 8px;border-radius:2px;background: #aab6c2;"></div>',
      '  <div style="position: absolute;height: 70px;top:-5px;right:-8px;width: 8px;border-radius:2px;background: #aab6c2;"></div>',

      // 标记红线
      '  <div  :style="{\'left\':tiplineLeft + \'px\'}" style="position: absolute;z-index:9;left:0;top:0;height: 60px;width:1px;background:red;"></div>',

      // 滑动块
      '  <div ref="mask":style="{\'left\':beginLeft + 4 +\'px\',\'width\':finishLeft - beginLeft  + \'px\'}" style="position: absolute; height: 70px;top:-5px;cursor: move;background: #409eff;opacity:0.3;"></div>',
      '  <div ref="begin" class="_my_begin" :style="{\'left\':beginLeft + \'px\'}" style="position: absolute; height: 70px;top:-5px;cursor: e-resize; width: 8px;border-radius: 4px;background: #409eff;opacity:0.8;">',
      '    <span style="padding-left:9px;">{{ to3(begin)}}</span>',
      '  </div>',
      '  <div ref="finish" class="_my_finish" :style="{\'left\':finishLeft + \'px\'}" style="position: absolute; height: 70px;top:-5px;cursor: e-resize; width: 8px;border-radius: 4px;background: #409eff;opacity:0.8;">',
      '    <span style="padding-left:9px;">{{to3(finish)}}</span>',
      '  </div>',



      '</div>',
      '</div>',
    ].join(''),
    created: function () {
      // this.init();
    },
    mounted: function () {
      this.addBarEvent();
      this.addPipeEvent();
    },
    // watch: {

    // },
    methods: {
      to3: function (num) {
        num = num || 0;
        return num / 1000;
      },
      setTipline: function (tiplineVal) {
        var pipeL = this.$refs.pipe.clientWidth;
        this.tiplineLeft = (tiplineVal - this.min) / (this.max - this.min) * pipeL;
        // console.log('this.tiplineLeft', this.tiplineLeft)
      },
      setSites: function () {
        var that = this;
        var arr = makeData(this.min + 1000, this.max - 1000, 1, 8);
        arr.forEach(function (item) {
          item.left = (item.mileage - that.min) / (that.max - that.min) * $(that.$refs.pipe).width();
        });
        that.sites = arr;
        // console.log(arr)
      },
      goLastPart: function () {
        var that = this;
        if (this.begin == this.min) return;
        var distlength = this.finish - this.begin;
        this.begin = this.begin - distlength;
        this.begin = this.begin < this.min ? this.min : this.begin;
        this.finish = this.begin + distlength;
        this.$nextTick(function () {
          that.setBarLeft();
          that.$emit('change', [that.begin, that.finish]);
        });
      },
      goNextPart: function () {
        var that = this;
        if (this.finish == this.max) return;
        var distlength = this.finish - this.begin;
        this.finish = this.finish + distlength;
        this.finish = this.finish > this.max ? this.max : this.finish;
        this.begin = this.finish - distlength;
        this.$nextTick(function () {
          that.setBarLeft();
          that.$emit('change', [that.begin, that.finish]);
        });
      },
      init: function (isCreated) {
        var that = this;
        this.min = this.minVal;
        this.max = this.maxVal;
        this.begin = this.beginVal || this.minVal;
        this.finish = this.finishVal > this.maxVal ? this.maxVal : this.finishVal;
        this.minSpace = this.minSpaceVal || (this.max - this.min) / 20;

        this.$nextTick(function () {
          // that.setSites();
          that.setBarLeft();
          that.$emit('change', [that.begin, that.finish]);
        });
      },
      setRangeVal: function () {
        var that = this;
        this.begin = this.beginset;
        this.finish = this.finishset;
        this.$nextTick(function () {
          that.setBarLeft();
          that.$emit('change', [that.begin, that.finish]);
        });
      },
      setBarLeft: function (type) { // begin finish
        type = type === 'begin' ? 'begin' : 'finish'
        var pipeL = this.$refs.pipe.clientWidth;
        this.beginLeft = (this.begin - this.min) / (this.max - this.min) * pipeL;
        this.finishLeft = (this.finish - this.min) / (this.max - this.min) * pipeL;
      },
      addPipeEvent: function () {
        var that = this;
        $('#mainpipe').on('mousedown', function (e) {
          var range = [];
          if (e.button === 2) {
            range.push(e.offsetX);
          }
          $(document).one('mouseup', function (e) {
            if (e.button === 2 && e.target.id == 'mainpipe') {
              range.push(e.offsetX);
              range.sort(function (a, b) {
                return a - b
              });
              var pipeL = that.$refs.pipe.clientWidth;
              if (range[1] - range[0] < 10) return;
              var valrange = range.map(function (item) {
                return Math.floor(item / pipeL * (that.max - that.min) + that.min);
              });
              // console.log(valrange)

              that.begin = valrange[0];
              that.finish = valrange[1];
              that.$nextTick(function () {
                that.setBarLeft();
                that.$emit('change', [that.begin, that.finish]);
              });

              // console.log(e)
            }
          })
        });
      },
      addBarEvent: function () {
        var that = this;
        $(that.$refs.finish).add(that.$refs.begin).add(that.$refs.mask).on('mousedown', function (e) {
          var pipeLeft = $(that.$refs.pipe).offset().left;
          var maskLeft = $(that.$refs.mask).offset().left;
          var maskDragLeft = e.pageX - maskLeft;
          var maskDragRight = $(that.$refs.mask).width() - (e.pageX - maskLeft);
          var pipeL = that.$refs.pipe.clientWidth;
          var thisDom = this;
          $(document).on('mousemove', function (e) {
            that.barmoved = true;
            var left = e.pageX - pipeLeft;
            var limit = 0;
            if ($(thisDom).hasClass('_my_begin')) {
              limit = (that.finish - that.min - that.minSpace) / (that.max - that.min) * pipeL;
              left = left > limit ? limit : left;
              left = left < 0 ? 0 : left;
              that.begin = Math.floor(left / pipeL * (that.max - that.min) + that.min);
              that.beginLeft = left;

            } else if ($(thisDom).hasClass('_my_finish')) {
              limit = (that.begin - that.min + that.minSpace) / (that.max - that.min) * pipeL;
              left = left < limit ? limit : left;
              left = left > pipeL ? pipeL : left;
              that.finish = Math.floor(left / pipeL * (that.max - that.min) + that.min);
              that.finishLeft = left;
            } else {
              var beginleft = left - maskDragLeft - 4;
              var distVal = that.finish - that.begin;

              if (beginleft < 0) {
                that.begin = 0;
                that.beginLeft = 0;
                that.finish = that.begin + distVal;
                that.finishLeft = (that.finish - that.min) / (that.max - that.min) * pipeL;
              } else if (beginleft > pipeL - $(that.$refs.mask).width()) {
                that.begin = that.max - distVal;
                that.beginLeft = pipeL - $(that.$refs.mask).width();
                that.finish = that.max;
                that.finishLeft = pipeL;
              } else {
                that.begin = Math.floor(beginleft / pipeL * (that.max - that.min) + that.min);
                that.beginLeft = beginleft;
                that.finish = that.begin + distVal;
                that.finishLeft = (that.finish - that.min) / (that.max - that.min) * pipeL;
              }
            }
            // $(thisDom).css('left', left + 'px');
            return false;
          });

          $(document).on('mouseup', function () {
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            if (that.barmoved) {
              that.barmoved = false;
              that.$emit('change', [that.begin, that.finish]);
            }
          });

        });

      },


    }
  });