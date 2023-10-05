export interface GetActivityRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数：用户名 */
  username?: string
  /** 查询参数：手机号 */
  phone?: string
}
export interface GetActivityData {
  id: string
  title: string
  detail: string
  number: string
  phone: string
  publisher: string
  createTime: string
  start: string
  end: string
}

/** 响应格式为{code: 200, data: {list: [], total: 0}, message: ""} */
export type GetActivityResponseData = ApiResponseData<{
  list: GetActivityData[]
  total: number
}>
/** 临时定义  */
export type UploadImageResponse = ApiResponseData<{ img: string }>
