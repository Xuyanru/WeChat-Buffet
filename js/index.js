var app=angular.module("weixindiancan",["ng","ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/start', {templateUrl: 'tpl/start.html',controller:'startCtrl'})
        .when('/evaluate', {templateUrl: 'tpl/evaluate.html',controller:'evaluateCtrl'})
        .when('/order/:orderItem', {templateUrl: 'tpl/order.html',controller:'orderCtrl'})
        .when('/shopcart/:msgItem', {templateUrl: 'tpl/shopcart.html',controller:'shopcartCtrl'})
        .when('/confirmorder/:alt', {templateUrl: 'tpl/confirmorder.html',controller:'confirmorderCtrl'})
        .when('/check',{templateUrl:'tpl/check.html',controller:'checkCtrl'})
        .when('/underorder',{templateUrl:'tpl/underorder.html',controller:'underorderCtrl'})
        .when('/ordersuccess/:did',{templateUrl:'tpl/ordersuccess.html',controller:'ordersuccessCtrl'})
        .when('/myorder/:idx', {templateUrl: 'tpl/myorder.html',controller:'myorderCtrl'})
        .when('/details/:did', {templateUrl: 'tpl/details.html',controller:'detailsCtrl'})
        .when('/account',{templateUrl:'tpl/account.html',controller:'accountCtrl'})
        .when('/usercenter',{templateUrl:'tpl/usercenter.html',controller:'usercenterCtrl'})
        .when('/vipcenter',{templateUrl:'tpl/vipcenter.html',controller:'vipcenterCtrl'})
        .when('/assess',{templateUrl:'tpl/assess.html',controller:'assessCtrl'})
//      .when('/orderdetail/:did', {templateUrl: 'tpl/orderdetail.html',controller:'orderdetailCtrl'})
        .otherwise({redirectTo: '/start'})
}); 
app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});
// CONTROLLERS ============================================
// parent page controller 父控制器
app.controller('parentCtrl', function($scope,$location,$timeout) {
	$(function(){
		$scope.animate=function(str){
		$scope.noanimate=str;
	}
//	页面跳转函数
	 $scope.jump = function (path) {
        $location.url(path);
    }
   
	//$scope.animate(true);
	  $("body").css("height",$(window).height()+"px");
	  $("#menu-left").css("height",$(window).height()+"px");
	 	$("#menu-left ul li").click(function(){
	 		if($(this).hasClass("active")){
					$("#menu-left").removeClass("active").addClass("close");
					$("div.page-inner").removeClass("active").addClass("close");
	 		}else{
	 			$("#menu-left ul li.active").removeClass("active");
	 			$(this).addClass("active");
	 			$("#menu-left").removeClass("active").addClass("close");
	 			$("#viewOuter div.page-inner").removeClass("active").addClass("close");
//	   			$timeout(function(){
//	   				$("#menu-left").removeClass("active");
//	   				$("div.page-inner").removeClass("active");
//	   			},300);
	 		}
	 	});
	 	
	 	
//	 	左侧导航添加或去除class
	 	$scope.addClass=function($event){
	 		
	 		if($("#menu-left").hasClass("active")){
				$("#menu-left").removeClass("active").addClass("close");
				$("div.page-inner").removeClass("active").addClass("close");
	 		}
	 		if($($event.currentTarget).parent().attr("id")=="cart-button"&&$($event.currentTarget).children("span").html()==0){
				return false;
			}else if($($event.currentTarget).attr("title")){
				var mclass=$($event.currentTarget).attr("title");
				$("#menu-left ul li.active").removeClass("active");
				$("#menu-left ul li."+mclass).addClass("active");
			}else{
				$("#menu-left ul li.active").removeClass("active");
			}
		};
		
		
	});
	
 
 
});

// start page controller 主页
app.controller('startCtrl', function($scope) {
 
});

app.controller('evaluateCtrl', function($scope) {
				
				$( '#cd-dropdown' ).dropdown( {
					gutter :4
				} );
 
});
  
