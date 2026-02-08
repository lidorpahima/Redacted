"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils";

const TYPE_DELAY = 120;
const DELETE_DELAY = 60;
const PAUSE_AFTER_WORD = 1800;

interface TypewriterTextProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
}

/**
 * Types each word character by character, then deletes it and moves to the next.
 * Repeats in a loop for a "type → pause → delete" effect.
 */
export function TypewriterText({
  words,
  className,
  cursorClassName,
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex % words.length];

  useEffect(() => {
    if (!currentWord) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (text.length < currentWord.length) {
            setText(currentWord.slice(0, text.length + 1));
          } else {
            setIsDeleting(true);
          }
        } else {
          if (text.length > 0) {
            setText(text.slice(0, -1));
          } else {
            setIsDeleting(false);
            setWordIndex((i) => i + 1);
          }
        }
      },
      isDeleting ? DELETE_DELAY : text.length === currentWord.length ? PAUSE_AFTER_WORD : TYPE_DELAY
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, currentWord]);

  return (
    <span className={cn("inline-block", className)}>
      {text}
      <span
        className={cn(
          "inline-block w-0.5 h-[0.9em] align-middle ml-0.5 bg-current animate-pulse",
          cursorClassName
        )}
        aria-hidden
      />
    </span>
  );
}
