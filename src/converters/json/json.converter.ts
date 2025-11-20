import { IConverter } from "@/converters/types";
import { decode, encode } from "@toon-format/toon";

export class JsonConverter implements IConverter {
  /**
   * Convert JSON → TOON
   */
  async toToon(input: unknown): Promise<any> {
    let data: any;

    // Parse input safely
    try {
      if (typeof input === "string") {
        data = JSON.parse(input);
      } else {
        data = input;
      }
    } catch (err) {
      throw new Error("Invalid JSON: unable to parse input.");
    }

    try {
      // Convert to TOON format
      return encode(data);
    } catch (err: any) {
      throw new Error(`Failed to convert JSON → TOON: ${err.message}`);
    }
  }

  /**
   * Convert TOON → JSON
   */
  async fromToon(input: any): Promise<any> {
    try {
      const obj = decode(input);
      return JSON.stringify(obj, null, 2);
    } catch (err: any) {
      throw new Error(`Failed to convert TOON → JSON: ${err.message}`);
    }
  }
}
