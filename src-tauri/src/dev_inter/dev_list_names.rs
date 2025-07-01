pub struct DeviceListNames {
    pub names: Vec<String>,
}

pub enum DriverName {
    Remote,
    RtlSdr,
    BladeRf,
    HackRf,
    LimeSdr,
    PlutoSdr,
    AirSpy,
    Unknown,
}