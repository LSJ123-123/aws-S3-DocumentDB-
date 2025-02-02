// app/api/search-keywords/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get('keyword');

        if (!keyword) {
            return NextResponse.json(
                { error: '검색어를 입력해주세요.' },
                { status: 400 }
            );
        }

        const db = await connectDB();
        const collection = db.collection('audio_groups');  // DocumentDB 컬렉션 이름

        const results = await collection.find({
            keywords: {
                //$regex: keyword,
                //$options: 'i'  // case-insensitive 검색
		$regex: `\\b${keyword}\\b`,  // 단어 경계를 사용한 정확한 일치
	        $options: 'i'  // 대소문자 구분 없음
            }
        }).toArray();

        return NextResponse.json({ images: results });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: '검색 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
