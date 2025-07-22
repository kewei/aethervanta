#[cfg_attr(mobile, tauri::mobile_entry_point)]
mod sdr_barn;
use crate::sdr_barn::dev_connect::{upload_sdr_config};
use crate::sdr_barn::list_sdrs::list_sdrs;
use crate::sdr_barn::sdr_state::{SdrStore, SdrConfigStore};

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
      
      Ok(())
    })
    .manage(SdrStore::default())
    .manage(SdrConfigStore::default())
    .invoke_handler(tauri::generate_handler![
      list_sdrs,
      upload_sdr_config,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
