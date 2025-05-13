import http from 'http'
import SocketService from "./src/web-sockets/sockets"

export async function init() {

    const socketServiceInstance = new SocketService();
    const PORT = 8000;
    const httpServer = http.createServer();

    //  adding this server to my socket service to get connected with each other 
    socketServiceInstance.io.attach(httpServer);

    httpServer.listen(PORT, () => {
        console.log(`Server is running of port: ${PORT}`,)
    })

    socketServiceInstance.initListener();
}

init();