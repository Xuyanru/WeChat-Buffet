var app=angular.module("weixindiancan",["ng","ngRoute","ngAnimate"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/start', {templateUrl: 'tpl/start.html',controller:'startCtrl'})
        .when('/order', {templateUrl: 'tpl/order.html',controller:'orderCtrl'})
        .when('/shopcart', {templateUrl: 'tpl/shopcart.html',controller:'shopcartCtrl'})
        .when('/check',{templateUrl:'tpl/check.html',controller:'checkCtrl'})
        .when('/underorder',{templateUrl:'tpl/underorder.html',controller:'underorderCtrl'})
        .when('/bill',{templateUrl:'tpl/bill.html',controller:'billCtrl'})
        .when('/myorder', {templateUrl: 'tpl/myorder.html',controller:'myorderCtrl'})
        .when('/account',{templateUrl:'tpl/account.html',controller:'accountCtrl'})
//      .when('/orderdetail/:did', {templateUrl: 'tpl/orderdetail.html',controller:'orderdetailCtrl'})
        .otherwise({redirectTo: '/start'})
}); 
// CONTROLLERS ============================================
// parent page controller 父控制器
app.controller('parentCtrl', function($scope,$location,$timeout) {
	$scope.animate=function(str){
		$scope.noanimate=str;
	}
  $scope.animate(true);
  $("body").css("height",$(window).height()+"px");
  $("#viewOuter").css("height",$(window).height()+"px");
  $("#viewOuter>div").css("height",$(window).height()+"px");
  $("#viewOuter>div>div").css("height",$(window).height()+"px");
 	$("#menu-left ul li").click(function(){
 		if($(this).hasClass("active")){
				$("#menu-left").removeClass("active").addClass("close");
				$("#viewOuter div.page-inner").removeClass("active").addClass("close");
 		}else{
 			$("#menu-left ul li.active").removeClass("active");
 			$(this).addClass("active");
// 			$("#menu-left").removeClass("active");
// 			$("#viewOuter div.page-inner").removeClass("active");
   			$timeout(function(){
   				$("#menu-left").removeClass("active");
   				$("#viewOuter div.page-inner").removeClass("active");
   			},300);
 			
 		}
		
 	});
 
 
});

// start page controller 主页
app.controller('startCtrl', function($scope) {
	$("#start").css("height",$(window).height()+"px");
 
});
  
// order page controller 点餐
app.controller('orderCtrl', function($scope,$timeout) {
  $scope.animate(false);
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
	 	console.log($("#"+$scope.elename).offset().top);
	   	 $('#dishItems').animate({
	            "scrollTop": $("#"+$scope.elename).position().top
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
  $scope.animate(false);
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
  
});

// check page controller 账单
app.controller('checkCtrl', function($scope) {
   $scope.animate(false);
});

// underorder page controller 已下单
app.controller('underorderCtrl', function($scope) {
   $scope.animate(false);
});

// bill page controller 结账
app.controller('billCtrl', function($scope) {
   $scope.animate(false);
});

// myorder page controller 我的订单
app.controller('myorderCtrl', function($scope) {
   $scope.animate(false);
});

// account page controller 我的账户
app.controller('accountCtrl', function($scope) {
   $scope.animate(false);
});
//左侧菜单
app.controller("menuCtrl",function($scope){
	$scope.menuAnimate=function($event){
		if($("#menu-left").hasClass("active")){
			$("#menu-left").removeClass("active").addClass("close");
			$("#viewOuter div.page-inner").removeClass("active").addClass("close");
		}else{
			$("#menu-left").removeClass("close").addClass("active");
			$("#viewOuter div.page-inner").removeClass("close").addClass("active");
		}
	}
});


