package com.ridvanaltun.keepalive

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import android.content.SharedPreferences

class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        if (intent?.action == Intent.ACTION_BOOT_COMPLETED) {
            val prefs: SharedPreferences = context.getSharedPreferences("AppPreferences", Context.MODE_PRIVATE)
            val isAutoStartEnabled = prefs.getBoolean("AutoStartEnabled", false)

            if (isAutoStartEnabled) {
                Log.d("BootReceiver", "Auto-start is enabled. Launching app...")
                val launchIntent = context.packageManager.getLaunchIntentForPackage(context.packageName)
                launchIntent?.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(launchIntent)
            } else {
                Log.d("BootReceiver", "Auto-start is disabled. Skipping launch.")
            }
        }
    }
}
