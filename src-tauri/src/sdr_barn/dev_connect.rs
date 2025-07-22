use std::arch::naked_asm;
use std::collections::HashMap;
use std::thread;
use tauri::State;
use soapysdr::{self, RxStream, TxStream};
use soapysdr::enumerate;
use soapysdr::{Device, Direction, Args};
use log;
use crate::sdr_barn::sdr_state::{SdrStore, SdrConfigStore};
use std::time;
use std::default;

#[tauri::command]
pub async fn upload_sdr_config(
    device: HashMap<String, String>,
    frequency: f64,
    sample_rate: f64,
    gain: f64,
    sdr_store: State<'_, SdrStore>,
    sdr_config: State<'_, SdrConfigStore>,
) -> Result<(), String> {
    log::info!("Uploading SDR configuration for device: {:?}", device);
    
    let dev = get_device(device, sdr_store.clone(), sdr_config.clone())
        .map_err(|e| format!("Failed to get device: {}", e))?;

    let n_ch_rx = dev.num_channels(Direction::Rx).map_err(|e| format!("Failed to get number of RX channels: {}", e))?;
    let n_ch_tx = dev.num_channels(Direction::Tx).map_err(|e| format!("Failed to get number of TX channels: {}", e))?;

    // Deactivate all RX and TX streams before setting configurations
    log::info!("Deactivating all RX and TX streams");
    let l_ch_rx = (0..n_ch_rx).collect::<Vec<usize>>();
    let mut rx_stream: RxStream<f32> = dev.rx_stream(&l_ch_rx).map_err(|e| format!("Failed to create RX stream: {}", e))?;
    rx_stream.deactivate(Some(10000)).map_err(|e| format!("Failed to deactivate RX stream: {}", e))?;

    let l_ch_tx = (0..n_ch_tx).collect::<Vec<usize>>();
    let mut tx_stream: TxStream<f32> = dev.tx_stream(&l_ch_tx).map_err(|e| format!("Failed to create TX stream: {}", e))?;
    tx_stream.deactivate(Some(10000)).map_err(|e| format!("Failed to deactivate TX stream: {}", e))?;

    let mut sdr_config = sdr_config.config.lock().unwrap();

    log::info!("setting sampling frequency to {} MHz", sample_rate/(10.0f64.powi(6)));
    dev.set_sample_rate(Direction::Rx, 0, sample_rate)
        .map_err(|e| format!("Failed to set sample rate: {}", e))?;
    thread::sleep(time::Duration::from_millis(300));
    dev.set_sample_rate(Direction::Rx, 0, sample_rate)
        .map_err(|e| format!("Failed to set sample rate: {}", e))?;
    sdr_config.insert("sample_rate".to_string(), sample_rate);
    
    log::info!("setting frequency to {} MHz", frequency/(10.0f64.powi(6)));
    dev.set_frequency(Direction::Rx, 0, frequency, "")
        .map_err(|e| format!("Failed to set frequency: {}", e))?;
    sdr_config.insert("frequency".to_string(), frequency);

    log::info!("setting gain to {} dB", gain);
    if let Ok(a) = dev.has_gain_mode(Direction::Rx, 0) && a {
        dev.set_gain_mode(Direction::Rx, 0, true);
    }
    dev.set_gain(Direction::Rx, 0, gain)
        .map_err(|e| format!("Failed to set gain: {}", e))?;
    sdr_config.insert("gain".to_string(), gain);

    Ok(())
}

#[tauri::command]
pub async fn start_stream(
    device: HashMap<String, String>, 
    chnl: usize,
    sdr_store: State<'_, SdrStore>,
    sdr_config: State<'_, SdrConfigStore>,
) -> Result<String, String> {

    let dev = get_device(device, sdr_store, sdr_config)
        .map_err(|e| format!("Failed to get device: {}", e))?;

    if let Ok(rx_str) = dev.rx_stream::<f64>(&[chnl]) {
        log::info!("MTU: {:?}", rx_str.mtu());
        // rx_str.active();
    }

    Ok("".to_string())   
    
}

// #[tauri::command]
// pub async fn stop_stream(dev: &Device) -> Result<String, String> {

// }


fn get_device(
    device: HashMap<String, String>, 
    sdr_store: State<'_, SdrStore>, 
    sdr_config: State<'_, SdrConfigStore>,
) -> Result<Device, String> {
    let mut driver = "";
    let mut info = "";
    for key in device.keys() {
        driver = key;
        info = device.get(key).map(|s| s.as_str()).unwrap_or("");
    }
    let sdr_store = sdr_store.devices.lock().unwrap();
    let mut all_info = "";
    if let Some(sdr_driver) = sdr_store.get(driver) 
        && let Some(long_args) = sdr_driver.get(info) 
    {
        all_info = long_args.as_str();
    }

    log::info!("Driver: {}", driver);
    log::info!("All info: {}", all_info);
    let mut dev = Device::new(Args::new())
        .map_err(|e| format!("Failed to create device: {}", e))?;
    if all_info.is_empty() {
        dev = Device::new(format!("driver={}", driver).as_str())
        .map_err(|e| format!("Failed to open device: {}", e))?;
    } else {
        dev = Device::new(all_info)
        .map_err(|e| format!("Failed to open device: {}", e))?;
    }
    Ok(dev)
}