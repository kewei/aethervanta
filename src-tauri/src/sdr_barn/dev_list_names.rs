use std::{collections::HashMap};
use std::fmt::{Display, Formatter};
use serde::{Deserialize, Serialize};
use strum::IntoEnumIterator;
use strum_macros::EnumIter;

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, Hash, EnumIter)]
pub enum DriverName {
    RtlSdr,
    BladeRf,
    HackRf,
    LimeSdr,
    PlutoSdr,
    AirSpy,
    Unknown,
}

impl Display for DriverName {
    fn fmt(&self, fmt: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            DriverName::RtlSdr => write!(fmt, "rtlsdr"),
            DriverName::BladeRf => write!(fmt, "bladerf"),
            DriverName::HackRf => write!(fmt, "hackrf"),
            DriverName::LimeSdr => write!(fmt, "limesdr"),
            DriverName::PlutoSdr => write!(fmt, "plutosdr"),
            DriverName::AirSpy => write!(fmt, "airspy"),
            DriverName::Unknown => write!(fmt, "Unknown"),
        }
    }
}