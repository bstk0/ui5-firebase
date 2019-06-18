sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ui5-firebase.ui5-firebase.controller.View1", {
		onInit: function () {
			// Get the Firebase Model
			const firebaseModel = this.getView().getModel("firebase");

			// Create a Firestore reference
			const firestore = this.getView().getModel("firebase").getData().firestore;
			// Create a collection reference to the shipments collection
			const collRefShipments = firestore.collection("shipments");

			// Initialize an array for the shipments of the collection as an object
			var oShipments = {
				shipments: []
			};

			// Create and set the created object to the the shipmentModel
			//var shipmentModel = new JSONModel(oShipments);
			var shipmentModel = new sap.ui.model.json.JSONModel(oShipments);
			this.getView().setModel(shipmentModel);

			// Get single set of shipments once
			this.getShipments(collRefShipments);
		},
		getShipments: function (collRefShipments) {
			collRefShipments.get().then(
				function (collection) {
					var shipmentModel = this.getView().getModel();
					var shipmentData = shipmentModel.getData();
					var shipments = collection.docs.map(function (docShipment) {
						return docShipment.data();
					});
					shipmentData.shipments = shipments;
					this.getView().byId("shipmentTable").getBinding("items").refresh();
				}.bind(this));
		}
	});
});