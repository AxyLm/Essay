//子弹
function Bullet(){
	this.body = create("div");
	this.init = function(){
		var mp = new MyPlane();
		this.body.className = "bullet";
		new GameEngine().append( this.body );
		//设置子弹的初始位置
		this.left( mp.left() + mp.width()/2 - this.width()/2 );
		this.top( mp.top() - this.height() );
		
		return this;
	}
	this.move = function(){
		this.timer = setInterval( function(){
			this.top( this.top()-3 );
			if( this.top() < -this.height() ){
				this.remove();
				return;
			}
			
			//在子弹移动的定时器中  完成子弹和敌机的碰撞检测
			//以当前某个运动的子弹 为基准 ，检测所有的敌机
			//如何找到所有的敌机？？
			var enemes = new GameEngine().enemes;
			for( var en of enemes ){//en代表new出来的敌机对象 
				if( pz( this.body ,en.body ) ){ 
					//某个子弹和某个敌机碰撞后
					//子弹消失   敌机受伤	
					this.remove();
					en.hurt();
				}
			}
		}.bind(this),30 )
	}
	this.remove = function(){
		clearInterval( this.timer );
		this.body.remove();
	}
	this.left = function(val){
		if( val || val == 0 ){
			this.body.style.left = val + "px";
		}
		return this.body.offsetLeft;
	}
	this.top = function(val){
		if( val || val == 0 ){
			this.body.style.top = val + "px";
		}
		return this.body.offsetTop;
	}
	this.width = function(){
		return this.body.offsetWidth;
	}
	this.height = function(){
		return this.body.offsetHeight;
	}
}