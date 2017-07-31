window.onload = function(){
//	banner部分开始
	var animat = false;
	var index = 0;
	var list = document.getElementById('list').getElementsByTagName('a');
	var dots = document.getElementById('dot').getElementsByTagName('span');
	document.getElementById('next').onclick = function(){next()};
	document.getElementById('pre').onclick = function(){pre()};
	var int = setInterval(function(){next()},5000);
	function next(){
		if(animat){
			return false;
		}
		var new_index = (index+1 >2)?0:index+1;
		animation(index, new_index);
  		index = new_index;
  		checkIndex();
	}
	function pre(){
		var new_index = (index - 1 <0)?2:index-1;
		animation(index, new_index);
		index = new_index;
		checkIndex();
		if(animat){
			return false;
		}
	}
	function animation(index, new_index){
		animat = true;
		var interval = 10;
		var one_time = 1000;
		var offset = 1/(1000/10);
		list[index].style.opacity = 1;
		list[new_index].style.opacity = 0;
		list[new_index].style.display = 'block';
		var x = 0;
		go();
		function go(){
			x += offset;
			list[index].style.opacity -= offset;
			list[new_index].style.opacity = x;
			if (list[index].style.opacity >= 0){
				setTimeout(function(){go()},10);
			}else{
				list[index].style.display = 'none';
				animat = false;
			}
			console.log(list[index].style.opacity,list[new_index].style.opacity);
		}	
	}
	function checkIndex(){
		for (var i=0; i<dots.length; i++){
			dots[i].className = '';
		}
		dots[index].className = 'on';	
	}
	for(var i=0; i<dots.length; i++){
		dots[i].onclick = function(){
			if(animat){
				return false;
			}
			var new_index = Number(this.getAttribute('index'));
			animation(index,new_index);
			index = new_index;
			checkIndex();
		}
		dots[i].onmouseover = function(){
			if(animat){
				return false;
			}
			var new_index = Number(this.getAttribute('index'));
			animation(index,new_index);
			index = new_index;
			checkIndex();
		}
	}
	var banners = document.getElementById('banner');
        banners.onmouseover = function(){
        	clearInterval(int);
        };
        banners.onmouseout = function(){
        	int = setInterval(function(){next()},3000)
        }
//	banner部分结束
//	抽奖部分开始
	$(function() {
		var $plateBtn = $('#plateBtn');
		var $result = $('#result');
		var $resultTxt = $('#resultTxt');
		var $resultBtn = $('#resultBtn');
		$plateBtn.click(function() {
			var data = [0, 1, 2, 3, 4, 5, 6, 7];
			data = data[Math.floor(Math.random() * data.length)];
			switch(data) {
				case 1:
					rotateFunc(1, 157, '再接再励');
					break;
				case 2:
					rotateFunc(2, 65, '继续努力');
					break;
				case 3:
					rotateFunc(3, 335, '再接再励');
					break;
				case 4:
					rotateFunc(4, 247, '谢谢参与');
					break;
				case 5:
					rotateFunc(5, 114, '恭喜你中了 <em>华为自拍杆</em>');
					break;
				case 6:
					rotateFunc(6, 24, '恭喜你中了 <em>华为手环B2商务版</em>');
					break;
				case 7:
					rotateFunc(7, 292, '恭喜你中了 <em>旅行6件套</em>');
					break;
				default:
					rotateFunc(0, 203, '恭喜你中了 <em>华为降噪耳机</em>');
			}
		});
		var rotateFunc = function(awards, angle, text) { //awards:奖项，angle:奖项对应的角度
			$plateBtn.stopRotate();
			$plateBtn.rotate({
				angle: 0,
				duration: 5000,
				animateTo: angle + 1440, //angle是图片上各奖项对应的角度，1440是让指针固定旋转4圈
				callback: function() {
					$resultTxt.html(text);
					$result.show();
				}
			});
		};
		$resultBtn.click(function() {
			$result.hide();
		});
	});
//	抽奖部分结束
//公告列表无缝滚动开始
	var speed=40;
	var demo=document.getElementById("demo"); 
	var demo2=document.getElementById("demo2"); 
	var demo1=document.getElementById("demo1"); 
	demo2.innerHTML=demo1.innerHTML ;
	function Marquee(){ 
		if(demo.scrollTop>=demo1.offsetHeight){
		    demo.scrollTop=0; 
		}
		else{ 
		    demo.scrollTop=demo.scrollTop+1;
		} 
	} 
	var MyMar=setInterval(function(){Marquee()},speed) 
	demo.onmouseover=function(){clearInterval(MyMar)} 
	demo.onmouseout=function(){MyMar=setInterval(Marquee,speed)} 
//公告列表无缝滚动结束
//	悬浮工具栏开始	
	var toTops = document.getElementById('toTop');
	var clientHeight = document.documentElement.clientHeight;
	var timer = null;
	var isTop = true;
	window.onscroll = function(){
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(osTop>=clientHeight){
			toTops.style.display = 'block';
		}else{
			toTops.style.display = 'none';
		}
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
	}
	toTops.onclick = function(){
		timer = setInterval(function(){
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			var ispeed = Math.floor( -osTop / 6 );
			document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
			console.log(osTop + ispeed);
			isTop = true;
			if(osTop == 0){
				clearInterval(timer);
			}
		},30);
	}
}