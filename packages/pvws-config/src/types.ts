import { DType } from "@diamondlightsource/cs-web-lib";

type NotConnected = "not connected";
export type RawValue = DType | undefined | NotConnected;
// NOTE - ACHTUNG! DTYPE not exported anymore in newer versions, will need to look at code to figure it out!
