// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import FC20230330, * as $FC20230330 from '@alicloud/fc20230330';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
// import * as $tea from '@alicloud/tea-typescript';

const { Readable } = require('stream');
/**
 * 创建一个 Readable Stream
 * @returns
 */
function stringToStream(str: string) {
  const stream = new Readable();
  stream.push(str);
  stream.push(null); // 表示流的结束
  return stream;
}
export default class Client {

  /**
   * 使用AK&SK初始化账号Client
   * @return Client
   * @throws Exception
   */
  static createClient(): FC20230330 {
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
    // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
    let config = new $OpenApi.Config({
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
      accessKeyId: process.env.OSS_ACCESS_KEY,
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    });
    // Endpoint 请参考 https://api.aliyun.com/product/FC
    config.endpoint = process.env.ALI_CLOUD_FC_END_POINT;
    return new FC20230330(config);
  }

  static async main(options: {
		userName: string
		repoName: string
		tool: string
	}): Promise<any> {
		console.log('进入云函数执行', options)
    let client = Client.createClient();
    let invokeFunctionHeaders = new $FC20230330.InvokeFunctionHeaders({ });
    let invokeFunctionRequest = new $FC20230330.InvokeFunctionRequest({
			body: stringToStream(JSON.stringify(options))
		});
    let runtime = new $Util.RuntimeOptions({
			readTimeout: process.env.ALI_CLOUD_FC_FUNCTION_TIMEOUT
		});
    try {
      // 复制代码运行请自行打印 API 的返回值
      const result = await client.invokeFunctionWithOptions("test_service$func-hi75h662", invokeFunctionRequest, invokeFunctionHeaders, runtime);
			const finalRes = result.body?.read().toString()
			console.log('运行结果', finalRes)
			return Promise.resolve(finalRes)
    } catch (error) {
			console.log('运行异常', error)
    } finally {
			console.log('退出云函数执行')
		}
  }
}

// export default Client.main(process.argv.slice(2))
