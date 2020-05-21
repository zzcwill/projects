//内存泄漏-node
//获取内存泄漏信息-process.memoryUsage()
//堆中总共申请的内存-heapTotal
//堆中使用的内存-heapUsed
//常驻内存-rss
//buffer对象是不受V8控制和分配的，属于堆外内存
//Node的内存主要是通过V8进行分配和Node自行分配的部分。但是受V8垃圾回收限制的主要是V8的堆内存

function showMemory(j) {
  console.log(`这是第${j+1}次运行`)
  var mem = process.memoryUsage();

  function format(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + "MB";
  }

  console.log(
    `Process:总共申请的内存heapTotal:${format(mem.heapTotal)}, 目前堆中使用内存heapUsed:${format(
      mem.heapUsed
    )},常驻内存rss:${format(mem.rss)}`
  );
  console.log(
    "======================================================================================"
  );
}

//吃人函数
function useMem() {
  var size = 20 * 1024 * 1024;
	var arr = new Array(size);
  for (var i = 0; i < size; i++) {
    arr[i] = 0;
  }
  return arr;
}

//吃人函数2
function useMem2() {
  var size = 200 * 1024 * 1024;
  var buffer = new Buffer(size);
  for (var i = 0; i < size; i++) {
    buffer[i] = 0;
  }
  return buffer;
}

var total = [];

for (var j = 0; j < 20; j++) {//运行20次，实际上也不会达到，因为会内存耗尽
  showMemory(j);
	total.push(useMem());
	// total.push(useMem2());
}
