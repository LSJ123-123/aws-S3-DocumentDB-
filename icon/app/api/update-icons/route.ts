// // app/api/update-icons/route.ts
// // 사용 안 함.....
// import { NextResponse } from 'next/server';
// import { updateIconPaths } from '@/app/lib/updateIconPaths';

// export async function POST() {
//     try {
//         await updateIconPaths();
//         return NextResponse.json({ message: 'Icon paths updated successfully' });
//     } catch (error) {
//         console.error('Error updating icon paths:', error);
//         return NextResponse.json(
//             { error: 'Failed to update icon paths' },
//             { status: 500 }
//         );
//     }
// }