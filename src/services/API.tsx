import axios from 'axios'
import { BackendUrl } from '../utils/constant'

export const API = axios.create({
  baseURL: BackendUrl,
})
