export type valueof<T> = T[keyof T];

export namespace Impl {
    function GoogleImaProxy(adManager?: google.ima.AdsLoader, adManagerInfo?: ConvivaAdListenerInfo, adAnalytics?: AdAnalytics, Conviva?: Conviva): void;
}

export namespace AdProxyMonitor {
    function initConvivaDropIn(adManager?: google.ima.AdsLoader, adManagerInfo?: ConvivaAdListenerInfo, adAnalytics?: AdAnalytics, Conviva?: Conviva): AdProxyMonitor;
    function release(): void;
}