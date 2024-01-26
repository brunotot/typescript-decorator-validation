import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { DemoCodeData } from "../../demo/DemoList";
import { Code } from "../Code";
import RelatedFAQ from "../RelatedFAQ";
import "./index.css";

export type PlaygroundProps = {
  title: string;
  description: ReactNode;
  codeData: DemoCodeData[];
  relatedFAQ: string[];
  children: ReactNode;
};

export default function Playground({
  title,
  description,
  codeData,
  children,
  relatedFAQ = [],
}: PlaygroundProps) {
  const [currentCodeData, setCurrentCodeData] = useState(codeData[0]);
  const [expanded, setExpanded] = useState(true);
  return (
    <Accordion>
      <AccordionSummary
        id={title.toLowerCase().replace(new RegExp(" ", "g"), "-")}
        expandIcon={<ExpandMore />}
      >
        <Typography padding={0}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <Box paddingInline="2rem" paddingBottom="1rem" paddingTop={0}>
          <Typography gutterBottom>{description}</Typography>
          <RelatedFAQ data={relatedFAQ} />
        </Box>
        <Divider />
        <Box className="container">
          <Box display="flex" alignItems="center" justifyContent="center" padding="2rem">
            <Box>{children}</Box>
          </Box>
          <Box className="actions-bar">
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={currentCodeData}
              onChange={(_, value) => value && setCurrentCodeData(value)}
              exclusive
            >
              {codeData.map(codeData => (
                <ToggleButton key={codeData.name} value={codeData}>
                  {codeData.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Button onClick={() => setExpanded(v => !v)}>
              {expanded ? "Hide code" : "Show code"}
            </Button>
          </Box>
          {expanded && <Code code={currentCodeData.code} language={currentCodeData.lang} />}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

/*

<Card>
      <CardContent sx={{ padding: "0 !important" }}>
        <Box display="flex" flexDirection="column" gap="0.25rem">
          <Box padding="1rem">
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            {description}
          </Box>
          <Divider />
          <Box>
            <Box display="flex" alignItems="center" justifyContent="center" padding="2rem">
              <Box>{children}</Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <ToggleButtonGroup
                size="small"
                color="primary"
                value={currentCodeData}
                onChange={(_, value) => value && setCurrentCodeData(value)}
                exclusive
              >
                {codeData.map(codeData => (
                  <ToggleButton key={codeData.name} value={codeData}>
                    {codeData.name}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Button onClick={() => setExpanded(v => !v)}>
                {expanded ? "Hide code" : "Show code"}
              </Button>
            </Box>
            {expanded && <Code code={currentCodeData.code} language={currentCodeData.lang} />}
          </Box>
        </Box>
      </CardContent>
    </Card>

*/
