
	var canvas,ctx;

			
	
	window.onload = function(){
		
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
					
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		canvas.style.backgroundColor = 'lightblue';
					
		var maxFlakes = 100;
		var flakes = new Array();//[];
					
		for(var i=0 ; i < maxFlakes ; ++i){
			flakes.push({
				x : Math.random()*canvas.width,
				y : Math.random()*canvas.height,
				r : Math.random()*5+2,
				d : Math.random()+1	
			});
		}
					
		function drawFlake(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.fillStyle = 'white';
			//ctx.beginPath();
			for(var i=0;i<maxFlakes;++i){
				var f = flakes[i];
				var rgrad;
				ctx.beginPath();
				//ctx.moveTo(f.x,f.y);
				rgrad = ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r);
				ctx.moveTo(f.x,f.y);
				rgrad.addColorStop(0,'white');
				//rgrad[i].addColorStop(0.9,'black');
				rgrad.addColorStop(1,'rgba(255,255,255,0)');
				ctx.fillStyle = rgrad;
				ctx.strokeStyle = 'white';
								
				ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
			
				ctx.fill();
				//ctx.stroke();
				ctx.closePath();
			}
		//ctx.fill();
		moveFlake();
		}
					
		var angle =0;
					
		function moveFlake(){
			angle+=0.01;
						
			for(var i=0;i<maxFlakes;++i){
				var f = flakes[i];
							
				f.y += Math.pow(f.d,2)+1;
				f.x += Math.sin(angle)*2;
						
				if( f.y > canvas.height ){
					flakes[i] = {
								x : Math.random()*canvas.width,
								y : 0,
								r : Math.random()*5+2,
								d : Math.random()+1	
								};
				}
							
							
			}
		}
		var timer = setInterval(drawFlake,25);
	};