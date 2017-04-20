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
animateApp.controller('parentCtrl', function($scope,$location) {
  
});

// shopcart page controller 主页
animateApp.controller('startCtrl', function($scope) {
 
});
  
// order page controller 点餐
animateApp.controller('orderCtrl', function($scope) {
 
});
  
// shopcart page controller 购物车
animateApp.controller('shopcartCtrl', function($scope) {
 
});

// check page controller 账单
animateApp.controller('contactController', function($scope) {
 
});

// underorder page controller 已下单
animateApp.controller('underorderCtrl', function($scope) {
 
});

// bill page controller 结账
animateApp.controller('billCtrl', function($scope) {
 
});

// myorder page controller 我的订单
animateApp.controller('myorderCtrl', function($scope) {
 
});

// account page controller 我的账户
animateApp.controller('accountCtrl', function($scope) {
 
});

