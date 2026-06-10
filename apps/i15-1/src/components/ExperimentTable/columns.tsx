import type { MRT_ColumnDef } from "material-react-table";
import { FlatExperiment } from "./flatTypes";

export const columns: MRT_ColumnDef<FlatExperiment>[] = [
  { header: "Experiment Name", accessorKey: "name" },
  { header: "Sample Name", accessorKey: "sampleName" },
  { header: "Composition", accessorKey: "composition" },
  { header: "Density", accessorKey: "density" },
  { header: "Beam Energy (keV)", accessorKey: "beam_energy" },
  { header: "Beam Size (μm)", accessorKey: "focused_beam_size" },
  { header: "Time per PDF (sec)", accessorKey: "time_per_pdf" },
];
