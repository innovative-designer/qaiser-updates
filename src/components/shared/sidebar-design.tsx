import { LayoutTemplate, Palette, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { PdfTemplateId } from '@/types/pdf-template';
import { InvoiceColorPicker } from './invoice-color-picker';
import { PdfTemplatePicker } from './pdf-template-picker';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  collapsible = false,
}: SidebarDesignProps & { collapsible?: boolean }) {
  const [open, setOpen] = useState(!collapsible);

  if (collapsible) {
    // Mobile: Collapsible Card
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between cursor-pointer select-none px-2 py-1" onClick={() => setOpen((v) => !v)}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Palette className="size-4 text-muted-foreground" />
            <LayoutTemplate className="size-4 text-muted-foreground" />
            <span>Design (Color & Template)</span>
          </CardTitle>
          <Button variant="ghost" size="icon-sm" aria-label={open ? 'Collapse design options' : 'Expand design options'} tabIndex={-1} type="button">
            {open ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
          </Button>
        </CardHeader>
        {open && (
          <CardContent className="pt-0 pb-2 px-2">
            <div className="mb-3">
              <div className="mb-2 flex items-center gap-2">
                <Palette className="size-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">Accent Color</span>
              </div>
              <InvoiceColorPicker value={accentColor} onChange={onAccentColorChange} />
            </div>
            <div className="mb-2 flex items-center gap-2 mt-4">
              <LayoutTemplate className="size-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-foreground">PDF Layout</span>
            </div>
            <PdfTemplatePicker value={pdfTemplateId} onChange={onTemplateChange} />
          </CardContent>
        )}
      </Card>
    );
  }

  // Desktop: Always visible, non-collapsible
  return (
    <div className="rounded-(--radius-card) border bg-card p-4 shadow-(--shadow-card)">
      <div className="mb-2.5 flex items-center gap-2">
        <Palette className="size-3.5 text-muted-foreground" />
        <p className="text-xs font-semibold text-foreground">Accent Color</p>
      </div>
      <InvoiceColorPicker value={accentColor} onChange={onAccentColorChange} />
      <div className="my-4 h-px bg-border/50" />
      <div className="mb-2.5 flex items-center gap-2">
        <LayoutTemplate className="size-3.5 text-muted-foreground" />
        <p className="text-xs font-semibold text-foreground">PDF Layout</p>
      </div>
      <PdfTemplatePicker value={pdfTemplateId} onChange={onTemplateChange} />
    </div>
  );
}
