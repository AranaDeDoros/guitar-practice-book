import { TabSource } from "../domain/enums/TabSourceEnum";
import { TabDTO } from "../domain/types/TabDTO";

export interface TabRequestDTO {
    source: TabSource;
    tab: TabDTO;
}