
export enum AppStatus {
  IDLE,
  IMAGE_SELECTED,
  ANALYZING,
  SUCCESS,
  ERROR,
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface AnalysisResult {
  text: string;
  sources: GroundingSource[];
}
