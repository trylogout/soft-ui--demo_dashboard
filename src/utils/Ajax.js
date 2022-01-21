'use strict';

import store from '@/store/index.js';
import Helpers from '@/utils/Helpers.js';

let router, errorHandler;

const BaseUrl = process.env.VUE_APP_API_URL;

let ajaxErrorHandler = (...args) => {
    console.log('Alert', ...args);
}

let isRefreshing = {mut: false};

class Ajax {

    static init($router, $errorHandler = ajaxErrorHandler) {
        router = $router;
        errorHandler = $errorHandler;
    }

    static conditionalBuildQs(url, qs) {
        if (qs != null) {
            let out = [];
            for (let [k, v] of Object.entries(qs)) {
                if (v !== null && v !== undefined) {
                    if (Array.isArray(v)) {
                        v = JSON.stringify(v);
                    }
                    out.push(`${k}=${v}`);
                }
            }
            if (out.length !== 0) {
                return url + '?' + out.join('&');
            }
        }
        return url;
    }

    static async json({
                          url,
                          method = 'GET',
                          data = null,
                          qs = null,
                          refresh = true,
                          auth = true,
                          contentType = "json",
                          raw = false,
                          file = null,
                          filename = null,
                          stdHeaders = true
                      } = {}) {
        url = Ajax.conditionalBuildQs(url, qs);
        let options = {
            method,
            headers: {},
            cache: 'no-cache'
        };
        if (stdHeaders) {
            options.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        if (auth) {
            let {token} = store.getters.session;
            options.headers['Authorization'] = token;
        }
        if (method !== 'GET' && data !== null && !raw) {
            options['body'] = JSON.stringify(data);
        }
        if (raw) {
            options['body'] = data;
        }
        if (file) {
            let formData = new FormData();
            let fn = filename === null ? 'file' : filename;
            formData.append(fn, file);
            if (data != null) {
                formData.append('args', JSON.stringify(data));
            }
            options['body'] = formData;
        }
        try {
            let response = await fetch(`${BaseUrl}${url}`, options);
            let webStatus = response.status;
            if (webStatus > 499) {
                switch (webStatus) {
                    case 502:
                        errorHandler('error', {
                            message: 'Application server is under maintenance. Please contact administrator',
                            title: 'App Server Error'
                        });
                        break;
                    case 503:
                        errorHandler('error', {
                            message: 'Application server is not responding. Please contact administrator',
                            title: 'Web Server Error'
                        });
                        break;
                    case 525:
                    case 526:
                        errorHandler('error', {
                            message: 'Invalid SSL certificate. Please contact Administrator',
                            title: 'Web Server Error'
                        });
                        break;
                    default:
                        errorHandler('error', {
                            message: 'Ooops, some unknown critical error occured. Don\'t panik!',
                            title: 'Web Server Error'
                        });
                        break;
                }
                return [webStatus, null];
            }
            let out = await Ajax.getContent(response, contentType);
            if (refresh) {
                if (out.code === 401 || out.code === 410) {
                    await Ajax.refresh();
                    let {token} = store.getters.session;
                    options.headers['Authorization'] = token;
                    response = await fetch(`${BaseUrl}${url}`, options);
                    out = await Ajax.getContent(response, contentType);
                }
            }
            return [null, out];
        } catch (err) {
            if (err.message === 'NetworkError when attempting to fetch resource.' || err.message === 'Failed to fetch') {
                errorHandler('error', {
                    message: 'Web server is not responding. Please contact administrator',
                    title: 'Web Server Error'
                });
            }
            return [err, null];
        }
    }

    static redirectToLogin() {
        if (router.currentRoute.name === 'Signin') {
            return false;
        }
        let fp = router.currentRoute.fullPath;
        let from = encodeURI(fp);
        router.push({name: 'Signin', query: {from}});
    }

    static async refresh() {
        //simultaneous refreshes can occur. Wait until done, otherwise tokens would be corrupted
        await Helpers.waitForUntil(100, 1500, isRefreshing);
        isRefreshing.mut = true;
        let {refresh} = store.getters.session;
        if (refresh === null) {
            return Ajax.redirectToLogin();
        }
        console.log('REDIRECTING')
        try {
            let resp = await fetch(`${BaseUrl}/api/v1/oauth/refresh`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({refresh})
            });
            let status = resp.status;
            if (status === 401) {
                isRefreshing.mut = false;
                return Ajax.redirectToLogin();
            }
            let out = await resp.json();
            let token = out.body.token;
            refresh = out.body.refresh;
            store.dispatch('setSession', {token, refresh});
            isRefreshing.mut = false;
            return null;
        } catch (err) {
            isRefreshing.mut = false;
            Ajax.redirectToLogin();
            return err;
        }
    }

    static async post(options = {}) {
        return Ajax.json({...options, method: 'POST'});
    }

    static async get(options = {}) {
        return Ajax.json({...options, method: 'GET'});
    }

    static async put(options = {}) {
        return Ajax.json({...options, method: 'PUT'});
    }

    static async delete(options = {}) {
        return Ajax.json({...options, method: 'DELETE'});
    }

    static getContent(res, contentType) {
        switch (contentType) {
            case "blob":
                return res.blob();
            default:
                return res.json();
        }
    }

    static async cmd(f) {
        try {
            let [err, data] = await f();
            return [err, data];
        } catch (err) {
            console.log('catch', err);
            return [err, null];
        }
    }

    static async xcmd(f) {
        try {
            let [, data] = await f();
            return data;
        } catch (err) {
            return null;
        }
    }

    static async login({email, password, grecaptchaToken}) {
        return Ajax.cmd(() => {
            return Ajax.post({
                url: '/api/v1/oauth/login',
                data: {login: email, password, token: grecaptchaToken},
                refresh: false,
                auth: false
            });
        });
    }

    static async me() {
        return Ajax.cmd(() => {
            return Ajax.get({url: '/api/v1/users/me'});
        });
    }

    static async snop() {
        return Ajax.cmd(() => {
            return Ajax.get({url: '/api/v1/oauth/snop'});
        });
    }

    static async logout() {
        return Ajax.cmd(() => {
            return Ajax.post({url: '/api/v1/oauth/logout'});
        });
    }

}

export default Ajax;