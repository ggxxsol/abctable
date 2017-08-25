class Information {
    name: string;   // 测点名称
    length: string; // 距开口距离m
    deep: string;   // 安装深度m
    first: string; // 初始预压(Mpa
    now: string;   // 当前应力值
    changeRate: string; // 增幅变化率(%)
    nowChange: string;  // 当日变化量(±MPa)
    max: string;        // 最大值(MPa)
    maxTime: string;    // 最大值时刻
    warningLevel: string; // 预警级别
}

export class StrainData {
    area: string;            // 采掘面
    detectTime: string;     // 监 测 日 期:
    reportTime: string;     // 上报日期:
    length: string;         // 设计长度（m）
    remainLength: string;   // 剩余长度（m）
    todayLength: string;    // 本日进尺（m）
    monthLength: string;    // 本月累计进尺（m）
    totalLength: string;    // 总进尺（m）
    datas: Information[];   // 监测数据统计信息
}
