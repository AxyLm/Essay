//敌机
function Enemy(type){
	this.body = create("div");
	this.init = function(){
		new GameEngine().append( this.body );
		switch( type ){
			case "small" : {
				this.body.className = "enemy-small";
				this.left( rand( 0 , new GameEngine().width()-this.width() ) );
				this.top( -this.height() );
				this.speed = 6 ;//速度
				this.hp = 1;//血值
				this.imgs = ["plain1_die1.png","plain1_die2.png","plain1_die3.png"];//存放爆炸后的敌机的图片
				break;
			}
			case "middle" : {
				this.body.className = "enemy-middle";
				this.left( rand( 0 , new GameEngine().width()-this.width() ) );
				this.top( -this.height() );
				this.speed = 3 ;
				this.hp = 3;
				this.imgs = ["plain2_die1.png","plain2_die2.png","plain2_die3.png","plain2_die4.png"];//存放爆炸后的敌机的图片
				break;
			}
			case "large" : {
				this.body.className = "enemy-large";
				this.left( rand( 0 , new GameEngine().width()-this.width() ) );
				this.top( -this.height() );
				this.speed = 1 ;
				this.hp = 8;
				this.imgs = ["plain3_die1.png","plain3_die2.png","plain3_die3.png","plain3_die4.png","plain3_die5.png","plain3_die6.png"];//存放爆炸后的敌机的图片
				break;
			}
		}
		
		return this;
	}
	this.hurt = function(){ //敌机受伤了
		--this.hp == 0 ? this.remove() : "";
	}
	this.remove = function(){
		//敌机原地爆炸  停止敌机运动的定时器
		clearInterval( this.timer );
		//敌机爆炸后 不需要和子弹进行碰撞检测  将集合中的敌机删除
		new GameEngine().enemes.delete( this );
		var timer = setInterval(function(){
			if( this.imgs.length == 0 ){
				clearInterval( timer );
				this.body.remove();
			}
			this.body.style.backgroundImage = `url(images/${ this.imgs.shift() })`;
		}.bind(this),200)
	}
	
	this.move = function(){
		this.timer = setInterval( function(){
			this.top( this.top() + this.speed );
			//敌机运动出   可视区
			if( this.top() > new GameEngine().height() ){
				clearInterval( this.timer )
				this.body.remove();
				//删除敌机所在的集合中的对象
				new GameEngine().enemes.delete( this );
			}
		}.bind(this),30 )
		
		return this;
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