import { TabSource } from "../enums/TabSourceEnum";
import { TabDTO } from "./TabDTO";

export interface TabRequestDTO {
    source: TabSource;
    tab: TabDTO;
}