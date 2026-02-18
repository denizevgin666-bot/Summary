import { extension_settings } from "../../../extensions.js";
import { saveSettingsDebounced } from "../../../../script.js";

// ⚠️ Must match your GitHub repo name exactly
const extensionName = "Summary";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

const defaultSettings = {
    enabled: false
};

function loadSettings() {
    extension_settings[extensionName] = extension_settings[extensionName] || {};
    if (Object.keys(extension_settings[extensionName]).length === 0) {
        Object.assign(extension_settings[extensionName], defaultSettings);
    }
    $("#story_scribe_enabled").prop("checked", extension_settings[extensionName].enabled);
}

function onEnabledChange(event) {
    const value = Boolean($(event.target).prop("checked"));
    extension_settings[extensionName].enabled = value;
    saveSettingsDebounced();
    console.log(`[${extensionName}] Enabled: ${value}`);
}

function onSummarizeNow() {
    const isEnabled = extension_settings[extensionName].enabled;
    if (!isEnabled) {
        toastr.warning("Story Scribe is disabled. Enable it first!", "📖 Story Scribe");
        return;
    }
    toastr.info("Summarize Now clicked! Summarization coming in the next stage.", "📖 Story Scribe");
    console.log(`[${extensionName}] Summarize Now button clicked`);
}

jQuery(async () => {
    console.log(`[${extensionName}] Loading...`);

    try {
        const settingsHtml = await $.get(`${extensionFolderPath}/example.html`);
        $("#extensions_settings2").append(settingsHtml);

        // Bind checkbox
        $("#story_scribe_enabled").on("input", onEnabledChange);

        // Bind button
        $("#story_scribe_summarize_now").on("click", onSummarizeNow);

        // Load saved settings
        loadSettings();

        console.log(`[${extensionName}] ✅ Loaded successfully`);
    } catch (error) {
        console.error(`[${extensionName}] ❌ Failed to load:`, error);
    }
});
        // Load saved settings
        loadSettings();

        console.log(`[${extensionName}] ✅ Loaded successfully`);
    } catch (error) {
        console.error(`[${extensionName}] ❌ Failed to load:`, error);
    }
});
