import { ImagePlot, type NDT } from "@diamondlightsource/davidia";
import Box from "@mui/material/Box";
import ndarray from "ndarray";
import { useSpectroscopyData, type RGBColour } from "./useSpectroscopyData";

type RGBColor = "red" | "green" | "blue" | "gray";

function toNDT(matrix: (number | null)[][], colour: RGBColor): NDT {
  if (!matrix?.length || !matrix[0]?.length) {
    return EMPTY_NDT; // skip invalid input
  }
  const height = matrix.length;
  const width = matrix[0].length;

  // Flatten and filter out nulls for normalisation
  const flat = matrix.flat();
  const valid = flat.filter((v): v is number => v !== null && !isNaN(v));

  // Avoid crashes when no valid values
  const min = valid.length ? Math.min(...valid) : 0;
  const max = valid.length ? Math.max(...valid) : 1;
  const scale = max > min ? 255 / (max - min) : 1;

  const rgb = new Uint8Array(width * height * 3);

  for (let i = 0; i < flat.length; i++) {
    const v = flat[i];
    let scaled = 0;
    if (v !== null && !isNaN(v)) {
      scaled = Math.round((v - min) * scale);
    } // else stays 0 (black)

    switch (colour) {
      case "red":
        rgb[i * 3] = scaled;
        break;
      case "green":
        rgb[i * 3 + 1] = scaled;
        break;
      case "blue":
        rgb[i * 3 + 2] = scaled;
        break;
      case "gray":
        rgb[i * 3] = scaled;
        rgb[i * 3 + 1] = scaled;
        rgb[i * 3 + 2] = scaled;
        break;
    }
  }

  return ndarray(rgb, [height, width, 3]) as NDT;
}
/** Placeholder empty gray dataset */
const EMPTY_NDT = toNDT([[0]], "gray");

/** Return type of `/api/data/map` */
interface MapResponse {
  values: (number | null)[][];
}

async function fetchMap(filepath: string, datapath: string, colour: RGBColour) {
  const url = `/api/data/map?filepath=${encodeURIComponent(filepath)}&datapath=${encodeURIComponent(datapath)}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(resp.statusText);
  const mapResponse: MapResponse = await resp.json();
  return toNDT(mapResponse.values, colour);
}

function RawSpectroscopyData() {
  const { data } = useSpectroscopyData(fetchMap);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          sm: "1fr",
          md: "1fr 1fr 1fr",
        },
        gap: 3,
        flexGrow: 1,
      }}
    >
      <ImagePlot
        aspect="auto"
        plotConfig={{
          title: "Red channel",
        }}
        customToolbarChildren={null}
        values={data.red || EMPTY_NDT}
      />

      <ImagePlot
        aspect="auto"
        plotConfig={{
          title: "Green channel",
        }}
        customToolbarChildren={null}
        values={data.green || EMPTY_NDT}
      />

      <ImagePlot
        aspect="auto"
        plotConfig={{
          title: "Blue channel",
        }}
        customToolbarChildren={null}
        values={data.blue || EMPTY_NDT}
      />
    </Box>
  );
}

export default RawSpectroscopyData;
