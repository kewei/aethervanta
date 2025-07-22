use std::collections::HashMap;
use std::sync::Mutex;

#[derive(Default)]
pub struct SdrStore {
    pub devices: Mutex<HashMap<String, HashMap<String, String>>>,
}

#[derive(Default)]
pub struct SdrConfigStore {
    pub config: Mutex<HashMap<String, f64>>,
}