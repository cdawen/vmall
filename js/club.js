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
		var new_index = (index+1 >4)?0:index+1;
		animation(index, new_index);
  		index = new_index;
  		checkIndex();
	}
	function pre(){
		var new_index = (index - 1 <0)?4:index-1;
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
//	var banners = document.getElementById('banner');
//      banners.onmouseover = function(){
//      	clearInterval(int);
//      };
//      banners.onmouseout = function(){
//      	int = setInterval(function(){next()},3000)
//      }
//	banner部分结束
//	版块的Tab菜单部分开始
	function $(id){
	return typeof id==='string'?document.getElementById(id):id;
}
	  // 
	  var index=0;
	  var timer=null;
	
	  //
	  var lis=$('Section_title').getElementsByTagName('span');
	  var divs=$('section_nr').getElementsByTagName('div');
	  // 
	  for(var i=0;i<lis.length;i++){
	    lis[i].id=i;
	    lis[i].onmouseover=function(){
	      clearInterval(timer);
	      changeOption(this.id);
	    }
//	    lis[i].onmouseout=function(){  
//	      timer=setInterval(autoPlay,2000);    
//	    }
	  }
	  
//	  if(timer){
//	    clearInterval(timer);
//	    timer=null;
//	  } 
	  //
//	  timer=setInterval(autoPlay,2000);
	
	  function autoPlay(){
	      index++;
	      if(index>=lis.length){
	         index=0;
	      }
	      changeOption(index);
	  }
	
	  function changeOption(curIndex){
	    for(var j=0;j<lis.length;j++){
	       lis[j].className='';
	       divs[j].style.display='none';
	    }
	    //
	    lis[curIndex].className='select';
	    divs[curIndex].style.display='block';
	    index=curIndex;
	  }
	  
	  
//	版块的Tab菜单部分结束
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
//	固定边栏滚动
//	var $ = function(id){
//			return document.getElementById(id);
//		}

		var addEvent = function(obj,event,fn){
            if(obj.addEventListener){
            	obj.addEventListener(event,fn,false);
            }else if(obj.attachEvent){
            	obj.attachEvent('on'+ event,fn);
            }
		}
		var domSider = $('content_right');
		var scrollEvent = function(){
			var sideHeight = domSider.offsetHeight;
			var screenHeight = document.documentElement.clientHeight||document.body.clientHeight;
			var scrollHeight = document.documentElement.scrollTop||document.body.scrollTop;
			if(scrollHeight+screenHeight >sideHeight + 487){				
				domSider.style.cssText = 'position:fixed;right:230px;top:'+(-(sideHeight-screenHeight))+'px';
			}else{
				domSider.style.position='static';
			}
		}
		addEvent(window,'scroll',function(){
			scrollEvent();
			
		});
		addEvent(window,'resize',function(){
			scrollEvent();
		});
//	固定边栏滚动结束
	
}

