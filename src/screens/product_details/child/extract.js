import ProductJsonConfig from "config/product_details_detail_config.json";
import * as Api from "shared/services";
import Helper from "shared/helper";
import { GetMetaDataInfo } from "shared/common";
import Support from "shared/support";

var fn = {};

const MapItems = [
    { navpropname: "", uicomponent: "product", expand: "MainImage,MainImageTwo", exclude: ['MainImage','MainImageTwo'], func: Support.AddOrUpdateProduct }
,    { navpropname: "PType", uicomponent: "producttypeptype", expand: "PType", exclude: [], func: Support.AddOrUpdateProductType }
,    { navpropname: "ODetails", uicomponent: "otherdetailsodetails", expand: "ODetails", exclude: [], func: Support.AddOrUpdateOtherDetails }
]

const FetchProductInfo = async () => {
    let item = {};
    return new Promise(async (resolve) => {
        const keyItems = Object.keys(ProductJsonConfig);
        keyItems.forEach(elm => {
            let items = [];
            for (let prop of ProductJsonConfig[elm]) {
                items.push({ ...prop, value: null });
            }
            item[elm] = items;
        });
        return resolve(item);
    });
}

const FetchProductDetails = async (productId, enums) => {

    return new Promise(async (resolve) => {
        let item = {}, backItem = {}, tmp;

        const keyItems = Object.keys(ProductJsonConfig);

        keyItems.forEach(elm => {
            let items = [];
            for (let prop of ProductJsonConfig[elm]) {
                items.push({ ...prop, value: null });
            }
            item[elm] = items;
        });

        if (productId) {
            global.Busy(true);
            // Get Product Details
            const $expand = MapItems.map(x => x.expand).join(",");
            let rslt = await Api.GetProductSingle(productId, `$expand=${$expand}`);
            if (rslt.status) {

                const product = rslt.values;

                for (let i = 0; i < MapItems.length; i++) {

                    const source = MapItems[i].navpropname;
                    const target = MapItems[i].uicomponent;

                    const sourceObj = Helper.IsNullValue(source) ? product : product[source];

                    for (let prop in sourceObj) {
                        const tItem = item[target].find((x) => x.key === prop);
                        if (tItem && !Helper.IsNullValue(sourceObj[prop])) {

                            let _nValue = null;
                            if (tItem.type === 'dropdown') {
                                const { Values } = enums.find((z) => z.Name === tItem.source);
                                const _value = Values.find((m) => m[tItem.contentId] === sourceObj[prop] || m[tItem.valueId] === sourceObj[prop]) || {};
                                _nValue = _value[tItem.valueId];

                                if (!Helper.IsNullValue(_nValue) && item[tItem.mapitem]) {
                                    item[tItem.mapitem].forEach(x => x.editable = false);
                                }

                            } else if (tItem.type === 'date') {
                                let tmpDate = sourceObj[prop].split('T');
                                _nValue = tmpDate[0];
                            } else {
                                _nValue = sourceObj[prop];
                            }

                            item[target].find((x) => x.key === prop).value = _nValue;

                        }
                    }

                }

                // Main Image
                if (product.MainImage) {
                    tmp = {};
                    ['DocData', 
                        'DocId', 
                        'DocType', 
                        'DocName', 
                        'DocPath', 
                        'DocDescription', 
                        'DocExt'
                    ].forEach((x) => {
                        tmp[x] = product.MainImage[x]
                    });

                    if (tmp.DocId > 0) {
                        rslt = await Api.GetDocumentSingleMedia(tmp.DocId, true);
                        if (rslt.status) tmp['DocData'] = rslt.values;
                    }
                    item['product'].find((x) => x.key === "MainImage").value = tmp;
                }
                // Main Image
                if (product.MainImageTwo) {
                    tmp = {};
                    ['DocData', 
                        'DocId', 
                        'DocType', 
                        'DocName', 
                        'DocPath', 
                        'DocDescription', 
                        'DocExt'
                    ].forEach((x) => {
                        tmp[x] = product.MainImageTwo[x]
                    });

                    if (tmp.DocId > 0) {
                        rslt = await Api.GetDocumentSingleMedia(tmp.DocId, true);
                        if (rslt.status) tmp['DocData'] = rslt.values;
                    }
                    item['product'].find((x) => x.key === "MainImageTwo").value = tmp;
                }

            }

            let bItem = {};
            keyItems.forEach(elm => {
                let bItems = [];
                for (let prop of item[elm]) {
                    bItems.push({ key: prop.key, value: prop.value });
                }
                bItem[elm] = bItems;
            });

            backItem = Helper.CloneObject(bItem);

            global.Busy(false);
        }

        return resolve({ row: item, backRow: backItem });
    });
}

const FetchDropdownItems = async (items) => {
    return new Promise(async (resolve) => {

        global.Busy(true);

        // Default get all enums list items
        let res = await GetMetaDataInfo();

        const enums = res.filter((x) => x.Type === 'Enum') || [];
        const otherItems = items.filter(x => enums.findIndex(z => z.Name === x) === -1);

        // Extract the required entities as enums
        for (let i = 0; i < otherItems.length; i++) {
            const item = otherItems[i];
            await Api.GetEntityInfo(item + 's').then(rslt => {
                if (rslt.status) {
                    enums.push({ Name: item, Type: 'Entity', Values: rslt.values });
                }
            });
        }

        global.Busy(false);
        return resolve(enums);
    });
};

const Extract = async (productId) => {

    return new Promise(async (resolve) => {

        let rtnObj = { row: {}, options: [], backRow: {} };

        await FetchProductInfo().then(async (item) => {

            rtnObj.row = Helper.CloneObject(item);

            let items = [];
            Object.values(item).forEach(elm => {
                items = [...items, ...elm];
            });
            items = Helper.RemoveDuplicatesFromArray(items.filter(x => x.type === "dropdown").map(z => z.source));

            await FetchDropdownItems(items).then(async (enums) => {
                rtnObj.options = Helper.CloneObject(enums);
                if (!Helper.IsNullValue(productId)) {
                    await FetchProductDetails(productId, enums).then(({ row, backRow }) => {
                        rtnObj.row = Helper.CloneObject(row);
                        rtnObj.backRow = Helper.CloneObject(backRow);
                    })
                }
            });
        });

        return resolve(rtnObj);
    });
}

export { Extract, MapItems };

