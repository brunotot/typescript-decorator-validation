import { List, ListItem, Typography } from "@mui/material";
import "./index.css?inline";

export type RelatedFAQProps = {
  data: string[];
};

export default function RelatedFAQ({ data = [] }: RelatedFAQProps) {
  if (data.length === 0) {
    return <></>;
  }

  return (
    <>
      <Typography gutterBottom variant="button" color="text.secondary">
        Related FAQ:
      </Typography>
      <List sx={{ listStyleType: "disc", marginLeft: 4 }}>
        {data.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "list-item" }}>
            <Typography variant="body2" color="text.secondary">
              {item}
            </Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
}
