const amqp = require('amqplib');

let rabbitMqOption = {
    protocol: 'amqp',
    hostname:'127.0.0.1',
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

    // 3. 声明参数
    const exchangeName = 'qosEx';
    const routingKey = 'qos.test001';
    const msg = 'Producer：';

    // 4. 声明交换机
    await channel.assertExchange(exchangeName, 'topic', { durable: true });
    
    for (let i=0; i<5; i++) {
        // 5. 发送消息
        await channel.publish(exchangeName, routingKey, Buffer.from(`${msg} 第${i}条消息`));
    }

    await channel.close();
}

producer();