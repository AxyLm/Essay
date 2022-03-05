function getTree(arr) {
  arr = JSON.parse(JSON.stringify(arr))
  const res = arr.reduce((prev, next) => {
    const parent = arr.find(item => item.id === next.pid)
    if (parent) {
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(next)
    } else {
      
      prev.push(next)
    }
    return prev
  }, [])
  return res
}


function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}


const array = [
  { id: 8, pid: 6 },
  { id: 1, pid: 0 },
  { id: 2, pid: 0 },
  { id: 3, pid: 1 },
  { id: 4, pid: 2 },
  { id: 5, pid: 3 },
  { id: 6, pid: 3 },
  { id: 7, pid: 5 },
]
console.log(
  JSON.stringify(
    arrayToTree(array)
  )
);
