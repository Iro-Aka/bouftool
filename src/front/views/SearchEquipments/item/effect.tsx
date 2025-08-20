export type EquipmentEffectLabelProps = {
  effect?: string;
};

export const EquipmentEffectLabel = ({ effect }: EquipmentEffectLabelProps) => {
  if (!effect) {
    return null;
  }
  const pattern = /\[#(\w+)\s+([^\]]+)\]/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = pattern.exec(effect);

  while (match !== null) {
    if (match.index > lastIndex) {
      parts.push(<span>{effect.slice(lastIndex, match.index)}</span>);
    }
    const [, type, value] = match;
    parts.push(
      <img key={parts.length} src={`wakfu/${type}/${value}.png`} alt={`${type} ${value}`} width={16} height={16} />,
    );
    lastIndex = pattern.lastIndex;
    match = pattern.exec(effect);
  }

  if (lastIndex < effect.length) {
    parts.push(<span key={parts.length}>{effect.slice(lastIndex)}</span>);
  }

  return parts;
};
