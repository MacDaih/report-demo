
/**
 * Parse string from camelCase to snake_case
 * @param {string} str 
 */
const strSanitizer = (str) => {
    return str.replace(/[A-Z]/g, res => `_${res.toLowerCase()}`);
};

/**
 * Sanitize and format report for webservice
 * @param {Object} arr 
 * @param {Object} fltr 
 * @return {Object}
 */
function sanitizeObject(arr, fltr) {
    if (Array.isArray(arr) && arr.length > 0) {
        arr.map(a => {
            Object.keys(a).map(k => {
                subFilter(a, k, fltr);
                sanitizeKey(a,k);
                if (typeof a[k] === 'object') {
                    if (Array.isArray(a[k]) && a[k].length > 0) {
                        a[k].map(t => Object.keys(t).map(o => {
                            subFilter(t, o, fltr);
                            sanitizeKey(t,o);
                            if (Array.isArray(t[o])) {
                                t[o].map(m => {
                                    console.log(m);
                                    if (typeof m === 'object') {
                                        Object.keys(m).map(p => {
                                            subFilter(m, p, fltr);
                                            sanitizeKey(m,p);
                                        });
                                    }
                                });
                            }
                        }));
                    } else {
                        Object.keys(a[k]).map(l => {
                            subFilter(a[k], l, fltr);
                            sanitizeKey(a[k], l);
                        });
                    }
                }
            });
        });
        return arr;
    }
    return
}

/**
 * Filters for unwanted datas
 * @param {Object} obj 
 * @param {string} key 
 * @param {Object} fltr 
 */
function subFilter(obj, key, fltr) {
    if (fltr[key]) {
        delete obj[key];
    }
    return obj;
}

/**
 * Replace camelCase to snake_case
 * keys in object / array
 * @param {Object} obj 
 * @param {string} key
 */
function sanitizeKey(obj,key) {
    const saneKey = strSanitizer(key);
    if (obj[key] && key !== saneKey) {
        Object.defineProperty(obj, saneKey,
            Object.getOwnPropertyDescriptor(obj, key));
        delete obj[key];
    }
    return obj;
}

const sanitizer = {
    sanitizeObject
}

module.exports = sanitizer;