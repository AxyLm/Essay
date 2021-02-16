url = "/led1%7C1"

if (("|" in url) or ("%7C" in url)):
    query = url.split("/")[1]
    splitstr = "|"
    if ("%7C" in url):
        splitstr = "%7C"
    coms = query.split(splitstr,1)[0]
    status = query.split(splitstr, 1)[1]
    print('{}:{}'.format(coms, status))