// order page controller 点餐
app.controller('orderCtrl', function($scope,$timeout,$http,$routeParams,$compile){
	$(function(){
			//$scope.animate(false);
//			控制点餐加入购物车中套餐的最高高度
			
			$scope.sendMsg={
			    "dcombodetails": [],
			    "oderdetails": [],
			    "orderForm": {
			        "angpaoid": 0,
			        "angpaoname": "",
			        "angpaoprice": 0,
			        "appointmenttime": "2017-05-25T02:34:52.720Z",
			        "callNum": 0,
			        "cancelTime": "2017-05-25T02:34:52.720Z",
			        "cancelcount": 0,
			        "cardSelling": 0,
			        "changePersonID": "1",
			        "charge": 0,
			        "daZhe": 10,
			        "deelSource": 0,
			        "deelStatus": 0,
			        "deelType": 0,
			        "dinnerShopID": "1",
			        "equiID": "",
			        "id": "string",
			        "invoice": 0,
			        "isCall": 0,
			        "isChange": 0,
			        "isConfirm": 0,
			        "isDelete": 0,
			        "isDispose": 0,
			        "isDiy": 0,
			        "isDownload": 0,
			        "isRepay": 0,
			        "isUpdate": 0,
			        "isappointment": 0,
			        "iscancel": 0,
			        "ishaveangpao": 0,
			        "isrepayorderform": 0,
			        "jucancode": "",
			        "loginName": "",
			        "mcode": "",
			        "memberID": "",
			        "ocode": "",
			        "orderTime": "2017-05-25 14:34:52",
			        "outInfoID": "",
			        "packMoney": 0,
			        "payStatus": 2,
			        "payTime": "2017-05-25T02:34:52.720Z",
			        "payType": 0,
			        "payflag": "",
			        "personID": "",
			        "personName": "",
			        "realName": "",
			        "realPrice": 40,
			        "recharge": 0,
			        "remark": "",
			        "repayMoney": 0,
			        "repayorderformid": "",
			        "tableID": "",
			        "totalPrice": 40,
			        "updateMgs": "",
			        "updateTime": "2017-05-25T02:34:52.720Z",
			        "updateTimes": 0,
			        "wxUserID": "",
			        "youHui": 0
			    }
		};
			

//	动态获取菜品
	var allDishFood="";
	$http.get("food.json").success(function(data){
		$scope.foodList=[];
		allDishFood=data[0].foodtypes;
		$scope.sendMsg.orderForm.dinnerShopID=allDishFood[0].shopID;
		for(var i=0;i<data[0].foodtypes.length;i++){
			if(data[0].foodtypes[i].foodinfos.length>0){
				$scope.foodList.push(data[0].foodtypes[i]);
			}
		}
	});
		$scope.sendMsg.orderForm.id=Guid.NewGuid().ToString();
			//	购物车总数量
	$scope.totleNum=function(){
		Array.prototype.unique3 = function(){
			 var res = [];
			 var json = {};
			 for(var i = 0; i < this.length; i++){
			  if(!json[this[i]]){
			   res.push(this[i]);
			   json[this[i]] = 1;
			  }
			 }
			 var totle=0;
			 $scope.ulmsg=[];
			 $scope.sendMsg.oderdetails=[];
			  $scope.sendMsg.dcombodetails=[];
	 		for(var j=0;j<res.length;j++){
	 			var foodOutcode=$($("#dishItems div.dishItem ul."+res[j])[0]).parent().parent().children("p").attr("id");
	 			var foodInnerCode=$($("#dishItems div.dishItem ul."+res[j])[0]).children("li.dish-msg").attr("title");
	 			var getOrderMsg={};
	 			$.each(allDishFood, function() {
	 				if(this.fCode==foodOutcode){
	 					$.each(this.foodinfos, function(){
	 						if((this.foodinfo!=null&&this.foodinfo.fCode==foodInnerCode)||(this.foodinfo==null&&this.foodcomboInfo.foodcombo.fCode==foodInnerCode)){	
	 							if(this.foodcomboInfo!=null){
	 								getOrderMsg=this.foodcomboInfo.foodcombo;
	 								var foodname=getOrderMsg.typeName;
		 							var foodCode=getOrderMsg.fCode;
		 							var foodId=getOrderMsg.id;
		 							var foodnums=$($("#dishItems div.dishItem ul."+res[j])[0]).children("li.clear").children("div.feed").children(".likeCount").children("span").html();
		 							var ids=$($("#dishItems div.dishItem ul."+res[j])[0]).children("li.clear").children("p.lf").attr("title");
		 							var measureId=this.enumitem.enumItemName;
		 							var priCe=getOrderMsg.price;
	 								var foodtype=this.foodtype;
//	 							循环套餐里的单品
								$.each(this.foodcomboInfo.foodInfos, function(i,item) {
										var guid=Guid.NewGuid().ToString();
										var taocanMsg= {
								            "cancelTime": "2017-05-25T02:34:52.719Z",
								            "foodCode": "",
								            "foodID": "56",
								            "foodName": "",
								            "foodNums": 1,
								            "id": "1",
								            "isCancel": 0,
								            "isDelete": 0,
								            "measureID": "",
								            "orderDetailsID": "2",
								            "price": 10,
								            "tasteDetailsID": ""
								        }
			 	
			 							taocanMsg.foodName=foodname;
			 							taocanMsg.foodCode=foodCode;
			 							taocanMsg.foodID=foodId;
			 							taocanMsg.foodNums=foodnums;
			 							taocanMsg.id=ids;
			 							taocanMsg.measureID=measureId;
			 							taocanMsg.orderDetailsID=guid;
			 							taocanMsg.price=priCe;
										var orderMsg= {
								            "cancelTime": "2017-05-25T02:34:52.719Z",
								            "day": 0,
								            "dinnershopID": "1",
								            "equiID": "",
								            "foodCode": "",
								            "foodID": "56",
								            "foodName": "",
								            "foodNum": 2,
								            "foodStatus": 0,
								            "foodType": 1,
								//          1单品 2 套餐
								            "id": "1",
								            "isDelete": 0,
								            "isDispose": 0,
								            "isRepay": 0,
								            "isSend": 0,
								            "jiDu": 0,
								            "measureID": "",
								            "month": 0,
								            "orderFormID": "1",
								            "orderTime": "2017-05-25T02:34:52.720Z",
								            "packmoney": 0,
								            "personID": "",
								            "price": 10,
								            "quYu": "",
								            "remark": "",
								            "tasteDetailsID": "",
								            "year": 0
								       };
								       
								        orderMsg.foodName=this.foodName;
								        orderMsg.foodNum=taocanMsg.foodNums;
									    orderMsg.dinnershopID=this.shopID;
									    orderMsg.foodCode=this.fCode;
									    orderMsg.foodID=this.id;
									    orderMsg.price=this.price;
									    orderMsg.foodType=foodtype;
									    orderMsg.orderFormID=$scope.sendMsg.orderForm.id;
									    orderMsg.id=guid;
									    orderMsg.measureID=taocanMsg.measureID;
									$scope.sendMsg.dcombodetails.push(taocanMsg);
									$scope.sendMsg.oderdetails.push(orderMsg);
									
								       
								});
	 						}else{
	 							getOrderMsg=this.foodinfo;
	 							var foodname=getOrderMsg.foodName;
	 							var foodtype=this.foodtype;
	 							var foodCode=getOrderMsg.fCode;
	 						}
	 						$($("#dishItems div.dishItem ul."+res[j])[0]).children("li.clear").each(function(){
				 				var ulobj={};
				 				var xnum=parseInt($(this).children("div.feed").children(".likeCount").children("span").html());
				 				if($(this).parent().children("li.dish-img").attr("title")==1){
				 					var orderMsg= {
								            "cancelTime": "2017-05-25T02:34:52.719Z",
								            "day": 0,
								            "dinnershopID": "1",
								            "equiID": "",
								            "foodCode": "",
								            "foodID": "56",
								            "foodName": "",
								            "foodNum": 2,
								            "foodStatus": 0,
								            "foodType": 1,
								//          1单品 2 套餐
								            "id": "1",
								            "isDelete": 0,
								            "isDispose": 0,
								            "isRepay": 0,
								            "isSend": 0,
								            "jiDu": 0,
								            "measureID": "",
								            "month": 0,
								            "orderFormID": "1",
								            "orderTime": "2017-05-25T02:34:52.720Z",
								            "packmoney": 0,
								            "personID": "",
								            "price": 10,
								            "quYu": "",
								            "remark": "",
								            "tasteDetailsID": "",
								            "year": 0
								       };
								     orderMsg.foodName=foodname;
								     orderMsg.dinnershopID=getOrderMsg.shopID;
								     orderMsg.foodCode=foodCode;
								     orderMsg.foodID=getOrderMsg.id;
								     orderMsg.price=getOrderMsg.price;
								     orderMsg.foodType=foodtype;
								     orderMsg.orderFormID=$scope.sendMsg.orderForm.id;
								     orderMsg.id=$(this).children("p.lf").attr("title");
								     orderMsg.foodNum=xnum;
								    orderMsg.measureID=$($("#dishItems div.dishItem ul."+res[j])[0]).find("span.danwei").html();
								    orderMsg.tasteDetailsID=$(this).children("p.lf").html();
								    $scope.sendMsg.oderdetails.push(orderMsg);
								    ulobj.way=$(this).children("p.lf").html();
				 					
				 				}
								ulobj.ids=$(this).children("p.lf").attr("title");
				 				ulobj.pid=res[j];
				 				ulobj.price=getOrderMsg.price;
				 				ulobj.unit=$($("#dishItems div.dishItem ul."+res[j])[0]).find("span.danwei").html();
				 				
				 				ulobj.name=foodname;
				 				ulobj.count=xnum;
				 				ulobj.type=foodtype;
				 				totle+=xnum;
				 				ulobj.wayClass=$(this).attr("title");
				 				$scope.ulmsg.push(ulobj);
				 			});
	 						}
	 					});
	 				}
	 			});
	 		}
	 		if(totle>0){
	 			$("#cart-button>a.canClickA").show();
	 			$("#cart-button>a.uncanClickA").hide();
	 		}else{
	 			$("#cart-button>a.canClickA").hide();
	 			$("#cart-button>a.uncanClickA").show();
	 		}
	 		$("#cart-button>a.canClickA>span").html(totle);
	 		window.sessionStorage.setItem("sendMsg",JSON.stringify($scope.sendMsg));
		}
		var arr=[];
		$("#dishItems div.dishItem ul.active").each(function(){
			arr.push($(this).attr("title"));
		});
		arr.unique3();
		console.log($scope.sendMsg);
	}
	$scope.totleNum();
	
	if($routeParams.orderItem!=0){
		 $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent){
		 	$.each(eval($routeParams.orderItem),function(){
		 		$("#dishItems div.dishItem ul."+this.pid).addClass("active");
		 		$("#dishItems div.dishItem ul."+this.pid).append($compile('<li class="clear '+this.wayClass+'" title="'+this.wayClass+'"><div class="feed lf"><div class="heart"></div><div class="likeCount"><span>1</span></div></div><p class="lf" title="'+this.ids+'">'+this.way+'</p><p class="rt" ng-click="deleteOrder($event)">&chi;</p></li>')($scope));
		 		$("#dishItems div.dishItem ul."+this.pid+" li."+this.wayClass+" .likeCount span").html(this.count);
			$("#dishItems div.dishItem ul."+this.pid+" li."+this.wayClass+" .feed").show();
		 	});
	       $scope.totleNum();
	    });
	}
	 
	

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
  		$("#dishItems div.dishItem").each(function(){
  			if(($(this).children("div.dishItem-con").children("ul").length)%2!=0){
				$(this).children("div.dishItem-con").children("ul").css("margin-bottom","0.05px");
  			}
  		});
  	}else{
  		$(this).removeClass("active");
  		$("#dishItems").removeClass("active");
  	}
  });
