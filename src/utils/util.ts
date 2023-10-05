// 工具函数

class utils {
  constructor() {}

  // 文件转base64
  static fileToDataURL = (file: Blob): Promise<any> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = (e) => resolve((e.target as FileReader).result)
      reader.readAsDataURL(file)
    })
  }
  // base64转文件
  static dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.src = dataURL
    })
  }
  static canvastoFile = (
    canvas: HTMLCanvasElement,
    type: string,
    quality: number,
  ): Promise<Blob | null> => {
    return new Promise((resolve) =>
      canvas.toBlob((blob) => resolve(blob), type, quality),
    )
  }

  /**
   * 图片压缩方法
   * @param fileName 文件名
   * @param base64 base64编码
   * @param quality 压缩质量参数
   * @returns
   */
  static compressionFile = async (
    fileName: string,
    base64: string,
    quality = 0.2,
  ) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const type = this.getImageTypeFromBase64(base64)
    const img = await this.dataURLToImage(base64)
    canvas.width = img.width
    canvas.height = img.height
    context.clearRect(0, 0, img.width, img.height)
    context.drawImage(img, 0, 0, img.width, img.height)
    const blob = (await this.canvastoFile(canvas, type, quality)) as Blob // quality:0.2可根据实际情况计算
    const newFile = await new File([blob], fileName, {
      type: type,
    })
    const newBase64 = await this.fileToDataURL(newFile)
    return newBase64
  }

  static getImageTypeFromBase64 = (base64Data: string) => {
    // 检查base64数据是否以"data:"开头
    if (base64Data.startsWith('data:')) {
      // 获取"data:"之后的部分，直到分号";"之前的内容
      const startIndex = 'data:'.length
      const endIndex = base64Data.indexOf(';')
      if (endIndex !== -1) {
        // 提取图像类型
        const imageType = base64Data.slice(startIndex, endIndex)
        return imageType
      }
    }
    // 如果无效的Base64数据或者没有找到图像类型，则返回null
    return null
  }
}
export default utils
