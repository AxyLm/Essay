var column = [
    {
        field: 'purchaseNo',
        title: '请购单号',
        align: "center"
    },
    {
        field: 'goodsNo',
        title: '物品编号',
        align: "center",
        printShow: false
    },
    {
        field: 'goodsName',
        title: '物品名称',
        align: "center"
    },
    {
        field: 'goodsModel',
        title: '型号',
        align: "center",
        printShow: false
    },
    {
        field: 'unit',
        title: '单位',
        align: "center"
    },
    {
        field: 'editNum',
        title: '入库数量',
        align: "right",
        concat: true,
    },
    {
        field: 'price',
        title: '单价',
        align: "right",
        formatter: function(value, row, index) {
            return editnum(Number(value))
        }
    },
    {
        field: 'editAmount',
        title: '金额',
        align: "right",
        concat: true,
        formatter: function(value, row, index) {
            return editnum(Number(value))
        }
    },
    {
        field: 'repoName',
        title: '所属仓库',
        align: "center",
        printShow: false
    },
]
var dataList = [{"searchValue":null,"createBy":"wangjia","createTime":"2021-06-11 02:08:01","updateBy":null,"updateTime":null,"remark":null,"params":{},"id":"3377280532497691","repoReceiveId":"3377271359164934","goodsName":"服务器硬盘(2T SAS 3.5寸)","goodsNo":"BG20190904185827SL","goodsModel":null,"unit":"块","editNum":1,"price":2,"editAmount":2,"repoName":"信息科技部办公用品仓库","isDel":"0","repoId":null,"createUser":4214295,"updateUser":null,"purchaseNo":null,"currentStock":"6","goodsBigType":null},{"searchValue":null,"createBy":"wangjia","createTime":"2021-06-11 02:08:01","updateBy":null,"updateTime":null,"remark":null,"params":{},"id":"3377280536529963","repoReceiveId":"3377271359164934","goodsName":"金士顿DDR3笔记本内存(4G标准电压)","goodsNo":"BG20180720111914OO","goodsModel":null,"unit":"条","editNum":12,"price":0.25,"editAmount":3,"repoName":"信息科技部办公用品仓库","isDel":"0","repoId":null,"createUser":4214295,"updateUser":null,"purchaseNo":null,"currentStock":"10","goodsBigType":null}]
function editnum(num){
    if(num || num == 0){
        //以下为保留位数
        var a_type = typeof(num);
        if(a_type == "number"){
            var aStr = num.toString();
            var aArr = aStr.split('.');
        }else if(a_type == "string"){
            var aArr = num.split('.');
        }
        if(aArr.length > 1) {
            num = aArr[0] + "." + aArr[1].substr(0, 2); //保留两位
        }
        //加.00
        var s = num.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }else{
        return num
    }
}


/**
 * js 动态生成table
 * @param {object} column 列配置
 * @param {object} data 数据
 * @returns <table>xxx</table>
 */
function prinTable(column, data) {
    var tHeader = "<thead> <tr>"
    var tBody = "<tbody>"
    for (var item of column) {
        if(item.visible != false && item.printShow != false){
            tHeader += "<th style='padding:4px;font-size:13px;text-align:center'>"+item.title+"</th>"
        }
    }
    tHeader += "</tr></thead>"
    var concatData = {}
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        tBody += "<tr>"
        for (let j = 0; j <column.length; j++) {
            var item = column[j];
            if(item.visible != false && item.printShow != false){
                var str = row[item.field] || "-"
                if(typeof item.formatter == "function"){
                    str = item.formatter(row[item.field],row,i) || "-"
                }
                tBody += "<td style='padding:1px 5px;font-size:12px;text-align:"+item.align+"'>" + str||""+ "</td>"
                if (data.length > 0  && column[0].field != "approver" && item.concat == true) {
                    console.log(row[item.field]);
                    if(!concatData[item.field]){
                        concatData[item.field] = 0
                    }
                    concatData[item.field] = parseFloat(((concatData[item.field] * 100 +  row[item.field] * 100) / 100).toFixed(2))
                }
            }
        }
        if(i == data.length -1){
            tBody += "</tr><tr>"
            var flastColspan = 0
            var printShowColumn =[]
            for (let i = 0; i < column.length; i++) {
                var item = column[i];
                if(item.visible != false && item.printShow != false){
                    printShowColumn.push(item)
                }
            }
            for (let j = 0; j <printShowColumn.length; j++) {
                var item = printShowColumn[j];
                if( flastColspan === 0 && item.concat == true ){
                    flastColspan = j - 1
                }
                if(flastColspan != 0){
                    if(flastColspan == j-1 ){
                        tBody += "<td style='padding:1px 5px;font-size:12px;text-align:center' colspan='"+ (flastColspan + 1) +"'>小计</td>"
                    }
                    if(flastColspan <= j ){
                        var str = concatData[item.field] || " "
                        if(typeof item.formatter == "function"){
                            str = item.formatter(concatData[item.field],concatData,j) || " "
                        }
                        tBody += "<td style='padding:1px 5px;font-size:12px;text-align:"+item.align+"'>" + str||""+ "</td>"
                    }
                }
            }

            var str = concatData['editAmount'] || " "
            if(typeof item.formatter == "function"){
                str = item.formatter(concatData['editAmount'],concatData) || " "
            }
            var busiSource = $("#busiSource").val();
            tBody += "</tr><tr>"
            tBody += "<td style='padding:1px 5px;font-size:12px;text-align:center'>合计</td>"
            tBody += "<td style='padding:1px 5px;font-size:12px;text-align:right'>"+ str +"</td>"
            tBody += "<td style='padding:1px 5px;font-size:12px;text-align:center'>大写</td>"
            tBody += "<td style='padding:1px 5px;font-size:12px;text-align:left' colspan='3'>"+number_chinese(concatData['editAmount'])+"</td>"


        }
        tBody += "</tr>"
    }
    return tHeader + tBody;
}


console.log(
    prinTable(column,dataList)
);