//菜单点击
 $scope.autoScroll = function ($event){
 		$scope.elename=$($event.target).attr("name");
 		$scope.elettop=$("#"+$scope.elename).offset().top;
 		$scope.eletscroll=$('#dishItems').scrollTop()+$("#"+$scope.elename).offset().top;
	 	$event.preventDefault();
	   	 $('#dishItems').animate({
	            "scrollTop":$scope.eletscroll
	        }, 500);	
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
//左右滑动打开、关闭小厨菜单
	$("#order").swipe({
	    swipeLeft:function(){
	       if(!($("#order div.order-menu div.menuBtn").hasClass("active"))){
		       	$("#order div.order-menu div.menuBtn").addClass("active");
				$("#order div.order-menu").removeClass("close").addClass("active");
	       }
	    },
	    swipeRight:function(){
	       if(!($("#order div.order-menu div.menuBtn").hasClass("active"))){
		       	$("#order div.order-menu div.menuBtn").addClass("active");
				$("#order div.order-menu").removeClass("close").addClass("active");
	       }else{
		       	$("#order div.order-menu div.menuBtn").removeClass("active");
				$("#order div.order-menu").removeClass("active").addClass("close");
	       }
	    }
	});
	
//	点击来一份弹出添加购物车弹出框
	$scope.addDish=function($event){
		$scope.dishInfo=eval($($event.currentTarget).attr("title"));
		var foodOutCode=$($event.currentTarget).parent().parent().parent().parent().parent().children("p").attr("id");
		var foodInnerCode=$($event.currentTarget).parent().parent().attr("title");
		$.each(allDishFood, function() {
			if(this.fCode==foodOutCode);
			$.each(this.foodinfos, function() {
				if((this.foodinfo!=null&&this.foodinfo.fCode==foodInnerCode)||(this.foodcomboInfo!=null&&this.foodcomboInfo.foodcombo.fCode==foodInnerCode)){
					if(this.foodinfo!=null&&this.tasteInfos.length>0){
						$scope.taste=this.tasteInfos;
						$scope.showBZ=true;
					}else{
						$scope.showBZ=false;
					}
					if(this.foodtype==2){
						$scope.getMeal=this.foodcomboInfo.foodInfos;
						$scope.showMeal=true;
						$scope.maxheight=$("body").height()-370+"px";
					}else{
						$scope.showMeal=false;
					}
				}
				
			});
		});
		$("#cart-dialog-outer").show().css("display","flex");
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
	
//	点击加减号进行菜品数量加减
	$scope.addNum=function(){
		var num=parseInt($("#cart-dialog div.cart-num a.numBer span").html());
		$("#cart-dialog div.cart-num a.numBer span").html(num+1);
	}
	$scope.reduceNum=function(){
		var num=parseInt($("#cart-dialog div.cart-num a.numBer span").html());
		if(num>1){
			$("#cart-dialog div.cart-num a.numBer span").html(num-1);
		}
		
	}
	
	

//	点击加入购物车
	$("#cart-dialog div.cart-num p.addCart").unbind("click").click(function(){
		var pid=$(this).attr("title");
		var numBer=$("#cart-dialog div.cart-num a.numBer span").html();
		if($("#cart-dialog div.make-way").length==0){
			var spanA="normal";
			if($("#dishItems div.dishItem ul."+pid+" li."+spanA).length==0){
				var htmlCon='<li class="clear '+spanA+'" title="'+spanA+'"><div class="feed lf"><div class="heart"></div><div class="likeCount"><span>1</span></div></div><p class="lf"></p><p class="rt" ng-click="deleteOrder($event)">&chi;</p></li>';
				$("#dishItems div.dishItem ul."+pid).append($compile(htmlCon)($scope));
			}
				$("#dishItems div.dishItem ul."+pid+" li."+spanA+" .likeCount span").html(numBer);
		}else{
			if($("#cart-dialog div.make-way ul li span.active").length!=0){
				var spanA=$("#cart-dialog div.make-way ul li span.active").attr("id");
				if($("#dishItems div.dishItem ul."+pid+" li."+spanA).length==0){
					var htmlCon='<li class="clear '+spanA+'" title="'+spanA+'"><div class="feed lf"><div class="heart"></div><div class="likeCount"><span>1</span></div></div><p class="lf">'+$("#"+spanA).html()+'</p><p class="rt"  ng-click="deleteOrder($event)">&chi;</p></li>';
					$("#dishItems div.dishItem ul."+pid).append($compile(htmlCon)($scope));
				}
				$("#dishItems div.dishItem ul."+pid+" li."+spanA+" .likeCount span").html(numBer);
			}else{
				alert("做法不能为空，请选择做法！");
				return false;
			}
		}
		$("#cart-dialog p.close-dialog span").html("&radic;");
		$("#cart-dialog").addClass("adddish");
		$("#cart-dialog>div").css("opacity","0");
		$("#dishItems div.dishItem ul."+pid).addClass("active");
		$("#dishItems div.dishItem ul."+pid+" li."+spanA+" p.lf").attr("title",Guid.NewGuid().ToString());
		$("#cart-dialog").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
			$("#cart-dialog").removeClass("adddish");
			$("#cart-dialog p.close-dialog span").html("X");
			$("#cart-dialog-outer").hide();
			$("#cart-dialog>div").css("opacity","1");
//			清除做法选择的选择，若是动态获取的则可更改为动态数据绑定
			$("#cart-dialog div.make-way ul li span.active").removeClass("active");
			$scope.totleNum();
			$("#dishItems div.dishItem ul."+pid+" li."+spanA+" .feed").show();
			$("#dishItems div.dishItem ul."+pid+" li."+spanA+" .heart").addClass("heartAnimation");
			$($("#dishItems div.dishItem ul."+pid+" li."+spanA+" .heart")[0]).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$("#dishItems div.dishItem ul."+pid+" li."+spanA+" .heart").removeClass("heartAnimation");
				$("#dishItems div.dishItem ul."+pid+" li."+spanA+" .heart").css("background-position","left");
			$("#cart-dialog div.cart-num a.numBer span").html("1");
			});
		});
	});

	
	//	做法选择
	$scope.addActive=function($event){
		$scope.me=$event.target;
		if(!($($scope.me).hasClass("active"))){
			$($scope.me).parent().children("span.active").removeClass("active");
			$($scope.me).parent().parent().children().children("span.active").removeClass("active");			
			$($scope.me).addClass("active");
		}else{
			$($scope.me).removeClass("active");
		}
	}

