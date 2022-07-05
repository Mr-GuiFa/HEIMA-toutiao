// 配置axios实例
import axios from "axios";
// 创建一个axios实例
// 通过axios创建出来的实例是一样的
// 但是继承了
const request = axios.create({
  baseURL: "http://42.192.129.12:8000/",
});
export default request;
