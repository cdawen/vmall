window.onload = function(){
//	var productLists = document.getElementById('productList');
//	document.getElementById('allProduct').onmouseover = function(){
//		productLists.style.display = 'block';
//	document.getElementById('allProduct').onmouseout = function(){
//		productLists.style.display = 'none';
//	}
	(function(){
	
		var time = null;
		var list = $("#allProduct");
		var box = $("#productList");
		var lista = list.find("a");
		
		for(var i=0,j=lista.length;i<j;i++){
			if(lista[i].className == "now"){
				var olda = i;
			}
		}
		
		var box_show = function(hei){
			box.stop().animate({
				height:hei,
				opacity:1
			},400);
		}
		
		var box_hide = function(){
			box.stop().animate({
				height:0,
				opacity:0
			},400);
		}
		
		lista.hover(function(){
			lista.removeClass("now");
			$(this).addClass("now");
			clearTimeout(time);
			var index = list.find("a").index($(this));
			box.find(".cont").hide().eq(index).show();
			var _height = box.find(".cont").eq(index).height()+54;
			box_show(_height)
		},function(){
			time = setTimeout(function(){	
				box.find(".cont").hide();
				box_hide();
			},50);
			lista.removeClass("now");
			lista.eq(olda).addClass("now");
		});
		
		box.find(".cont").hover(function(){
			var _index = box.find(".cont").index($(this));
			lista.removeClass("now");
			lista.eq(_index).addClass("now");
			clearTimeout(time);
			$(this).show();
			var _height = $(this).height()+54;
			box_show(_height);
		},function(){
			time = setTimeout(function(){		
				$(this).hide();
				box_hide();
			},50);
			lista.removeClass("now");
			lista.eq(olda).addClass("now");
		});
	
	})();
	
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
