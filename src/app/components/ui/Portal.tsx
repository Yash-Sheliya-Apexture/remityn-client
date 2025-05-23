// app/components/ui/Portal.tsx
"use client";

import { useEffect, useState, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  selector?: string;
}

const Portal: React.FC<PortalProps> = ({ children, selector = "#portal-root" }) => {
  const [mounted, setMounted] = useState(false);
  const portalNodeRef = useRef<Element | null>(null);

  useEffect(() => {
    const node = document.querySelector(selector);
    if (node) {
      portalNodeRef.current = node;
    } else {
      console.warn(`Portal target element with selector "${selector}" not found.`);
      // Fallback: create and append to body if not found
      // This is optional, but can prevent errors if #portal-root is missing
      let fallbackNode = document.getElementById("default-portal-fallback");
      if (!fallbackNode) {
        fallbackNode = document.createElement('div');
        fallbackNode.setAttribute('id', 'default-portal-fallback');
        document.body.appendChild(fallbackNode);
      }
      portalNodeRef.current = fallbackNode;
    }
    setMounted(true);

    // Optional: cleanup fallback if it was created and is empty by this specific portal instance
    // This part is more complex for shared fallbacks and can be omitted for simplicity.
    return () => {
      // If we created a fallback and it's empty, maybe remove it.
      // However, multiple Portal instances might use the same fallback.
      // For now, we don't remove the fallback.
    };

  }, [selector]);

  if (!mounted || !portalNodeRef.current) {
    return null;
  }

  return createPortal(children, portalNodeRef.current);
};

export default Portal;