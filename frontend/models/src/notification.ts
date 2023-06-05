import BaseModel from './base-model'
import { defaultObject, defaultString } from './defaults'

// export type UserDataType = {
//   email: string | null | undefined,
//   name: string | null | undefined,
//   token: { refresh?: string, access?: string } | undefined | null,
//   id: string | null | undefined,
// }

export default class User extends BaseModel {
  constructor() {
    super()
  }

}
