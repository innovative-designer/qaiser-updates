interface PdfViewerFrameProps {
  src: string;
  title: string;
}

export function PdfViewerFrame({ src, title }: PdfViewerFrameProps) {
  return (
    <iframe
      title={title}
      src={src}
      className="bg-background block h-[calc(100vh-9.75rem)] min-h-[28rem] w-full rounded-[calc(var(--radius-card)-4px)] border"
    />
  );
}
