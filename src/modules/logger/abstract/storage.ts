import { AsyncLocalStorage } from 'async_hooks';

export type AsyncStorage = AsyncLocalStorage<Map<'traceId', string>>;
