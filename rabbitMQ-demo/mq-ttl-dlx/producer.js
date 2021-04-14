const rabbitmq = require('./rabbitmq.js');

/**
 * 路由一个死信队列
 * @param { Object } connnection 
 */
 async function producerDLX(connnection) {
    const testExchange = 'testEx';
    const testQueue = 'testQu';
    const testExchangeDLX = 'testExDLX';
    const testRoutingKeyDLX = 'testRoutingKeyDLX';
    
    const ch = await connnection.createChannel();

    console.log('producer connect success');

    await ch.assertExchange(testExchange, 'direct', { durable: true });
    const queueResult = await ch.assertQueue(testQueue, {
        exclusive: false,
        deadLetterExchange: testExchangeDLX,
        deadLetterRoutingKey: testRoutingKeyDLX,
    });
    await ch.bindQueue(queueResult.queue, testExchange);

    let msg = {
        uid: '1',
        username: 'zzc'
    };
    msg = JSON.stringify(msg)
    console.info(msg)

    await ch.sendToQueue(queueResult.queue, Buffer.from(msg), {
        expiration: '10000'
    });
    
    ch.close();
}

rabbitmq.init().then(connection => producerDLX(connection));