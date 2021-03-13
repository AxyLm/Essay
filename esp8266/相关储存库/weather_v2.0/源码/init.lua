cfg={}
cfg.ssid = "test002"
cfg.pwd = "asdfghjkl"

wifi.setmode(wifi.STATION)
wifi.sta.config(cfg)

tmr.alarm(0, 1000, tmr.ALARM_AUTO, function()
    if wifi.sta.getip() == nil then
        print("IP unavaiable, Waiting...")
    else
        print("Config done, IP is "..wifi.sta.getip())
      dofile("weather.lua")
        tmr.stop(0)
    end
end)
dofile("oled.lua")
