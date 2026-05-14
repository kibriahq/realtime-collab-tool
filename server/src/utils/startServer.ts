import type { Server } from 'http';

async function startServer(server: Server, PORT: number) {
    try {
        server.listen(PORT, () => {
            console.log(`🚀 Server is running on PORT ${PORT}`);
        });

    } catch (err) {
        console.error('❌ Server failed to start:', err);
        process.exit(1);
    }

}

export default startServer;