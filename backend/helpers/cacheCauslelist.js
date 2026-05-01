export const cachecCauselistData = function (data, fileStore) {
    const id = crypto.randomUUID();
    const TTL = 10 * 60 * 1000;
    const cacheData = {
        data: data,
        timestamp: Date.now(),
        expireTime: Date.now() + TTL,
    };
    fileStore.set(id, cacheData);
    return id;
};
