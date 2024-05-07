import {
	
		
 	
		
 	 	
		
 	
		
 	 	 	 	 	 							// For Nested APIs / Join tables			
	 	 	 	
		
 	
		
 	
		
 	 	
	
 	
		
 	   SetOtherDetailsSingle, SetOrderItemSingle, SetProductTypeSingle, SetProductSingle, SetProductOtherImagesJoin, SetProductPriceSingle, SetSupplierSingle, SetShipmentItemSingle, SetDocumentSingleMedia, SetProductOnBoardingSingle
} from "./services";
import Helper from "shared/helper";

var fn = {};

const defaultError = "Something went wrong while processing request!";

		
    
 




fn.AddOrUpdateOtherDetails = async (input, enums, excludesItems) => {
const numberItems_OtherDetails = [  'OtherDetailsId','Size' ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (x.type === 'dropdown') {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m[x.valueId]) === parseInt(x.value))[x.valueId];
                    } else  if( x.key === 'ManufacturingDate' ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else  if (numberItems_OtherDetails.indexOf(x.key) > -1) {
                            if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetOtherDetailsSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
 




fn.AddOrUpdateOrderItem = async (input, enums, excludesItems) => {
const numberItems_OrderItem = [  'Order_item_id','Order_item_quantity','Order_item_price','RMA_number' ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
 if( x.key === 'RMA_issued_date' ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else  if (numberItems_OrderItem.indexOf(x.key) > -1) {
                            if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetOrderItemSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
 




fn.AddOrUpdateProductType = async (input, enums, excludesItems) => {
const numberItems_ProductType = [  'PtId' ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
  if (numberItems_ProductType.indexOf(x.key) > -1) {
                            if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetProductTypeSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
 




fn.AddOrUpdateProduct = async (input, enums, excludesItems) => {
const numberItems_Product = [  'Product_id','Size','Weight' ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (x.type === 'dropdown') {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m[x.valueId]) === parseInt(x.value))[x.valueId];
                    } else   if (numberItems_Product.indexOf(x.key) > -1) {
                            if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetProductSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}


fn.AddOrUpdateProduct = async (input, excludesItems) => {
const numberItems_Product = [  'Product_id','Size','Weight' ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        global.Busy(true);
        let excludes = excludesItems || [];

        const tmp = Object.values(input);
        tmp.filter((x) => x.value).map((x) => {
            if (excludes.indexOf(x.key) === -1) {
                if (numberItems_Product.indexOf(x.key) > -1) {
                    if (x.value) data[x.key] = parseFloat(x.value);
                } else {
                    data[x.key] = x.value;
                }
            }
        });

        let rslt = await SetProductOtherImagesJoin(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
 




fn.AddOrUpdateProductPrice = async (input, enums, excludesItems) => {
const numberItems_ProductPrice = [  'PpId','Price' ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
  if (numberItems_ProductPrice.indexOf(x.key) > -1) {
                            if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetProductPriceSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
 




fn.AddOrUpdateSupplier = async (input, enums, excludesItems) => {
const numberItems_Supplier = [  'SId' ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
  if (numberItems_Supplier.indexOf(x.key) > -1) {
                            if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetSupplierSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
 




fn.AddOrUpdateShipmentItem = async (input, enums, excludesItems) => {
const numberItems_ShipmentItem = [  'Shipment_item_id','Order_item_id' ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
  if (numberItems_ShipmentItem.indexOf(x.key) > -1) {
                            if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetShipmentItemSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		

fn.AddOrUpdateDocument = async (input) => {
    return new Promise(async (resolve) => {
        let status = false, id = null;
        const { 
        DocId,
        DocType,
        DocName,
        DocPath,
        DocDescription,
        DocExt
        , DocData
        } = input.value;
        global.Busy(true);
        let rslt = await SetDocumentSingleMedia(DocData, { 
        DocType,
        DocName,
        DocPath,
        DocDescription,
        DocExt
        , DocId: DocId });
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
};

		
    
 




fn.AddOrUpdateProductOnBoarding = async (input, enums, excludesItems) => {
const numberItems_ProductOnBoarding = [  'PbId','LastStep' ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (x.type === 'dropdown') {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m[x.valueId]) === parseInt(x.value))[x.valueId];
                    } else   if (numberItems_ProductOnBoarding.indexOf(x.key) > -1) {
                            if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetProductOnBoardingSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}




export default fn;