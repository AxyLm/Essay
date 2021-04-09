const list = [1, 2, 3, 4, 4, 5, 5, 5, 6, 7];

/**
 * 双重for循环
 * @param {Array} array 
 * @returns 
 * @runTime 6.917ms
 */
function unique(array) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        for (let j = i+1; j < array.length; j++) {
            const item = array[j];
            if (element == item) {
                array.splice(j, 1)
                j--
            }
        }
    }
    return array
}

/**
 *
 * indexOf
 * @param {Array} array
 * @runTime 5.336ms
 */
function unique_indexOf(array) {
    let list = []
    for (let i = 0; i < array.length; i++) {
        if (list.indexOf(array[i]) == -1) {
            list.push(array[i])
        }
    }
    return list
}

/**
 * includes
 * @param {Array} array
 * @runTime 6.423ms
 */
function unique_includes(array) {
    let list = []
    for (let i = 0; i < array.length; i++) {
        if (!list.includes(array[i])) {
            list.push(array[i])
        }
    }
    return list
}

/**
 * @param {Array} array
 */
function unique_set(array) {
    //使用扩展运算符将Set数据结构转为数组
    const result=new Set(array);
    return [...result];
}

/**
 * @param {Array} arr
 */
function unique_filter(arr) {
    return arr.filter(function (item, index, arr) {
        //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        //不是那么就证明是重复项，就舍弃
        return arr.indexOf(item) === index;
    })
}

console.time()
console.log(unique_filter(list))
console.timeEnd()