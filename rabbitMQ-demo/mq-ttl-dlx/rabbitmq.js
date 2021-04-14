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

let connection = null;

module.exports = {
    connection,

    init: () => amqp.connect(rabbitMqOption).then(conn => {
        connection = conn;

        // console.log('rabbitmq connect success');

        return connection;
    })
}