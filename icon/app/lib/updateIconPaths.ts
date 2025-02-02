// // app/lib/updateIconPaths.ts
// // 사용 안 함......
// import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
// import { connectDB } from './db';

// interface SoundDocument {
//     _id: string;
//     audio_group: string;
//     keywords: string[];
//     icon_path: string | null;
// }

// export async function updateIconPaths() {
//     // S3 클라이언트 설정
//     const s3Client = new S3Client({
//         credentials: {
//             accessKeyId: process.env.AWS_ACCESS_KEY!,
//             secretAccessKey: process.env.AWS_SECRET_KEY!
//         },
//         region: 'ap-northeast-2',
//     });

//     try {
//         // 기존 DB 연결 사용
//         const client = await connectDB();
//         console.log('Connected to DocumentDB');

//         const database = client.db(process.env.DB_NAME);
//         const collection = database.collection('sounds'); // 또는 실제 컬렉션 이름

//         // S3 버킷의 모든 이미지 목록 가져오기
//         const listObjectsCommand = new ListObjectsV2Command({
//             Bucket: 'ku-sw-project',
//             Prefix: '', // 필요한 경우 특정 폴더로 제한
//         });

//         const { Contents } = await s3Client.send(listObjectsCommand);
//         const s3Objects = Contents || [];

//         // 데이터베이스의 모든 문서 가져오기
//         const cursor = collection.find({
//             icon_path: { $exists: true },
//             $or: [
//                 { icon_path: "" },
//                 { icon_path: null },
//                 { icon_path: { $exists: false } }
//             ]
//         });

//         // 각 문서 업데이트
//         for await (const doc of cursor) {
//             // 문서의 키워드나 audio_group을 기반으로 매칭되는 S3 이미지 찾기
//             const matchingImage = s3Objects.find(obj => {
//                 const key = obj.Key?.toLowerCase() || '';
//                 const keywords = doc.keywords.map((k: string) => k.toLowerCase());
//                 const audioGroup = doc.audio_group.toLowerCase();
                
//                 return keywords.some((keyword: string) => 
//                     key.includes(keyword.toLowerCase()) ||
//                     key.includes(audioGroup.toLowerCase())
//                 );
//             });

//             if (matchingImage && matchingImage.Key) {
//                 const imageUrl = `https://ku-sw-project.s3.ap-northeast-2.amazonaws.com/${matchingImage.Key}`;
                
//                 // 문서 업데이트
//                 await collection.updateOne(
//                     { _id: doc._id },
//                     { $set: { icon_path: imageUrl } }
//                 );
                
//                 console.log(`Updated document for ${doc.audio_group} with URL: ${imageUrl}`);
//             } else {
//                 console.log(`No matching image found for ${doc.audio_group}`);
//             }
//         }

//         console.log('Update complete');
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }