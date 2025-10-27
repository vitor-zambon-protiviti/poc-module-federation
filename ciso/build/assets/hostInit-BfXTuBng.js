const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["remoteEntry.js","assets/ciso__mf_v__runtimeInit__mf_v__-BeoEGloA.js","assets/virtualExposes-CqTlWhki.js","assets/preload-helper-CWZBUsdZ.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './preload-helper-CWZBUsdZ.js';

const remoteEntryPromise = __vitePreload(() => import('../remoteEntry.js'),true              ?__vite__mapDeps([0,1,2,3]):void 0);
    // __tla only serves as a hack for vite-plugin-top-level-await. 
    Promise.resolve(remoteEntryPromise)
      .then(remoteEntry => {
        return Promise.resolve(remoteEntry.__tla)
          .then(remoteEntry.init).catch(remoteEntry.init)
      });
