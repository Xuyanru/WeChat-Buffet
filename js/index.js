var app=angular.module("weixindiancan",["ng","ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/start', {templateUrl: 'tpl/start.html',controller:'startCtrl'})
        .when('/evaluate', {templateUrl: 'tpl/evaluate.html',controller:'evaluateCtrl'})
        .when('/order', {templateUrl: 'tpl/order.html',controller:'orderCtrl'})
        .when('/shopcart', {templateUrl: 'tpl/shopcart.html',controller:'shopcartCtrl'})
        .when('/confirmorder/:alt', {templateUrl: 'tpl/confirmorder.html',controller:'confirmorderCtrl'})
        .when('/youhui', {templateUrl: 'tpl/youhui.html',controller:'youhuiCtrl'})
        .when('/check',{templateUrl:'tpl/check.html',controller:'checkCtrl'})
        .when('/underorder',{templateUrl:'tpl/underorder.html',controller:'underorderCtrl'})
        .when('/bill',{templateUrl:'tpl/bill.html',controller:'billCtrl'})
        .when('/myorder', {templateUrl: 'tpl/myorder.html',controller:'myorderCtrl'})
        .when('/account',{templateUrl:'tpl/account.html',controller:'accountCtrl'})
        .when('/assess',{templateUrl:'tpl/assess.html',controller:'assessCtrl'})
//      .when('/orderdetail/:did', {templateUrl: 'tpl/orderdetail.html',controller:'orderdetailCtrl'})
        .otherwise({redirectTo: '/start'})
}); 
// CONTROLLERS ============================================
// parent page controller 父控制器
app.controller('parentCtrl', function($scope,$location,$timeout) {
	$scope.animate=function(str){
		$scope.noanimate=str;
	}
//$scope.animate(true);
  $("body").css("height",$(window).height()+"px");
 	$("#menu-left ul li").click(function(){
 		if($(this).hasClass("active")){
				$("#menu-left").removeClass("active").addClass("close");
				$("div.page-inner").removeClass("active").addClass("close");
 		}else{
 			$("#menu-left ul li.active").removeClass("active");
 			$(this).addClass("active");
// 			$("#menu-left").removeClass("active");
// 			$("#viewOuter div.page-inner").removeClass("active");
   			$timeout(function(){
   				$("#menu-left").removeClass("active");
   				$("div.page-inner").removeClass("active");
   			},300);
 			
 		}
		
 	});
 
 
});

// start page controller 主页
app.controller('startCtrl', function($scope) {
	$("#start").css("height",$(window).height()+"px");
	
 
});

app.controller('evaluateCtrl', function($scope) {
				
				$( '#cd-dropdown' ).dropdown( {
					gutter :4
				} );
 
});
  
