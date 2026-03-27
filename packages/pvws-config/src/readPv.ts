import { useConnection, type DType } from "@diamondlightsource/cs-web-lib";
import { type RawValue } from "./types";

export function ReadPvRawValue({
  label,
  pv,
}: {
  label: string;
  pv: string;
}): RawValue {
  const [_effectivePvName, connected, _readonly, latestValue] = useConnection(
    label,
    pv,
  );
  const rawValue: RawValue = connected ? latestValue : "not connected";
  return rawValue;
}

export function parseStringPv(value: RawValue | string | number): string {
  let displayValue: string;
  if (value != "not connected" && value != undefined) {
    const stringVal =
      typeof (value as DType)["getStringValue"] === "function"
        ? (value as DType).getStringValue()
        : value;
    displayValue = stringVal ? stringVal.toString() : "undefined";
  } else if (value === "not connected") {
    displayValue = "not connected";
  } else {
    displayValue = "undefined";
  }
  return displayValue;
}

export function parseNumericPV(
  value: RawValue | string | number,
  decimals?: number,
  scaleFactor?: number,
): string {
  let displayValue: string;
  const decimalsToUse = decimals ? decimals : 2;
  const scaleToUse = scaleFactor ? scaleFactor : 1;
  if (value != "not connected" && value != undefined) {
    if (typeof (value as DType)["getStringValue"] === "function") {
      const numValue = (value as DType).getDoubleValue();
      if (!numValue) {
        displayValue = "undefined";
      } else {
        displayValue = (numValue * scaleToUse).toFixed(decimalsToUse);
      }
    } else {
      displayValue = value.toString();
    }
  } else if (value === "not connected") {
    displayValue = "not connected";
  } else {
    displayValue = "undefined";
  }
  return displayValue;
}
