//游戏引擎
function GameEngine(){
	if( !GameEngine.instannce ){
		GameEngine.instannce = {
			body : $id("main"),
			ul : $id("options"),
			level : 0 ,
			enemes : new Set(), //定义一个集合，用于存放所有的敌机
			initMenu : function(){ //整个程序的入口方法  菜单的点击
				this.ul.addEventListener( "click" , function(e){
					var e = e || event;
					var target = e.target || e.srcElement;
					if( target.nodeName.toLowerCase() == "li" ){
						//记录游戏的等级
						this.level = target.getAttribute("level");
						//删除菜单
						this.ul.remove();
						
						this.start();
					}
				}.bind(this) )
			},
			start : function(){
				//启动引擎中的logo 和 动画飞机的创建
				var logo = create("div");
				logo.className = "logo";
				this.append( logo );
				
				var plane = create("div");
				plane.className = "loading";
				this.append( plane );
				
				//让plane动起来
				var index = 1;
				var timer = setInterval(function(){
					plane.style.backgroundImage = `url(images/loading${++index}.png)`;
					if( index == 3 ){
						index = 0;
					}
				}.bind(this),500)
				
				//背景图的移动
				var count = 0;
				setInterval( function(){
					this.body.style.backgroundPositionY = ++count + "px";
				}.bind(this),30 )
				
				//经过一段时间后  logo和plane消失  战斗机出场
				setTimeout( function(){
					logo.remove();
					plane.remove();
					clearInterval(timer);
					this.gameStart();
				}.bind(this) , 3000);
			},
			append : function(obj){
				this.body.appendChild( obj );
			},
			gameStart : function(){
				//游戏开始啦   战斗机出场
				new MyPlane().init().move("mouse").fire();
				//敌机出场
				this.autoCreateEnemy();
			},
			autoCreateEnemy : function(){
				setInterval( function(){
					if( Math.random() > 0.3 ){
						//var en = new Enemy("small");
						//this.enemes.add( en );
						//en.init().move();
						this.enemes.add( new Enemy("small").init().move() ) ;
					}
				}.bind(this) , 1000 )
				
				setInterval( function(){
					if( Math.random() > 0.4 ){
						//注意 ： 将move方法的返回值 存入到集合  保证move方法的返回值是当前new出来的敌机
						this.enemes.add( new Enemy("middle").init().move() ) ;
					}
				}.bind(this),2000 )
				
				setInterval( function(){
					if( Math.random()>0.7 ){
						this.enemes.add( new Enemy("large").init().move() );
					}
				}.bind(this), 5000 )
			},
			width : function(){
				//获取游戏引擎背景的宽度
				return this.body.offsetWidth;
			},
			height : function(){
				//获取游戏引擎的高度
				return this.body.offsetHeight;
			},
			left : function(){
				return this.body.offsetLeft;
			}
		}
	}
	return GameEngine.instannce;
}
	
	
	
	