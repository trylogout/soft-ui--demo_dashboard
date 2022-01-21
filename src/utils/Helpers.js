class Helpers {

    static get URL_TEMPLATE () {
        return /^http(s)?:\/\/.+/;
    }

    static get SLUG_TEMPLATE () {
        return /^[a-z0-9_-]+$/;
    }

    static get REG_NUMBER () {
        return /[0-9]/gm;
    }

    static get REG_ANY_LOWER () {
        return /\p{Ll}/gmu;
    }

    static get REG_ANY_UPPER () {
        return /\p{Lu}/gmu;
    }

    static isGenericEmail (email) {
        return /.*@.*\..*/.test(email);
    }

    static isValidSlug (slug) {
        return Helpers.SLUG_TEMPLATE.test(slug);
    }

    static nameToSlug (name) {
        if (!name) {
            return null;
        }
        return encodeURI(name
            .toLowerCase()
            .replace(/[\W_]+/g, ' ')
            .replace(/\s\s+/g, ' ')
            .trim()
            .replace(/\s/g, '_'));
    }

    static async delay (ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    static async noLessThan(cb, ms) {
        let [resp] = await Promise.all([cb(), Helpers.delay(ms)]);
        return resp;
    }

    static oneByOne (ms, num, cb) {
        let i = 0;
        let x = setInterval(() => {
            cb(i);
            i += 1;
            if (i >= num) {
                clearInterval(x);
            }
        }, ms)
    }

    //obj is { mut: boolean }; do not desctructure;
    static async waitForUntil (inter, max, obj, changeOnBreak = true) {
        if ({}.hasOwnProperty.call(obj, "mut")) {
            let counter = 0;
            while (obj.mut) {
                await Helpers.delay(inter);
                counter += inter;
                if (counter >= max) {
                    if (changeOnBreak) {
                        obj.mut = false;
                    }
                    break;
                }
            }
        }
    }

    static isNotBlank (str) {
        return typeof(str) === 'string' && str.trim().length > 0;
    }

    static isBlank (str) {
        return typeof(str) !== 'string' || str.trim().length === 0;
    }

    static isDef (x) {
        return x !== null && x !== undefined;
    }

    static copyFlatFieldsInplaceSafe (fields, src, dst = {}) {
        if (src !== null && dst !== null) {
            for (let f of fields) {
                if (Object.prototype.hasOwnProperty.call(src, f)) {
                    dst[f] = src[f];
                }
            }
        }
        return dst;
    }

    static copyFlatFieldsInplace (fields, src, dst = {}) {
        if (src !== null && dst !== null) {
            for (let f of fields) {
                dst[f] = src[f];
            }
        }
        return dst;
    }

    static flatCompareAndGetDiff (fields, src, cpy) {
        let out = {};
        for (let f of fields) {
            if (src[f] !== cpy[f] && Helpers.isDef(src[f])) {
                if (typeof(src[f]) === 'string') {
                    src[f] = src[f].trim();
                }
                out[f] = src[f];
            }
        }
        return out;
    }

    static flatCompare (fields, src, cpy) {
        if (!cpy) {
            return false;
        }
        for (let f of fields) {
            if (src[f] !== cpy[f] && Helpers.isDef(src[f])) {
                if (typeof(src[f]) === 'string') {
                    if (src[f].trim() === cpy[f]) {
                        continue;
                    }
                }
                return true;
            }
        }
        return false;
    }

    static flatCompareUndefined (fields, src, cpy) {
        for (let f of fields) {
            if (Object.prototype.hasOwnProperty.call(src, f)) {
                if (!Object.prototype.hasOwnProperty.call(src, f)) {
                    return true;
                }
                if (src[f] !== cpy[f]) {
                    return true;
                }
            }
        }
        return false;
    }

    static getLanguage () {
        let lang = navigator.language || navigator.userLanguage;
        if (lang === null) {
            return null;
        }
        return lang.split('-')[0];
    }

    static priceI2F (iPrice, currency) {
        return iPrice / currency.units;
    }

    static priceF2I (fPrice, currency) {
        return Math.round(fPrice * currency.units);
    }

    static initBreadcrumbs (c) {
        let tmp = function () {
            return [{ text: this.$t('Breadcrumbs.home'), to: { name: 'Home' }, exact: true }];
        };
        return tmp.call(c);
    }

    static removeFromArray (arr, index) {
        let stop = arr.length - 1;
        while (index < stop) {
            arr[index] = arr[++index];
        }
        arr.pop();
    }

    static arraysMatch (arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    static cpy (a) {
        return JSON.parse(JSON.stringify(a));
    }

    static isSorted (arr, cmp, asc = true) {
        if (arr.length < 2) {
            return true;
        }
        let i = 1, j = 0, len = arr.length, res;
        for (; i < len; i++, j++) {
            res = (cmp(arr[j], arr[i]) < 0);
            if (asc ? !res : res) {
                return false;
            }
        }
        return true;
    }

    static unique(arr) {
        return arr.filter((value, index, self) => { return self.indexOf(value) === index; });
    }

    static keyIsEnter (e) {
        return e.key === 'Enter' || e.keyCode === '13';
    }

    static randInt(min = 0, max = 1000000) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    static humanizedJoin (arr, self) {
        let len = arr.length - 1;
        if (len < 0) {
            return "";
        }
        if (len === 1) {
            return arr[0];
        }
        return arr.slice(0, len).join(', ') + ' ' + self.$t('Generic.or') + ' ' + arr[len];
    }

    static objectFromArray (arr, element = {}) {
        let out = {};
        for (let key of arr) {
            out[key] = Helpers.cpy(element);
        }
        return out;
    }

    static sortKeys (o, c) {
        let keys = Object.keys(o);
        keys.sort(c);
        let out = {};
        for (let key of keys) {
            out[key] = o[key];
        }
        return out;
    }

    static filterKeys (o, c) {
        let keys = Object.keys(o).filter(c);
        let out = {};
        for (let key of keys) {
            out[key] = o[key];
        }
        return out;
    }

    static getByteSize (str) {
        return new Blob([str]).size;
    }

    static loadScript (url) {
        return new Promise(resolve => {
            let s = document.createElement('script');
            s.setAttribute('src', url);
            s.onload = function () {
                resolve();
            };
            document.head.appendChild(s);
        });
    }

    static filterJoin (obj, { fields = ['firstName', 'middleName', 'lastName'], joiner = ' ', loadingText = "..." } = {}) {
        if (obj === null) {
            return loadingText;
        }
        return fields.map(name => obj[name]).filter(x => x !== undefined && x !== null && x !== '').join(joiner);
    }

}

export default Helpers;