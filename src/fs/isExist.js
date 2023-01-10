import fsPromises from "fs/promises";

const isExist = async path => {
    try {
        await fsPromises.stat(path);
        return true;
    } catch {
        return false;
    }
};

export default isExist;
