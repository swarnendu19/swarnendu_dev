import express from 'express';
import { createServer } from 'http';
import socketIO from 'socket.io';
import { connect, Schema, model } from 'mongoose';

const app = express();
const server = createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3001;

connect('mongodb://localhost:27017/chatApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const messageSchema = new Schema({
    username: String,
    content: String,
})

const userSchema = new Schema({
    username: String,
    password: String,  
  });

const User = model('User', userSchema);
const Message = model('Message',messageSchema)

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Listen for new messages
    socket.on('newMessage', async (data) => {
      try {
        // Save the message to MongoDB
        const message = new Message(data);
        await message.save();
  
        // Broadcast the new message to all connected clients
        io.emit('newMessage', data);
      } catch (error) {
        console.error('Error saving message:', error.message);
      }
    });
  
    // Handle user authentication (a simplified example)
    socket.on('login', async (credentials) => {
      try {
        const user = await User.findOne(credentials);
  
        if (user) {
          // Successful login
          socket.emit('loginSuccess', { username: user.username });
        } else {
          // Failed login
          socket.emit('loginFailure', { message: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Error during login:', error.message);
        socket.emit('loginFailure', { message: 'An error occurred during login' });
      }
    });
  
    // Listen for disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  