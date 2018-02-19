sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		ordersModel: function() {
			var ordModel = new JSONModel();
			var models = {
				"Orders": [],
				"Products": [],
				"Categories": [],
				"Employees": [],
				"Alphabetical_list_of_products": []
			};
			var modelNames = Object.keys(models);
			for (var i = 0; i < modelNames.length; i++) {
				var aurl = "/northwind/V2/Northwind/Northwind.svc/" + modelNames[i] + "?$top=1&$format=json";

				var keys;
				$.ajax({
					url: aurl,
					method: "get",
					async:false,
					success: function(data) {
						data = data.d[0];
						keys = Object.keys(data);
						keys = $.grep(keys, function(v) {
							if (typeof data[v] != "object") {
								return true;
							}
						});
						var modKey = modelNames[i];
						models[modKey] = keys;
					},
					error: function(status) {
						console.log("error in Orders");
					}
				});
			}
			ordModel.setData(models);
			return ordModel;
		}

	};
});