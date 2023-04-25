import React, { useCallback, useEffect, useState } from 'react';

export default function useClipboard() {
  const [clipboard, setClipboard] = useState<Clipboard | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setClipboard(navigator.clipboard);
    setIsCopied(false);
  }, []);

  const copyToClipboard = useCallback(
    (text: string) => {
      if (!clipboard) return;

      clipboard.writeText(text).then(() => {
        setIsCopied(true);
      });
    },
    [clipboard]
  );

  return {
    copyToClipboard,
    isCopied,
  };
}
