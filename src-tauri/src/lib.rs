#[cfg_attr(mobile, tauri::mobile_entry_point)]
use soapysdr::Args;
mod dev_inter;
use crate::dev_inter::dev_connect::connect_device;

pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      let mut args = Args::new();
      args.set("driver", "rtlsdr");
      for dev in soapysdr::enumerate(args).unwrap() {
        println!("Found device: {}", dev);
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
