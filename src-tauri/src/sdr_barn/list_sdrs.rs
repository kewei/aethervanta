use std::collections::HashMap;
use tauri::{AppHandle, Manager};
use tauri::State;
use soapysdr;
use soapysdr::Args;
use log;
use strum::IntoEnumIterator;
use crate::sdr_barn::dev_list_names::DriverName;
use crate::sdr_barn::sdr_state::SdrStore;
   

#[tauri::command]
pub async fn list_sdrs(app: AppHandle) 
                -> Result<Vec<HashMap<String, String>>, String> {
    // Lists all available SDR devices using SoapySDR.
    // Returns a vector of HashMaps containing device information.
    // # Errors
    // Returns an error message if the device enumeration fails or if there is an issue
    // retrieving device information.
    let mut sdrs: Vec<HashMap<String, String>> = Vec::new();
    let mut num_devices: HashMap<String, u32> = HashMap::new();
    for dev in DriverName::iter() {
        num_devices.insert(dev.to_string(), 0);
    }

    for dev in soapysdr::enumerate("").unwrap() {
        if let Some(driver) = dev.get("driver") {
            
            match driver {
                "rtlsdr" => {
                    let driver_name = DriverName::RtlSdr.to_string();
                    let dev_info = get_device_info(&driver_name, driver, &dev, &mut num_devices, app.clone())
                        .map_err(|e| format!("Error getting device info: {}", e))?;
                    
                    let n = num_devices.get(driver).unwrap_or(&0);
                    
                    sdrs.push(dev_info);
                },
                "bladerf" => {
                    let driver_name = DriverName::BladeRf.to_string();
                    let dev_info = get_device_info(&driver_name, driver, &dev, &mut num_devices, app.clone())
                        .map_err(|e| format!("Error getting device info: {}", e))?;

                    sdrs.push(dev_info);
                },
                "hackrf" => {
                    let driver_name = DriverName::HackRf.to_string();
                    let dev_info = get_device_info(&driver_name, driver, &dev, &mut num_devices, app.clone())
                        .map_err(|e| format!("Error getting device info: {}", e))?;
                    
                    sdrs.push(dev_info);
                },
                "limesdr" => {
                    let driver_name = DriverName::LimeSdr.to_string();
                    let dev_info = get_device_info(&driver_name, driver, &dev, &mut num_devices, app.clone())
                        .map_err(|e| format!("Error getting device info: {}", e))?;
                    
                    sdrs.push(dev_info);
                },
                "plutosdr" => {
                    let driver_name = DriverName::PlutoSdr.to_string();
                    let dev_info = get_device_info(&driver_name, driver, &dev, &mut num_devices, app.clone())
                        .map_err(|e| format!("Error getting device info: {}", e))?;
                    
                    sdrs.push(dev_info);
                },
                "airspy" => {
                    let driver_name = DriverName::AirSpy.to_string();
                    let dev_info = get_device_info(&driver_name, driver, &dev, &mut num_devices, app.clone())
                        .map_err(|e| format!("Error getting device info: {}", e))?;
                    
                    sdrs.push(dev_info);
                },
                _ => {
                    continue; // Skip unknown drivers
                },
            }
            
        }
    }
    Ok(sdrs)   
}


fn get_device_info(driver_name: &str, driver: &str, dev: &Args, num_devices: &mut HashMap<String, u32>, app: AppHandle) -> Result<HashMap<String, String>, String> {
    // Retrieves device information for a given driver and device name.
    // # Arguments
    // * `driver_name` - The name of the driver.
    // * `driver` - The driver string.
    // * `dev` - The device arguments.
    // * `num_devices` - A mutable reference to a HashMap tracking the number of devices per driver.
    // # Returns
    // A Result containing a HashMap with device information or an error message.
    let store_sdr: State<SdrStore> = app.state();
    let mut sdr_store = store_sdr.devices.lock().unwrap();

    let n = num_devices.get(driver_name).unwrap_or(&0);
    let mut dev_info: HashMap<String, String> = HashMap::new();
    let mut label = dev.get("label").unwrap_or(&driver_name).to_string();
    label = label.split(" OEM").collect::<Vec<&str>>()[0].to_string();
    if let Some(serial) = dev.get("serial") {
        label += serial;
    }
    else {
        label += format!("0000000{}", n+1).as_str();
    }
    
    if n == &0 {
        let mut info = HashMap::new();
        info.insert(label.clone(), dev.to_string());
        sdr_store.insert(driver_name.to_string(), info);
    } else {
        let mut existing_info = sdr_store.get_mut(driver_name).unwrap();
        existing_info.insert(label.clone(), dev.to_string());
    }

    num_devices.insert(driver_name.to_string(), n + 1);
    dev_info.insert(driver.to_string(), label);
    Ok(dev_info)
}