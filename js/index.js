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
app.controller('parentCtrl', function($scope,$location) {
	$scope.animate=function(str){
		$scope.noanimate=str;
	}
  $scope.animate(true);
  $("body").css("height",$(window).height()+"px");
  $("#viewOuter").css("height",$("body").height()+"px");
  $("#viewOuter>div").css("height",$("body").height()+"px");
  $("#viewOuter>div>div").css("height",$("body").height()+"px");
  $("#viewOuter .page-inner").css("height",$("body").height()+"px");
});

// start page controller 主页
app.controller('startCtrl', function($scope) {
	$("#start").css("height",$(window).height()+"px");
	console.log($("#start").height());
 
});
  
// order page controller 点餐
app.controller('orderCtrl', function($scope) {
  $scope.animate(false);
});
  
// shopcart page controller 购物车
app.controller('shopcartCtrl', function($scope) {
  $scope.animate(false);
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
app.controller("menuCtrl",function($scope){
	$scope.menuAnimate=function($event){
		if($("#menu-left").hasClass("active")){
			$("#menu-left").removeClass("active").addClass("close");
			$("#viewOuter>div").removeClass("active").addClass("close");
		}else{
			$("#menu-left").removeClass("close").addClass("active");
			$("#viewOuter>div").removeClass("close").addClass("active");
		}
	}
});

