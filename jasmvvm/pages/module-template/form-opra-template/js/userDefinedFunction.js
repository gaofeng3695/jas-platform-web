(function(window) {
    var definedFunction = {
        update: function() {
            alert("自定义方法")
        },
        defined: function(row) {
            alert(JSON.stringify(row))
        },
        import:function(){
            alert("批量导入")
        }
    };
    window.definedFunction = definedFunction;
})(window)