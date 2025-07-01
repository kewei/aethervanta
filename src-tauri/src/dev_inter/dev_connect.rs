use soapysdr;
use soapysdr::enumerate;
use soapysdr::Device;
use soapysdr::Args;   

#[tauri::command]
pub async fn connect_device() -> Result<String, String> {
    // Create a Args instance with default values
    let mut args = Args::new();
    args.set("driver", "remote"); // Set the driver to "remote"

    for dev in soapysdr::enumerate("").unwrap() {
        println!("Found device: {}", dev);
    }
    Ok("".to_string())   
    // // Attempt to open the device
    // match Device::new(args) {
    //     Ok(device) => {
    //         // Successfully opened the device, return it
    //         Ok(device)
    //     }
    //     Err(e) => {
    //         // Failed to open the device, return an error message
    //         Err(format!("Failed to connect to device: {}", e))
    //     }
    // }
}