// order page controller 点餐
app.controller('orderCtrl', function($scope,$timeout) {
//$scope.animate(false);
//搜索框动画
  $("#order div.search span").unbind("click").click(function(){
  	if(!($(this).parent().hasClass("active"))){
	  		$(this).parent().addClass("active");
	  	}else{
	  		$(this).parent().addClass("close");
	  		$timeout(function(){
	  			$("#order div.search").removeClass("active");
	  			$("#order div.search").removeClass("close");
	  		},300);
	  	}
  });
//切换菜品列表样式
  $("#order div.style").unbind("click").click(function(){
  	if(!($(this).hasClass("active"))){
  		$(this).addClass("active");
  		$("#dishItems").addClass("active");
  	}else{
  		$(this).removeClass("active");
  		$("#dishItems").removeClass("active");
  	}
  });
//菜单点击
 $scope.autoScroll = function ($event){
 	if(!($($event.target).hasClass("active"))){
 		$("#order div.order-menu ul li a.active").removeClass("active");
 		$($event.target).addClass("active");
 		$scope.elename=$($event.target).attr("name");
	 	$event.preventDefault();
	   	 $('#dishItems').animate({
	            "scrollTop": $("#"+$scope.elename).position().top-5
	        }, 500);
 	} 	
    };
    
    $("#dishItems").scroll(function(){
    	if($(this).scrollTop()>60){
    		if($("#order div.wellcome-title").hasClass("active")){
    			$("#order div.wellcome-title").removeClass("active")
    			$("#order div.wellcome-title").addClass("close");
    		}
    		
    	}else{
    		if($("#order div.wellcome-title").hasClass("close")){
    			$("#order div.wellcome-title").removeClass("close")
    			$("#order div.wellcome-title").addClass("active");
    		}
    	}
    	if($("#order div.order-menu div.menuBtn").hasClass("active")){
			$("#order div.order-menu div.menuBtn").removeClass("active");
			$("#order div.order-menu").removeClass("active").addClass("close");
		}
    });
    
//  点击小厨师图片伸缩菜单
	$("#order div.order-menu div.menuBtn").unbind("click").click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$("#order div.order-menu").removeClass("active").addClass("close");
		}else{
			$(this).addClass("active");
			$("#order div.order-menu").removeClass("close").addClass("active");
		}
	});
	$("#dishItems").unbind("click").click(function(){
		if($("#order div.order-menu div.menuBtn").hasClass("active")){
			$("#order div.order-menu div.menuBtn").removeClass("active");
			$("#order div.order-menu").removeClass("active").addClass("close");
		}
	});
	
//	点击来一份弹出添加购物车弹出框
	$scope.addDish=function(){
		$("#cart-dialog-outer").show().css("display","flex");
//		$("#cart-dialog").addClass("active");
		$("#cart-dialog").addClass("animated bounceIn");
		$('#cart-dialog').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass("animated bounceIn");
		});
	}
	
//	点击弹出框的关闭按钮关闭弹出框
	$scope.closeDialog=function(){
//		$("#cart-dialog").addClass("active");
		$("#cart-dialog").addClass("animated bounceOut");
		$('#cart-dialog').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass("animated bounceOut");
			$("#cart-dialog-outer").hide();
		});
	}

//	$("#cart-dialog p.close-dialog span").unbind("click").click(function(){
//		$("#cart-dialog").addClass("close");
//		$("#cart-dialog-outer").fadeOut(200);
//		setTimeout(function(){
//			$("#cart-dialog").removeClass("close").removeClass("active");
//		},200);
			
//	});

//	点击加入购物车
	$("#cart-dialog div.cart-num p.addCart").unbind("click").click(function(){
		$("#cart-dialog p.close-dialog span").html("&#10004");
		$("#cart-dialog").addClass("adddish");
		$("#cart-dialog>div").css("opacity","0");
		setTimeout(function(){
			$("#cart-dialog").removeClass("adddish");
			$("#cart-dialog p.close-dialog span").html("X");
			$("#cart-dialog-outer").hide();
			$("#cart-dialog>div").css("opacity","1");
		},800);
	});
	
//	做法选择
$scope.addActive=function($event){
	$scope.me=$event.target;
	if(!($($scope.me).hasClass("active"))){
		$($scope.me).parent().children("span.active").removeClass("active");
		$($scope.me).addClass("active");
	}
}
	
  
});
  
// shopcart page controller 购物车
app.controller('shopcartCtrl', function($scope) {
//$scope.animate(false);
//点击修改弹出备注框
$("#shopcart div.user-msg>div>div").unbind("click").click(function(){
	$("#beizhu-dialog").show().addClass("animated bounceIn");
	$('#beizhu-dialog').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$(this).removeClass("animated bounceIn")
	});
});
  
//点击选择用餐人数
	$("#beizhu-dialog ul li").click(function(){
		if(!($(this).hasClass("active"))){
			$("#beizhu-dialog ul li.active").removeClass("active");
			$(this).addClass("active");
		}
	});
	
//	点击备注框的确定和取消按钮

	$("#beizhu-dialog div.dialogBtn p span").unbind("click").click(function(){
		$("#beizhu-dialog").addClass("animated bounceOut");
	$('#beizhu-dialog').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$(this).removeClass("animated bounceOut").hide();
	});
	});
	