//	点击已选菜品的差号删除该菜品
	$scope.deleteOrder=function($event){
		var ulid=$($event.currentTarget).parent("li").parent("ul").attr("title");
		var liid=$($event.currentTarget).parent("li").attr("title");
		if($($event.currentTarget).parent("li").parent("ul").children("li.clear").length<2){
			$("#dishItems div.dishItem ul."+ulid).removeClass("active");
		}
		$("#dishItems div.dishItem ul."+ulid).children("li."+liid).remove();
		$scope.totleNum();
	}

	});
		
	
});
  
// shopcart page controller 购物车
app.controller('shopcartCtrl', function($scope,$routeParams,$http) {
//$scope.animate(false);
//	从点餐页面获取数据
	if($routeParams.msgItem!=0){
		$scope.orderList=eval($routeParams.msgItem);
	}
	
//	获取存储的菜单列表
	var sendMsg=JSON.parse(window.sessionStorage.getItem("sendMsg"));
	console.log(sendMsg);

//	菜品数量和价格
	$scope.totleNum=function(){	
		$scope.totlePrice=0;
		$scope.totlenum=0;
		$scope.ulmsg=[];
		$("#cartItems ul").each(function(){
			var count=parseInt($(this).children("li").children("p.rt").children("span").html());
			var ids=$(this).attr("id");
			$.each(sendMsg.dcombodetails, function() {
				if(ids==this.id){
					var idInner=this.orderDetailsID;
					$.each(sendMsg.oderdetails, function() {
						if(idInner==this.id){
							this.foodNum=count;
						}
					});
					this.foodNums=count;
				}else{
					$.each(sendMsg.oderdetails, function() {
						if(ids==this.id){
							this.foodNum=count;
						}
					});
				}
			});
			
			var ulobj={};
			ulobj.pid=$(this).attr("title");
			ulobj.ids=$(this).attr("id");
			ulobj.count=count;
			ulobj.name=$(this).children("li").children("p.dish-name").children("span.lf").html();
			ulobj.price=$(this).children("li").children("p.price").children("span.orderPrice").html();
			ulobj.unit=$(this).children("li").children("p.price").children("span.orderUnit").html();
			ulobj.way=$(this).children("li").children("p.price").children("span.makeWay").html();
			ulobj.wayClass=$(this).children("li").children("p.price").children("span.makeWay").attr("title");
			$scope.totlenum+=count;
			$scope.totlePrice=(parseFloat($scope.totlePrice)+($(this).children("li").children("p.price").children("span.orderPrice").html()*count)).toFixed(2);
			$scope.ulmsg.push(ulobj);
		});
		sendMsg.orderForm.realPrice=$scope.totlePrice;
		sendMsg.orderForm.totalPrice=$scope.totlePrice;
		
	}
	
	  $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
	       $scope.totleNum();
	    });
	
	//	加减菜的数量
	$scope.addfun=function($event){
		var me=$event.currentTarget;
		$(me).prev("span").html(parseInt($(me).prev("span").html())+1);
		$scope.totleNum();
	}
	$scope.reducefun=function($event){
		var me=$event.currentTarget;
		if($(me).next("span").html()>1){
			$(me).next("span").html(parseInt($(me).next("span").html())-1);
			$scope.totleNum();
		}
		
	}
	//	删除菜品
	$scope.deleteOrder=function($event){
		var me=$($event.currentTarget).parent().parent().parent();
		var ids=$(me).attr("id");
		console.log(ids);
		var type=$(me).children("li.dish-img").attr("title");
		if(type==2){
			for(var i=0;i<sendMsg.dcombodetails.length;i++){
				
				if(ids==sendMsg.dcombodetails[i].id){
					
						var idInner=sendMsg.dcombodetails[i].orderDetailsID;
						for(var j=0;j<sendMsg.oderdetails.length;j++){
							if(idInner==sendMsg.oderdetails[j].id){
								sendMsg.oderdetails.pop(sendMsg.oderdetails[j]);
							}
						}
						sendMsg.dcombodetails.pop(sendMsg.dcombodetails[i]);
						i-=1;
				}
			}
		}else{
			for(var j=0;j<sendMsg.oderdetails.length;j++){
				if(ids==sendMsg.oderdetails[j].id){
					sendMsg.oderdetails.pop(sendMsg.oderdetails[j]);
				}
			}
		}
		
		$(me).remove();
		$scope.totleNum();
	}
