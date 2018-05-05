
	var canvas,ctx;
	var W,H;
	var circle = new Array() ;
	var mouse = {
		x : undefined,
		y : undefined
	};
		
	
		window.onload = function(load){
	
			canvas = document.getElementById('canvas');
			ctx = canvas.getContext('2d');
			
			W = window.innerWidth;
			H = window.innerHeight;
			canvas.width = W ;
			canvas.height = H ;
			
			canvas.style.backgroundColor = 'white';
		
			
			
			init(Math.floor((innerHeight*innerWidth)/(50*50)));
			animate();
		};
		window.onresize = function(){
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;	
		};
		window.onmousemove = function(evt){
			mouse.x = evt.x;
			mouse.y = evt.y;
		};
		
		
		function Circle(x,y,r,vx,vy){
			this.x=x;
			this.y=y;
			this.r=r;
			this.vx=vx;
			this.vy=vy;
			this.maxR = 20;
			this.minR = 0;
			this.color = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
			
			this.draw = function(){
				ctx.beginPath();
				ctx.strokeStyle = 'white';
				ctx.fillStyle = this.color;
				ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
				//ctx.stroke();
				ctx.fill();
				ctx.closePath();
			}
			this.update = function(){
				//this.draw();
				if(this.x+this.r > canvas.width||this.x-this.r<0){
					this.vx = -this.vx;
				}
				if(this.y+this.r > canvas.height||this.y-this.r<0){
					this.vy = -this.vy;
				}
				this.x += this.vx;
				this.y += this.vy;
				this.draw();
				
				
				// Interactivity
				if( mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50  ){
					if(this.r < this.maxR){
						this.r += 1;
					}
				}else if(this.r> this.minR){
					this.r -= 1;
				}
				
				
				
			}

		}
		
		
		
		function init(n){
			for(var i =0;i<n;++i){
				var x= Math.random()*(W-2*r)+r;
				var y= Math.random()*(H-2*r)+r;
				var r= 2;
				var dx= (Math.random()-0.5)*8;
				var dy= (Math.random()-0.5)*8;
				circle.push(new Circle(x,y,r,dx,dy));
			}
		}
		
		
	
		function animate(){
			window.requestAnimationFrame(animate);
			
			//Trial Effect
			//ctx.fillStyle = 'rgba(255,255,255,.5)';
			//ctx.fillRect(0,0,canvas.width,canvas.height);
			
			ctx.clearRect(0,0,W,H);
			for(var i=0;i<circle.length;i++){
				circle[i].update();
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