//	用餐时间限制
	$scope.userTime1=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
	$scope.addTime=new Date(new Date().getTime()+(30*24*60*60*1000));
	$scope.userTime2=$scope.addTime.getFullYear()+"-"+($scope.addTime.getMonth()+1)+"-"+$scope.addTime.getDate();
	$scope.userTime=$scope.userTime1+","+$scope.userTime2;
//	var calendardatetime = new lCalendar();
//				calendardatetime.init({
//					'trigger': '#s',
//					'type': 'datetime'
//				});  

//	堂食,外带
	$("#shopcart div.user-msg p.yongcan-way span.canClick").unbind("click").click(function(){
		if(!($(this).hasClass("active"))){
			$("#shopcart div.user-msg p.yongcan-way span.canClick.active").removeClass("active");
			$(this).addClass("active");
		}
	});


});
// confirmorder page controller 订单确认
app.controller('confirmorderCtrl', function($scope,$routeParams) {
// $scope.animate(false);
   
// 点击取消弹出取消弹出框
	$scope.openDialog=function(){
		$("#cancel-order-dialog").fadeIn().css("display","flex");
	}
// 取消订单弹出框取消按钮点击
	$scope.closeDialog=function(){
		$("#cancel-order-dialog").fadeOut();
	}
	$scope.xfPrice=75.00;
	$scope.xfPrice=$scope.xfPrice.toFixed(2);
	
	if($routeParams.alt!=0){
		$scope.youhuitext=eval($routeParams.alt)[1];
		if(eval($routeParams.alt)[0]==1){
			$scope.youhuiPrice=parseInt($scope.youhuitext).toFixed(2);
			$scope.youhuiShow=true;
		}else if(eval($routeParams.alt)[0]==2){
			$scope.youhuiPrice=(parseFloat($scope.xfPrice)-parseInt($scope.youhuitext)*parseFloat($scope.xfPrice)/10).toFixed(2);
			$scope.youhuiShow=true;
		}else{
			$scope.youhuiShow=false;
			$scope.youhuiPrice="0.00";
		}
	}else{
			$scope.youhuiShow=false;
			$scope.youhuiPrice="0.00";
		}
		$scope.sfPrice=(parseFloat($scope.xfPrice)-parseFloat($scope.youhuiPrice)).toFixed(2);
});

// youhui page controller 优惠选择页面
app.controller('youhuiCtrl', function($scope) {
// $scope.animate(false);
	$scope.youhuiText=[];
	$scope.selYouhui=function($event){
		if(!($($event.currentTarget).hasClass("active"))){
			$("#youhui div.youhuiCon p.canClick.active").removeClass("active").children("span").hide();
			$($event.currentTarget).addClass("active").children("span").show();
		}else{
			$($event.currentTarget).removeClass("active").children("span").hide();
		}
		if($("#youhui div.youhuiCon p.canClick.active")){
			$scope.youhuiText[0]=$("#youhui div.youhuiCon p.canClick.active").children("img").attr("title");
			$scope.youhuiText[1]=$("#youhui div.youhuiCon p.canClick.active").children("img").attr("alt");
		}else{
			$scope.youhuiText[0]=0;
			$scope.youhuiText[1]=0;
		}
	}

});

