
export interface FileStages {
    name: string;
    minutes: number;
}

export interface Stage extends FileStages {
    time: number;
    color: string;
}

export interface FileData {
    activity: string;
    stages: Stage[]
    totalTime: number
}

