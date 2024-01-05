import { ReactNode } from "react";
import Playground from "../shared/Playground";

export type DemoCodeData = { lang: string; name: string; code: string };

export type DemoCodeProps = {
  title: string;
  description: ReactNode;
  children: ReactNode;
  codeData: DemoCodeData[];
  relatedFAQ: string[];
};

export type DemoListProps = {
  data: DemoCodeProps[];
};

export default function DemoList({ data }: DemoListProps) {
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.50rem", marginBlock: "2rem" }}
      >
        {data.map(({ children, ...props }) => (
          <Playground key={props.title} {...props}>
            {children}
          </Playground>
        ))}
      </div>
    </>
  );
}
