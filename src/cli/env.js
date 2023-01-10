export const parseEnv = () => {
    console.log(Object.entries(process.env)
                      .filter(([k]) => k.startsWith('RSS_'))
                      .map(([k, v]) => `${k}=${v}`)
                      .join('; '));
};
