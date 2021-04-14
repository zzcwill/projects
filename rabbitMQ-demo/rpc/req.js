const amqp = require('amqplib');

let rabbitMqOption= {
    protocol: 'amqp',
    hostname: '127.0.0.1',
    port:'5672',
    username:'root',
    password:'root',
    authMechanism: 'AMQPLAIN' ,
    pathname:'/',
    ssl: { 
        enabled : false  
    }  
}


async function req() {
    // 前端发送消息队列
    let q = 'req';
    // 后台回复队列
    let q2 = 'res';
    // 关联correlationId
    let correlationId = 'correlationId';  

    // 1. 创建链接对象
    const connection = await amqp.connect(rabbitMqOption);

    // 2. 获取通道
    const ch = await connection.createChannel();

    let msg = {
        uid: '1',
        username: 'zzc'
    };
    msg = JSON.stringify(msg)    

    await ch.assertQueue(q2, {durable: false} )

    // 创建消费q2队列 
    await ch.consume(q2, async (msg) =>{
        console.info(msg.content.toString())
        ch.close();
    },{ noAck: true});

    //发送消息到q队列, correlationId用来做消息的关联id
    ch.sendToQueue(q, Buffer.from(msg.toString()),{ replyTo: q2, correlationId: correlationId})
}

req();