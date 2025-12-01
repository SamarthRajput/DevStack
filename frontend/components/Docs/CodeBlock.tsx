"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {filename && (
        <div className="bg-muted border border-border rounded-t-lg px-4 py-2 text-sm text-muted-foreground font-mono">
          {filename}
        </div>
      )}
      <div className={`relative ${filename ? 'rounded-b-lg' : 'rounded-lg'} overflow-hidden`}>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <pre className="bg-muted border border-border p-4 overflow-x-auto text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
