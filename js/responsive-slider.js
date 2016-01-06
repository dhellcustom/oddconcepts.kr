(function(){(function(f){var l,g,k,h;l=function(a,b){this.$element=a;this.$slides=this.$element.find(".slides ul li");1>this.$slides.length&&(this.$slides=this.$element.find('[data-group="slides"] ul li'));this.$prevNext=this.$element.find("[data-jump]");this.$pages=this.$element.find("[data-jump-to]");this.$slidesContainer=this.$element.find('[data-group="slides"]');this.$rel=this.$element.find('[data-group="slides"] ul');this.$rel.css("position","relative");this.interval=this.slideChangeInProgress=
!1;this.options=b;this.current=2;this.slide=1;this.set(2,!0);this.options.onInit.call(this);this.runAnimations();return null};l.prototype={getGlobalWidth:function(){return this.$element.width()},updateControls:function(){this.$pages.removeClass("active");return this.$pages.filter("[data-jump-to="+(this.current-1)+"]").addClass("active")},runAnimations:function(){var a;a=this;return f(this.$slides[this.current-1]).find("[data-animate]").each(function(){var b;b=f(this);return a.options.animations[b.data("animate")](b,
b.data("delay"),b.data("length"))})},hideAnimatedCaptions:function(a){return f(this.$slides[a-1]).find("[data-animate]").css({opacity:0})},calculateScroll:function(a){var b;b=this.getGlobalWidth();return(a-1)*b},resize:function(){return this.$rel.css("right",this.calculateScroll(this.current))},jump:function(a,b,e){var c,d;null==b&&(b=this.options.transitionTime);null==e&&(e=!1);c=this;a===c.current&&(e=!0);this.$slides.length>=a&&!this.slideChangeInProgress&&(this.getGlobalWidth(),e||this.hideAnimatedCaptions(a),
d=void 0,this.options.parallax&&(this.currentBgPosition=parseInt(c.$slidesContainer.css("background-position")),this.moveStartScroll=parseInt(this.$rel.css("right"),10),d=function(){var a;a=Math.round(c.currentBgPosition-(c.moveStartScroll-parseInt(c.$rel.css("right"),10))*c.options.parallaxDistance*c.options.parallaxDirection)+"px 0";return c.$slidesContainer.css("background-position",a)}),b={duration:b,step:d,done:function(){1===a?(c.hideAnimatedCaptions(c.$slides.length-1),c.set(c.$slides.length-
1)):a===c.$slides.length?(c.hideAnimatedCaptions(2),c.set(2)):(c.current=a,c.slide=a-1);c.updateControls();e||c.runAnimations();c.options.onSlideChange.call(c);return null},always:function(){c.slideChangeInProgress=!1;return null}},this.slideChangeInProgress=!0,this.$rel.animate({right:this.calculateScroll(a)},b));return null},set:function(a,b){this.getGlobalWidth();this.$rel.css("right",this.calculateScroll(a));this.current=a;this.slide=a-1;this.updateControls();return null},movestart:function(a){if(a.distX>
a.distY&&a.distX<-a.distY||a.distX<a.distY&&a.distX>-a.distY)return a.preventDefault();this.stop();this.options.parallax&&(this.currentBgPosition=parseInt(this.$slidesContainer.css("background-position")));this.hideAnimatedCaptions(this.current-1);this.hideAnimatedCaptions(this.current+1);this.moveStartScroll=parseInt(this.$rel.css("right"),10);this.$rel.stop();this.$rel.addClass("drag");return this.timeStart=new Date},move:function(a){var b;this.options.parallax&&(b=Math.round(this.currentBgPosition-
a.distX*this.options.parallaxDistance*this.options.parallaxDirection)+"px 0",this.$slidesContainer.css("background-position",b));return this.$rel.css("right",this.moveStartScroll-a.distX)},moveend:function(a){var b,e,c,d;b=Math.abs(a.distX);d=(new Date).getTime()-this.timeStart.getTime();c=this.getGlobalWidth();e=b/c;e=d/e*(1-e);e=1E3>e?e:1E3;this.$rel.removeClass("drag");return b<c/this.options.moveDistanceToSlideChange?this.jump(this.current,e,!0):0>a.distX?this.next(e):this.prev(e)},stop:function(a){null==
a&&(a=!0);clearInterval(this.interval);a&&(this.$element.off("mouseover"),this.$element.off("mouseleave"));return null},start:function(){var a;a=this;return this.interval=setInterval(function(){return a.next()},this.options.interval)},autoplay:function(){var a;a=this;this.stop();this.start();this.$element.on("mouseover",function(){return a.stop(!1)});return this.$element.on("mouseleave",function(){a.stop(!1);return a.start()})},prev:function(a,b){null==a&&(a=this.options.transitionTime);null==b&&
(b=!1);this.jump(this.current-1,a,b);this.options.onSlidePrev.call(this);return this.options.onSlidePageChange.call(this)},next:function(a,b){null==a&&(a=this.options.transitionTime);null==b&&(b=!1);this.jump(this.current+1,a,b);this.options.onSlideNext.call(this);return this.options.onSlidePageChange.call(this)}};f.fn.responsiveSlider=function(a){var b,e,c,d,g;d=this;e=f.extend({},f.fn.responsiveSlider.defaults,"object"===typeof a&&a);e.animations=f.fn.responsiveSlider.animations;c={next:"next",
prev:"prev",stop:"stop",start:"autoplay"};b=function(a){var b,c,d;e=f.metadata?f.extend({},e,a.metadata()):e;c=a.find("ul li");1<c.length&&(b=f(c[0]),c=f(c[c.length-1]),b.before(c.clone()),c.after(b.clone()));a.data("slider",d=new l(a,e));e.autoplay&&(d.interval=setInterval(function(){return d.next()},e.interval),d.autoplay());f(window).on("resize",function(){return d.resize()});a.find("[data-jump]").on("click",function(){d[f(this).data("jump")]();return!1});a.find("[data-jump-to]").on("click",function(){d.jump(f(this).data("jump-to")+
1);return!1});if(e.touch)return a.find('[data-group="slide"]').on("movestart",function(a,b){return d.movestart(a)}).on("move",function(a){return d.move(a)}).on("moveend",function(a){return d.moveend(a)})};g=function(){return d.each(function(){var d,g;d=f(this);if(g=d.data("slider"))if("string"===typeof a)g[c[a]]();else"number"===typeof a&&g.jump(Math.abs(a)+1);else b(d,e);return d})};if(f.fn.responsiveSlider.run)return g();f(window).on("load",g);return f.fn.responsiveSlider.run=!0};f.fn.responsiveSlider.animations=
{slideAppearRightToLeft:function(a,b,e){var c,d;null==b&&(b=0);null==e&&(e=300);d={"margin-left":100,"margin-right":-100};a.css(d);c=function(){d={"margin-left":0,"margin-right":0,opacity:1};return a.animate(d,e)};return 0<b?setTimeout(c,b):c()},slideAppearLeftToRight:function(a,b,e){var c,d;null==b&&(b=0);null==e&&(e=300);d={"margin-left":-100,"margin-right":100};a.css(d);c=function(){d={"margin-left":0,"margin-right":0,opacity:1};return a.animate(d,e)};return 0<b?setTimeout(c,b):c()},slideAppearUpToDown:function(a,
b,e){var c,d;null==b&&(b=0);null==e&&(e=300);d={"margin-top":100,"margin-bottom":-100};a.css(d);c=function(){d={"margin-top":0,"margin-bottom":0,opacity:1};return a.animate(d,e)};return 0<b?setTimeout(c,b):c()},slideAppearDownToUp:function(a,b,e){var c,d;null==b&&(b=0);null==e&&(e=300);d={"margin-top":-100,"margin-bottom":100};a.css(d);c=function(){d={"margin-top":0,"margin-bottom":0,opacity:1};return a.animate(d,e)};return 0<b?setTimeout(c,b):c()}};f.fn.responsiveSlider.defaults={autoplay:!1,interval:5E3,
touch:!0,parallax:!0,parallaxDistance:0.1,parallaxDirection:1,transitionTime:1400,moveDistanceToSlideChange:4,onSlideChange:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSlidePageChange:function(){},onInit:function(){}};f.fn.responsiveSlider.run=!0;h=f('[data-spy="responsive-slider"]');if(h.length){k={};if(g=h.data("autoplay"))k.autoplay=g;if(g=h.data("interval"))k.interval=g;if(g=h.data("parallax"))k.parallax=g;if(g=h.data("parallax-distance"))k.parallaxDistance=parseInt(g,10);
if(g=h.data("parallax-direction"))k.parallaxDirection=parseInt(g,10);(g=h.data("touch"))||(k.touch=g);if(g=h.data("transitiontime"))k.transitionTime=g;h.responsiveSlider(k)}return null})(jQuery)}).call(this);