// assess page controller 用户评论
app.controller('assessCtrl', function($scope) {
// $scope.animate(false);'
//	用户输入区域placeholder显示
	
	$(window).resize(function(){
		if($("#textCon").hasClass("active")){
			$("#assess").animate({
				"top":"0px"
			},50);
			$("#textCon").removeClass("active");
			if($("#textCon").html()==""){
				$("#textCon").append('<p>菜品口味还满足您的味蕾吗？服务还到位吗?环境是否符合您的要求？谈谈您的用餐感受吧！</p>');
			}
			$("#cancel-assess-button,#publish-assess-button").show();
		}else{
			$("#textCon").addClass('active');
			var mainOffsetTop = $("#textCon").offset().top;
            var mainHeight = $("#textCon").height();
            var winHeight = $(window).height();
            var winScrollTop = $(window).scrollTop();
            if(winScrollTop > mainOffsetTop + mainHeight || winScrollTop <　mainOffsetTop - winHeight){
            	$("#assess").animate({
					"top":"-150px"
				},50);
            }
			
			$("#textCon>p").remove();
			$("#cancel-assess-button,#publish-assess-button").hide();
		}
		
	});
	
	// 点击取消弹出取消弹出框
	$scope.openDialog=function(){
		$("#cancel-assess-dialog").fadeIn().css("display","flex");
	}
// 取消订单弹出框取消按钮点击
	$scope.closeDialog=function(){
		$("#cancel-assess-dialog").fadeOut();
	}
//	总体评价点击事件
	$scope.addHeart=function($event){
		$scope.target=$event.currentTarget;
		if(!($($scope.target).hasClass("active"))){
			$scope.active=$("#assess ul.assessMain-zongp li.active");
			if($scope.active.length!=0){
				$scope.src=[];
				$scope.srcarr=$scope.active.find("img").attr("src").split(".");
				$scope.srcarr1=$scope.srcarr[0].split("-");
				$scope.src.push($scope.srcarr1[0]);
				$scope.src.push($scope.srcarr[1]);
				$scope.src=$scope.src.join(".");
				$scope.active.find("img").attr("src",$scope.src);
				$scope.active.removeClass("active");
			}else{
				$("#assess div.assessStar").slideDown();
			}
			$scope.nsrc=$($scope.target).find("img").attr("src").split(".");
			$scope.nsrc[0]=$scope.nsrc[0]+"-active";
			$scope.nsrc=$scope.nsrc.join(".");
			$($scope.target).addClass("active").find("img").attr("src",$scope.nsrc);
			$scope.idx=$($scope.target).index()+1;
			for(var i=0;i<$scope.idx;i++){
				if(i==0){
					$("#assess div.assessStar ul.zongStar").html(" ").append('<li><img src="img/heart-full.png" alt="" /></li>');
				}else{
					setTimeout(function(){
						$("#assess div.assessStar ul.zongStar").append('<li><img src="img/heart-full.png" alt="" /></li>');
					},100);
				}
			}
		}
	}
	
//	点击星星进行打分
	$("#assess div.assessStar ul.assessStar-list>li>ul").on("click","li",function(){
		var idex=$(this).index()+1;
		if($(this).parent().children("li.active").length!=idex){
			$(this).parent().children("li.active").each(function(){
				$(this).children("img").attr("src","img/star-empty.png").removeClass("active");
			});
			$(this).parent().children("li").each(function(i){
				if(i<idex){
					$(this).children("img").attr("src","img/star-full.png");
					$(this).addClass("active");
				}
				
			});
		}
		
	});

	
	
});

// bill page controller 结账
app.controller('billCtrl', function($scope) {
// $scope.animate(false);'
});

// check page controller 待支付账单
app.controller('checkCtrl', function($scope) {
// $scope.animate(false);
});

// underorder page controller 已下单
app.controller('underorderCtrl', function($scope) {
// $scope.animate(false);
});


// myorder page controller 我的订单
app.controller('myorderCtrl', function($scope) {
// $scope.animate(false);
});

// account page controller 我的账户
app.controller('accountCtrl', function($scope) {
// $scope.animate(false);
});
//左侧菜单
app.controller("menuCtrl",function($scope){
	$scope.menuAnimate=function(){
		if($("#menu-left").hasClass("active")){
			$("#menu-left").removeClass("active").addClass("close");
			$("div.page-inner").removeClass("active").addClass("close");
		}else{
			$("#menu-left").removeClass("close").addClass("active");
			$("div.page-inner").removeClass("close").addClass("active");
		}
	}
});


