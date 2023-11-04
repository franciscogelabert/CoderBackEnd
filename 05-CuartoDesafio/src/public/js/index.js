const socket = io();

socket.emit('message','hola desde el Cliente');

socket.on('individual', data => { console.log('individual -->',data) });

socket.on('individualMenosYo', data => { console.log('individualMenosYo -->',data) });

socket.on('todos', data => { console.log('todos--',data) });


