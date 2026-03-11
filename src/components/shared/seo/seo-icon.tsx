import {
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  Clock3,
  FileCheck,
  Globe2,
  MessageCircleMore,
  Palette,
  ReceiptText,
  Smartphone,
  WalletCards,
  Zap,
} from 'lucide-react';

import type { SeoIconName } from '@/types/seo-page';

const iconMap = {
  briefcase: BriefcaseBusiness,
  camera: Camera,
  'check-circle': CheckCircle2,
  clock: Clock3,
  'file-check': FileCheck,
  globe: Globe2,
  'message-circle': MessageCircleMore,
  palette: Palette,
  receipt: ReceiptText,
  smartphone: Smartphone,
  wallet: WalletCards,
  zap: Zap,
} as const;

interface SeoIconProps {
  name: SeoIconName;
  className?: string;
}

export function SeoIcon({ name, className }: SeoIconProps) {
  const Icon = iconMap[name];

  return <Icon className={className} />;
}
