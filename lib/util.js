const ora = require('ora'); // 等待效果 loading
async function sleep(n){
    return new Promise((resolve,reject)=>setTimeout(resolve, n));
}

async function wrapLoading(fn, message,...args) { // 制作了一个等待的loading
    const spinner = ora(message);
    spinner.start(); //开启加载
    try {
        let repos = await fn(...args); // axios.get()
        spinner.succeed(); // 成功
        return repos
    } catch (e) {
        spinner.fail('request failed , refetch...');
        await sleep(10000);
        return wrapLoading(fn,message,...args);
    }
}


module.exports = {
    sleep,
    wrapLoading
}