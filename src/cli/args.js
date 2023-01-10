export const parseArgs = () => {
    console.log(process.argv.slice(2)
                            .reduce((acc, x, i, array) => {
                                        (i % 2 === 1) && acc.push([array[i-1], x]);
                                        return acc;
                                    }, [])
                            .filter(x => x[0].startsWith('--'))
                            .map(x => `${x[0].slice(2)} is ${x[1]}`)
                            .join(', '));
};
