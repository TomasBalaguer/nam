import express from 'express';
import morgan from 'morgan';
var cors = require('cors')
import pkg from "../package.json";
import messagesRoutes from "./routes/messages.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import scheduleRoutes from "./routes/schedule.routes";
import teamsRoutes from "./routes/teams.routes";
import divisionRoutes from "./routes/division.routes";

import { createRoles, createGroups } from './libs/initialSetup'
var path = require('path');


const app = express();
const http = require('http').Server(app);
//const server = http.createServer(app);
createRoles();
createGroups()

app.set('pkg', pkg);

const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user connected');
});

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) =>{
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})
app.use(cors())

app.use(function(req, res, next){
    res.io = io;
    next();
  });

  
app.use('/api/messages', messagesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/events', scheduleRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/divisions', divisionRoutes);
app.use(express.static(path.resolve('./src/storage')));
// app.use(express.static('storage'));
export default http;