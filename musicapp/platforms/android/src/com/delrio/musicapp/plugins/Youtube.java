package com.delrio.musicapp.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;

public class Youtube extends CordovaPlugin {
	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		if (action.equals("search")) {
			try {
				String artist = args.getString(0);
				search(artist);
				callbackContext.success("Artist searched with success!");
				return true;
			} catch (Exception e) {
				callbackContext.error(e.getMessage());
			}
		} else {
			callbackContext.error("Invalid action!");
		}
		return false;
	}

	private void search(String artist) {
		Context context = cordova.getActivity();
		Intent intent = new Intent(Intent.ACTION_VIEW,
				Uri.parse("https://www.youtube.com/results?search_query="
						+ artist));
		intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		context.startActivity(intent);
	}
}
