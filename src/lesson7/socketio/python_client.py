import socketio

# standard Python
sio = socketio.Client()

@sio.event
def connect():
    print("I'm connected!")
    #sio.emit('login', {'userKey': 'streaming_api_key'})

@sio.event
def connect_error():
    print("The connection failed!")

@sio.event
def message(data):
    print('I received a message!')

@sio.on('chat message')
def on_message(data):
    print('chat message: ', data)
    #sio.emit('symbolSub', {'symbol': 'USDJPY'})
    #sio.emit('symbolSub', {'symbol': 'GBPUSD'})
    #sio.emit('symbolSub', {'symbol': 'EURUSD'})

sio.connect('http://localhost:3000')
