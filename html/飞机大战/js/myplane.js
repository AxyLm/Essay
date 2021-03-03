//战斗机
function MyPlane(){
	if( !MyPlane.instannce ){
		MyPlane.instannce = {
			body : create( "div" ),
			init : function(){
				//描述战斗机
				this.body.className = "my-warplain";
				new GameEngine().append( this.body );
				//设置飞机的初始位置
				this.body.style.bottom = 0;
				this.left(  ( new GameEngine().width()-this.width() )/2  ); 
				return this;
			},
			width : function(){
				//获取战斗机的宽度
				return this.body.offsetWidth;
			},
			height :function(){
				//获取战斗机的高度
				return this.body.offsetHeight;
			},
			left : function(val){
				//如果val有值，设置战斗机的left值
				//如果没有传值  获取战斗机的left值
				if( val || val == 0 ){
					this.body.style.left = val + "px";
				}
				return this.body.offsetLeft;
			},
			top : function(){
				return this.body.offsetTop;
			},
			fire : function(){//飞机的开火方法
				//子弹出场
				setInterval( function(){
					new Bullet().init().move();
				}.bind(this) , new GameEngine().level );
			},
			move : function(type){ //战斗机的移动
				var ge = new GameEngine();
				switch( type ){
					case "mouse":{
						ge.body.addEventListener("mousemove",function(e){
							var e = e || event;
							var x = e.pageX - this.width()/2 - ge.left();
							var maxL = ge.width()-this.width();
							x = Math.min( Math.max( 0 , x ),maxL );
							this.left( x );
						}.bind(this))
						break;
					}
					case "key" :{
						document.addEventListener("keydown",function(e){
							var e = e || event;
							var code = e.keyCode || e.which;
							switch( code ){
								case 37 : {
									var x = this.left() - 6;
									x = Math.max( 0 , x );
									this.left( x );
									break;
								}
								case 39 : {
									var _x = this.left() + 6;
									_x = Math.min( _x , ge.width()-this.width() );
									this.left( _x );
									break;
								}
							}
						}.bind(this))
						break;
					}
				}
				
				return this;
			}
		}
	}
	return MyPlane.instannce;

}