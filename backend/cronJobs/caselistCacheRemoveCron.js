export function cleanupCron(fileStore) {
    const cleanup = cleanUpFactory(fileStore);
    setInterval(cleanup, 60000);
}
const cleanUpFactory = function (fileStore) {
    return function () {
        const currentTime = Date.now();
        for (const [id, data] of fileStore) {
            if (currentTime > data.expireTime) {
                fileStore.delete(id);
            }
        }
    };
};
