/**
 * 由 霓虹彩雀 创建于2014-3-29.
 * 电子邮箱：out_lier@126.com
 * JSlim支持绝大部分jquery的函数，用法也一致。借鉴了很多jquery的东西，对jquery进行了瘦身和简化。可以理解JSlim为Slim Jquery。
 * 注：JSlim与jQuery冲突。
 * 本版本需要完成的内容包括：
 * 一、选择器
 * 1）基本选择器
 * 2）层级选择器
 * 3）过滤选择器
 * 4）表单选择器
 * 二、封装不同浏览器的函数特性，提供常用函数
 * 三、完成ajax的常用操作
 * 四、对dom的操作，基本函数
 *五、思考html5版本的JSlim该怎么做
 * 预计完成时间2014/05/31
 * 本版本仅保证正确，不做异常处理
 */

//JSlim的构造函数
function JSlim(param){
    var elements = new Array();

    var cur;

    //判断一个选择符是不是id格式，当然咯，应该不会有人用数字开头吧
    var reid=/^#[a-zA-z0-9_]+$/;

    //ie8+和其它浏览器都支持这种写法
    if(reid.test(param)){//调用id
        cur = document.getElementById(param);
        elements.push(cur);
        return cur;
    }else if(document.querySelectorAll){
        elements.push(document.querySelectorAll(param));
    }else{//针对ie6和ie7

    }
    if(elements.length>0){
        cur=elements[0];
    }
    return elements;
}
//JSlim的初始化
var _JSlim=new JSlim(),
    $=JSlim;
//JSlim的原型重写
//JSlim.fn =
JSlim.prototype ={
    constructor : JSlim,
    version:"0.0.1",

    <!--常用函数开始-->
    IEName:function(name){//IE属性名？TODO
        var _name = name.replace(/-[A-Za-z]/,function(rc){
            return rc.toUpperCase().replace("-","");
        });
        return _name;
    },
    //去除头部和尾部的空格
    trim:function(v){
        return v.replace(/^\s+|\s+$/g,'');
    },
    eqs:function(a,b){
        return a.toLowerCase()== b.toLowerCase();
    },
    <!--常用函数结束-->

    <!--属性&样式开始-->
    attr:function(data){
        if(typeof data == "string"){
            return this.cur.getAttribute(data);
        }else if(typeof data=="object"){
            for(var s in data){
                //不需要判断属性是否存在，浏览器中都会直接覆盖
                var temp=document.createAttribute(s);
                temp.value=data[s];
                this.cur.setAttributeNode(temp);
            }
        }
    },
    css:function(data){
        var style;
        if(typeof data == "string"){

             style=this.cur.getAttribute("style");
            alert(typeof style)
        }else if(typeof data=="object"){
            for(var s in data){
                //不需要判断属性是否存在，浏览器中都会直接覆盖
                var temp=document.createAttribute(s);
                temp.value=data[s];
                this.cur.setAttributeNode(temp);
            }
        }
    },
    <!--属性&样式结尾-->
    <!--事件绑定开始-->
        on:function(type,se,data,fn,de){

        },

    <!--事件绑定结束-->
    <!--ajax的封装开始-->
    //ajax的主要方法，其它ajax方法没有具体实现，都是调用这个方法
    ajax:function(data){
        var req;
        //ie7+和其它浏览器创建XMLHttpRequest对象
        if(window.XMLHttpRequest){
            req = new XMLHttpRequest();
        }else{//兼容ie6浏览器
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var method = data['method']==undefined?"GET":data['method'].toUpperCase();
        var async = data['async']==undefined?true:data['async'];
        req.open(method,data['url'],async);
        if(typeof data['beforeSend']=="function"){
            data['beforeSend']();
        }
        if(method=="GET"){
            req.send();
        }else if(method=="POST"){
            req.send(data['data']);
        }
        if(typeof data['success']=="function"){
            data['success'](req.responseText);
        }
    },
    //ajax的post方法
    post:function(url,data,callback){
        this.ajax({url:url,data:data,success:callback,async:true,method:'post'})
    },
    //ajax的get方法
    get:function(url,callback){
        this.ajax({url:url,success:callback,async:true,method:'get'})
    },
    <!--ajax的封装结束-->
    <!--表单的操作开始-->
    serialize:function(){

    },
    <!--表单的操作结束-->

    <!--对class的处理开始-->
    //判断该元素是否有这个类,只接受一个对象
    hasClass:function(v){
        if(this.cur==undefined){
            return;
        }
        var classes = this.cur.className.split(/\s+/);
        for(var temp in classes){
            if(temp.toLowerCase()==v){
                return true;
            }
        }
        return false;
    },
    addClass:function(v){
        if(this.cur==undefined){
            return;
        }
        var pos=-1, i,len;
        var classes = this.cur.className.split(/\s+/);
        for(i=0,len=classes.length;i<len;i++){
            if(classes[i]==v){
                pos=i;
                break;
            }
        }
        //类在该元素中不存在，增加！
        if(pos==-1){
        //增加类
        classes.push(v);
        //把剩余的类重新组合
        this.cur.className=classes.join(" ");
        }
    },

    on:function(v,func){
        if(document.addEventListener){

        }
    },
    off:function(v,func){

    },
    removeClass:function(){
        if(this.cur==undefined){
            return;
        }
        var pos=-1, i,len;
        var classes = this.cur.className.split(/\s+/);
        for(i=0,len=classes.length;i<len;i++){
            if(classes[i]==v){
                pos=i;
                break;
            }
        }
        //类在该元素中存在，删除
        if(pos!=-1){
            //删除类名
            classes.slice(i,1);
            //把剩余的类重新组合
            this.cur.className=classes.join(" ");
        }
    },
    toggleClass:function(v){
        if(this.cur==undefined){
            return;
        }
        var pos=-1, i,len;
        var classes = this.cur.className.split(/\s+/);
        for(i=0,len=classes.length;i<len;i++){
            if(classes[i]==v){
                pos=i;
                break;
            }
        }
//        类在该元素中存在，删除
        if(pos!=-1){
            //删除类名
            classes.slice(i,1);
            //把剩余的类重新组合
            this.cur.className=classes.join(" ");
        }else{
            //删除类名
            classes.slice(i,1);
            //把剩余的类重新组合
            this.cur.className=classes.join(" ");
        }
    }
    <!--对class的处理结束-->
}


JSlim.find=function(term,re){
//    for(var term in terms.split(",")){    } //这一步在前面做？
    term=JSlim.fn.trim(term);
    var pop=term.substring(0,1);
    if(pop=="#"){
        re = document.getElementById(term.substr(1));
    }else if(pop=="."){
        re = document.getElementByClassName(term.substr(1));//TODO
    }else if(pop=="*"){

    }
}

