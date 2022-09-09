

export const uniqueId = (prefix: any) => {
    const  id = + new Date() + '-' + Math.floor(Math.random() * 1000);
    return prefix ? prefix + id : id;
};