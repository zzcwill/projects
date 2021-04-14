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

async function consumer() {
    // 1. 创建链接对象
    const connection = await amqp.connect(rabbitMqOption);

    // 2. 获取通道
    const channel = await connection.createChannel();

    // 3. 声明参数
    const exchangeName = 'qosEx';
    const queueName = 'qosQueue';
    const routingKey = 'qos.#';

    // 4. 声明交换机、对列进行绑定
    await channel.assertExchange(exchangeName, 'topic', { durable: true });
    await channel.assertQueue(queueName);
    await channel.bindQueue(queueName, exchangeName, routingKey);
    
    // 5. 限流参数设置
    await channel.prefetch(1, false);

    // 6. 限流，noAck参数必须设置为false
    await channel.consume(queueName, msg => {
        console.log('Consumer：', msg.content.toString());

        channel.ack(msg);
    }, { noAck: false });
}

consumer();