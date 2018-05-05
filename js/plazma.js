
	
var canvas,ctx;
var W,H;
var colorArray = ['indigo','red','green','blue'];
var circle = new Array() ;
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
			
			
			
	init(100);
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

function Particle(x,y,r){
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = 'white';
	this.velocity = 0.1;//randomFloatFromRange(0.025,0.05);
	this.radian = Math.random()*Math.PI*2;
	this.distance = randomIntFromRange(50,120);
	this.threeD = {
		x:randomIntFromRange(50,120),
		y:randomIntFromRange(50,120)
	}
			
	this.draw = lastPt =>{
		//without trail
		/*
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		//ctx.globalAlpha = .5;
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		//ctx.stroke();
		ctx.fill();
		ctx.closePath();
		

		//center
		ctx.beginPath();
		ctx.arc(W/2,H/2,2,0,Math.PI*2,true);
		ctx.fill();
		ctx.closePath();
		*/
				
		//trail
		
		ctx.beginPath();
		ctx.moveTo(lastPt.x,lastPt.y);
		ctx.lineTo(this.x,this.y);
		ctx.strokeStyle= 'white';
		ctx.stroke();
		ctx.closePath();
				
				
	
	}
	this.update = function(){
				
		// motion of pt
		this.radian += this.velocity;
				
		var lastPt ={
			x:this.x,
			y:this.y
		}
				
		/*
		const lastPt ={
			x:W/2,
			y:H/2
		}
		*/
		
		// circular Motion
		//this.x = x + Math.cos(this.radian)*this.threeD.x;
		//this.y = y + Math.sin(this.radian)*this.threeD.y;
		
		/*
		this.x += 2*(Math.random()-.5);
		this.y += Math.random()*10;
		
		if(this.x > innerWidth){
			this.x=Math.random()*W;
			this.y=0;
			lastPt.x=undefined;
			lastPt.y=undefined;}
		if(this.x < 0){
			this.x=0;
			this.y=0;
			lastPt.x=undefined;
			lastPt.y=undefined;}
		if(this.y > innerHeight){
			this.x=Math.random()*W;
			this.y=0;
			lastPt.x=undefined;
			lastPt.y=undefined;
		}
		if(this.y < 0){
			this.y=0;
			lastPt.x=undefined;
			lastPt.y=undefined;
		}
		*/
		
		
		
		this.x  +=  20*(Math.random()-.5);
		this.y  +=  20*(Math.random()-.5);
		
		if(this.x > innerWidth){this.x=innerWidth;}
		if(this.x < 0){this.x=0;}
		if(this.y > innerHeight){this.y=innerHeight;}
		if(this.y < 0){this.y=0;}
		
		
		//mousemove
		/*
		this.x = mouse.x + Math.cos(this.radian)*this.distance;
		this.y = mouse.y + Math.sin(this.radian)*this.distance;
		*/

		this.draw(lastPt);
				
	}

}
		
let particles;
function init(n){
	particles=[];
	for(var i=0;i<n;i++){
		particles.push(new Particle(Math.random()*innerWidth,Math.random()*innerHeight,1));
	}
	//console.log(particles);	
}
		

function animate(){
	window.requestAnimationFrame(animate);
	ctx.save();
	//ctx.clearRect(0,0,canvas.width,canvas.height);
	
	//trail Effect
	ctx.fillStyle='rgba(255,0,0,.05)';
	ctx.fillRect(0,0,canvas.width,canvas.height);

	particles.forEach(
		particle => {particle.update();}
	);
	ctx.restore();
}
		
		
function randomIntFromRange(a,b){
	return a + Math.floor(Math.random()*(b-a)); 
}

function randomFloatFromRange(a,b){
	return a + Math.random()*(b-a); 
}

		
	
	