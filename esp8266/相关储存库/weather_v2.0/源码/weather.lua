cit="taizhou"   
           --更改天气位置
function  tianqi()
    sntp.sync({ '120.25.108.11','102.120.2.101' },
        function(sec,usec,server)
          print('sync', sec, usec, server)
          suer=user
        end,
        function(index)
          print('failed:'..index)
        end)
        
   local srv=net.createConnection(net.TCP,0)   
    srv:on("receive", function(conn, pl)      
        i,j=string.find(pl, "{")
        sjson_str=string.sub(pl, i)
        local sjson = require("cjson")
        local weather = sjson.decode(sjson_str)
        City=weather["results"][1]["location"]["name"]
        Weather=weather["results"][1]["now"]["text"]
        Temperature=weather["results"][1]["now"]["temperature"]
        print(Weather.."\n"..City.."\n"..Temperature.."\n")
    end)
    srv:on("connection", function(conn, pl)         
   
        conn:send("GET /v3/weather/now.json?key=Sj0mde3xZcxlG5WxX&location="..cit.."&language=en&unit=c HTTP/1.1\r\nHost: api.seniverse.com\r\nConnection: keep-alive\r\nAccept: */*\r\n\r\n")
    end)
    srv:connect(80,"api.seniverse.com")    --连接服务器
end

tmr.alarm(1, 10000, tmr.ALARM_AUTO, function()
        tianqi()
 end)
