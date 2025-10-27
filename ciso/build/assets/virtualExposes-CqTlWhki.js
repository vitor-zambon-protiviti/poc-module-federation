const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/App-CxDWrQUx.js","assets/ciso__loadShare__react__loadShare__-Do7DU88T.js","assets/ciso__mf_v__runtimeInit__mf_v__-BeoEGloA.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './preload-helper-CWZBUsdZ.js';

const exposesMap = {
    
        "./Main": async () => {
          const importModule = await __vitePreload(() => import('./App-CxDWrQUx.js').then(n => n.a),true              ?__vite__mapDeps([0,1,2]):void 0);
          const exportModule = {};
          Object.assign(exportModule, importModule);
          Object.defineProperty(exportModule, "__esModule", {
            value: true,
            enumerable: false
          });
          return exportModule
        }
      
  };

export { exposesMap as default };
