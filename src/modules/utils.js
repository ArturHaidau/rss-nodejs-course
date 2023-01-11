export const toSchemaStructure = ({_id: id, __v, ...rest}) => ({id, ...rest});

export const buildURL = (base, params) =>
    `${base}?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}`;