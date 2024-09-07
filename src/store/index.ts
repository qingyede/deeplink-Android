import { createPinia, type Pinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia: Pinia = createPinia(); // 明确声明 pinia 的类型
pinia.use(piniaPluginPersistedstate);

export default pinia;
