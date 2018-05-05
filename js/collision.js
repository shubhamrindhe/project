var canvas,ctx;
	var W,H;
	var particles=[];
	var mouse = {
			x : undefined,
			y : undefined
		};

				
	window.onload = function(load){
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		W = canvas.width;
		H = canvas.height;	
		canvas.style.backgroundColor = 'white';
				
				
				
		init(50);
		animate();
		//console.log();
		
		
	};
	window.onresize = function(){
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;	
	};
	window.onmousemove = function(evt){
			mouse.x = evt.x;
			mouse.y = evt.y;
	};



	function Particle(x,y,r){
		this.x = x;
		this.y = y;
		this.r = r;
		this.mass = 1;
		this.color = 'rgb('+randomIntFromRange(0,255)+','+randomIntFromRange(0,255)+','+randomIntFromRange(0,255)+')';//'black';
		this.radian = Math.random()*Math.PI*2;
		this.e = 1;
		this.speed = 5;
		this.velocity={
			x : this.speed*Math.cos(this.radian), 
			y : this.speed*Math.sin(this.radian) 
		};
		this.radialDistance = randomIntFromRange(100,150);
		
				
		this.draw = function(){
			
			ctx.beginPath();
			ctx.strokeStyle = this.color;
			ctx.fillStyle = this.color;
			ctx.lineWidth = 2;
			ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
			ctx.stroke();
			ctx.fill();
			ctx.closePath();
			
		}
		this.update = function(particles){
			this.draw();
			
			
			
			
			
			//collision
			for(var i=0;i<particles.length;++i){
				
				if( this === particles[i] ) continue;
		
				if( distance(this.x,this.y,particles[i].x,particles[i].y)- (this.r + particles[i].r )< 0){
						//console.log('yo');
						collisionDetect( this , particles[i] );
				}
			
			
			
			}
			
			
			
			
			
			
			
			
			//wall
			if(this.x >W-r || this.x<r){
				this.x -= this.velocity.x;
				this.velocity.x = - this.velocity.x;
				this.x += this.velocity.x;
			}
			if(this.y >H-r || this.y<r){
				this.y -= this.velocity.y;
				this.velocity.y = - this.velocity.y;
				this.y += this.velocity.y;
			}
			
			
			
			
			this.x += this.velocity.x;
			this.y += this.velocity.y;
			
			//circular
			/*
			this.radian+=.05;
			this.x = x + Math.sin(this.radian)*this.radialDistance ;//this.velocity.x;
			this.y = y + Math.cos(this.radian)*this.radialDistance ;//this.velocity.y;
			*/
					
		}

	}
			

	function init(n){
	
		for(var i=0;i<n;++i){
			var rad =20;
			var x=randomIntFromRange(rad,innerWidth-rad);
			var y=randomIntFromRange(rad,innerHeight-rad);
			
			if(i!=0){
				for(var j=0;j<particles.length;++j){
					if( distance(x,y,particles[j].x,particles[j].y)-2*rad < 0){
						x=randomIntFromRange(rad,innerWidth-rad);
						y=randomIntFromRange(rad,innerHeight-rad);
						j=-1;
					}
				}
			}
			
			particles.push( new Particle(x,y,rad));
		}
		console.log(particles);
		
	}
			

	function animate(){
		window.requestAnimationFrame(animate);
		
		ctx.save();
		ctx.fillStyle = 'white';
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		//ctx.fillStyle = 'rgba(0,0,0,.3)'
		//ctx.fillRect(0,0,canvas.width,canvas.height);
		/*
		for(var i=0;i<particles.length;++i){
			particles[i].update();
		}
		*/
		
		particles.forEach(function(particle){
			particle.update(particles);
			//particle.draw();
		});
		
		ctx.restore();
		
	}
	
	
	
	
	function rotate(velocity , angle){
		var rotatedVelociteis = {
			x : velocity.x*Math.cos(angle) - velocity.y*Math.sin(angle) ,
			y : velocity.x*Math.sin(angle) + velocity.y*Math.cos(angle)
		}
		return rotatedVelociteis;
	}
	
	function collisionDetect( particle , otherParticle ){
		const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
		const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
	
		const xDist = otherParticle.x - particle.x;
		const yDist = otherParticle.y - particle.y;
		
		if( xVelocityDiff*xDist + yVelocityDiff*yDist >= 0 ){
			const angle = -Math.atan2( otherParticle.y - particle.y , otherParticle.x - particle.x );
			
			const m1 = particle.mass;
			const m2 = otherParticle.mass;
			
			const u1 = rotate(particle.velocity,angle);
			const u2 = rotate(otherParticle.velocity,angle);
			
			const v1 = { x : u1.x*(m1-m2)/(m1+m2) + u2.x*(1+particle.e)*m2/(m1+m2) , y : u1.y };
			const v2 = { x : u2.x*(m1-m2)/(m1+m2) + u1.x*(1+particle.e)*m2/(m1+m2) , y : u2.y };
			
			const vFinal1 = rotate(v1,-angle);
			const vFinal2 = rotate(v2,-angle);
			
			particle.velocity.x = vFinal1.x;
			particle.velocity.y = vFinal1.y;
			
			otherParticle.velocity.x = vFinal2.x;
			otherParticle.velocity.y = vFinal2.y;
			
		}
	}
	
	
	
	
	
	
			
	function distance(x1,y1,x2,y2){
		var dx = x2-x1;
		var dy = y2-y1;
		return Math.sqrt(dx*dx+dy*dy);
	}

	
	function randomIntFromRange(a,b){
		return a + Math.floor(Math.random()*(b-a)); 
	}

		