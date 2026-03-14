import { LayoutTemplate, Palette } from 'lucide-react';

import type { PdfTemplateId } from '@/types/pdf-template';

import { InvoiceColorPicker } from './invoice-color-picker';
import { PdfTemplatePicker } from './pdf-template-picker';

interface SidebarDesignProps {
  accentColor: string;
  onAccentColorChange: (color: string) => void;
  pdfTemplateId: PdfTemplateId;
  onTemplateChange: (id: PdfTemplateId) => void;
}

export function SidebarDesign({
  accentColor,
  onAccentColorChange,
  pdfTemplateId,
  onTemplateChange,
}: SidebarDesignProps) {
  return (
    <div className="rounded-(--radius-card) border bg-card p-4 shadow-(--shadow-card)">
      {/* Accent Color section */}
      <div className="mb-2.5 flex items-center gap-2">
        <Palette className="size-3.5 text-muted-foreground" />
        <p className="text-xs font-semibold text-foreground">Accent Color</p>
      </div>
      <InvoiceColorPicker value={accentColor} onChange={onAccentColorChange} />

      {/* Divider */}
      <div className="my-4 h-px bg-border/50" />

      {/* PDF Layout section */}
      <div className="mb-2.5 flex items-center gap-2">
        <LayoutTemplate className="size-3.5 text-muted-foreground" />
        <p className="text-xs font-semibold text-foreground">PDF Layout</p>
      </div>
      <PdfTemplatePicker value={pdfTemplateId} onChange={onTemplateChange} />
    </div>
  );
}
