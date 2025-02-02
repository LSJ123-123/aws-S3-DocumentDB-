// app/components/ImageSearch.tsx
'use client';
import { useState } from 'react';

interface ImageData {
    key: string;
    url: string;
}

interface AudioData {
    audio_group: string;
    keywords: string[];
    icon_path: string;
}

export default function ImageSearch() {
    const [keyword, setKeyword] = useState('');
    const [keywordImages, setKeywordImages] = useState<AudioData[]>([]);

    const [folder, setFolder] = useState('');
    const [filename, setFilename] = useState('');
    const [images, setImages] = useState<ImageData[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleS3Search = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!folder.trim() || !filename.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({ folder, filename });
            const res = await fetch(`/api/search-images?${params}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || '검색 중 오류가 발생했습니다');
            }

            setImages(data.images);

            if (data.images.length === 0) {
                setError('이미지를 찾을 수 없습니다.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '검색 중 오류가 발생했습니다');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeywordSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!keyword.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/search-keywords?keyword=${encodeURIComponent(keyword)}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || '검색 중 오류가 발생했습니다');
            }

            setKeywordImages(data.images);

            if (data.images.length === 0) {
                setError('검색 결과가 없습니다.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '검색 중 오류가 발생했습니다');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">S3 이미지 검색</h2>
                <form onSubmit={handleS3Search} className="mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={folder}
                            onChange={(e) => setFolder(e.target.value)}
                            placeholder="폴더 이름을 입력하세요 (예: 1_Human sounds)"
                            className="flex-1 p-2 border rounded"
                        />
                        <input
                            type="text"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                            placeholder="파일 이름을 입력하세요 (예: Cheering.png)"
                            className="flex-1 p-2 border rounded"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            {isLoading ? '검색 중...' : '검색'}
                        </button>
                    </div>
                </form>

                <div className="grid gap-4">
                    {images.map((image) => (
                        <div key={image.key} className="border rounded p-4">
                            <p className="mb-2 text-sm text-gray-600">{image.key}</p>
                            <img src={image.url} alt={image.key} className="max-w-full h-auto" />
                        </div>
                    ))}
                </div>
            </div>

            <hr className="my-8" />

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">키워드 검색</h2>
                <form onSubmit={handleKeywordSearch} className="mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="키워드를 입력하세요 (예: Clapping)"
                            className="flex-1 p-2 border rounded"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            {isLoading ? '검색 중...' : '검색'}
                        </button>
                    </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {keywordImages.map((image, index) => (
                        <div key={index} className="border rounded p-4">
                            <p className="mb-2 text-sm text-gray-600">{image.audio_group}</p>
                            <img
                                src={image.icon_path}
                                alt={image.audio_group}
                                className="max-w-full h-auto"
                            />
                            <div className="mt-2 text-sm text-gray-500">
                                키워드: {image.keywords.join(', ')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                </div>
            )}
        </div>
    );
}