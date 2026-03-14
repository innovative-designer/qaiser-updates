'use client';

import { useRef, useState } from 'react';

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
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 justify-start">
        {INVOICE_COLOR_PALETTES.flat().map((swatch) => {
          const isActive = value === swatch.hex;
          return (
            <button
              key={swatch.hex}
              type="button"
              title={swatch.label}
              aria-label={`${swatch.label} accent color`}
              onClick={() => handlePresetClick(swatch.hex)}
              className={cn(
                'size-6 shrink-0 cursor-pointer rounded-full border-2 transition-all hover:scale-110',
                isActive
                  ? 'border-foreground ring-2 ring-foreground/20 scale-110'
                  : 'border-transparent hover:border-border'
              )}
              style={{ backgroundColor: swatch.hex }}
            />
          );
        })}

        {/* Custom color trigger — inline with swatches */}
        {!showCustom ? (
          <button
            type="button"
            onClick={handleCustomTrigger}
            title="Custom color"
            aria-label="Pick a custom color"
            className="size-6 shrink-0 cursor-pointer rounded-full border-2 border-dashed border-border/60 transition-all hover:scale-110 hover:border-border"
            style={{
              background:
                'conic-gradient(from 0deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0, #f44336)',
            }}
          />
        ) : (
          <button
            type="button"
            title="Pick from color wheel"
            aria-label="Open color picker"
            onClick={() => nativeRef.current?.click()}
            className={cn(
              'relative size-6 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 transition-all hover:scale-110',
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
        )}
      </div>

      {/* Hex input — only when custom is active */}
      {showCustom && (
        <div className="flex items-center gap-2">
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
                'h-7 w-full rounded-md border bg-transparent pl-6 pr-2.5 font-mono text-xs tracking-wider text-foreground outline-none transition-colors',
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
  );
}
