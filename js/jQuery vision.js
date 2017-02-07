$(window).on("load",function(){
	waterfall();
	var dataInt={
		'data':[
			{'src':'56.jpg'},
			{'src':'60.jpg'},
			{'src':'61.jpg'},
			{'src':'62.jpg'},
			{'src':'63.jpg'},
			{'src':'64.jpg'},
			{'src':'65.jpg'},
			{'src':'66.jpg'},
		]
	}
	$(window).on("scroll",function(){
		if(checkScrollSide()){
			$.each(dataInt.data, function(index,value) {
				var $oPin=$('<div>').addClass('pin').appendTo($("#main"));
				var $oBox=$('<div>').addClass('box').appendTo($oPin);
				$('<img>').attr('src','img/'+$(value).attr('src')).appendTo($oBox);
			});
			waterfall();
		}
	})
})

function waterfall(parent,pin){
	var $aPin=$("#main>div");
	var iPinW=$aPin.eq(0).width();
	var num=Math.floor($(window).width()/iPinW);
	$('#main').css({
		'width:':iPinW*num,
		'marign:':'0 auto'
	});
	
	var pinHArr=[];
	
	$aPin.each(function(index,value){
		var pinH=$aPin.eq(index).outerHeight();
		if(index<num){
			pinHArr[index]=pinH;
		}else{
			var minH=Math.min.apply(null,pinHArr);//数组pinHArr中的最小值minH
			var minHIndex=$.inArray(minH,pinHArr);//找到该值的下标
			$(value).css({
				'position': 'absolute',
                'top': minH+'px',
                'left':$aPin.eq(minHIndex).position().left
			});
			pinHArr[minHIndex]+=$aPin.eq(index).outerHeight();
		}
	})
}

function checkScrollSide(){
	var $aPin=$("#main>div");
	var lastPinH=$aPin.last().get(0).offsetTop+Math.floor($aPin.last().height()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();//window当前页面
	return (lastPinH<scrollTop+documentH)?true:false;
}
