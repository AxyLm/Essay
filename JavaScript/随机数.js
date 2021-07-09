function rnd( seed ){
    seed = ( seed * 9301 + 49297 ) % 233280; //为何使用这三个数?
    return seed / ( 233280 );
};

function rand(number){
    today = new Date(); 
    seed = today.getTime();
    return Math.ceil( rnd( seed ) * number );
};

myNum = (rand(5));

console.log(rand(1000));