//	数据传输
	$scope.sendmsg=function(){
		if($scope.ulmsg.length>0){
			$scope.jump('/confirmorder/'+JSON.stringify($scope.ulmsg));
			$("#menu-left ul li.active").removeClass("active");
			sessionStorage.clear("sendMsg");
		}
		
	
	
//		sendMsg.orderForm.appointmenttime=new Date().getFullYear()+"-"+(+new Date().getMonth()+1)+"-"+new Date().getDate()+"T"+new Date().getHours()+":"+new Date().getMinutes();
//		console.log(new Date().getFullYear()+"-"+(+new Date().getMonth()+1)+"-"+new Date().getDate()+"T"+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds());
//		$http({
//			url:"http://192.168.99.60:7018/order/SaveOrder",
//			method:"post",
//			data:JSON.stringify(sendMsg)
//		}).success(function(data){
//			console.log(data);
//			sessionStorage.clear("sendMsg");
//		}).error(function(data){
//			console.log(data);
//		});
		
	}
	
	
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
	$scope.getBeizhu=function(){
		if($("#beizhu-dialog ul.sel-num li.active").length>0){
			$scope.beizhuNum=$("#beizhu-dialog ul.sel-num li.active").html();
		}else{
			$scope.beizhuNum="1人";
		}
		if($("#beizhu-main").val()){
			$scope.beizhuText=$("#beizhu-main").val();
		}else{
			$scope.beizhuText="无";
		}
	}
	$scope.getBeizhu();
	$scope.selBeizhu=function($event){
		if($($event.currentTarget).parent().hasClass("rt")){
			$scope.getBeizhu();
		}
		$("#beizhu-dialog").addClass("animated bounceOut");
	$('#beizhu-dialog').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$(this).removeClass("animated bounceOut").hide();
	});
	};

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
	console.log($routeParams);
	if($routeParams.alt!=0){
		$scope.orderList=eval($routeParams.alt);
	}
	
	 $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
	 		$scope.xfPrice=0.00;
	      	$("#orderItems div.orderItem>ul").each(function(){
	      		$scope.xfPrice+=$(this).children("li.order-count").html()*parseFloat($(this).children("li.order-price").html());
	      	});
