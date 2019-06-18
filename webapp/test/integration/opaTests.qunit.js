/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ui5-firebase/ui5-firebase/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});