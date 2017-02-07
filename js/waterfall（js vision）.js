window.onload=function(){
	
	waterfall('main','pin');
	
	var dataInt={
		'data':[
		    {'src':'10.jpg'},
		    {'src':'11.jpg'},
		    {'src':'12.jpg'},
		    {'src':'13.jpg'},
		    {'src':'14.jpg'},
		    {'src':'15.jpg'},
		    {'src':'16.jpg'},
		]
	}
	//添加鼠标滚动事件
	window.onscroll=function(){
		if(checkScrollSide()){
			var oParent=document.getElementById('main');
			for(var i=0;i<dataInt.data.length;i++)
			{
				var oPin=document.createElement('div');
				oPin.className='pin';
				oParent.appendChild(oPin);
				var oBox=document.createElement('div');
				oBox.className='box';
				oPin.appendChild(oBox);
				var oImg=document.createElement('img');
				oImg.src='img/'+dataInt.data[i].src;
				oBox.appendChild(oImg);
			}
			waterfall('main','pin');
		}
	}
}

function waterfall(parent,pin){
	
	var oParent=document.getElementById(parent);//父级对象
	var aPin=getClassObj(oParent,pin);//获取class名为pin的元素，并存入数组
	var iPinW=aPin[0].offsetWidth;//取一个块的宽，offsetWidth实际获取的是盒模型(width+border + padding)
	var num=Math.floor(document.documentElement.clientWidth/iPinW);
	oParent.style.cssText='width: '+iPinW*num+'px;margin:0 auto';
	
	var pinHeightArr=[];
	for(var i=0;i<aPin.length;i++){
		var pinH=aPin[i].offsetHeight;
		if(i<num)
		{
			pinHeightArr[i]=pinH;//第一行中的num个块框pin 先添加进数组pinHArr
		}else{
			var minHeight=Math.min.apply(null,pinHeightArr);//数组pinHArr中的最小值minH
			var minHeightIndex=getminHeightIndex(pinHeightArr,minHeight);
			aPin[i].style.position='absolute';
			aPin[i].style.top=minHeight+'px';
			aPin[i].style.left=aPin[minHeightIndex].offsetLeft+'px';
			//最小高元素的高 + 添加上的aPin[i]块框高
			pinHeightArr[minHeightIndex]+=aPin[i].offsetHeight;
		}
	}
	
}

/*获取同类子元素的数组*/
function getClassObj(parent,className){
	var obj=parent.getElementsByTagName('*');//获取父级所有子元素
	var pinS=[];//创建一个新数组，存储子元素
	for(var i=0;i<obj.length;i++)
	{
		if(obj[i].className==className){
			pinS.push(obj[i]);
		}
	}
	return pinS;
}

/*获取pin高度 最小值的index*/
function getminHeightIndex(arr,minH)
{
	for(var i in arr)
	{
		if(arr[i]==minH)
		{
			return i;
		}
	}
}

/*检验滚动*/
function checkScrollSide(){
	var oParent=document.getElementById('main');
	var aPin=getClassObj(oParent,'pin');
	var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//滚动的2种情况：标准+混合，注意兼容
	var documentH=document.documentElement.clientHeight;//页面可视区高度
	return (lastPinH<scrollTop+documentH)?true:false;
}
