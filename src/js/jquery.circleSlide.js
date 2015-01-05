/*
name:jquery.circleSlide
verson:0.0.0
author:fengweiqi
email:yakia@gm99.com
github:
blog:fengweiqi.cn
date:2014-12-07
*/ 
;(function($, window, document,undefined) {
	var Privateclass = function(el) {//私有类
			this.el=el;
			this.opts=el.data('circleSlide');//获取插件参数
			this.data=function(dataName,opts){
				el.data(dataName,opts);
				
			}
	}
	Privateclass.prototype={
		
		prev:function(){
			var opts=this.opts;
			if(opts.slideAble){
				console.log(opts.index);
				if(opts.index==0){
					opts.index==3;
				}else{
					opts.index=1;
					this.el.find('ul').css('left',0);
				}
				var ulLeft=parseInt(this.el.find('ul').css('left'));
				
				
				this.el.find('ul').animate({left:ulLeft+opts.liOutWidth}, opts.slideTime,function(){
					opts.slideAble=true;
				});
				opts.slideAble=false;
				this.data('circleSlide',opts);
				this.opts=opts;
			}
		},
		next:function(){
			var opts=this.opts;
			if(opts.slideAble){
				console.log(opts.index);
				if(opts.index<opts.length){
					opts.index++;
				}else{
					opts.index=1;
					this.el.find('ul').css('left',-opts.liOutWidth*opts.length);
				}
				var ulLeft=parseInt(this.el.find('ul').css('left'));
				
				
				this.el.find('ul').animate({left:ulLeft-opts.liOutWidth}, opts.slideTime,function(){
					opts.slideAble=true;
				});
				opts.slideAble=false;
				this.data('circleSlide',opts);
				this.opts=opts;
			}
		}
		
	};
	var privateclass;//用于私有类实例化
	var methods = {//对外接口
		init: function(options) {
			return this.each(function() {
				var $this = $(this);
				var opts = $this.data('circleSlide');
				if(typeof(opts) == 'undefined') {

					var defaults = { 
						    slideTime:700,	//动画滑行速度，越大越慢
						    index:0//开始索引


					   };

					opts = $.extend({}, defaults, options);
					$this.data('easySlide', opts);

				} else {
					opts = $.extend({}, opts, options);
				}

				// 代码在这里运行
				var $liOutWidth=$this.find('li').outerWidth(true);
				var $liLength=$this.find('li').length;
				// 克隆
				var $liClone=$this.find('li').clone();
				var $liClone2=$this.find('li').clone();
					$this.find('ul').append($liClone);
					$this.find('ul').prepend($liClone2);
					$this.find('ul').css('left',-$liOutWidth*$liLength);
				console.log($liOutWidth);
				
				var $prev=$("#prev");
				var $next=$("#next");
				
				var slideAble = true;
				
				var runSettings={//插件运行时的配置
					
					slideAble:slideAble,
					liOutWidth:$liOutWidth,
					length:$liLength
				}
				opts = $.extend({}, opts, runSettings);
				$this.data('circleSlide', opts);
				privateclass=new Privateclass($this);
				

				$prev.click(function(event) {
					
					return privateclass.prev();
				});

				$next.click(function(event) {
					
					return privateclass.next();
				});

			});
		},
		
		prev: function() {
			return $(this).each(function() {
				
					privateclass.prev();

			});
		},
		next:function(){
			return $(this).each(function() {
				
					privateclass.next();
				});
			
			
		}
	};

	$.fn.circleSlide = function() {
		var method = arguments[0];

		if(methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if( typeof(method) == 'object' || !method ) {
			method = methods.init;
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.circleSlide' );
			return this;
		}
		
		return method.apply(this, arguments);

	}

})(jQuery, window, document);
