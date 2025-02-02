// app/lib/db.ts
// DB 연결 설정
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri, {
    tls: true,
    tlsCAFile: "global-bundle.pem"
});

export async function connectDB() {
    try {
        await client.connect();
        return client.db(process.env.DB_NAME);
    } catch (error) {
        console.error('DB 연결 실패:', error);
        throw error;
    }
}