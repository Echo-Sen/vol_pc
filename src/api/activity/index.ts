import { request } from '@/utils/service'
import type * as Activity from './types/activity'

// 上传活动的图片
export const uploadActivityImage = (data: FormData) => {
  return request<Activity.UploadImageResponse>({
    url: 'upload',
    method: 'post',
  })
}