//	      	判断优惠券、优惠卡是否可选
			$scope.showKa=false;
	      	if($scope.xfPrice>parseInt($("#youhui div.youhuiquan img").prev("span").attr("title"))){
	      		$scope.showQuan=false;
	      	}else{
	      		$scope.showQuan=true;
	      	}
	      	$scope.xfPrice=$scope.xfPrice.toFixed(2);
	      	$scope.youhuiPrice=0.00;
	      	$scope.youhuiPrice=$scope.youhuiPrice.toFixed(2);
	      	$scope.sfPrice=$scope.xfPrice;
	      	
	    });
   
// 点击取消弹出取消弹出框
	$scope.openDialog=function(){
		$("#cancel-order-dialog").fadeIn().css("display","flex");
	}
// 取消订单弹出框取消按钮点击
	$scope.closeDialog=function(){
		$("#cancel-order-dialog").fadeOut();
		$("#cart-dialog div.make-way ul li span.active").removeClass("active");
	}
	
//	优惠页面显示
	$scope.youhuishow=function(){
		$("#confirm-order").css("transform","translateX(-100%)");
		$("#youhui").css("transform","translateX(-100%)");
	}
	$scope.youhuiHide=function(){
		$("#confirm-order").css({"transform":"translateX(0)"});
		$("#youhui").css("transform","translateX(0)");
//		$("#confirm-order").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
//			$(this).css("position","static");
//		});
		if($("#youhui div.youhuiCon div.canClick>div.active").length!=0){
			var youhuiType=$("#youhui div.youhuiCon div.canClick>div.active").children("img").attr("title");
			var alt=$("#youhui div.youhuiCon div.canClick>div.active").children("img").attr("alt");
			$scope.youhuitext=alt;
			if(youhuiType==1){
				$scope.youhuiPrice=parseInt(alt).toFixed(2);
			}else{
				$scope.youhuiPrice=(parseFloat($scope.xfPrice)-parseFloat($scope.youhuitext)*parseFloat($scope.xfPrice)/10).toFixed(2);
			}
			$scope.youhuiShow=true;
		}else{
			$scope.youhuiPrice="0.00";
			$scope.youhuiShow=false;
		}
		$scope.sfPrice=(parseFloat($scope.xfPrice)-parseFloat($scope.youhuiPrice)).toFixed(2);
	}
