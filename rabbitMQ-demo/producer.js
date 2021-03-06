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


async function producer() {
    // 1. 创建链接对象
    const connection = await amqp.connect(rabbitMqOption);

    // 2. 获取通道
    const channel = await connection.createChannel();

    console.log('producer connect success');

    // 3. 声明参数
    const routingKey = 'testQueue';
    
    let msg = {
        uid: '1',
        username: 'zzc'
    };
    msg = JSON.stringify(msg)

    for (let i=0; i<5; i++) {
        // 4. 发送消息
        await channel.publish('', routingKey, Buffer.from(`${i} : ${msg}`));
    }

    // 5. 关闭链接
    await channel.close();
}

producer();