import _sources from "./sources.json";
import type { SourceID, Source } from "./types";

export const sources = _sources as Record<SourceID, Source>;
export default sources;
