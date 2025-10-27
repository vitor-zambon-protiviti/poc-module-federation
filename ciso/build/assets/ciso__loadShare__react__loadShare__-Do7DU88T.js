import { c as ciso__mf_v__runtimeInit__mf_v__, a as index_cjs } from './ciso__mf_v__runtimeInit__mf_v__-BeoEGloA.js';

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = ciso__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("react", {
    customShareInfo: {shareConfig:{
      singleton: false,
      strictVersion: undefined,
      requiredVersion: "^19.2.0"
    }}}));
    const exportModule = await res.then(factory => factory());
    var ciso__loadShare__react__loadShare__ = exportModule;

export { ciso__loadShare__react__loadShare__ as c };