//	优惠选择
	$scope.selYouhui=function($event){
		if(!($($event.currentTarget).hasClass("active"))){
			$("#youhui div.youhuiCon div.canClick>div.active").removeClass("active").children("span").hide();
			$($event.currentTarget).addClass("active").children("span").show();
		}else{
			$($event.currentTarget).removeClass("active").children("span").hide();
		}
//		if($("#youhui div.youhuiCon p.canClick.active")){
//			$scope.youhuiText[0]=$("#youhui div.youhuiCon p.canClick.active").children("img").attr("title");
//			$scope.youhuiText[1]=$("#youhui div.youhuiCon p.canClick.active").children("img").attr("alt");
//		}else{
//			$scope.youhuiText[0]=0;
//			$scope.youhuiText[1]=0;
//		}
	}
	
//	if($routeParams.alt!=0){
//		$scope.youhuitext=eval($routeParams.alt)[1];
//		if(eval($routeParams.alt)[0]==1){
//			$scope.youhuiPrice=parseInt($scope.youhuitext).toFixed(2);
//			$scope.youhuiShow=true;
//		}else if(eval($routeParams.alt)[0]==2){
//			$scope.youhuiPrice=(parseFloat($scope.xfPrice)-parseInt($scope.youhuitext)*parseFloat($scope.xfPrice)/10).toFixed(2);
//			$scope.youhuiShow=true;
//		}else{
//			$scope.youhuiShow=false;
//			$scope.youhuiPrice="0.00";
//		}
//	}else{
//			$scope.youhuiShow=false;
//			$scope.youhuiPrice="0.00";
//		}
//		$scope.sfPrice=(parseFloat($scope.xfPrice)-parseFloat($scope.youhuiPrice)).toFixed(2);
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
//			$("#assess").animate({
//				"top":"0px"
//			},50);
			$("#textCon").removeClass("active");
			if($("#textCon").html()==""){
				$("#textCon").append('<p>菜品口味还满足您的味蕾吗？服务还到位吗?环境是否符合您的要求？谈谈您的用餐感受吧！</p>');
			}
			$("#cancel-assess-button,#publish-assess-button").show();
		}else{
			$("#textCon").addClass('active');
//			var mainOffsetTop = $("#textCon").offset().top;
//          var mainHeight = $("#textCon").height();
//          var winHeight = $(window).height();
//          var winScrollTop = $(window).scrollTop();
//          if(winScrollTop>mainOffsetTop+mainHeight||winScrollTop<mainOffsetTop-winHeight){
//          	$("#assess").animate({
//					"top":"-150px"
//				},50);
//          }
			
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
//	点击添加图片进行添加图片
var filePaths = $("#addImgs")[0].files;//或者这样写 document.getElementById("id").files;  
for( var i=0;i<filePaths.length; i++ ){  
    filePaths[i].name;  
}  
	$("#assess div.assessMain div.addimgs ul li.addIcon input").change(function(){
		var imgLength=$("#assess div.assessMain div.addimgs ul li").length-1;
		var files=document.getElementById('addImgs').files, fs=files.length, s=0;
		var add=5-imgLength;
			if(fs >add ){
			    alert("上传的文件数量超过5个了！请重新选择！");    
			}else{
				var frag=document.createDocumentFragment();
			    for(var i=0;i<fs;i++){
			        $(frag).append('<li class="lf"><img src="'+window.URL.createObjectURL(files[i])+'" alt="" /></li>')
			    }
			    $("#assess div.assessMain div.addimgs ul li.addIcon").before(frag);
			}
			imgLength=$("#assess div.assessMain div.addimgs ul li").length-1;
			if(imgLength<5){
				 $("#assess div.assessMain div.addimgs ul li.addIcon").show();
			}else{
				$("#assess div.assessMain div.addimgs ul li.addIcon").hide();
			}
			
	});

	
	
});

