'use client';

import { useRef, useState } from 'react';
import { Palette } from 'lucide-react';

import { INVOICE_COLOR_PALETTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ALL_PRESET_HEXES: Set<string> = new Set(INVOICE_COLOR_PALETTES.flat().map((s) => s.hex));

function isValidHex(v: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(v);
}

interface InvoiceColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function InvoiceColorPicker({ value, onChange }: InvoiceColorPickerProps) {
  const isCustom = !ALL_PRESET_HEXES.has(value);
  const [showCustom, setShowCustom] = useState(isCustom);
  const [hexDraft, setHexDraft] = useState(isCustom ? value : '');
  const nativeRef = useRef<HTMLInputElement>(null);

  function handlePresetClick(hex: string) {
    onChange(hex);
    setShowCustom(false);
    setHexDraft('');
  }

  function handleCustomTrigger() {
    setShowCustom(true);
    if (!hexDraft && !isCustom) {
      setHexDraft(value);
    }
  }

  function handleHexInput(raw: string) {
    const v = raw.startsWith('#') ? raw : `#${raw}`;
    setHexDraft(v);
    if (isValidHex(v)) {
      onChange(v);
    }
  }

  function handleNativeChange(hex: string) {
    setHexDraft(hex);
    onChange(hex);
  }

  return (
    <div className="rounded-(--radius-card) border bg-card p-5 shadow-(--shadow-card)">
      <div className="mb-3 flex items-center gap-2">
        <Palette className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold text-foreground">Accent Color</p>
      </div>

      <div className="space-y-2.5">
        {INVOICE_COLOR_PALETTES.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-between gap-2">
            {row.map((swatch) => {
              const isActive = value === swatch.hex;

              return (
                <button
                  key={swatch.hex}
                  type="button"
                  title={swatch.label}
                  aria-label={`${swatch.label} accent color`}
                  onClick={() => handlePresetClick(swatch.hex)}
                  className={cn(
                    'size-8 shrink-0 cursor-pointer rounded-full border-2 transition-all hover:scale-110',
                    isActive
                      ? 'border-foreground ring-2 ring-foreground/20 scale-110'
                      : 'border-transparent hover:border-border'
                  )}
                  style={{ backgroundColor: swatch.hex }}
                />
              );
            })}
          </div>
        ))}

        {/* Divider */}
        <div className="flex items-center gap-2 pt-0.5">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground/50">
            or
          </span>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        {/* Custom color row */}
        {!showCustom ? (
          <button
            type="button"
            onClick={handleCustomTrigger}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1 transition-colors hover:bg-muted/40"
          >
            {/* Rainbow gradient circle */}
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-transparent"
              style={{
                background:
                  'conic-gradient(from 0deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0, #f44336)',
              }}
            >
              <span className="size-5 rounded-full bg-card" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">Custom color…</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            {/* Color preview / native picker trigger */}
            <button
              type="button"
              title="Pick from color wheel"
              aria-label="Open color picker"
              onClick={() => nativeRef.current?.click()}
              className={cn(
                'relative size-8 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 transition-all hover:scale-110',
                isCustom
                  ? 'border-foreground ring-2 ring-foreground/20 scale-110'
                  : 'border-border'
              )}
              style={{
                background: isValidHex(hexDraft)
                  ? hexDraft
                  : 'conic-gradient(from 0deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0, #f44336)',
              }}
            >
              {/* Hidden native color input */}
              <input
                ref={nativeRef}
                type="color"
                value={isValidHex(hexDraft) ? hexDraft : value}
                onChange={(e) => handleNativeChange(e.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
                tabIndex={-1}
                aria-hidden="true"
              />
            </button>

            {/* Hex text input */}
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-muted-foreground/50">
                #
              </span>
              <input
                type="text"
                value={(hexDraft || value).replace(/^#/, '')}
                onChange={(e) => handleHexInput(e.target.value.slice(0, 6))}
                placeholder="4266c4"
                maxLength={6}
                spellCheck={false}
                autoComplete="off"
                className={cn(
                  'h-8 w-full rounded-md border bg-transparent pl-6 pr-2.5 font-mono text-xs tracking-wider text-foreground outline-none transition-colors',
                  'placeholder:text-muted-foreground/30',
                  'focus:border-primary/35 focus:ring-2 focus:ring-(--focus-ring)',
                  isValidHex(hexDraft) || !hexDraft
                    ? 'border-border/60'
                    : 'border-destructive/50'
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
