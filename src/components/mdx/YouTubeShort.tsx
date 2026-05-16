import { useState } from "react";
import { Box } from "@mui/material";

type Props = {
  videoId: string;
};

export default function YouTubeShort({ videoId }: Props) {
  const [playing, setPlaying] = useState(false);
  const width = 240;

  return (
    <Box
      onClick={() => !playing && setPlaying(true)}
      sx={{
        position: "relative",
        width,
        aspectRatio: "9 / 16",
        bgcolor: "#000",
        borderRadius: 1,
        overflow: "hidden",
        cursor: playing ? "default" : "pointer",
        my: 2,
      }}
    >
      {playing ? (
        <Box
          component="iframe"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title="YouTube short"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      ) : (
        <>
          <Box
            component="img"
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(0,0,0,0.25)",
              transition: "background 150ms",
              "&:hover": { bgcolor: "rgba(0,0,0,0.4)" },
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.95)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pl: "4px",
                fontSize: 20,
                color: "#000",
              }}
            >
              ▶
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
