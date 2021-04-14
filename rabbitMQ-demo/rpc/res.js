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


async function res() {
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

    await ch.prefetch(1, false);

    await ch.assertQueue(q, {durable: false})

    await ch.consume(q, async (msg) => {
        let tomsg = msg.content.toString();

        tomsg = JSON.parse(tomsg)
        tomsg.from = 'serve';
        tomsg = JSON.stringify(tomsg)

        await ch.sendToQueue(q2, Buffer.from(tomsg), { correlationId: correlationId });
        //ack表示消息确认机制。这里我们告诉rabbitmq消息接收成功。
        ch.ack(msg);
    }, {noAck:false});
}

res();