import { RxStomp, RxStompRPC } from '@stomp/rx-stomp';
import { saveAs } from 'file-saver';

// Destination is RabbitMQ specific, change as per your environment
const rpcExchange = '/exchange/request/';
const bindingKeys = { 
  'table': 'extract_table',
  'text': 'extract_text',
  'document': 'create_searchable_pdf'
};

const getBindingKey = (exportType) => {
  return bindingKeys[exportType];
};

const stompConfig = {
  connectHeaders: {
    login: "guest",
    passcode: "guest"
  },
  brokerURL: "ws://localhost:15674/ws",
  debug: function (str) {
    console.log('STOMP: ' + str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 15000,
  heartbeatOutgoing: 15000,
};

// Create an instance. The first RxStomp is the UMD module name and other is the class name
const rxStomp = new RxStomp();

const rxStompRPC = new RxStompRPC(rxStomp);

  // Attempt to connect
const connect = () => {
  rxStomp.configure(stompConfig);
  rxStomp.activate()
};

// I havent verified this works with rxStomp
rxStomp.onConnect = (frame) => {
  // Do something, all subscribes must be done in this callback
  // This is needed because this will be executed after a (re)connect
};

// I havent verified this works with rxStomp
rxStomp.onStompError = (frame) => {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

const publish = (bindingKey, body, headers) => {
  return new Promise((resolve, reject) => {
    const rpcEndPoint = rpcExchange + bindingKey;

    if (!rxStomp.connected) {
      reject("Broker disconnected, can't send message.");
    }
      
    rxStompRPC.rpc({
      destination: rpcEndPoint,
      body: body,
      headers: headers
    }).subscribe((result) => {
      resolve(result._binaryBody);
    });
  });
};

const publishOLD = (payload) => {
  if (!rxStomp.connected) {
    alert("Broker disconnected, can't send message.");
    return;
  }

  // The RPC call returns an Observable which will trigger only once
  rxStompRPC.rpc({
    destination: rpcEndPoint,
    body: payload
  }).subscribe((result) => {
    const output = JSON.parse(new TextDecoder("utf-8").decode(result._binaryBody));
    console.log(result);
    const blob = new Blob(Array.from(output), { type: "text/plain;charset=utf-8" });
    saveAs(blob, "hello world.txt");
  });
};

export { connect, publish, getBindingKey, publishOLD };