import { Card, CardContent, Stack, Typography, useTheme } from "@mui/material";
import type { ReactNode } from "react";

type StatusCardProps = {
  children: ReactNode;
  title?: string;
  bgColor?: string;
  cardColor?: string;
};

export function StatusCard(props: StatusCardProps) {
  const theme = useTheme();
  const bgColor = props.bgColor
    ? props.bgColor
    : theme.palette.background.paper;
  const cardColor = props.cardColor
    ? props.cardColor
    : theme.palette.text.primary;
  if (props.title) {
    return (
      <Card
        variant="outlined"
        sx={{
          minWidth: 250,
          maxHeight: 200,
          bgcolor: bgColor,
          borderColor: cardColor,
        }}
      >
        <CardContent>
          <Stack spacing={1}>
            <Typography
              variant="body1"
              sx={{
                fontSize: 16,
                fontStyle: "italic",
                fontWeight: "bold",
                color: cardColor,
              }}
            >
              {props.title}
            </Typography>
            {props.children}
          </Stack>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card variant="outlined" sx={{ minWidth: 250, bgColor: bgColor }}>
        <CardContent>{props.children}</CardContent>
      </Card>
    );
  }
}
