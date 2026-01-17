import { TabSource } from "../enums/TabSourceEnum.ts";
export interface TabCreateDTO {
  url: string;
  comment: string;
  source: TabSource;
}