// ordersuccess page controller 结账
app.controller('ordersuccessCtrl', function($scope,$routeParams) {
// $scope.animate(false);'
	if($routeParams.did==1){
		$scope.showTitle=false;
		$scope.showBtns=false;
	}else{
		$scope.showTitle=true;
		$scope.showBtns=true;
	}
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
app.controller('myorderCtrl', function($scope,$routeParams) {
// $scope.animate(false);
//	点击菜单选择订单
	$scope.classInner=function(me,idx){
		var move=idx*$(me).width();
		$("#moving-tab").css({"transform": "translate3d("+move+"px, 0px, 0px)","transition": "all 0.3s ease-out"}).html($(me).html());
		$("#myorder div.myorder-con ul.myorder-title-menu li.active").removeClass("active");
		$(me).addClass("active");
	}
	if($routeParams){
		var idx=parseInt($routeParams.idx);
		var me=$("#myorder div.myorder-con ul.myorder-title-menu li")[idx];
		$scope.classInner(me,idx);
	}
	$scope.addClassA=function($event){
		var idx=$($event.currentTarget).index();
		$scope.classInner($event.currentTarget,idx);
	};
//	返回页面顶部
	$scope.backToTop=function(){
		$("#myorder").animate({
			"scrollTop": "0"
		},500);
	}
//	点击删除订单
	$scope.deleteOrder=function($event){
		var me=$event.currentTarget;
		$("#delete-dialog").css({'transform': 'translateY(100%)','transition': 'all 0.5s'});
		$(me).parent().parent().parent().addClass("active");
	}
	$scope.closeDialog=function(){
		$("#delete-dialog").css({'transform': 'translateY(0)','transition': 'all 0.5s'});
		$("#myorder div.myorder-list>div.myorder-list-con.active").removeClass("active");
	}
	$scope.deleteOrderList=function($event){
		var me=$event.currentTarget;
		if(!($(me).hasClass("active"))){
			$(me).addClass("active");
			$("#myorder div.myorder-list>div.myorder-list-con.active").remove();
			$("#delete-dialog div.delete-dialog-inner p.inner1").html("删除订单成功！").css("color","green");
			$("#delete-dialog").css({'transform': 'translateY(0)','transition': 'all 0.5s 0.5s'});
			setTimeout(function(){
				$("#delete-dialog div.delete-dialog-inner p.inner1").css("color","#E5004B").html("确定删除该订单吗？");
				$(me).removeClass("active");
			}.bind(me),1000);
		}
			
	}
	
	


});

// details page controller 订单详情
app.controller('detailsCtrl', function($scope,$routeParams) {
// $scope.animate(false);
	if($routeParams.did==0){
		$scope.showTitle=0;
	}else if($routeParams.did==2){
		$scope.showTitle=2;
	}
	
});


// account page controller 个人中心
app.controller('accountCtrl', function($scope) {
// $scope.animate(false);
	$("#account div.user-title div.user-head").addClass("animated rotateIn");
});

// vipcenter page controller 会员中心
app.controller('vipcenterCtrl', function($scope) {
// $scope.animate(false);
	$("#vipcenter dl dt").addClass("animated bounceInLeft");
	$("#vipcenter dl dt img").addClass("animated bounceInRight");

});

// usercenter page controller 用户信息
app.controller('usercenterCtrl', function($scope) {
// $scope.animate(false);

	$scope.toggleGender=function($event){
			$("#genderVal").slideToggle();
			if($($event.target).hasClass("gender-list")){
				$("#usercenter li.usercenter-gender div.rt p.selVal").html($($event.target).html());
			}
			
	}
	
	$scope.selTaboos=true;
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


