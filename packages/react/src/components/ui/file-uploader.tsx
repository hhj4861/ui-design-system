'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface FileUploaderProps {
  label: string;
  icon?: string;
  onFileSelect: (file: File) => void;
  onSampleDownload?: () => void;
  accept?: string;
  loadedCount?: number;
  className?: string;
}

function FileUploader({
  label,
  icon = '📁',
  onFileSelect,
  onSampleDownload,
  accept = '.xlsx,.xls,.csv',
  loadedCount,
  className,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className={cn('mb-4', className)}>
      {/* 라벨 + 샘플 버튼 */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-[var(--foreground,#2d251f)]">
          {icon} {label}
        </span>
        {onSampleDownload && (
          <button
            onClick={onSampleDownload}
            className="text-xs px-3 py-1.5 bg-[var(--card,#faf8f5)] border border-[var(--border,#e8e2d9)] rounded-lg text-[var(--secondary,#5c4a3d)] hover:border-[var(--primary,#c9a87c)] transition-colors"
          >
            샘플
          </button>
        )}
      </div>

      {/* 드래그앤드롭 영역 */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all',
          isDragging
            ? 'border-[var(--primary,#c9a87c)] bg-[var(--card,#faf8f5)]'
            : 'border-[var(--border,#e8e2d9)] hover:border-[var(--primary,#c9a87c)] hover:bg-[var(--card,#faf8f5)]',
          loadedCount && loadedCount > 0 && 'border-green-400 bg-green-50'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {loadedCount && loadedCount > 0 ? (
          <div className="text-green-600 max-w-full overflow-hidden">
            <div className="text-2xl mb-1">✓</div>
            <div className="text-sm font-medium truncate px-2">{fileName}</div>
            <div className="text-xs text-green-500 mt-1">{loadedCount}건 로드됨</div>
          </div>
        ) : (
          <div className="text-[var(--muted,#8b7355)]">
            <div className="text-2xl mb-2 opacity-50">📁</div>
            <div className="text-sm">클릭하거나 파일을 드래그하세요</div>
            <div className="text-xs mt-1 opacity-70">xlsx, xls, csv 지원</div>
          </div>
        )}
      </div>
    </div>
  );
}

FileUploader.displayName = 'FileUploader';

export { FileUploader };
export type { FileUploaderProps };
