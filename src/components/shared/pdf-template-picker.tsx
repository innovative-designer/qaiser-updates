'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LayoutTemplate } from 'lucide-react';

import { PDF_TEMPLATES } from '@/lib/pdf-templates';
import type { PdfTemplateId } from '@/types/pdf-template';
import { cn } from '@/lib/utils';

interface PdfTemplatePickerProps {
  value: PdfTemplateId;
  onChange: (id: PdfTemplateId) => void;
}

export function PdfTemplatePicker({ value, onChange }: PdfTemplatePickerProps) {
  return (
    <div>
      {/* Desktop: 2-col grid, Mobile: horizontal scroll */}
      <div
        className="hidden gap-2 sm:grid sm:grid-cols-2"
        role="radiogroup"
        aria-label="PDF layout"
      >
        {PDF_TEMPLATES.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            id={tpl.id}
            name={tpl.name}
            description={tpl.description}
            previewSrc={tpl.previewSrc}
            selected={value === tpl.id}
            onSelect={onChange}
          />
        ))}
      </div>

      <div
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:hidden"
        role="radiogroup"
        aria-label="PDF layout"
      >
        {PDF_TEMPLATES.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            id={tpl.id}
            name={tpl.name}
            description={tpl.description}
            previewSrc={tpl.previewSrc}
            selected={value === tpl.id}
            onSelect={onChange}
            mobile
          />
        ))}
      </div>
    </div>
  );
}

interface TemplateCardProps {
  id: PdfTemplateId;
  name: string;
  description: string;
  previewSrc: string;
  selected: boolean;
  onSelect: (id: PdfTemplateId) => void;
  mobile?: boolean;
}

function TemplateCard({
  id,
  name,
  description,
  previewSrc,
  selected,
  onSelect,
  mobile,
}: TemplateCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(id)}
      className={cn(
        'group flex cursor-pointer flex-col overflow-hidden rounded-lg border-2 bg-muted/30 transition-all hover:bg-muted/50',
        selected
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-transparent hover:border-border',
        mobile ? 'w-[140px] shrink-0 snap-start' : 'w-full',
      )}
    >
      <div className="relative aspect-[210/297] w-full overflow-hidden bg-muted/50">
        {imgError ? (
          <div className="flex size-full items-center justify-center">
            <LayoutTemplate className="size-8 text-muted-foreground/30" />
          </div>
        ) : (
          <Image
            src={previewSrc}
            alt={`Preview of ${name} invoice layout`}
            fill
            sizes={mobile ? '140px' : '(min-width: 640px) 50vw, 140px'}
            className="object-cover object-top"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="px-2 py-0.5">
        <span
          className={cn(
            'text-[11px] font-semibold cursor-help leading-tight',
            selected ? 'text-primary' : 'text-foreground',
          )}
          title={description}
        >
          {name}
        </span>
      </div>
    </button>
  );
}
