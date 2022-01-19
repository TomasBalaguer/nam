import express from 'express';
import morgan from 'morgan';
import pkg from "../package.json";
import messagesRoutes from "./routes/messages.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { Server } from 'socket.io'

import { createRoles, createGroups } from './libs/initialSetup'

const app = express();
createRoles();
createGroups()

app.set('pkg', pkg);
// const io = new Server(app, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });

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

app.use('/api/messages', messagesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

export default app;