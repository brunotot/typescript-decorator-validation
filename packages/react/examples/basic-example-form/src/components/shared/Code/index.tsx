import { ContentCopy, DoneAll } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./index.css";

export type CodeProps = {
  code: string;
  showCopyButton?: boolean;
  showLineNumbers?: boolean;
  language?: string;
  style?: any;
};

export function Code({
  code,
  style = {},
  language = "typescript",
  showLineNumbers = true,
  showCopyButton = true,
}: CodeProps) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div
      className="syntax-highlighter"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...style }}
    >
      {hovered && showCopyButton && (
        <IconButton
          onClick={handleCopy}
          color="primary"
          sx={{ position: "absolute", top: "0.25rem", right: "0.25rem" }}
        >
          {copied ? <DoneAll /> : <ContentCopy />}
        </IconButton>
      )}
      <SyntaxHighlighter
        showLineNumbers={showLineNumbers}
        customStyle={{ padding: "1rem" }}
        language={language}
        style={theme}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
