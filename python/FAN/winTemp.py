# import wmi

# w = wmi.WMI(namespace="root\\wmi")
# print(w.MSAcpi_ThermalZoneTemperature()[0].CurrentTemperature / 10.0)  # 273.15


import wmi
w = wmi.WMI(namespace="root\OpenHardwareMonitor")
temperature_infos = w.Sensor()
for sensor in temperature_infos:
    if sensor.SensorType == u'Temperature':
        print(sensor.Name)
        print(sensor.Value)
