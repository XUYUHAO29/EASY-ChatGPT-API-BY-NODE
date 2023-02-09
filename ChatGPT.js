const axios = require("axios")
const express = require("express")

const request = axios.create({
    baseURL: 'https://api.openai.com/v1/completions'
})
const app = express()

const API_KEY = "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"

request.interceptors.request.use(function (config) {
    config.headers["Content-Type"] = "application/json"
    config.headers['Authorization'] = `Bearer ${API_KEY}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
});

const params = {
    prompt:"",
    max_tokens: 2048,
    model: "text-davinci-003"
}

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*'); //当允许携带cookies此处的白名单不能写’*’
    res.header('Access-Control-Allow-Headers','content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //允许的请求头
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); //允许的请求方法
    res.header('Access-Control-Allow-Credentials',true);  //允许携带cookies
    next();
})

app.get("/getChatGPT", async (req, res)=>{
    params.prompt = req.query.prompt
    console.log(req.query)
    let response = await request.post("", params)
    console.log(response.data.choices[0].text)
    res.send(response.data.choices[0].text)
})
app.listen(3000)

