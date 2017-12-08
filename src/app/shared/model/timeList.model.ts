export class OfflineTime {
    offlineStartTime: string;
    offlineEndTime: string;
}
export class DndTime {
    dndStartTime: string;
    dndEndTime: string;
}
export class TimeList {

    sessionStartTime: string;
    sessionEndTime: string;
    offlineTimeLists: OfflineTime[];
    dndTimeList:DndTime[];

}

export class Session {
    sessionTimeList: string
}
