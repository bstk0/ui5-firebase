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
			//this.getShipments(collRefShipments);

			// Get realtime shipments
			this.getRealTimeShipments(collRefShipments);
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
		},
		getRealTimeShipments: function (collRefShipments) {
			// The onSnapshot the keep the data up to date in case of added, 
			// modified or removed data in the Firestor database
			collRefShipments.onSnapshot(function (snapshot) {
				// Get the shipment model
				var shipmentModel = this.getView().getModel();
				// Get all the shipments
				var shipmentData = shipmentModel.getData();

				// Get the current added/modified/removed document (shipment) 
				// of the collection (shipments)
				snapshot.docChanges().forEach(function (change) {
					// set id (to know which document is modifed and
					// replace it on change.Type == modified) 
					// and data of firebase document
					var oShipment = change.doc.data();
					oShipment.id = change.doc.id;

					// Added document (shipment) add to arrat
					if (change.type === "added") {
						shipmentData.shipments.push(oShipment);
					}
					// Modified document (find its index and change current doc 
					// with the updated version)
					else if (change.type === "modified") {
						var index = shipmentData.shipments.map(function (shipment) {
							return shipment.id;
						}).indexOf(oShipment.id);
						shipmentData.shipments[index] = oShipment;
					}
					// Removed document (find index and remove it from the shipments array)
					else if (change.type === "removed") {
						var index = shipmentData.shipments.map(function (shipment) {
							return shipment.id;
						}).indexOf(oShipment.id);
						shipmentData.shipments.splice(index, 1);
					}
				});

				//Refresh your model and the binding of the items in the table
				this.getView().getModel().refresh(true);
				this.getView().byId("shipmentTable").getBinding("items").refresh();
			}.bind(this));
		}
	});
});