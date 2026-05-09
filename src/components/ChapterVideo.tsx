import { Box } from "@mui/material";

export default function ChapterVideo({ videoId }: { videoId: string }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%",
        bgcolor: "#000",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <Box
        component="iframe"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="Chapter video"
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
    </Box>
  );
}
